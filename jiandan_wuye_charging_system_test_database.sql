-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: wuye
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charge`
--

DROP TABLE IF EXISTS `charge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `charge` (
  `charge_id` int(11) NOT NULL AUTO_INCREMENT,
  `house_id` varchar(20) NOT NULL,
  `charge` decimal(10,2) NOT NULL DEFAULT '0.00',
  `owner_id` int(11) DEFAULT NULL,
  `date` varchar(20) NOT NULL,
  `staff_id` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `number` decimal(10,2) NOT NULL DEFAULT '0.00',
  `charge_ym_start` varchar(20) NOT NULL,
  `charge_ym_end` varchar(20) NOT NULL,
  PRIMARY KEY (`charge_id`),
  KEY `charge_house_house_id_fk` (`house_id`),
  KEY `charge_house_owner_owner_id_fk` (`owner_id`),
  KEY `charge_user_staff_id_fk` (`staff_id`),
  KEY `charge_charge_id_index` (`charge_id`),
  CONSTRAINT `charge_house_house_id_fk` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `charge_house_owner_owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `house_owner` (`owner_id`),
  CONSTRAINT `charge_user_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `user` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charge`
--

LOCK TABLES `charge` WRITE;
/*!40000 ALTER TABLE `charge` DISABLE KEYS */;
INSERT INTO `charge` (`charge_id`, `house_id`, `charge`, `owner_id`, `date`, `staff_id`, `type`, `number`, `charge_ym_start`, `charge_ym_end`) VALUES (1,'A37',0.00,1,'2020-10-8','admin','物业费',0.00,'2020-1','2020-2'),(2,'B32',15.00,2,'2020-10-8','admin','电梯费',3.00,'2020-1','2020-2'),(3,'B32',2.80,2,'2020-10-8','admin','水费',4.00,'2020-1','2020-2'),(4,'B32',24.00,2,'2020-10-8','admin','电费',30.00,'2020-1','2020-2'),(5,'C32',0.11,NULL,'2020-10-8','10088','物业费',0.11,'2020-1','2020-3'),(6,'C32',0.04,NULL,'2020-10-8','10088','电费',0.05,'2020-1','2020-3'),(7,'A37',3.00,1,'2020-10-8','admin','物业费',3.00,'2020-1','2020-2'),(8,'A37',25.00,1,'2020-10-8','admin','电梯费',5.00,'2020-1','2020-2'),(9,'A37',4.90,1,'2020-10-8','admin','水费',7.00,'2020-1','2020-2'),(10,'A37',4.00,1,'2020-10-8','admin','电费',5.00,'2020-1','2020-2');
/*!40000 ALTER TABLE `charge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dept` (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` (`dept_id`, `name`, `phone`) VALUES (1,'收费部','88868876'),(2,'企划部','77789977');
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `house` (
  `house_id` varchar(20) NOT NULL,
  `area` decimal(10,2) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`house_id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `owner_id` FOREIGN KEY (`owner_id`) REFERENCES `house_owner` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` (`house_id`, `area`, `owner_id`) VALUES ('A37',120.00,1),('A38',100.00,1),('B32',124.00,2),('C32',150.00,NULL),('C33',150.00,3);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `house_owner`
--

DROP TABLE IF EXISTS `house_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `house_owner` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `employer` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house_owner`
--

LOCK TABLES `house_owner` WRITE;
/*!40000 ALTER TABLE `house_owner` DISABLE KEYS */;
INSERT INTO `house_owner` (`owner_id`, `name`, `employer`, `phone`) VALUES (1,'李二狗','个体','13712847389'),(2,'黄刚蛋','西大街淡水菜市场','13792937123'),(3,'余大黑','蓝天白云责任有限公司',NULL);
/*!40000 ALTER TABLE `house_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test1`
--

DROP TABLE IF EXISTS `test1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test1`
--

LOCK TABLES `test1` WRITE;
/*!40000 ALTER TABLE `test1` DISABLE KEYS */;
INSERT INTO `test1` (`id`, `name`) VALUES (1,'Jack');
/*!40000 ALTER TABLE `test1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `staff_id` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `birthday` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `position` varchar(20) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `user_dept_dept_id_fk` (`dept_id`),
  CONSTRAINT `user_dept_dept_id_fk` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`staff_id`, `pwd`, `name`, `birthday`, `gender`, `phone`, `address`, `position`, `dept_id`) VALUES ('10086','jiandan10086','王五','1999-3','女','13812374823','南纬一路32号','收费员工',1),('10087','jiandan10087','李四','1994-3','男','13812374824','南纬一路33号','收费员工',NULL),('10088','jiandan10088','吉安娜','2020-2','女','','','收费员工',NULL),('10089','jiandan10089','无名氏','2020-1','女','','火星','收费员工',1),('admin','jiandanadmin','张全蛋','1978-7','男','13812374827','北纬一路32号','部门经理',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-08 16:50:11
