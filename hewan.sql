-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2025 at 05:55 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hewan`
--

-- --------------------------------------------------------

--
-- Table structure for table `daftar_hewan`
--

CREATE TABLE `daftar_hewan` (
  `id` int(11) NOT NULL,
  `nama_hewan` varchar(255) NOT NULL,
  `bobot_hewan` int(11) NOT NULL,
  `keterangan_khusus` text DEFAULT NULL,
  `ras` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `Tanggal_dibuat` datetime NOT NULL,
  `Tanggal_diperbarui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftar_hewan`
--

INSERT INTO `daftar_hewan` (`id`, `nama_hewan`, `bobot_hewan`, `keterangan_khusus`, `ras`, `gambar`, `Tanggal_dibuat`, `Tanggal_diperbarui`) VALUES
(1, 'ayam', 15, 'makanan harus fresh', 'ayam petelur', 'https://www.putraperkasa.co.id/wp-content/uploads/2023/11/Ayam-New-Hampshire-001.webp', '2025-05-24 03:41:47', '2025-05-24 03:41:47'),
(2, 'si imhut', 15, 'suka nonton upin ipin', 'ayam malaysia', 'https://www.putraperkasa.co.id/wp-content/uploads/2023/11/Ayam-New-Hampshire-001.webp', '2025-05-24 04:04:27', '2025-05-24 05:05:21');

-- --------------------------------------------------------

--
-- Table structure for table `daftar_pemilik`
--

CREATE TABLE `daftar_pemilik` (
  `id` int(11) NOT NULL,
  `nama_pemilik` varchar(255) NOT NULL,
  `no_hp` varchar(255) NOT NULL,
  `alamat` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `Tanggal_dibuat` datetime NOT NULL,
  `Tanggal_diperbarui` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftar_pemilik`
--

INSERT INTO `daftar_pemilik` (`id`, `nama_pemilik`, `no_hp`, `alamat`, `email`, `Tanggal_dibuat`, `Tanggal_diperbarui`) VALUES
(1, 'dapid', '08123456789', 'sewon', 'dapid@gmail.com', '2025-05-24 05:55:47', '2025-05-24 05:55:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_hewan`
--
ALTER TABLE `daftar_hewan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daftar_pemilik`
--
ALTER TABLE `daftar_pemilik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftar_hewan`
--
ALTER TABLE `daftar_hewan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `daftar_pemilik`
--
ALTER TABLE `daftar_pemilik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
