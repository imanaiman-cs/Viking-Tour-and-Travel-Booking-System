<?php
require_once __DIR__ . '/config.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];
$body   = getBody();

// GET /api/auth.php — return current session user
if ($method === 'GET') {
    if (isset($_SESSION['user'])) {
        jsonResponse(['loggedIn' => true, 'user' => $_SESSION['user']]);
    }
    jsonResponse(['loggedIn' => false]);
}

// POST /api/auth.php  action: login | register | logout
if ($method === 'POST') {
    $action = $body['action'] ?? '';

    // ── Login ─────────────────────────────────────────────────
    if ($action === 'login') {
        $email    = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';
        $isAdmin  = ($body['type'] ?? 'customer') === 'admin';

        if (!$email || !$password) {
            jsonResponse(['error' => 'Email and password are required.'], 400);
        }

        if ($isAdmin) {
            $stmt = getDB()->prepare('SELECT * FROM admins WHERE email = ? LIMIT 1');
            $stmt->execute([$email]);
            $admin = $stmt->fetch();
            if (!$admin || !password_verify($password, $admin['password'])) {
                jsonResponse(['error' => 'Invalid admin credentials.'], 401);
            }
            $_SESSION['user'] = [
                'id'    => $admin['id'],
                'name'  => $admin['name'],
                'email' => $admin['email'],
                'role'  => $admin['role'],
                'type'  => 'admin',
            ];
            jsonResponse(['success' => true, 'user' => $_SESSION['user'], 'redirect' => 'admin.php']);
        } else {
            $stmt = getDB()->prepare('SELECT * FROM users WHERE email = ? OR ic = ? LIMIT 1');
            $stmt->execute([$email, $email]);
            $user = $stmt->fetch();
            if (!$user || !password_verify($password, $user['password'])) {
                jsonResponse(['error' => 'Invalid email or password.'], 401);
            }
            $_SESSION['user'] = [
                'id'         => $user['id'],
                'name'       => $user['first_name'] . ' ' . $user['last_name'],
                'email'      => $user['email'],
                'tier'       => $user['tier'],
                'type'       => 'customer',
            ];
            jsonResponse(['success' => true, 'user' => $_SESSION['user'], 'redirect' => 'customer.php']);
        }
    }

    // ── Register ──────────────────────────────────────────────
    if ($action === 'register') {
        $firstName = trim($body['first_name'] ?? '');
        $lastName  = trim($body['last_name']  ?? '');
        $ic        = trim($body['ic']         ?? '');
        $email     = trim($body['email']      ?? '');
        $phone     = trim($body['phone']      ?? '');
        $password  = $body['password']        ?? '';

        if (!$firstName || !$lastName || !$ic || !$email || !$password) {
            jsonResponse(['error' => 'All fields are required.'], 400);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        try {
            $stmt = getDB()->prepare(
                'INSERT INTO users (first_name, last_name, ic, email, phone, password) VALUES (?,?,?,?,?,?)'
            );
            $stmt->execute([$firstName, $lastName, $ic, $email, $phone, $hash]);
            jsonResponse(['success' => true, 'message' => 'Account created successfully.']);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') {
                jsonResponse(['error' => 'Email or IC number already registered.'], 409);
            }
            jsonResponse(['error' => 'Registration failed. Please try again.'], 500);
        }
    }

    // ── Logout ────────────────────────────────────────────────
    if ($action === 'logout') {
        session_destroy();
        jsonResponse(['success' => true]);
    }

    jsonResponse(['error' => 'Unknown action.'], 400);
}

jsonResponse(['error' => 'Method not allowed.'], 405);
