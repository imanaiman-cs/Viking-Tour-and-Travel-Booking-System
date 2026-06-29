<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

// GET — all promotions or single by id, or validate a code
if ($method === 'GET') {
    if (!empty($_GET['code'])) {
        $stmt = getDB()->prepare("SELECT * FROM promotions WHERE code = ? AND status = 'Active' LIMIT 1");
        $stmt->execute([strtoupper($_GET['code'])]);
        $promo = $stmt->fetch();
        if (!$promo) jsonResponse(['error' => 'Invalid or expired promo code.'], 404);
        $promo['value']       = (float) $promo['value'];
        $promo['usage_limit'] = (int)   $promo['usage_limit'];
        $promo['usage_count'] = (int)   $promo['usage_count'];
        jsonResponse($promo);
    }

    if ($id) {
        $stmt = getDB()->prepare('SELECT * FROM promotions WHERE id = ?');
        $stmt->execute([$id]);
        $promo = $stmt->fetch();
        if (!$promo) jsonResponse(['error' => 'Promotion not found.'], 404);
        $promo['value']       = (float) $promo['value'];
        $promo['usage_limit'] = (int)   $promo['usage_limit'];
        $promo['usage_count'] = (int)   $promo['usage_count'];
        jsonResponse($promo);
    }

    $status = $_GET['status'] ?? null;
    if ($status) {
        $stmt = getDB()->prepare('SELECT * FROM promotions WHERE status = ? ORDER BY created_at DESC');
        $stmt->execute([$status]);
    } else {
        $stmt = getDB()->query('SELECT * FROM promotions ORDER BY created_at DESC');
    }
    $rows = $stmt->fetchAll();
    foreach ($rows as &$row) {
        $row['value']       = (float) $row['value'];
        $row['usage_limit'] = (int)   $row['usage_limit'];
        $row['usage_count'] = (int)   $row['usage_count'];
    }
    jsonResponse($rows);
}

// POST — create promotion
if ($method === 'POST') {
    $body = getBody();
    $required = ['code','name','type','value'];
    foreach ($required as $field) {
        if (empty($body[$field])) jsonResponse(['error' => "Field '{$field}' is required."], 400);
    }
    try {
        $stmt = getDB()->prepare(
            'INSERT INTO promotions (code, name, type, value, applies_to, start_date, end_date, usage_limit, status)
             VALUES (?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute([
            strtoupper($body['code']),
            $body['name'],
            $body['type'],
            (float) $body['value'],
            $body['applies_to']  ?? 'All packages',
            $body['start_date']  ?? null,
            $body['end_date']    ?? null,
            (int) ($body['usage_limit'] ?? 100),
            $body['status']      ?? 'Active',
        ]);
        jsonResponse(['success' => true, 'id' => getDB()->lastInsertId()], 201);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') jsonResponse(['error' => 'Promo code already exists.'], 409);
        jsonResponse(['error' => 'Failed to create promotion.'], 500);
    }
}

// PUT — update promotion
if ($method === 'PUT') {
    if (!$id) jsonResponse(['error' => 'Promotion ID required.'], 400);
    $body = getBody();
    $fields = ['name','type','value','applies_to','start_date','end_date','usage_limit','status'];
    $set = []; $params = [];
    foreach ($fields as $f) {
        if (array_key_exists($f, $body)) { $set[] = "{$f} = ?"; $params[] = $body[$f]; }
    }
    if (empty($set)) jsonResponse(['error' => 'No fields to update.'], 400);
    $params[] = $id;
    getDB()->prepare('UPDATE promotions SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
    jsonResponse(['success' => true]);
}

// DELETE — remove promotion
if ($method === 'DELETE') {
    if (!$id) jsonResponse(['error' => 'Promotion ID required.'], 400);
    getDB()->prepare('DELETE FROM promotions WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Method not allowed.'], 405);
