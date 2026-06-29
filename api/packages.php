<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

// GET — fetch all active packages or single by id
if ($method === 'GET') {
    if ($id) {
        $stmt = getDB()->prepare('SELECT * FROM packages WHERE id = ?');
        $stmt->execute([$id]);
        $pkg = $stmt->fetch();
        if (!$pkg) jsonResponse(['error' => 'Package not found.'], 404);
        // Cast numeric fields
        $pkg['price']          = (float) $pkg['price'];
        $pkg['original_price'] = (float) $pkg['original_price'];
        $pkg['rating']         = (float) $pkg['rating'];
        $pkg['reviews']        = (int)   $pkg['reviews'];
        $pkg['days']           = (int)   $pkg['days'];
        $pkg['nights']         = (int)   $pkg['nights'];
        jsonResponse($pkg);
    }

    $status = $_GET['status'] ?? 'Active';
    $stmt = getDB()->prepare('SELECT * FROM packages WHERE status = ? ORDER BY reviews DESC');
    $stmt->execute([$status]);
    $packages = $stmt->fetchAll();
    foreach ($packages as &$p) {
        $p['price']          = (float) $p['price'];
        $p['original_price'] = (float) $p['original_price'];
        $p['rating']         = (float) $p['rating'];
        $p['reviews']        = (int)   $p['reviews'];
        $p['days']           = (int)   $p['days'];
        $p['nights']         = (int)   $p['nights'];
    }
    jsonResponse($packages);
}

// POST — create new package
if ($method === 'POST') {
    $body = getBody();
    $required = ['id','name','location','days','nights','price','original_price'];
    foreach ($required as $field) {
        if (empty($body[$field])) jsonResponse(['error' => "Field '{$field}' is required."], 400);
    }
    try {
        $stmt = getDB()->prepare(
            'INSERT INTO packages (id, name, location, days, nights, price, original_price, badge, img_class, tag, description, status)
             VALUES (:id,:name,:location,:days,:nights,:price,:original_price,:badge,:img_class,:tag,:description,:status)'
        );
        $stmt->execute([
            'id'             => $body['id'],
            'name'           => $body['name'],
            'location'       => $body['location'],
            'days'           => (int)   $body['days'],
            'nights'         => (int)   $body['nights'],
            'price'          => (float) $body['price'],
            'original_price' => (float) $body['original_price'],
            'badge'          => $body['badge']       ?? '',
            'img_class'      => $body['img_class']   ?? 'ph-langkawi',
            'tag'            => $body['tag']         ?? 'Beaches',
            'description'    => $body['description'] ?? '',
            'status'         => $body['status']      ?? 'Active',
        ]);
        jsonResponse(['success' => true, 'id' => $body['id']], 201);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') jsonResponse(['error' => 'Package ID already exists.'], 409);
        jsonResponse(['error' => 'Failed to create package.'], 500);
    }
}

// PUT — update package
if ($method === 'PUT') {
    if (!$id) jsonResponse(['error' => 'Package ID required.'], 400);
    $body = getBody();
    $fields = ['name','location','days','nights','price','original_price','badge','img_class','tag','description','status'];
    $set = []; $params = [];
    foreach ($fields as $f) {
        if (isset($body[$f])) { $set[] = "{$f} = ?"; $params[] = $body[$f]; }
    }
    if (empty($set)) jsonResponse(['error' => 'No fields to update.'], 400);
    $params[] = $id;
    getDB()->prepare('UPDATE packages SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
    jsonResponse(['success' => true]);
}

// DELETE — remove package
if ($method === 'DELETE') {
    if (!$id) jsonResponse(['error' => 'Package ID required.'], 400);
    getDB()->prepare('DELETE FROM packages WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Method not allowed.'], 405);
