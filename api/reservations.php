<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

// GET — fetch all reservations or single by id
if ($method === 'GET') {
    if ($id) {
        $stmt = getDB()->prepare(
            'SELECT r.*, p.name AS package_name, u.email AS user_email
             FROM reservations r
             LEFT JOIN packages p ON r.package_id = p.id
             LEFT JOIN users u ON r.user_id = u.id
             WHERE r.id = ?'
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) jsonResponse(['error' => 'Reservation not found.'], 404);
        $row['amount'] = (float) $row['amount'];
        $row['pax']    = (int)   $row['pax'];
        jsonResponse($row);
    }

    // Optional filters
    $where = [];
    $params = [];

    if (!empty($_GET['status'])) {
        $where[] = 'r.status = ?';
        $params[] = $_GET['status'];
    }
    if (!empty($_GET['user_id'])) {
        $where[] = 'r.user_id = ?';
        $params[] = (int) $_GET['user_id'];
    }
    if (!empty($_GET['q'])) {
        $where[] = '(r.ref LIKE ? OR r.customer_name LIKE ? OR r.customer_ic LIKE ? OR r.customer_phone LIKE ?)';
        $like = '%' . $_GET['q'] . '%';
        array_push($params, $like, $like, $like, $like);
    }

    $sql = 'SELECT r.*, p.name AS package_name
            FROM reservations r
            LEFT JOIN packages p ON r.package_id = p.id';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY r.created_at DESC';

    $stmt = getDB()->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$row) {
        $row['amount'] = (float) $row['amount'];
        $row['pax']    = (int)   $row['pax'];
    }
    jsonResponse($rows);
}

// POST — create reservation
if ($method === 'POST') {
    $body = getBody();
    $required = ['ref','customer_name','customer_ic','pax','travel_date','amount'];
    foreach ($required as $field) {
        if (empty($body[$field])) jsonResponse(['error' => "Field '{$field}' is required."], 400);
    }
    try {
        $stmt = getDB()->prepare(
            'INSERT INTO reservations
             (ref, user_id, package_id, customer_name, customer_ic, customer_phone,
              pax, travel_date, amount, status, payment_status, payment_channel, special_requests)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute([
            $body['ref'],
            $body['user_id']          ?? null,
            $body['package_id']       ?? null,
            $body['customer_name'],
            $body['customer_ic'],
            $body['customer_phone']   ?? '',
            (int)   $body['pax'],
            $body['travel_date'],
            (float) $body['amount'],
            $body['status']           ?? 'Pending',
            $body['payment_status']   ?? 'Unpaid',
            $body['payment_channel']  ?? '',
            $body['special_requests'] ?? '',
        ]);
        jsonResponse(['success' => true, 'id' => getDB()->lastInsertId()], 201);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') jsonResponse(['error' => 'Reservation reference already exists.'], 409);
        jsonResponse(['error' => 'Failed to create reservation.'], 500);
    }
}

// PUT — update reservation
if ($method === 'PUT') {
    if (!$id) jsonResponse(['error' => 'Reservation ID required.'], 400);
    $body = getBody();
    $fields = ['customer_name','customer_ic','customer_phone','pax','travel_date','amount',
               'status','payment_status','payment_channel','special_requests','package_id'];
    $set = []; $params = [];
    foreach ($fields as $f) {
        if (array_key_exists($f, $body)) { $set[] = "{$f} = ?"; $params[] = $body[$f]; }
    }
    if (empty($set)) jsonResponse(['error' => 'No fields to update.'], 400);
    $params[] = $id;
    getDB()->prepare('UPDATE reservations SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
    jsonResponse(['success' => true]);
}

// DELETE — remove reservation
if ($method === 'DELETE') {
    if (!$id) jsonResponse(['error' => 'Reservation ID required.'], 400);
    getDB()->prepare('DELETE FROM reservations WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Method not allowed.'], 405);
