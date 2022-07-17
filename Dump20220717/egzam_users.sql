-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: egzam
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Vardas','vardas@gmail.com','$2b$10$vW6iQGTC7UvxNDxKxD7d2eA6YEyw4H2H7iNnd/2MwzCRDJWZ9FGXe','2022-07-14 16:40:29'),(2,'Vardas1','vardas1@gmail.com','$2b$10$7UAQ6fnh9VoJs25OmNgFq.3eDlRlcb7rc76h7Rf0NuBVF/RwH12Uu','2022-07-14 16:42:47'),(3,'Vartotojas','Vartotojas@gmail.lt','$2b$10$YsB7f4tpZj789XVepBuJ0OL7zfsA8U7pDCYWJkmKeBjOIqAwSifyG','2022-07-14 17:20:02'),(4,'good name','good@gmail.com','$2b$10$co0BjjQjNwNQIz9ABBuj7uWz8c5/s9PY50nTlaZe/BCMkMc7LzwpO','2022-07-16 13:44:01'),(5,'good','good@gmail.lt','$2b$10$rEqIA8gq7sJQT7g/2TmujuI6S1Kkjhi33z0GyS5fOVvKfFBLFgOI6','2022-07-16 13:47:27'),(6,'good1','good@gmail.lt','$2b$10$7slkKyy6qMRdwMrT5KU9i.LiiTgPTWEvtGXpY17dTia6yIJdxM96m','2022-07-17 11:12:37'),(7,'Name','name@gmail.com','$2b$10$QPIWWBy8OBdDivEn1gh2g.y97ax9N8ZF09iySM5RhPFT2XdGFqzqO','2022-07-17 11:53:49'),(8,'proble','proble@gmail.com','$2b$10$xqQDk7N8ljf9z2So6z3xzOvCmOdqs41KGllpAJPalaz0/PHv7mK5i','2022-07-17 11:56:18');
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

-- Dump completed on 2022-07-17 15:13:37
