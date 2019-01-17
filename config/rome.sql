-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2019 at 09:02 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rome`
--

DROP DATABASE IF EXISTS `rome`;
CREATE DATABASE `rome`;
USE `rome`;

-- --------------------------------------------------------

--
-- Table structure for table `dates`
--

CREATE TABLE `dates` (
  `id` int(10) UNSIGNED NOT NULL,
  `experience_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `guests` int(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dates`
--

INSERT INTO `dates` (`id`, `experience_id`, `user_id`, `date`, `guests`) VALUES
(1, 1, 0, '2019-01-15', 2),
(2, 1, 0, '2019-01-22', 1),
(3, 2, 0, '2019-01-10', 3),
(4, 4, 0, '2019-01-16', 3),
(5, 4, 0, '2018-12-26', 3),
(6, 5, 0, '2018-12-22', 1),
(7, 5, 0, '2018-12-29', 1),
(8, 2, 0, '2019-01-10', 3),
(9, 3, 0, '2019-01-17', 2),
(10, 3, 0, '2019-01-16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) UNSIGNED NOT NULL,
  `activity` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `occupation` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(5) UNSIGNED NOT NULL,
  `guests` int(3) UNSIGNED NOT NULL,
  `host_id` int(11) UNSIGNED NOT NULL,
  `host_info` varchar(300) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `activity_info` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `imagePath` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `activity`, `occupation`, `city`, `country`, `price`, `guests`, `host_id`, `host_info`, `activity_info`, `imagePath`) VALUES
(1, 'Fishing', 'Commercial Fisherman', 'Tokyo', 'Japan', 150, 5, 1, 'Sakuragi comes from a long line of commercial fisherman in Japan and has been fishing for over 25 years. Fishing is his livelihood and passion.', 'Meet at the dock at 4am. Load up the boat and head out to the fishing grounds. Fish until the holds are full or the light goes down. Head back to the dock and unload the catch. Clean the boat and call it a day.', 'bce61fd7-a5f7-4332-b629-89a7522f4c25.jpg'),
(2, 'Manual Labor', 'Ranch Hand', 'Corpus Christi, Texas', 'U.S.', 250, 10, 2, 'Currently owned by Anne Marion, the great-granddaughter of the four sixes hunting ranch founder Samuel Burnett, the Burnett ranches have been operational since 1868. The ranch has two locations, one in Guthrie and one in the panhandle, and the family breeds horses and black Angus cattle.', 'Meet at the stable at 6am. Shovel out the horse stables. Put fresh hay in the stables.  Lunch at noon.  Feed the animals.  General manual labor', '082ed233-4a04-41ab-9866-32734e417f7a.jpg'),
(3, 'Stock Trading', 'NYSE Floor Broker', 'Manhattan, NY', 'U.S.', 300, 2, 3, 'I have been a floor trader on Wall Street for 5 years.  I consider myself to be the eyes and ears for my clients and their portfolios.', 'Meet outside the NYSE building at 8, grab some coffee.  Hit the floor of the exchange by 9am. opening bell is rung at 930am and closing bell is at 4pm.  We stay on the floor the whole time, except to use the restroom.', '33ef0622-abec-40f5-839f-9858667c2e62.jpg'),
(4, 'Making Sushi', 'Itamae (Sushi Chef)', 'Ginza, Tokyo', 'Japan', 200, 3, 4, 'Jiro Ono is a Japanese chef and owner of Sukiyabashi Jiro, a three-Michelin-starred Japanese sushi restaurant. Ono has been regarded by his contemporaries and peers as the greatest sushi craftsman alive and is credited with innovating methods used in modern sushi preparation.', 'Preparation of sushi rice, sharpening sushi knives. Preparing blocks of fish, grating ginger and slicing scallions.', '94344140-61c1-45b4-b2db-2ee7590d4cef.jpg'),
(5, 'Driving around London', 'London Black Cab Driver', 'London', 'England', 100, 4, 5, 'Oliver has been a London Black Cab Driver for 25 years.  He knows the city like the back of his hand since the cabby examination is possibly the most difficult test in the world — demanding years of study to memorize the labyrinthine city’s 25,000 streets and any business or landmark on them.', 'We will be driving around in the cab picking up fares from 6am until 8pm, breaking for lunch and dinner when we have time.  You will get to experience the city and I will provide historical info on all landmarks as we drive around.', 'a7830f33-8c08-417d-b29c-e0832af95093.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `experience_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `rating` int(1) UNSIGNED NOT NULL,
  `description` varchar(600) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `experience_id`, `user_id`, `date`, `rating`, `description`) VALUES
