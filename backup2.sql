-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: synagogue
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `community_members2`
--

DROP TABLE IF EXISTS `community_members2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_members2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `id_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_numbe_UNIQUE` (`id_number`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_members2`
--

LOCK TABLES `community_members2` WRITE;
/*!40000 ALTER TABLE `community_members2` DISABLE KEYS */;
INSERT INTO `community_members2` VALUES (61,'יוחאיי','נחום','0524277282','yohay30yohay@gmail.com','רחוב הרצל 12, חיפה','yn09yn!',1,'123986789'),(62,'רון','כהן','0542345678','ron.cohen@example.com','רחוב בן גוריון 45, חיפה','ronPass2@',1,'986654321'),(63,'תמר','שמעוני','0543456789','tamar.shimoni@example.com','רחוב העצמאות 67, חיפה','tamar1234',0,'735792468'),(64,'יוסי','מזרחי','0544567890','yossi.mizrahi@example.com','רחוב הנרקיסים 88, חיפה','yossi56@',0,'243813579'),(65,'שרה','כהן','0545678901','sarah.cohen@example.com','רחוב הנשיא 5, חיפה','sarah567#',0,'123123623'),(66,'דני','פרידמן','0546789012','danny.friedman@example.com','רחוב חלוצי התעשייה 21, חיפה','dannyF#1',0,'589456123'),(67,'מיכל','ברק','0547890123','michal.barak@example.com','רחוב דיזנגוף 102, חיפה','michalBar12',0,'159553258'),(68,'רעות','ביטון','0548901234','reut.biton@example.com','שדרות ירושלים 78, חיפה','reutR56!',0,'753951466'),(69,'איתן','עוזרי','0549012345','eytan.ozery@example.com','רחוב הנרקיסים 14, חיפה','ozery78*',0,'321654787'),(70,'נועה','אורן','0540123456','noa.oren@example.com','רחוב החשמונאים 15, חיפה','noaOr34!',0,'987221655'),(71,'מאיר','ליבוביץ','0542233445','meir.l@example.com','רחוב הרצל 13, חיפה','meirBs12@',0,'123456749'),(72,'גלית','רוזן','0543344556','galit.rozen@example.com','שדרות קק\"ל 45, חיפה','galit123$',0,'987354321'),(73,'דוד','שושני','0544455667','david.shoshani@example.com','רחוב דרך הים 90, חיפה','david456!',0,'335792468'),(74,'לירון','מלכה','0545566778','liron.malka@example.com','רחוב העבודה 29, חיפה','liRon78#',0,'246513579'),(75,'חגית','עזרן','0546677889','hagith.azran@example.com','רחוב יפו 4, חיפה','hagithAz89',0,'321624987');
/*!40000 ALTER TABLE `community_members2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day_times`
--

DROP TABLE IF EXISTS `day_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_times` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day_timescol` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day_times`
--

LOCK TABLES `day_times` WRITE;
/*!40000 ALTER TABLE `day_times` DISABLE KEYS */;
/*!40000 ALTER TABLE `day_times` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-07 15:28:25
