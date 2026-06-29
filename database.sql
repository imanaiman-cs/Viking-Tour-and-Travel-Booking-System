-- ============================================================
-- Viking Tour & Travel Booking System — Database Schema
-- Run this in phpMyAdmin or: mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS viking_travel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE viking_travel;

-- ── Users (customers) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  ic          VARCHAR(20)  UNIQUE NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  phone       VARCHAR(20),
  password    VARCHAR(255) NOT NULL,
  tier        ENUM('Bronze','Silver','Gold','Platinum') DEFAULT 'Bronze',
  status      ENUM('Active','Inactive','VIP','New') DEFAULT 'New',
  city        VARCHAR(100),
  address     TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Admins ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('Super Admin','Admin','Staff') DEFAULT 'Staff',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Packages ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS packages (
  id             VARCHAR(20)  PRIMARY KEY,
  name           VARCHAR(200) NOT NULL,
  location       VARCHAR(150),
  days           INT DEFAULT 1,
  nights         INT DEFAULT 0,
  price          DECIMAL(10,2) DEFAULT 0,
  original_price DECIMAL(10,2) DEFAULT 0,
  rating         DECIMAL(3,2)  DEFAULT 0,
  reviews        INT DEFAULT 0,
  badge          VARCHAR(50)  DEFAULT '',
  img_class      VARCHAR(50)  DEFAULT 'ph-langkawi',
  tag            VARCHAR(50)  DEFAULT 'Beaches',
  description    TEXT,
  status         ENUM('Active','Inactive') DEFAULT 'Active',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Reservations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  ref              VARCHAR(20) UNIQUE NOT NULL,
  user_id          INT,
  package_id       VARCHAR(20),
  customer_name    VARCHAR(200),
  customer_ic      VARCHAR(20),
  customer_phone   VARCHAR(20),
  pax              INT DEFAULT 1,
  travel_date      DATE,
  amount           DECIMAL(10,2) DEFAULT 0,
  status           ENUM('Confirmed','Pending','Refund','Cancelled') DEFAULT 'Pending',
  payment_status   ENUM('Paid','Deposit','Unpaid','Refunding') DEFAULT 'Unpaid',
  payment_channel  VARCHAR(50) DEFAULT '',
  special_requests TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE SET NULL,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- ── Promotions ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS promotions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  code        VARCHAR(50) UNIQUE NOT NULL,
  name        VARCHAR(200),
  type        ENUM('percentage','fixed') DEFAULT 'percentage',
  value       DECIMAL(10,2) DEFAULT 0,
  applies_to  VARCHAR(100) DEFAULT 'All packages',
  start_date  DATE,
  end_date    DATE,
  usage_limit INT DEFAULT 100,
  usage_count INT DEFAULT 0,
  status      ENUM('Active','Scheduled','Ended') DEFAULT 'Active',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Notifications ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(200),
  message    TEXT,
  type       VARCHAR(50) DEFAULT 'info',
  is_read    TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin account  (password: admin123)
INSERT IGNORE INTO admins (name, email, password, role) VALUES
('Ahmad Rizwan', 'admin@vikingtour.com.my', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Admin');

-- Packages
INSERT IGNORE INTO packages (id, name, location, days, nights, price, original_price, rating, reviews, badge, img_class, tag, description) VALUES
('lk-001', 'Langkawi Island Escape',     'Langkawi, Kedah',       4, 3, 1280, 1490, 4.9, 284, 'Bestseller', 'ph-langkawi',  'Beaches',   'Explore Langkawi''s stunning mangroves, pristine beaches and UNESCO Geopark. Includes cable car, island hopping and sunset cruise.'),
('sb-014', 'Kundasang Highland Retreat', 'Sabah, East Malaysia',  5, 4, 2160, 2480, 4.8, 192, 'New',        'ph-kundasang', 'Mountains', 'Experience the breathtaking views of Mt. Kinabalu from Kundasang. Includes Desa Dairy Farm, Ranau hot springs and highland trekking.'),
('ch-022', 'Cameron Tea Country Tour',   'Pahang Highlands',      3, 2, 890,  1050, 4.7, 341, 'Limited',    'ph-cameron',   'Highlands', 'Wander through rolling tea plantations, strawberry farms and mossy forests in Malaysia''s most famous highland retreat.'),
('pr-008', 'Pulau Redang Marine Park',   'Terengganu',            4, 3, 1640, 1840, 4.9, 218, '',           'ph-redang',    'Diving',    'World-class snorkelling and diving in the crystal-clear waters of Redang Marine Park. Includes two dive sites daily.'),
('pn-019', 'Penang Heritage & Food',     'George Town',           3, 2, 720,  880,  4.8, 512, 'Trending',   'ph-penang',    'Culture',   'Walk through UNESCO George Town''s famous street art, colonial architecture and legendary hawker food scene.'),
('ml-007', 'Melaka Strait Heritage',     'Melaka',                2, 1, 480,  560,  4.6, 267, '',           'ph-melaka',    'Heritage',  'Discover the living heritage of Melaka — Jonker Street, A Famosa, Baba Nyonya museums and a sunset river cruise.'),
('ti-031', 'Pulau Tioman Getaway',       'Pahang',                4, 3, 1420, 1680, 4.7, 145, '',           'ph-tioman',    'Diving',    'Escape to one of Asia''s most beautiful islands. Includes snorkelling, jungle trekking and bioluminescent plankton night swim.'),
('kl-005', 'Kuala Lumpur City & Towers', 'Kuala Lumpur',          3, 2, 680,  820,  4.5, 389, 'Trending',   'ph-kl',        'Culture',   'Iconic KL experience — Petronas Towers sky bridge, Batu Caves, Central Market and rooftop dining with city views.');

-- Users (password for all: demo1234)
INSERT IGNORE INTO users (first_name, last_name, ic, email, phone, tier, status, city) VALUES
('Nur Aisyah',  'Rahman',       '990408-14-5238', 'aisyah.r@gmail.com',      '+60 12-345 6789', 'Gold',     'VIP',      'Petaling Jaya, Selangor'),
('Daniel',      'Lee',          '870921-08-5172', 'daniel.lee@outlook.com',  '+60 16-742 1109', 'Silver',   'Active',   'Subang Jaya, Selangor'),
('Siti',        'Khadijah',     '940522-12-6634', 'sitikj@yahoo.com',        '+60 19-228 4012', 'Gold',     'VIP',      'Johor Bahru, Johor'),
('Muhammad',    'Amir',         '910311-05-7281', 'amir.m91@gmail.com',      '+60 13-991 8842', 'Platinum', 'VIP',      'George Town, Penang'),
('Ahmad',       'Firdaus',      '880715-14-5511', 'firdaus.ahmad@gmail.com', '+60 17-562 0934', 'Platinum', 'VIP',      'Shah Alam, Selangor'),
('Lim',         'Wei Ling',     '960428-07-8923', 'weiling.lim@gmail.com',   '+60 12-883 4471', 'Bronze',   'Active',   'Ipoh, Perak'),
('Tengku',      'Iskandar',     '900919-03-6612', 'tiskandar@kl.gov.my',     '+60 11-1928 5523','Bronze',   'New',      'Kuala Lumpur'),
('Vanitha',     'Subramaniam',  '940204-10-4438', 'vanitha.s@gmail.com',     '+60 14-228 7710', 'Silver',   'Active',   'Klang, Selangor'),
('Wong',        'Mei Ling',     '920708-08-3329', 'meiling.w@outlook.com',   '+60 12-661 4488', 'Bronze',   'Active',   'Melaka'),
('Raj',         'Kumar',        '891003-14-7123', 'raj.kumar89@gmail.com',   '+60 19-455 8821', 'Silver',   'Active',   'Petaling Jaya, Selangor'),
('Nor Hafizah', 'Yusof',        '970212-03-2256', 'hafizah.y@gmail.com',     '+60 13-554 9923', 'Bronze',   'Inactive', 'Kota Bharu, Kelantan'),
('Chua',        'Boon Hock',    '850618-10-7741', 'bh.chua@gmail.com',       '+60 16-882 3300', 'Gold',     'Active',   'Kota Kinabalu, Sabah');

-- Update passwords (demo1234)
UPDATE users SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

-- Reservations
INSERT IGNORE INTO reservations (ref, user_id, package_id, customer_name, customer_ic, customer_phone, pax, travel_date, amount, status, payment_status, payment_channel) VALUES
('VK-2026-04218', 1,  'lk-001', 'Nur Aisyah Rahman',     '990408-14-5238', '+60 12-345 6789',  2, '2026-06-18', 2716,  'Confirmed', 'Paid',      'FPX'),
('VK-2026-04217', 2,  'ch-022', 'Daniel Lee',            '870921-08-5172', '+60 16-742 1109',  4, '2026-07-03', 3776,  'Confirmed', 'Paid',      'Card'),
('VK-2026-04216', 3,  'sb-014', 'Siti Khadijah',         '940522-12-6634', '+60 19-228 4012',  6, '2026-08-12', 12960, 'Pending',   'Deposit',   'GrabPay'),
('VK-2026-04215', 4,  'pr-008', 'Muhammad Amir',         '910311-05-7281', '+60 13-991 8842',  2, '2026-07-22', 3478,  'Refund',    'Refunding', 'FPX'),
('VK-2026-04214', 5,  'pn-019', 'Ahmad Firdaus',         '880715-14-5511', '+60 17-562 0934',  3, '2026-06-29', 2160,  'Confirmed', 'Paid',      'TnG'),
('VK-2026-04213', 6,  'ml-007', 'Lim Wei Ling',          '960428-07-8923', '+60 12-883 4471',  2, '2026-06-14', 1018,  'Confirmed', 'Paid',      'FPX'),
('VK-2026-04212', 7,  'lk-001', 'Tengku Iskandar',       '900919-03-6612', '+60 11-1928 5523', 4, '2026-06-30', 5432,  'Confirmed', 'Paid',      'Card'),
('VK-2026-04211', 8,  'ch-022', 'Vanitha Subramaniam',   '940204-10-4438', '+60 14-228 7710',  2, '2026-07-08', 1888,  'Pending',   'Unpaid',    ''),
('VK-2026-04210', 9,  'pr-008', 'Wong Mei Ling',         '920708-08-3329', '+60 12-661 4488',  2, '2026-07-05', 3478,  'Confirmed', 'Paid',      'Boost'),
('VK-2026-04209', 10, 'sb-014', 'Raj Kumar',             '891003-14-7123', '+60 19-455 8821',  3, '2026-08-18', 6480,  'Confirmed', 'Paid',      'CIMB');

-- Promotions
INSERT IGNORE INTO promotions (code, name, type, value, applies_to, start_date, end_date, usage_limit, usage_count, status) VALUES
('RAYA30',    'Hari Raya Special',        'percentage', 30, 'All packages',       '2026-03-20', '2026-04-15', 500, 487, 'Ended'),
('CUTI20',    'School Holiday Offer',     'percentage', 20, 'Peninsular packages','2026-05-24', '2026-06-07', 300, 214, 'Ended'),
('SABAH15',   'Sabah Exploration',        'percentage', 15, 'Sabah packages',     '2026-06-01', '2026-08-31', 200, 92,  'Active'),
('SUMMER25',  'Summer Getaway',           'percentage', 25, 'Beach packages',     '2026-06-15', '2026-08-31', 400, 156, 'Active'),
('FIRSTBOOK', 'First Booking Discount',   'fixed',      100,'All packages',       '2026-01-01', '2026-12-31', 999, 341, 'Active'),
('FLASH50',   'Flash Sale Weekend',       'fixed',      50, 'Selected packages',  '2026-07-01', '2026-07-03', 100, 0,   'Scheduled'),
('HERITAGE10','Heritage Trail Special',   'percentage', 10, 'Heritage packages',  '2026-05-01', '2026-05-31', 150, 143, 'Ended'),
('MERDEKA20', 'Merdeka Independence Day', 'percentage', 20, 'All packages',       '2026-08-15', '2026-09-16', 600, 0,   'Scheduled');

-- Notifications
INSERT IGNORE INTO notifications (title, message, type, is_read) VALUES
('New booking — VK-2026-04218', 'Nur Aisyah Rahman booked Langkawi Island Escape for 2 pax on 18 Jun 2026. Payment: FPX, RM 2,716.', 'booking',  0),
('Refund requested — VK-2026-04215', 'Muhammad Amir has requested a refund for Pulau Redang Vacation (RM 3,478). Reason: Change of plans.', 'refund', 0),
('Low availability — Kundasang Highland Retreat', 'Only 3 spots remaining for the 12 Aug 2026 departure. Consider promoting alternative dates.', 'alert', 0),
('Payment reminder sent', 'Auto-reminder dispatched to Vanitha Subramaniam for booking VK-2026-04211 (RM 1,888 unpaid).', 'info', 1),
('New review — 5 stars', 'Ahmad Firdaus left a 5-star review for Penang Heritage & Food: "Absolutely wonderful experience, highly recommend!"', 'review', 1),
('SUMMER25 promo activated', 'Summer Getaway promo is now live — 25% off beach packages. 156 redemptions so far.', 'promo', 1),
('System backup completed', 'Nightly database backup completed successfully at 03:00 AM. All records verified.', 'system', 1);