(1, 1, 5, '2018-12-24', 4, 'Sakuragi is an incredible fisherman and I learned so much from my time with him.  I did not realize how hard it was to be a commercial fisherman and just how massive the industry is here in Japan.  Sakuragi knew so much about fishing and the market here it was incredible.'),
(2, 1, 4, '2018-12-24', 5, 'First off, let me preface by saying that I love fishing.  However, commercial fishing is a whole other ballgame.  Sakuragi is a master at his craft-he has to be, considering this is his livelihood.  Great experience, I would highly recommend it to anyone who wants to know more about commercial fishing and the seafood industry in Japan'),
(3, 2, 3, '2018-12-24', 3, 'The Burnett Ranch offered me an authentic experience working as a ranch hand.  It is not glamorous and it is not easy but overall, I learned a lot from my time here and enjoyed the experience.'),
(4, 2, 2, '2018-12-24', 5, 'What an incredible look into life on a real cattle ranch.  So much blood, sweat and tears goes into this job in order to make things run smoothly on the ranch.  It was back-breaking work but so worth it in order to experience life as a Ranch Hand'),
(5, 3, 1, '2018-12-24', 3, 'Patrick is a very intense guy, as I\'m sure is necessary for this type of fast-paced stressful work.  I had sensory overload out of the floor of the stock exchange.  It was so loud and chaotic it was hard to really understand everything that was going on.  The authenticity was there, however, I really did not know what was going on most of the time.'),
(6, 3, 2, '2018-12-24', 4, 'Life as a broker on the floor of the NYSE is definitely not as glamorous as Hollywood makes it out to be. I had a great time with Patrick and learned a lot from my time with him.'),
(7, 4, 3, '2018-12-24', 5, 'I had a great time with Jiro, he has a great sense of humor and was very patient with me as I attempted to make sushi rice and prepare different sushi ingredients.  The best part of the experience was watching him work, he truly is a master sushi chef.'),
(8, 4, 2, '2018-12-24', 5, 'Jiro is a revelation.  As many other reviewers have stated.  Watching him work is the best part of the experience.  Of course I had a good time making sushi rice and trying to prepare ingredients to his specifications, but the best part of the experience was certainly watching him work.'),
(9, 5, 1, '2018-12-24', 5, 'What a great way to see the city and meet some interesting people! It seemed like Oliver knew just about everything about the city and I had a wonderful time chatting with him and his fares.  A great experience that I would definitely repeat.'),
(10, 5, 4, '2018-12-24', 5, 'This is hands-down the best way to see the city.  Oliver was more knowledgeable than any tour guide could have been and I got to parts of London that are not in any of the tourist guidebooks.  He is a wonderful person with a great sense of humor.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`) VALUES
(1, 'Sakuragi @gmail.com', '', 'Sakuragi ', 'Hanamichi'),
(2, 'Burnett@gmail.com', '', 'Burnett ', 'Ranches'),
(3, 'Patrick@gmail.com', '', 'Patrick', 'Bateman'),
(4, 'Jiro@gmail.com', '', 'Jiro', 'Ono'),
(5, 'Oliver@gmail.com', '', 'Oliver', 'Williams');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ID` (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
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
-- AUTO_INCREMENT for table `dates`
--
ALTER TABLE `dates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
