-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ca1
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (10,'Phones','Light and high performance phones for school'),(15,'Laptops','Light and high performance laptops for school'),(20,'Gaming Desktops','This category is filled with the best of the best gaming desktops'),(21,'Headphones','The best of the best of audio devices for all sorts of desired experiences.'),(22,'Gaming Mice','This section is filled with gaming mice that you desire.'),(23,'Desktops','These are desktops');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `interests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user_id` int(11) NOT NULL,
  `fk_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `interests_ibfk_1_idx` (`fk_user_id`),
  KEY `interests_ibfk_2_idx` (`fk_category_id`),
  CONSTRAINT `interests_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `interests_ibfk_2` FOREIGN KEY (`fk_category_id`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
INSERT INTO `interests` VALUES (72,32,10),(73,32,15),(74,39,20),(75,39,22),(82,35,15),(83,35,20),(84,35,21),(85,35,23);
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `categoryid` int(11) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `picture` varchar(45) NOT NULL DEFAULT 'productImg\\Laptops1.png',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`productid`),
  KEY `category_fk_1_idx` (`categoryid`),
  CONSTRAINT `product_fk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (17,'SP AMD Ryzen 9000 Nuke','Best Nuke',15,'SP ITP!',999.00,'productImg\\1644160332938Laptops1.png','2022-02-03 16:18:01'),(23,'Gaming Desktop 1','This gaming desktop has lights cool',20,'SP IT!',6300.00,'productImg\\1644160686598Desktops.png','2022-02-06 15:18:05'),(24,'Office Coding PC','Made to act as a host for your local Minecraft server',23,'SP IT!',2000.00,'productImg\\1644161266233Desktops2.png','2022-02-06 15:27:45'),(25,'RAZOR RYZEN GAMING PHONE','Evolutional in its time, this phone is decked out for mobile gaming',10,'RAZOR',1000.00,'productImg\\1644164866545razorphone.png','2022-02-06 15:53:16'),(26,'Classic Default Computer','This is a starter PC',15,'BASIC',1500.00,'productImg\\Laptops1.png','2022-02-06 15:54:15'),(27,'Headphones 2','Headphones is colors green',21,'SP IT!',100000.00,'productImg\\1644163996047headph.png','2022-02-06 15:58:59'),(28,'Good Headphones 500','Good Headphones',21,'GD Headphones',18000.00,'productImg\\1644163556809headphonesgudgud.png','2022-02-06 16:05:55'),(29,'Gaming mice','Gamer mouse from fps gaming',22,'SP IT!',29.00,'productImg\\1644164209555mice.png','2022-02-06 16:16:48'),(30,'Green Gaming Mouse','Green Gaming Mouse',22,'SP IT!',123.00,'productImg\\1644164242212green.png','2022-02-06 16:17:20'),(31,'White Gaming Desktop','White Gaming Lights to illuminate your room as you game',20,'SP IT!',1200.00,'productImg\\1644164421871DesktopsWhtie.png','2022-02-06 16:20:20'),(32,'Zeke Desktops','Desktops',23,'SP IT!',12500.00,'productImg\\1644164520090Zeke.png','2022-02-06 16:21:58');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `promotions` (
  `promoid` int(11) NOT NULL AUTO_INCREMENT,
  `productid` int(11) NOT NULL,
  `promotion` varchar(255) NOT NULL,
  `discountamount` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `promotionperiodstart` varchar(45) NOT NULL,
  `promotionperiodend` varchar(45) NOT NULL,
  `duration` varchar(45) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`promoid`),
  KEY `productid_idx` (`productid`),
  CONSTRAINT `productid` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (8,13,'33','33% Off for the price of 3 laptops','Get a little something special for your loved ones this Christmas','26/12/2021','31/12/2021','5 Days','2021-12-10 07:29:33'),(18,17,'40','40% Off for the price of 10 laptops','Save the extra thousand to put toward your dinner this Christmas','1/12/2021','31/12/2021','31 Days','2022-01-02 06:18:08');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `fk_product_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `review_ibfk_1_idx` (`fk_product_id`),
  KEY `review_ibfk_2_idx` (`fk_user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`fk_product_id`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (9,13,34,5,'Good Laptop, super fast and can play game in class!','2022-01-02 05:09:50'),(15,13,35,1,'Decent laptop, bad QC','2022-02-05 12:09:30'),(30,13,32,3,'OK laptop, OK ah','2022-02-05 12:16:02'),(31,13,39,3,'HAHA','2022-02-05 12:16:02'),(32,17,34,1,'Its fine','2022-02-05 12:25:12'),(33,17,35,2,'ok ah','2022-02-05 12:25:12'),(34,18,32,3,'gibberish','2022-02-05 12:25:12'),(35,18,39,4,'heehhehe','2022-02-05 12:25:12'),(48,26,40,5,'Best Laptop I\'ve ever used ','2022-02-06 16:24:02'),(49,31,32,4,'Its very bright in my room I can\'t see anymore','2022-02-06 16:24:53'),(50,31,35,1,'Its so ridiculously bright, it caused eye problems for me and my neighbors! Don\'t buy it unless you want to face military grade flashbangs daily.','2022-02-06 16:25:52'),(51,32,40,5,'Its the coolest thing I\'ve ever owned, the bronze casing makes its heading not an issue. 10/10 Would recommend','2022-02-06 16:26:34'),(52,25,35,3,'Its not that good','2022-02-06 16:28:05'),(53,24,39,1,'Good for coding bad for gaming, there are better computers, like the zeke desktop\n','2022-02-06 16:28:30'),(54,30,32,4,'Good for gaming','2022-02-06 16:29:28'),(55,28,34,5,'Lets me listen to the beats dropping hard!','2022-02-06 16:29:56');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` int(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `profile_pic_url` varchar(255) NOT NULL DEFAULT 'profileImg\\anonymous.png',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (32,'Terry Tan','terry@gmail.com',91234567,'abc123456','user','profileImg\\anonymous.png','2022-01-02 04:53:41'),(34,'Tery Tan','tery@gmail.com',91446567,'ac12356','user','profileImg\\1644162114266Amoungus.JPG','2022-01-02 04:58:56'),(35,'Admin1','Admin@gmail.com',99988877,'p1','admin','profileImg\\1644162273894kidIsVerySus.jpg','2022-01-27 13:14:07'),(39,'UserFake','fakey@gmail.com',69420129,'ab6','user','profileImg\\16441623086726313.jpg','2022-02-03 15:02:53'),(40,'asd','asd@asd',48948,'azc','user','profileImg\\anonymous.png','2022-02-03 15:04:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-07  1:23:22
