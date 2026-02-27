-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2026 at 01:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `accounting`
--

-- --------------------------------------------------------

--
-- Table structure for table `document_requests`
--

CREATE TABLE `document_requests` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `client_name` varchar(150) DEFAULT NULL,
  `client_email` varchar(150) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('Pending','Completed','Expired') DEFAULT 'Pending',
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `requested_docs` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_requests`
--

INSERT INTO `document_requests` (`id`, `staff_id`, `client_name`, `client_email`, `title`, `description`, `due_date`, `status`, `token`, `created_at`, `requested_docs`) VALUES
(2, 0, 'askbdjh', 'sdbhb@kjsfdh.sdjk', 'vgjgh', 'hgcvgh', '7575-08-08', 'Pending', '011784a09eb0af85ea2adb05857bebd4', '2025-02-26 14:43:07', NULL),
(3, 0, 'shubham negi', 'shubham@gmail.con', 'Please submit documents', 'Hi shubham please submit documents as soon as possble', '4949-03-03', 'Pending', 'a9fa986925a666f4c3a2fbd2b72d5e18', '2026-02-27 03:49:33', NULL),
(4, 0, 'testing', 'testsdkjf@test.com', 'hi test', 'test', '8989-09-09', 'Pending', '080565dac3460f2ca76b1baac3ccda85', '2026-02-27 03:51:36', NULL),
(5, 1, 'shubham 1', 'abc@hj', 'hi', 'jksd', '2024-09-08', 'Pending', 'f9fe5191c1dc297d568f7e20adc49f89', '2025-02-27 04:13:31', NULL),
(6, 1, 'ahu', 'shdb@jhb', 'jbkb', 'hbhj', '8787-08-08', 'Completed', 'a187e6355110cfe4c38c3377ad036cf0', '2026-02-27 07:07:42', NULL),
(7, 1, 'ahu', 'shdb@jhb', 'jbkb', 'hbhj', '8787-08-08', 'Pending', 'ce9e4a01e05de22801d44a7d7b1ab9a2', '2026-02-27 07:08:32', NULL),
(8, 1, 'skdfbdkj', 'jhbhjb@vbjh', 'bjdbhsj', 'hjbjhvbj', '2078-12-06', 'Completed', 'a0c601f2de40f0ba13c434498c13c740', '2026-02-27 07:20:44', '[\"Aadhar Card\",\"PAN Card\",\"Bank Statement\",\"Invoice\"]'),
(9, 2, 'admin one', 'admin@gmail.com', 'hi admin', 'hi admin ', '2026-02-28', 'Completed', '2edf328bb9d45a2ae06ccba6e5d098ba', '2026-02-27 09:55:16', '[\"Aadhar Card\",\"PAN Card\"]'),
(10, 2, 'shubham negi admin', 'ashb@ksdj', 'dsjfkdas', 'sdjkfnkjsdfn', '2026-02-28', 'Completed', 'c51c78b14ef8ef0c3838efdcffae7549', '2026-02-27 10:02:21', '[\"Bank Statement\"]'),
(11, 2, 'shubham negi', 'sdbhb@kjsfdh.sdjk', 'dassd', 'Hi shubham please submit documents as soon as possble', '2026-03-05', 'Completed', 'addced58d7989b0dd30205db0bcdf80a', '2026-02-27 10:06:04', '[\"Aadhar Card\",\"PAN Card\"]'),
(12, 4, 'hia', 'hwllo@gmaik', 'dsjbhj', 'sdbhfjh', '2028-08-09', 'Completed', '36111291ca0624096467bfa635e273e5', '2026-02-27 12:06:33', '[\"PAN Card\"]'),
(13, 4, 'sdabfha', 'bdsb@bsvhd', 'sdjbfjdskb', 'sdjbfb', '2029-08-05', 'Pending', '1070097108788151d57018e3dff3b67a', '2026-02-27 12:37:28', '[\"Aadhar Card\",\"PAN Card\"]');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_users`
--

CREATE TABLE `staff_users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_users`
--

INSERT INTO `staff_users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Shuhbam', 'Shuhbam@gmail.com', '123456', '2026-02-26 11:25:30'),
(2, 'admin', 'Admin@gmail.com', '123456', '2026-02-27 04:21:01'),
(4, 'new', 'new@gmail.com', '123456', '2026-02-27 10:41:02'),
(7, 'new', 'neww@gmail.com', '123456', '2026-02-27 10:41:45');

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `request_id`, `file_name`, `uploaded_at`) VALUES
(1, 8, '1772185140_shubham-negi-frontendDev.pdf', '2026-02-27 09:39:00'),
(2, 8, '1772185140_saquelain.pdf', '2026-02-27 09:39:00'),
(3, 8, '1772185140_p.jpeg', '2026-02-27 09:39:00'),
(4, 8, '1772185140_p.jpeg', '2026-02-27 09:39:00'),
(5, 9, '1772186331_saquelain.pdf', '2026-02-27 09:58:51'),
(6, 9, '1772186331_signature.jpeg', '2026-02-27 09:58:51'),
(7, 9, '1772186450_saquelain.pdf', '2026-02-27 10:00:50'),
(8, 9, '1772186450_signature.jpeg', '2026-02-27 10:00:50'),
(9, 10, '1772186564_saquelain.pdf', '2026-02-27 10:02:44'),
(10, 11, '1772186790_shubham-negi-frontendDev.pdf', '2026-02-27 10:06:30'),
(11, 11, '1772186790_shubham-negi-resume-full-stack-developer.pdf', '2026-02-27 10:06:30'),
(12, 12, '1772195737_saquelain.pdf', '2026-02-27 12:35:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `document_requests`
--
ALTER TABLE `document_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_users`
--
ALTER TABLE `staff_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `document_requests`
--
ALTER TABLE `document_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_users`
--
ALTER TABLE `staff_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
