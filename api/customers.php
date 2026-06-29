<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

// GET — all customers or single by id
if ($method === 'GET') {
    if ($id) {
        $stmt = getDB()->prepare('SELECT id, first_name, last_name, ic, email, phone, tier, status, city, address, created_at FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) jsonResponse(['error' => 'Customer not found.'], 404);

        // Booking history
        $bstmt = getDB()->prepare(
            'SELECT r.ref, r.travel_date, r.amount, r.status, r.payment_status, p.name AS package_name
             FROM reservations r LEFT JOIN packages p ON r.package_id = p.id
             WHERE r.user_id = ? ORDER BY r.created_at DESC LIMIT 10'
        );
        $bstmt->execute([$id]);
        $user['bookings'] = $bstmt->fetchAll();
        foreach ($user['bookings'] as &$b) $b['amount'] = (float) $b['amount'];

        jsonResponse($user);
    }

    // Optional filters
    $where = [];
    $params = [];
    if (!empty($_GET['status'])) {
        $where[] = 'status = ?';
        $params[] = $_GET['status'];
    }
    if (!empty($_GET['tier'])) {
        $where[] = 'tier = ?';
        $params[] = $_GET['tier'];
    }
    if (!empty($_GET['q'])) {
        $where[] = '(first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR ic LIKE ? OR phone LIKE ?)';
        $like = '%' . $_GET['q'] . '%';
        array_push($params, $like, $like, $like, $like, $like);
    }

    $sql = 'SELECT u.id, u.first_name, u.last_name, u.ic, u.email, u.phone, u.tier, u.status, u.city, u.created_at,
                   COUNT(r.id) AS booking_count,
                   COALESCE(SUM(r.amount), 0) AS total_spent,
                   MAX(r.created_at) AS last_booking
            FROM users u
            LEFT JOIN reservations r ON r.user_id = u.id';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' GROUP BY u.id ORDER BY u.created_at DESC';

    $stmt = getDB()->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$row) {
        $row['booking_count'] = (int)   $row['booking_count'];
        $row['total_spent']   = (float) $row['total_spent'];
    }
    jsonResponse($rows);
}

// PUT — update customer
if ($method === 'PUT') {
    if (!$id) jsonResponse(['error' => 'Customer ID required.'], 400);
    $body = getBody();
    $fields = ['first_name','last_name','phone','city','address','tier','status'];
    $set = []; $params = [];
    foreach ($fields as $f) {
        if (array_key_exists($f, $body)) { $set[] = "{$f} = ?"; $params[] = $body[$f]; }
    }
    if (empty($set)) jsonResponse(['error' => 'No fields to update.'], 400);
    $params[] = $id;
    getDB()->prepare('UPDATE users SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
    jsonResponse(['success' => true]);
}

// DELETE — remove customer
if ($method === 'DELETE') {
    if (!$id) jsonResponse(['error' => 'Customer ID required.'], 400);
    getDB()->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Method not allowed.'], 405);
