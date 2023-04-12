CREATE DATABASE  IF NOT EXISTS `nuribom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nuribom`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: k7b303.p.ssafy.io    Database: nuribom
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
-- Table structure for table `act_suggest`
--

DROP TABLE IF EXISTS `act_suggest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `act_suggest` (
  `act_suggest_id` bigint NOT NULL AUTO_INCREMENT,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_hour` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_minutes` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`act_suggest_id`),
  KEY `FKltklfm4g38wsodven5inbckxh` (`user_id`),
  CONSTRAINT `FKltklfm4g38wsodven5inbckxh` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_suggest`
--

LOCK TABLES `act_suggest` WRITE;
/*!40000 ALTER TABLE `act_suggest` DISABLE KEYS */;
INSERT INTO `act_suggest` VALUES (1,'SONG','00','00',2),(2,'STRETCHING','03','00',2),(4,'STRETCHING','01','00',6),(5,'SONG','22','30',6),(6,'STRETCHING','18','00',6),(7,'SONG','05','03',7),(8,'STRETCHING','02','00',7);
/*!40000 ALTER TABLE `act_suggest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `care_list`
--

DROP TABLE IF EXISTS `care_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `care_list` (
  `care_list_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `worker_id` bigint DEFAULT NULL,
  PRIMARY KEY (`care_list_id`),
  KEY `FK13ycmq9y4lrn1uck030u66059` (`user_id`),
  KEY `FKa4aern23ovgirqdvrbt19mfph` (`worker_id`),
  CONSTRAINT `FK13ycmq9y4lrn1uck030u66059` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKa4aern23ovgirqdvrbt19mfph` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`worker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `care_list`
--

LOCK TABLES `care_list` WRITE;
/*!40000 ALTER TABLE `care_list` DISABLE KEYS */;
INSERT INTO `care_list` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(6,6,2),(7,7,2);
/*!40000 ALTER TABLE `care_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emotion_history`
--

DROP TABLE IF EXISTS `emotion_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emotion_history` (
  `emotion_hisroty_id` bigint NOT NULL AUTO_INCREMENT,
  `emotion_history_date` datetime(6) DEFAULT NULL,
  `bad` int NOT NULL,
  `emotion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `good` int NOT NULL,
  `normal` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`emotion_hisroty_id`),
  KEY `FKncn6yegkm1quc0hlk9g2r0nij` (`user_id`),
  CONSTRAINT `FKncn6yegkm1quc0hlk9g2r0nij` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emotion_history`
--

LOCK TABLES `emotion_history` WRITE;
/*!40000 ALTER TABLE `emotion_history` DISABLE KEYS */;
INSERT INTO `emotion_history` VALUES (1,'2022-11-16 16:27:32.810000',8,'NORMAL',10,35,2),(2,'2022-11-17 09:10:45.539000',0,'NORMAL',0,0,2);
/*!40000 ALTER TABLE `emotion_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `medication_id` bigint NOT NULL AUTO_INCREMENT,
  `fri` bit(1) NOT NULL,
  `medication_hour` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medication_minutes` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medicine` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mon` bit(1) NOT NULL,
  `sat` bit(1) NOT NULL,
  `sun` bit(1) NOT NULL,
  `thu` bit(1) NOT NULL,
  `tue` bit(1) NOT NULL,
  `wed` bit(1) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`medication_id`),
  KEY `FK84e35egwwmf59ufn9q1r95ycd` (`user_id`),
  CONSTRAINT `FK84e35egwwmf59ufn9q1r95ycd` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (2,_binary '\0','00','00','테스트약2',_binary '',_binary '\0',_binary '',_binary '\0',_binary '',_binary '\0',2),(3,_binary '\0','03','00','감기약',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',3),(4,_binary '\0','15','02','감기약',_binary '',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',3),(5,_binary '\0','00','00','2sdf',_binary '',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',2),(8,_binary '\0','00','00','테스트약 4',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '',2),(9,_binary '\0','15','20','테스트약',_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',6),(10,_binary '\0','04','00','테스트약2',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '',6),(12,_binary '\0','05','00','알파민',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',_binary '',7);
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `contents` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `worker_id` bigint DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`),
  KEY `FKp31lmis1l2dau6f5l9kpfsdf2` (`worker_id`),
  CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKp31lmis1l2dau6f5l9kpfsdf2` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`worker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (2,'2022-11-21 00:56:55.267000','MC동동님께서 오늘 처음 활동하셨습니다.','NOT_READ',4,4);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `last_visit` datetime(6) DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serial_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_birth_date` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_birth_month` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_birth_year` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_profile_img` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'ROLE_USER','nuri05050509','유성구 상대남로 26','13','07','1949','전병찬','1'),(2,NULL,'ROLE_USER','nuri12341234','유성구 학하서로 121','18','03','1955','김복자','1'),(3,NULL,'ROLE_USER','nuri050505009','유성구 상대남로 26','17','06','1952','어르신','1'),(4,NULL,'ROLE_USER','a1s2d3f4g5','대전광역시 유성구','11','10','1996','MC동동','string123'),(6,'2022-11-20 09:00:00.000000','ROLE_USER','nuri23452345','대전광역시 유성구 덕명동 삼성화재 유성연수원','01','07','1961','김순신','5'),(7,NULL,'ROLE_USER','nuri123412341234','유성구 학하서로 121','01','05','1960','홍길동','8');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `visit_id` bigint NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_visited` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visit_date` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `worker_id` bigint DEFAULT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `FKtly3l2y9j92oskaoh7bmx0drt` (`user_id`),
  KEY `FKgicdvtdesd9iucsffh2gg4i7e` (`worker_id`),
  CONSTRAINT `FKgicdvtdesd9iucsffh2gg4i7e` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`worker_id`),
  CONSTRAINT `FKtly3l2y9j92oskaoh7bmx0drt` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,'ㅁㄴㄹㄻㄴㄴㅁ','UNVISITED','2022-11-18 09:00:00.000000',2,2),(2,'김순신 어르신 11/22 오후 12시 방문예정','UNVISITED','2022-11-22 21:00:00.000000',6,2),(3,'김복자 어르신 11/20 오후 3시 방문예정','UNVISITED','2022-11-21 00:00:00.000000',2,2),(5,'','UNVISITED','2022-11-21 23:00:00.000000',7,2),(6,'','UNVISITED','2022-11-22 01:00:00.000000',6,2),(7,'ㅁㄴㅇㄻㄴ','UNVISITED','2022-11-21 23:00:00.000000',2,2);
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `worker_id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `worker_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `worker_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `worker_profile_img` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `worker_web_id` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `worker_web_pwd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`worker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (1,'ROLE_USER','김현주','01049519122','1','test0305','$2a$10$lXCj.xEoXw/Y5fftK44u/.WpW.fLnXRPMNQRdJrRfNEkP2RWy331q'),(2,'ROLE_USER','김선후','01097019300','3','test0127','$2a$10$qkHeauzAWDR5sioE79Qy9.PfSem91weHLFs5qKJcRjMrZ.dy5R8U.'),(3,'ROLE_USER','테스트','01049519122','1','worker221114','$2a$10$SGoppWGvrTm6fRLP14kDzewlLXRYK1ozwezTKNIK3edrvqU5FWism'),(4,'ROLE_USER','세젤귀','01088406328','Park_Jung-hyun.jpg','jh123','$2a$10$vLMhGK4CFlt0P2va2AuFDe31A3OME/LUlZ1xCFymfIVS9yIQNZ.4O'),(5,'ROLE_USER','테스트삼','01088887777','1','test9876','$2a$10$ElWIH/oYo2BGWAnluwDuueV.MO24gbslgGd6Ef774giB4dlQgwtG6'),(6,'ROLE_USER','할리','01041324894','2','jws4894','$2a$10$llzbFC00kbf1NOqrQrelOuDHFhKeUmKhU2BPQeSVFA3toxW/K6EDy');
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  4:44:38
