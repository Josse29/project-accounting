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

-- Membuang data untuk tabel myapps.Accounting: 76 rows
/*!40000 ALTER TABLE "Accounting" DISABLE KEYS */;
INSERT INTO "Accounting" ("AccountingId", "AccountingDate", "AccountingTime", "AccountingRef", "AccountingName", "AccountingBalance", "AccountingInfo") VALUES
	(1, '2025-01-01', '21:41', 111, 'Cash - Equity Josse Surya Pinem', 200000000, 'Invest with Cash | '),
	(2, '2025-01-01', '21:41', 311, 'Equity - Josse Surya Pinem', 200000000, 'Invest with Cash | '),
	(3, '2025-01-06', '11:45', 511, 'Purchase - Product A', 120000000, 'Purchase - Product A Total Qty : 10 Has Been Done | '),
	(4, '2025-01-06', '11:45', 111, 'Cash - Purchase Product A', -120000000, 'Purchase - Product A Total Qty : 10 Has Been Done | '),
	(5, '2025-01-07', '12:55', 111, 'Cash - Sales Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  | '),
	(6, '2025-01-07', '12:55', 411, 'Sales - Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  | '),
	(7, '2025-01-10', '11:32', 111, 'Cash - Liability Bank Bni', 50000000, ''),
	(8, '2025-01-10', '11:32', 211, 'Liability - Bank Bni', 50000000, ''),
	(9, '2025-01-13', '15:33', 111, 'Cash - Sales Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  | '),
	(10, '2025-01-13', '15:33', 411, 'Sales - Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  | '),
	(11, '2025-01-15', '14:25', 511, 'Purchase - Product B', 130000000, 'Purchase - Product B Total Qty : 10  Has Been Done '),
	(12, '2025-01-15', '14:25', 111, 'Cash - Purchase Product B', -130000000, 'Purchase - Product B Total Qty : 10  Has Been Done '),
	(13, '2025-01-17', '15:04', 112, 'Receivable - Warrent Buffet', 140000000, 'Product B Has Been Sold with Total Qty : 10 with interest 10% | '),
	(14, '2025-01-17', '15:04', 411, 'Sales - Product B', 140000000, 'Product B Has Been Sold with Total Qty : 10 with interest 10% | '),
	(15, '2025-01-17', '15:04', 112, 'Receivable - Warrent Buffet', 14000000, 'Product B Has Been Sold with Total Qty : 10 with interest 10% | '),
	(16, '2025-01-17', '15:04', 611, 'Interest Revenue Receivable - Warrent Buffet', 14000000, 'Product B Has Been Sold with Total Qty : 10 with interest 10% | '),
	(17, '2025-01-17', '15:04', 111, 'Cash - Receivable Warrent Buffet', 5000000, ''),
	(18, '2025-01-17', '15:04', 112, 'Receivable - Warrent Buffet', -5000000, ''),
	(19, '2025-01-20', '13:54', 121, 'Build', 50000000, ''),
	(20, '2025-01-20', '13:54', 111, 'Cash - Payment Build', -50000000, ''),
	(21, '2025-02-03', '13:54', 211, 'Liability - Bank Bni', -3000000, ''),
	(22, '2025-02-03', '13:54', 111, 'Cash - Payment Liability Bank Bni', -3000000, ''),
	(23, '2025-02-04', '13:54', 514, 'Advertising Expense', 1500000, ''),
	(24, '2025-02-04', '13:54', 111, 'Cash - Payment Advertising Expense', -1500000, ''),
	(25, '2025-05-05', '13:11', 211, 'Liability - Bank Bni', -3000000, ''),
	(26, '2025-05-05', '13:11', 111, 'Cash - Payment Liability Bank Bni', -3000000, ''),
	(27, '2025-05-09', '15:11', 511, 'Purchase - Product C', 75000000, 'Purchase - Product C Total Qty : 5  Has Been Done '),
	(28, '2025-05-09', '15:11', 111, 'Cash - Purchase Product C', -75000000, 'Purchase - Product C Total Qty : 5  Has Been Done '),
	(29, '2025-05-15', '12:11', 111, 'Cash - Sales Product C', 80000000, 'Product C Has Been Sold with Total Qty : 5  '),
	(30, '2025-05-15', '12:11', 411, 'Sales - Product C', 80000000, 'Product C Has Been Sold with Total Qty : 5  '),
	(31, '2025-07-01', '11:45', 111, 'Cash - Equity Brata', 50000000, 'Invest with Cash | '),
	(32, '2025-07-01', '11:45', 311, 'Equity - Brata', 50000000, 'Invest with Cash | '),
	(33, '2025-07-03', '12:11', 511, 'Purchase - Product A', 60000000, 'Purchase - Product A Total Qty : 5  Has Been Done '),
	(34, '2025-07-03', '12:11', 111, 'Cash - Purchase Product A', -60000000, 'Purchase - Product A Total Qty : 5  Has Been Done '),
	(35, '2025-07-07', '14:11', 111, 'Cash - Sales Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  '),
	(36, '2025-07-07', '14:11', 411, 'Sales - Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  '),
	(37, '2025-07-08', '14:11', 412, 'Sales Return - Product A', 13000000, 'Sales Return Product A Has Been Done with Total Qty : 1  | '),
	(38, '2025-07-08', '14:11', 111, 'Cash - Sales Return Product A', -13000000, 'Sales Return Product A Has Been Done with Total Qty : 1  | '),
	(39, '2025-07-09', '10:45', 111, 'Cash - Purchase Return Product A', 12000000, 'Purchase Return - Product A Total Qty : 1  | '),
	(40, '2025-07-09', '10:45', 512, 'Purchase Return - Product A', 12000000, 'Purchase Return - Product A Total Qty : 1  | '),
	(41, '2025-07-15', '11:10', 511, 'Purchase - Product B', 65000000, 'Purchase - Product B Total Qty : 5  Has Been Done '),
	(42, '2025-07-15', '11:10', 111, 'Cash - Purchase Product B', -65000000, 'Purchase - Product B Total Qty : 5  Has Been Done '),
	(43, '2025-08-04', '12:11', 111, 'Cash - Sales Product B', 70000000, 'Product B Has Been Sold with Total Qty : 5  '),
	(44, '2025-08-04', '12:11', 411, 'Sales - Product B', 70000000, 'Product B Has Been Sold with Total Qty : 5  '),
	(45, '2025-08-11', '13:54', 211, 'Liability - Bank Bni', -3000000, ''),
	(46, '2025-08-11', '13:54', 111, 'Cash - Payment Liability Bank Bni', -3000000, ''),
	(47, '2025-09-09', '10:10', 511, 'Purchase - Product C', 75000000, 'Purchase - Product C Total Qty : 5  Has Been Done '),
	(48, '2025-09-09', '10:10', 111, 'Cash - Purchase Product C', -75000000, 'Purchase - Product C Total Qty : 5  Has Been Done '),
	(49, '2025-09-11', '11:11', 111, 'Cash - Sales Product C', 80000000, 'Product C Has Been Sold with Total Qty : 5  '),
	(50, '2025-09-11', '11:11', 411, 'Sales - Product C', 80000000, 'Product C Has Been Sold with Total Qty : 5  '),
	(51, '2025-10-10', '11:12', 211, 'Liability - Bank Bni', -3000000, ''),
	(52, '2025-10-10', '11:12', 111, 'Cash - Payment Liability Bank Bni', -3000000, ''),
	(53, '2025-10-13', '12:31', 511, 'Purchase - Product A', 60000000, 'Purchase - Product A Total Qty : 5  Has Been Done '),
	(54, '2025-10-13', '12:31', 111, 'Cash - Purchase Product A', -60000000, 'Purchase - Product A Total Qty : 5  Has Been Done '),
	(55, '2025-10-15', '15:11', 111, 'Cash - Sales Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  '),
	(56, '2025-10-15', '15:11', 411, 'Sales - Product A', 65000000, 'Product A Has Been Sold with Total Qty : 5  '),
	(57, '2025-11-11', '13:54', 211, 'Liability - Bank Bni', -3000000, ''),
	(58, '2025-11-11', '13:54', 111, 'Cash - Payment Liability Bank Bni', -3000000, ''),
	(59, '2025-11-18', '11:45', 511, 'Purchase - Product A', 120000000, 'Purchase - Product A Total Qty : 10  Has Been Done '),
	(60, '2025-11-18', '11:45', 111, 'Cash - Purchase Product A', -120000000, 'Purchase - Product A Total Qty : 10  Has Been Done '),
	(61, '2025-12-01', '12:55', 111, 'Cash - Sales Product A', 130000000, 'Product A Has Been Sold with Total Qty : 10  '),
	(62, '2025-12-01', '12:55', 411, 'Sales - Product A', 130000000, 'Product A Has Been Sold with Total Qty : 10  '),
	(63, '2025-12-04', '13:11', 311, 'Withdrawl Equity - Josse Surya Pinem', -10000000, 'Invest with Cash | '),
	(64, '2025-12-04', '13:11', 111, 'Cash - Withdrawl Equity Josse Surya Pinem', -10000000, 'Invest with Cash | '),
	(65, '2025-12-10', '10:10', 511, 'Purchase - Product C', 30000000, 'Purchase - Product C Total Qty : 2 with discount 10% Has Been Done '),
	(66, '2025-12-10', '10:10', 111, 'Cash - Purchase Product C', -30000000, 'Purchase - Product C Total Qty : 2 with discount 10% Has Been Done '),
	(67, '2025-12-10', '10:10', 111, 'Cash - Purchase Discount Product C', 3000000, 'Purchase - Product C Total Qty : 2 with discount 10% Has Been Done '),
	(68, '2025-12-10', '10:10', 513, 'Purchase Discount - Product C', 3000000, 'Purchase - Product C Total Qty : 2 with discount 10% Has Been Done '),
	(69, '2025-12-15', '11:41', 111, 'Cash - Revenue Others Grant Government', 5000000, ''),
	(70, '2025-12-15', '11:41', 611, 'Grant Government', 5000000, ''),
	(71, '2025-12-22', '13:44', 514, 'Salary Expense Of Doddy', 6225000, ''),
	(72, '2025-12-22', '13:44', 111, 'Cash - Payment Salary Expense Of Doddy', -6225000, ''),
	(73, '2025-12-22', '14:00', 514, 'Salary Expense Of Wpu', 4980000, ''),
	(74, '2025-12-22', '14:00', 111, 'Cash - Payment Salary Expense Of Wpu', -7080000, ''),
	(75, '2025-12-22', '14:15', 514, 'Depreciation Expense - Build', 5000000, ''),
	(76, '2025-12-22', '14:15', 131, 'Accumulated of Depreciation - Build', -5000000, '');
/*!40000 ALTER TABLE "Accounting" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
