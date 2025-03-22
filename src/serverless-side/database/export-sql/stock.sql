-- --------------------------------------------------------
-- Host:                         D:\Software-Developer-JS\project-accounting-electron\src\serverless-side\database\myapps.db
-- Versi server:                 3.48.0
-- OS Server:                    
-- HeidiSQL Versi:               12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Membuang data untuk tabel myapps.Stock: 20 rows
/*!40000 ALTER TABLE "Stock" DISABLE KEYS */;
INSERT INTO "Stock" ("StockId", "StockDate", "StockTime", "StockActivity", "StockProductId", "StockQty", "StockInfo") VALUES
	(1, '2025-01-06', '11:45', 'Purchase - Product A', 1, 10, ''),
	(2, '2025-01-07', '12:55', 'Sales - Product A', 1, -5, 'Customer : Padika - Sale : Doddy | '),
	(3, '2025-01-13', '15:33', 'Sales - Product A', 1, -5, 'Customer : Ferdiansyah - Sale : Wpu | '),
	(4, '2025-01-15', '14:25', 'Purchase - Product B', 2, 10, ''),
	(5, '2025-01-17', '15:04', 'Sales - Product B', 2, -10, 'Customer : Warrent Buffet - Sale : Doddy | '),
	(6, '2025-05-09', '15:11', 'Purchase - Product C', 3, 5, ''),
	(7, '2025-05-15', '12:11', 'Sales - Product C', 3, -5, 'Customer : Warrent Buffet - Sale : Wpu | '),
	(8, '2025-07-03', '12:11', 'Purchase - Product A', 1, 5, ''),
	(9, '2025-07-07', '13:11', 'Sales - Product A', 1, -5, 'Customer : Warrent Buffet - Sale : Wpu | '),
	(10, '2025-07-08', '14:11', 'Sales Return - Product A', 1, 1, 'Customer : Warrent Buffet - Sale : Wpu | '),
	(11, '2025-07-09', '10:45', 'Purchase Return  - Product A', 1, -1, ''),
	(12, '2025-07-15', '11:10', 'Purchase - Product B', 2, 5, ''),
	(13, '2025-08-04', '12:11', 'Sales - Product B', 2, -5, 'Customer : Ferdiansyah - Sale : Wpu | '),
	(14, '2025-09-09', '10:10', 'Purchase - Product C', 3, 5, ''),
	(15, '2025-09-11', '11:11', 'Sales - Product C', 3, -5, 'Customer : Padika - Sale : Doddy | '),
	(16, '2025-10-13', '12:31', 'Purchase - Product A', 1, 5, ''),
	(17, '2025-10-15', '15:11', 'Sales - Product A', 1, -5, 'Customer : Warrent Buffet - Sale : Wpu | '),
	(18, '2025-11-18', '11:45', 'Purchase - Product A', 1, 10, ''),
	(19, '2025-12-01', '12:56', 'Sales - Product A', 1, -10, 'Customer : Padika - Sale : Doddy | '),
	(20, '2025-12-10', '10:10', 'Purchase - Product C', 3, 2, '');
/*!40000 ALTER TABLE "Stock" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
