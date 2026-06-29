<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed.'], 405);
}

$db = getDB();

// ── Core stats ─────────────────────────────────────────────────
$revenue = $db->query("SELECT COALESCE(SUM(amount),0) AS total FROM reservations WHERE payment_status IN ('Paid','Deposit')")->fetch()['total'];
$mtd     = $db->query("SELECT COALESCE(SUM(amount),0) AS total FROM reservations WHERE payment_status IN ('Paid','Deposit') AND MONTH(created_at)=MONTH(CURDATE()) AND YEAR(created_at)=YEAR(CURDATE())")->fetch()['total'];
$prevMtd = $db->query("SELECT COALESCE(SUM(amount),0) AS total FROM reservations WHERE payment_status IN ('Paid','Deposit') AND MONTH(created_at)=MONTH(CURDATE()-INTERVAL 1 MONTH) AND YEAR(created_at)=YEAR(CURDATE()-INTERVAL 1 MONTH)")->fetch()['total'];

$bookings     = (int) $db->query("SELECT COUNT(*) FROM reservations")->fetchColumn();
$bookingsMtd  = (int) $db->query("SELECT COUNT(*) FROM reservations WHERE MONTH(created_at)=MONTH(CURDATE()) AND YEAR(created_at)=YEAR(CURDATE())")->fetchColumn();

$customers    = (int) $db->query("SELECT COUNT(*) FROM users")->fetchColumn();

$avgRating    = (float) $db->query("SELECT COALESCE(AVG(rating),0) FROM packages WHERE rating > 0")->fetchColumn();

// ── Recent reservations (latest 5) ────────────────────────────
$recentStmt = $db->query(
    "SELECT r.ref, r.customer_name, r.amount, r.status, r.payment_status, p.name AS package_name, p.days, p.nights
     FROM reservations r LEFT JOIN packages p ON r.package_id = p.id
     ORDER BY r.created_at DESC LIMIT 5"
);
$recent = $recentStmt->fetchAll();
foreach ($recent as &$r) $r['amount'] = (float) $r['amount'];

// ── Upcoming departures (next 7 days) ─────────────────────────
$upcomingStmt = $db->query(
    "SELECT r.customer_name, r.travel_date, r.pax, p.name AS package_name, p.img_class
     FROM reservations r LEFT JOIN packages p ON r.package_id = p.id
     WHERE r.travel_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY
       AND r.status IN ('Confirmed','Pending')
     ORDER BY r.travel_date ASC LIMIT 8"
);
$upcoming = $upcomingStmt->fetchAll();
foreach ($upcoming as &$u) $u['pax'] = (int) $u['pax'];

// ── Revenue by month (last 12 months) ─────────────────────────
$monthlyStmt = $db->query(
    "SELECT DATE_FORMAT(created_at, '%b') AS month,
            DATE_FORMAT(created_at, '%Y-%m') AS ym,
            COALESCE(SUM(amount),0) AS revenue,
            COUNT(*) AS bookings
     FROM reservations
     WHERE created_at >= CURDATE() - INTERVAL 12 MONTH
       AND payment_status IN ('Paid','Deposit')
     GROUP BY ym, month
     ORDER BY ym ASC"
);
$monthly = $monthlyStmt->fetchAll();
foreach ($monthly as &$m) {
    $m['revenue']  = (float) $m['revenue'];
    $m['bookings'] = (int)   $m['bookings'];
}

// ── Top packages by bookings ───────────────────────────────────
$topStmt = $db->query(
    "SELECT p.name, COUNT(r.id) AS booking_count, COALESCE(SUM(r.amount),0) AS revenue
     FROM packages p LEFT JOIN reservations r ON r.package_id = p.id
     GROUP BY p.id, p.name ORDER BY revenue DESC LIMIT 5"
);
$topPackages = $topStmt->fetchAll();
foreach ($topPackages as &$t) {
    $t['booking_count'] = (int)   $t['booking_count'];
    $t['revenue']       = (float) $t['revenue'];
}

// ── Notifications (unread) ─────────────────────────────────────
$notifStmt = $db->query(
    "SELECT id, title, message, type, is_read, created_at
     FROM notifications ORDER BY created_at DESC LIMIT 10"
);
$notifications = $notifStmt->fetchAll();
foreach ($notifications as &$n) $n['is_read'] = (bool) $n['is_read'];

jsonResponse([
    'stats' => [
        'revenue'      => (float) $revenue,
        'revenue_mtd'  => (float) $mtd,
        'revenue_prev' => (float) $prevMtd,
        'bookings'     => $bookings,
        'bookings_mtd' => $bookingsMtd,
        'customers'    => $customers,
        'avg_rating'   => round($avgRating, 2),
    ],
    'recent_reservations' => $recent,
    'upcoming_departures' => $upcoming,
    'monthly_revenue'     => $monthly,
    'top_packages'        => $topPackages,
    'notifications'       => $notifications,
]);
