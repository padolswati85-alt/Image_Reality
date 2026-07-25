-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: image
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_activities_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hotel_id` (`hotel_id`),
  KEY `ix_bookings_id` (`id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int DEFAULT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Forts'),(4,'Hills'),(5,'Historical Places'),(6,'Lakes'),(12,'Misal spot'),(8,'Museums'),(10,'Sanctuaries'),(9,'Scenic Points'),(1,'Temples'),(11,'Theme Park'),(7,'Vineyards'),(3,'Waterfalls'),(13,'waterpark');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_categories`
--

DROP TABLE IF EXISTS `destination_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_categories` (
  `id` int DEFAULT NULL,
  `destination_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_categories`
--

LOCK TABLES `destination_categories` WRITE;
/*!40000 ALTER TABLE `destination_categories` DISABLE KEYS */;
INSERT INTO `destination_categories` VALUES (1,1,1),(2,2,1),(3,2,5),(4,3,7),(5,3,9),(6,4,5),(7,4,9),(8,4,1),(9,5,5),(10,5,1),(11,6,9),(12,6,6),(13,6,5),(14,7,1),(15,7,9),(16,7,5),(17,8,1),(18,8,9),(19,8,5),(20,9,5),(21,9,1),(22,10,4),(23,10,5),(24,10,9),(25,11,9),(26,11,3),(27,11,1),(28,12,9),(29,12,1),(30,13,1),(31,13,9),(32,13,4),(33,13,5),(34,14,5),(35,14,9),(36,14,1),(37,14,4),(38,15,1),(39,16,4),(40,16,9),(41,17,11),(42,18,9),(43,19,9),(44,19,5),(45,19,1),(46,20,9),(47,21,6),(48,21,9),(49,22,7),(50,22,9),(51,23,1),(52,23,5),(53,23,9),(54,23,6),(55,24,3),(56,24,6),(57,24,9),(58,25,6),(59,25,9),(60,25,3),(61,26,3),(62,26,9),(63,27,9),(64,27,2),(65,28,9),(66,29,2),(67,29,9),(68,30,1),(69,30,9),(70,30,5),(71,31,9),(72,31,4),(73,32,5),(74,32,1),(75,33,2),(76,33,9),(77,33,4),(78,34,1),(79,34,9),(80,35,3),(81,35,9),(82,36,9),(83,36,3),(84,37,2),(85,37,9),(86,37,5),(87,38,1),(88,39,1),(89,40,1),(90,41,2),(91,41,9),(92,42,9),(93,42,6),(94,43,4),(95,43,1),(96,43,9),(97,44,4),(98,44,2),(99,44,9),(100,45,9),(101,45,4),(102,46,9),(103,46,4),(104,47,1),(105,48,3),(106,48,9),(107,49,1),(108,50,9),(109,50,2),(110,50,4),(111,51,9),(112,51,4),(113,51,2),(114,52,2),(115,52,9),(116,52,4),(117,53,9),(118,53,4),(119,53,2),(120,54,5),(124,56,9),(125,56,4),(126,56,2),(127,57,1),(128,57,9),(129,57,4),(130,57,2),(131,58,4),(132,58,9),(133,59,9),(134,59,8),(135,59,3),(136,60,9),(137,60,8),(138,60,3),(139,60,4),(140,61,9),(141,61,4),(142,61,2),(143,62,9),(144,62,4),(145,63,2),(146,63,4),(147,63,9),(148,64,2),(149,64,4),(150,64,9),(151,65,5),(152,65,9),(153,66,9),(154,66,1),(155,67,8),(156,67,9),(157,67,5),(158,68,9),(159,68,5),(160,69,1),(161,69,9),(162,70,9),(163,70,1),(164,71,3),(165,71,9),(166,72,1),(167,72,9),(168,73,9),(169,73,5),(170,73,6),(171,74,9),(172,74,5),(173,74,2),(174,75,9),(175,75,1),(176,76,9),(177,76,3),(178,77,5),(179,77,9),(180,78,3),(181,78,9),(182,78,6),(183,79,3),(184,79,9),(185,79,6),(186,80,1),(187,80,9),(188,81,9),(189,81,1),(190,82,5),(191,82,9),(192,83,5),(193,83,9),(194,84,7),(195,84,8),(196,84,5),(197,84,9),(198,85,5),(199,85,9),(200,85,6),(201,85,4),(202,86,3),(203,86,9),(204,87,4),(205,87,9),(206,87,5),(207,88,12),(208,88,10),(209,89,12),(210,90,12),(211,91,12),(212,92,10),(213,92,12),(214,93,12),(215,94,12),(216,95,12),(217,95,10),(218,96,12),(219,97,11),(220,98,11),(221,99,11),(222,100,11),(223,101,11),(224,102,11),(225,103,11),(226,104,11),(227,105,13),(228,106,13),(229,107,11),(230,108,11),(231,109,11);
/*!40000 ALTER TABLE `destination_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` int DEFAULT NULL,
  `name` text,
  `description` text,
  `image_url` text,
  `taluka_id` int DEFAULT NULL,
  `area` text,
  `visit_time` text,
  `time_required_hours` int DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `crowd_level` varchar(20) DEFAULT 'Low'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'Swami Narayn Temple','A peaceful and beautifully designed temple in Tapovan, Nashik, the Swaminarayan Mandir offers a serene atmosphere, divine idols, and a calm space for prayer and meditation.','http://127.0.0.1:8000/static/images/swaminarayanmandir.png',1,'Tapovan Zone','Morning (4 hrs)',2,20.00353761,73.80571574,'Low'),(2,'Sundar Narayan Temple','A serene and historic Vishnu temple in Nashik, known for its peaceful atmosphere and classic stone architecture.','http://127.0.0.1:8000/static/images/SundarNarayanmandir.png',1,'Tapovan Zone','Morning (4 hrs)',2,20.00815619,73.790061,'Low'),(3,'Sula Vineyards','A popular and scenic vineyard in Nashik, Sula offers beautiful landscapes, wine tours, tastings, and a relaxing getaway amidst lush grape fields.','http://127.0.0.1:8000/static/images/sulawine.png',1,'Wine Zone','Midday (4 hrs)',2,20.0053317,73.6884549,'Medium'),(4,'Mukti Dham','A beautiful marble temple complex in Nashik, Mukti Dham is known for its serene atmosphere, detailed architecture, and replicas of major Hindu pilgrimage sites','http://127.0.0.1:8000/static/images/muktidham.jpg',1,'Central Nashik','Midday (4 hrs)',2,19.95184633,73.83704009,'High'),(5,'Kapaleshwar Temple','An ancient Shiva temple in Nashik, Kapaleshwar Mandir is known for its historic significance, peaceful atmosphere, and sacred surroundings near the Godavari River.','http://127.0.0.1:8000/static/images/kapaleshwar.jpg',1,'Panchavati Zone','Morning (4 hrs)',1,20.00843913,73.79319268,'Low'),(6,'Ramkund','A sacred and historic bathing ghat on the Godavari River, Ramkund is a major spiritual landmark of Nashik known for its cultural significance and peaceful riverside setting.','http://127.0.0.1:8000/static/images/ramkund.jpg',1,'Godavari River Belt','Morning (4 hrs)',1,20.00868971,73.79233787,'Low'),(7,'Sita Gufa','A sacred cave in Panchavati linked to the Ramayana, Sita Gufa is known for its ancient significance, temple idols, and a unique spiritual atmosphere that attracts visitors throughout the year.','http://127.0.0.1:8000/static/images/sitagufa.png',1,'Panchavati Zone','Morning (4 hrs)',1,20.00749756,73.7961365,'Low'),(8,'Kalaram Mandir','A historic and revered temple in Panchavati, Kalaram Mandir is known for its striking black-stone idol of Lord Rama, ancient architecture, and deep cultural significance in Nashik.','http://127.0.0.1:8000/static/images/kalarammandir.jpg',1,'Panchavati Zone','Morning (4 hrs)',1,20.00692131,73.7955153,'Low'),(9,'Bhagur Renuka Mata Mandir','A revered temple dedicated to Goddess Renuka in Bhagur, known for its peaceful surroundings, cultural importance, and spiritual atmosphere.','http://127.0.0.1:8000/static/images/bhagurdevi.png',1,'Bhagur Heritage Zone',NULL,2,19.88843326,73.8324773,'Low'),(10,'Khaderav Tekdi, Bhagur','A peaceful hill in Bhagur offering scenic views, natural surroundings, and a calm spot for walking and relaxation.','http://127.0.0.1:8000/static/images/khandobatekadi.png',1,'Hill & Nature Zone',NULL,2,19.89730706,73.82269235,'Low'),(11,'Someshwar','A popular riverside destination in Nashik known for the Someshwar Mahadev Temple, scenic greenery, and the nearby Someshwar Waterfall, making it a peaceful and beautiful spot for visitors.','http://127.0.0.1:8000/static/images/someshwar.jpg',1,'Riverside Leisure Zone','Afternoon (4 hrs)',2,20.02311366,73.7278298,'Low'),(12,'Navsha Ganpati','A popular Ganpati temple in Nashik known for its peaceful riverside setting, spiritual atmosphere, and constant flow of devotees seeking blessings.','http://127.0.0.1:8000/static/images/navshaganpati.webp',1,'Godavari River Belt','Morning (4 hrs)',1,20.01653808,73.74330418,'Low'),(13,'Dari Mata Mandir','A hilltop temple dedicated to Goddess Dari Mata, known for its peaceful spiritual atmosphere, scenic views, and natural surroundings.','http://127.0.0.1:8000/static/images/darimatori.png',1,'Hill & Nature Zone','Afternoon (4 hrs)',2,20.08847926,73.75080156,'Low'),(14,'Pandavleni Caves','An ancient group of Buddhist caves located on a hilltop in Nashik, Pandavleni is known for its historic carvings, trekking trail, and scenic views of the city.','http://127.0.0.1:8000/static/images/pandavleni.jpg',1,'Hill & Nature Zone','Afternoon (4 hrs)',2,19.9383801,73.74926266,'Low'),(15,'Chandicha Ganpati, R.K. Nashik','A popular Ganpati temple in R.K. Nashik, known for its peaceful atmosphere, devotional significance, and strong local faith.','http://127.0.0.1:8000/static/images/chandichaganpati.webp',1,'Urban Leisure Zone','Morning (4 hrs)',2,20.00658676,73.78972913,'Low'),(16,'Chambar Lane','A natural hill area in Nashik offering peaceful surroundings, scenic views, and a quiet space for walks and relaxation.','http://127.0.0.1:8000/static/images/chambarleni.png',1,'Hill & Nature Zone','Afternoon (4 hrs)',2,20.06619987,73.79335968,'Low'),(17,'City Center Mall, Nashik','A popular shopping and entertainment destination in Nashik offering a wide range of stores, food outlets, and leisure activities for visitors.','http://127.0.0.1:8000/static/images/CCM.png',1,'Urban Leisure Zone','Midday (4 hrs)',2,19.99061505,73.76215521,'Low'),(18,'Godha Park','A peaceful riverside park in Nashik known for its greenery, walking paths, and relaxing natural surroundings, making it a favorite spot for families and visitors.','http://127.0.0.1:8000/static/images/godapark.jpg',1,'Godavari River Belt','Midday (4 hrs)',2,20.0160376,73.77025418,'Low'),(19,'Gore Ram Mandir','A traditional and culturally significant temple known for its peaceful atmosphere and devotional environment.','http://127.0.0.1:8000/static/images/gorerammandir.png',1,'Other Attractions','Morning (4 hrs)',2,20.00639163,73.79201166,'Low'),(20,'Cabet Hill Canberra','A scenic hill area offering a calm natural environment, ideal for short treks and enjoying elevated views.','http://127.0.0.1:8000/static/images/cabethill.webp',1,'Hill & Nature Zone','Afternoon (4 hrs)',2,19.88558267,73.82311195,'Low'),(21,'BackWaters','A serene backwater location famous for its peaceful ambiance, calm water views, and relaxing surroundings.','http://127.0.0.1:8000/static/images/Backwaters.webp',1,'Hill & Nature Zone','Afternoon (4 hrs)',2,20.02301195,73.67259748,'Low'),(22,'Somawine Village','A popular wine-themed destination known for its local vineyards, wine tasting experiences, and scenic rural atmosphere.','http://127.0.0.1:8000/static/images/somawinevillage.jpg',1,'Wine Zone','Afternoon (4 hrs)',2,20.00878109,73.66165773,'Low'),(23,'Anna Ganpati','A well-known Ganpati temple visited for its spiritual ambiance, cultural significance, and local devotion.','http://127.0.0.1:8000/static/images/annaganpati.png',1,'Urban Leisure Zone','Morning (4 hrs)',2,19.94149547,73.8261824,'Low'),(24,'Bhatsa River Valley','A scenic valley viewpoint in Igatpuri offering breathtaking views of the Bhatsa River gorge, lush landscapes, and misty mountains.','http://127.0.0.1:8000/static/images/bhatsariver.png',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.53901987,73.41571019,'Low'),(25,'Camel Valley (Kamalsagar Point)','A popular viewpoint in Igatpuri where deep valleys, seasonal waterfalls, and mist-covered hills create a stunning natural panorama.',NULL,2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.69652801,73.52619109,'Low'),(26,'Vihigaon Waterfall (Ashoka Waterfall)','A beautiful natural waterfall near Igatpuri, known for its lush forest surroundings and as a filming location for the movie Ashoka.','http://127.0.0.1:8000/static/images/ashoka.png',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.71267791,73.4747037,'Low'),(27,'Tringalwadi Fort','An ancient hill fort in Igatpuri known for trekking, scenic views, and historic stone structures overlooking the Western Ghats.','http://127.0.0.1:8000/static/images/tringalwadifort.webp',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.74081475,73.52876265,'Low'),(28,'Myanmar Gate (Vipassana Centre)','A grand entrance to the Igatpuri Vipassana Centre, featuring beautiful architecture and a peaceful meditation-friendly environment.','http://127.0.0.1:8000/static/images/myanmar.webp',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.69877069,73.55765306,'Low'),(29,'Pata Fort or Vishramgad','A lesser-known historic fort in the Igatpuri region, popular among trekkers for its natural beauty, forest trails, and hilltop views.','http://127.0.0.1:8000/static/images/vishramgadpattafort.avif',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.70276899,73.84313658,'Low'),(30,'Trimbakeshwar Mandir','One of the twelve Jyotirlingas, the Trimbakeshwar Temple is an ancient and sacred Shiva temple known for its spiritual significance and traditional stone architecture.','http://127.0.0.1:8000/static/images/trimbakeshwarmandir.jpg',3,'Trimbak Region','Morning (4 hrs)',4,19.93232303,73.53118883,'Low'),(31,'Bhramhagiri Mountain','A sacred mountain in Trimbakeshwar known for trekking trails, scenic views, and being the origin point of the Godavari River.','http://127.0.0.1:8000/static/images/brahmagirifort.jpg',3,'Trimbak Region','Morning (4 hrs)',4,19.91530239,73.52414458,'Low'),(32,'Kusavarta Kunda','A sacred water tank in Trimbakeshwar considered the symbolic origin of the Godavari River, known for rituals and religious importance.','http://127.0.0.1:8000/static/images/Kushwaratkund.jpg',3,'Trimbak Region','Morning (4 hrs)',4,19.93277949,73.5276471,'Low'),(33,'Anjaneri Fort','A historic hill fort believed to be the birthplace of Lord Hanuman, popular for trekking and stunning panoramic views.','http://127.0.0.1:8000/static/images/anjaneri.png',3,'Trimbak Region','Morning (4 hrs)',4,19.92030201,73.56980681,'Low'),(34,'Mini Kedarnath','A peaceful Shiva temple near Trimbak, known for its serene atmosphere and hillside surroundings.','http://127.0.0.1:8000/static/images/minikedarnath.png',3,'Trimbak Region','Morning (4 hrs)',4,19.9255469,73.60390303,'Low'),(35,'Dugarwadi Waterfall','A beautiful hidden waterfall in Trimbakeshwar surrounded by greenery and forest trails, ideal during monsoon.','http://127.0.0.1:8000/static/images/dugarvadi.png',3,'Trimbak Region','Morning (4 hrs)',4,19.94089822,73.46840826,'Low'),(36,'Pahine Waterfall','A calm natural waterfall near Trimbak known for its serene environment and lush monsoon views.','http://127.0.0.1:8000/static/images/pahinewaterfall.webp',3,'Trimbak Region','Morning (4 hrs)',4,19.91068804,73.56433943,'Low'),(37,'Ramshej Fort','A historic fort near Dindori known for its trekking route, ancient structures, and stunning views of the surrounding hills.','http://127.0.0.1:8000/static/images/ramshejfort.jpg',4,'Dindori Region','Morning (4 hrs)',4,20.11358328,73.76729376,'Low'),(38,'Shree Swami Samarth Mandir','A peaceful temple dedicated to Shree Swami Samarth, known for its devotional atmosphere and spiritual significance in Dindori.','http://127.0.0.1:8000/static/images/swamisamarthkendradindori.jpg',4,'Dindori Region','Morning (4 hrs)',4,18.6638779,73.81785816,'Low'),(39,'Vindhya Nivasini Mandir','A beautiful temple in Dindori dedicated to Goddess Vindhya Nivasini, known for its peaceful surroundings and spiritual ambiance.','http://127.0.0.1:8000/static/images/vindhyavasinidevimandirdindori.png',4,'Dindori Region','Morning (4 hrs)',4,20.19805888,73.83180148,'Low'),(40,'Ashtabahu Gopal Krishna Temple','A unique and sacred temple dedicated to Lord Krishna in his eight-armed form, offering a divine and serene environment.','http://127.0.0.1:8000/static/images/AshtabahuGopalKrushnaTemple.png',4,'Dindori Region','Morning (4 hrs)',4,20.15224387,73.89038115,'Low'),(41,'Dehergad Fort','A less-explored fort in the Dindori region, popular for trekking, hilltop views, and natural surroundings.','http://127.0.0.1:8000/static/images/dhergad.png',4,'Dindori Region','Morning (4 hrs)',4,20.1274689,73.74517913,'Low'),(42,'Palkhed Dam','A large dam near Dindori known for its peaceful waterside views and a popular picnic spot during monsoon and winter.','http://127.0.0.1:8000/static/images/palkheddam.jpg',4,'Dindori Region','Morning (4 hrs)',4,20.19128309,73.88346445,'Low'),(43,'Saptashrungi','A major pilgrimage site dedicated to Goddess Saptashrungi Devi, located atop a scenic hill range and known for its sacred atmosphere and panoramic views.','http://127.0.0.1:8000/static/images/saptashrungitemple.jpg',6,'Baglan Hills','Morning (4 hrs)',2,20.39252263,73.90681312,'Low'),(44,'Dhodap Fort','One of the highest and most iconic forts in the Nashik region, Dhodap Fort is known for trekking, historical significance, and stunning views from its massive cliffs.','http://127.0.0.1:8000/static/images/dhodapfort.jpg',6,'Baglan Hills','Morning (4 hrs)',2,20.38499675,74.02988205,'Low'),(45,'Sakhalchond','A serene hill and viewpoint in the Surgana region, known for forest trails, natural beauty, and peaceful surroundings ideal for trekking and nature lovers.','http://127.0.0.1:8000/static/images/sakhalchondwaterfall.avif',7,'Surgana Hills','Morning (4 hrs)',2,20.6519751,73.528028,'Low'),(46,'Bhiutas','A scenic natural spot in Surgana surrounded by hills and greenery, popular for its calm atmosphere and picturesque viewpoints.','http://127.0.0.1:8000/static/images/bhivtas.jpg',7,'Surgana Hills','Morning (4 hrs)',2,20.41804286,73.45769474,'Low'),(47,'Renuka Mata Mandir','A revered temple in Chandwad dedicated to Renuka Mata, known for its peaceful surroundings and spiritual atmosphere.','http://127.0.0.1:8000/static/images/chandwadrenukamatamandir.webp',8,'Chandwad Region','Morning (4 hrs)',2,20.34559022,74.25020554,'Low'),(48,'Chandreshwar Waterfall','A beautiful seasonal waterfall in the Chandwad region, surrounded by hills and lush greenery, ideal for nature lovers.','http://127.0.0.1:8000/static/images/chandreshwarwaterfall.avif',8,'Chandwad Region','Morning (4 hrs)',2,20.3405776,74.25258722,'Low'),(49,'Ichapurti Ganpati Mandir','A famous Ganpati temple in Chandwad known for its divine atmosphere and the belief that wishes made here are fulfilled.','http://127.0.0.1:8000/static/images/ichapurtiganpati.jpg',8,'Chandwad Region','Morning (4 hrs)',2,20.35180797,74.25046581,'Low'),(50,'Indare Fort','A historic fort in the Chandwad region offering trekking routes, panoramic hilltop views, and ancient fortifications.','http://127.0.0.1:8000/static/images/indraifort.png',8,'Chandwad Region','Morning (4 hrs)',2,20.35979183,74.20792882,'Low'),(51,'Kanchana Fort','A hill fort near Deola known for its trekking trail, scenic mountain ranges, and remnants of old stone structures.','http://127.0.0.1:8000/static/images/kanchafort.png',9,'Kalwanâ€“Deola Region','Morning (4 hrs)',2,20.37573883,74.11603334,'Low'),(52,'Premgire Fort','A historically significant fort in the Deola region featuring rocky pathways, ancient walls, and serene natural surroundings.','http://127.0.0.1:8000/static/images/premgirifortkalwan.jpg',9,'Kalwanâ€“Deola Region','Morning (4 hrs)',2,19.46493159,74.0929955,'Low'),(53,'Mulher Fort','One of the major forts in the Nashik district, famous for its tough trek, strategic hilltop location, and ruins of old fortifications.','http://127.0.0.1:8000/static/images/mulherfortsatana.webp',9,'Kalwanâ€“Deola Region','Morning (4 hrs)',2,20.75291397,74.06323178,'Low'),(54,'Rangamahal','A historically significant structure in Chandwad known for its cultural heritage and architectural importance.','http://127.0.0.1:8000/static/images/holkarwadarangmahal.webp',8,'Chandwad Region','Morning (4 hrs)',2,20.33029483,74.24563263,'Low'),(56,'Galna Fort','An ancient hill fort in the Baglan region known for its strong historical significance, trekking routes, and scenic mountain surroundings.','http://127.0.0.1:8000/static/images/galnafort.webp',10,'Baglan Fort Belt','Morning (4 hrs)',2,20.77301676,74.53387991,'Low'),(57,'Mangitungi Fort','A prominent twin-peaked landmark famous for its spiritual importance, Jain pilgrimage site, and the towering 108-feet Jain statue.','http://127.0.0.1:8000/static/images/mangitungi.webp',10,'Baglan Fort Belt','Morning (4 hrs)',2,20.83639074,74.09442516,'Low'),(58,'Chandanpuri Ghat','A scenic mountain pass near Malegaon known for its beautiful curves along NH-3, lush green surroundings, and foggy monsoon views.','http://127.0.0.1:8000/static/images/chandanpuri.png',11,'Malegaon Region','Morning (4 hrs)',2,19.43574446,74.20151261,'Low'),(59,'Shrimant Raje Gaikwad Wada','A historic heritage wada showcasing old Maratha architecture and cultural significance in the Malegaon region.','http://127.0.0.1:8000/static/images/shrimantrajegaikwadwada.avif',11,'Malegaon Region','Morning (4 hrs)',2,20.48761439,74.50478933,'Low'),(60,'Bhuikot Quila','A prominent fort in Malegaon featuring massive stone walls, historical structures, and cultural heritage connected to various dynasties.','http://127.0.0.1:8000/static/images/BhuikotQuailla.png',11,'Malegaon Region','Morning (4 hrs)',2,20.54583924,74.53023533,'Low'),(61,'Manik Punja Fort','An ancient hill fort near Nandgaon known for its trekking trail, historic remnants, and panoramic views of the surrounding landscape.','http://127.0.0.1:8000/static/images/manikpunjfort.jpg',12,'Nandgaon Region','Morning (4 hrs)',2,20.23816688,74.72305811,'Low'),(62,'Devdari Waterfall','A scenic seasonal waterfall near Yeola known for its natural beauty, rocky surroundings, and peaceful environment, making it a popular spot for nature lovers.','http://127.0.0.1:8000/static/images/devdariwaterfall.webp',13,'Yeola Region','Morning (4 hrs)',2,24.95000796,83.17259251,'Low'),(63,'Katra Fort','A historic fort in the Yeola region offering trekking opportunities, stone structures, and elevated views of the surrounding terrain.','http://127.0.0.1:8000/static/images/katrafort.png',13,'Yeola Region','Morning (4 hrs)',2,20.19837751,74.39099195,'Low'),(64,'Anaki Fort','An ancient hill fort near Yeola featuring rugged trails, old fortification remains, and panoramic views ideal for trekking enthusiasts.','http://127.0.0.1:8000/static/images/ankai.png',13,'Yeola Region','Morning (4 hrs)',2,20.18816935,74.44316978,'Low'),(65,'Basvant Honey Bee Park','An educational and nature-centric honey bee park in Niphad where visitors can learn about beekeeping, honey production, and enjoy a peaceful natural environment.','http://127.0.0.1:8000/static/images/basvanthoneybee.png',14,'Niphad Region','Morning (4 hrs)',2,20.19382974,73.98386481,'Low'),(66,'Khandoba Temple','A revered spiritual temple dedicated to Lord Khandoba, known for its peaceful atmosphere and devotion-rich surroundings in Niphad.','http://127.0.0.1:8000/static/images/khandobamandirozar.webp',14,'Niphad Region','Morning (4 hrs)',2,20.09106727,73.92292043,'Low'),(67,'Vinchur Wine Park','A well-known wine production and grape-processing hub featuring vineyards, wine-related industries, and scenic surroundings in Niphad.','http://127.0.0.1:8000/static/images/VinchurWinePark.webp',14,'Wine Zone','Morning (4 hrs)',2,20.08378324,74.1959204,'Low'),(68,'Nandur Madhmeshwar Bird Sanctuary','A famous bird sanctuary known for its rich biodiversity, wetlands, migratory birds, and peaceful natural landscapes, often called the Bharatpur of Maharashtra.','http://127.0.0.1:8000/static/images/nandurmadhmeshwarabhayaranya.png',14,'Niphad Region','Morning (4 hrs)',2,20.00793138,74.10382258,'Low'),(69,'Janashanti Dham','A serene spiritual site offering a calm atmosphere, devotional space, and a peaceful environment for meditation and prayer in Niphad.','http://127.0.0.1:8000/static/images/janshantidham.webp',14,'Niphad Region','Morning (4 hrs)',2,20.0844998,73.90482495,'Low'),(70,'Gondeshwar Temple (Mahadev Mandir)','An ancient Hemadpanti-style Shiva temple in Sinnar known for its intricate stone carvings, historic architecture, and peaceful spiritual ambiance.','http://127.0.0.1:8000/static/images/gondeshwar.png',15,'Sinnar Region','Morning (4 hrs)',2,19.85151773,74.00199024,'Low'),(71,'Gargoti Mineral Museum','A renowned museum displaying rare minerals, crystals, and geological formations, offering an educational and fascinating experience for visitors.','http://127.0.0.1:8000/static/images/gargoti.png',15,'Sinnar Region','Morning (4 hrs)',2,19.87216924,73.97213041,'Low'),(72,'Sri Dattatreya Mandir','A peaceful and devotional temple dedicated to Lord Dattatreya, offering a calm spiritual atmosphere in Sinnar.','http://127.0.0.1:8000/static/images/shreedattatrayesinnar.avif',15,'Sinnar Region','Morning (4 hrs)',2,19.84864771,73.9948459,'Low'),(73,'Malegaon Sugar Factory Lake & Garden','A scenic lake and garden area near the sugar factory in Sinnar, known for its greenery, peaceful environment, and relaxing outdoor spaces.','http://127.0.0.1:8000/static/images/MalegaonSugarFactoryLake.avif',15,'Sinnar Region','Morning (4 hrs)',2,18.11150705,74.51158813,'Low'),(74,'Kavnai Fort','A popular trekking fort near Sinnar offering scenic trails, panoramic valley views, and remnants of historic structures.','http://127.0.0.1:8000/static/images/kavnaifort.png',15,'Sinnar Region','Morning (4 hrs)',2,19.77354894,73.61935796,'Low'),(75,'Ayushwarya Mandir','A peaceful and spiritually uplifting temple in Sinnar offering a calming environment for prayer and meditation.','http://127.0.0.1:8000/static/images/aishwarya.png',15,'Sinnar Region','Morning (4 hrs)',2,19.84915896,73.99131324,'Low'),(76,'Artillery Museum','A major defense museum in Nashik showcasing artillery equipment, military history, and exhibits related to the Indian Army.','http://127.0.0.1:8000/static/images/artillerymuseum.jpg',1,'Central Nashik','Midday (4 hrs)',2,19.94400335,73.80891438,'Low'),(77,'Gangapur Dam','A scenic dam in Nashik offering peaceful surroundings, water views, and a popular spot for nature lovers and evening visits.','http://127.0.0.1:8000/static/images/GangapurDam.jpeg',1,'Central Nashik','Midday (4 hrs)',2,20.04895698,73.68023872,'Low'),(78,'Dadasaheb Phalke Memorial','A cultural and film-themed memorial dedicated to Dadasaheb Phalke, featuring exhibits, gardens, and an engaging entertainment space.','http://127.0.0.1:8000/static/images/DadasahebPhalkeMemorial.jpg',1,'Central Nashik','Midday (4 hrs)',2,19.94383469,73.75029899,'Low'),(79,'360 Degree Object D\'Art','A creative art museum in Nashik showcasing artistic installations, unique sculptures, and immersive visual experiences.','http://127.0.0.1:8000/static/images/360DegreeObjectD\'art.jpg',1,'Central Nashik','Midday (4 hrs)',2,19.99559702,73.74354727,'Low'),(80,'Shree Jagannath Mandir','A beautiful temple inspired by the Jagannath Puri style, offering a peaceful spiritual ambiance in Nashik.','http://127.0.0.1:8000/static/images/shreejagannathmandir.jpg',1,'Central Nashik','Midday (4 hrs)',2,19.95812274,73.77077594,'Low'),(81,'Kapareshwar Mahadev Mandir','A serene Mahadev temple near Igatpuri, known for its peaceful surroundings and spiritual atmosphere amid natural beauty.','http://127.0.0.1:8000/static/images/kapareshwar.webp',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.67298404,73.54328614,'Low'),(82,'Darna Lake','A scenic lake near Igatpuri popular for its tranquil environment, natural beauty, and relaxing lakeside views.','http://127.0.0.1:8000/static/images/darnadam.webp',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.7622506,73.73713435,'Low'),(83,'Vaitarna Dam','A popular scenic dam in Igatpuri offering peaceful views, cool climate, and a perfect escape into nature.','http://127.0.0.1:8000/static/images/vaitaranadam.jpg',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.67080886,73.29056748,'Low'),(84,'Vallonne Vineyards','A boutique vineyard near Igatpuri known for its fine wines, lakeside views, restaurant, and serene vineyard landscapes.','http://127.0.0.1:8000/static/images/vallonnevineyards.jpg',2,'Wine Zone','Afternoon (4 hrs)',4,19.81196208,73.61371048,'Low'),(85,'JenJon Lake Vaitarna Waterfall','A picturesque waterfall and lakeside adventure spot near Igatpuri offering natural beauty, outdoor activities, and peaceful relaxation.','http://127.0.0.1:8000/static/images/jenjonlakevaitarnawaterfall.jpg',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.6136019,72.99790504,'Low'),(86,'Coin Museum','An informative museum in Trimbakeshwar showcasing the history of Indian coinage through rare coins, artifacts, and educational displays.','http://127.0.0.1:8000/static/images/CoinMuseum.jpg',3,'Trimbak Region','Morning (4 hrs)',4,19.95811229,73.61130638,'Low'),(87,'Bhavli','A picturesque nature spot in Igatpuri known for its dam, seasonal waterfalls, and lush greeneryâ€”ideal for nature lovers and photographers.','http://127.0.0.1:8000/static/images/bhavaliwaterfall.jpg',2,'Igatpuri Nature Belt','Afternoon (4 hrs)',4,19.64838236,73.59716803,'Low'),(88,'Peruchi Vadi Misal','A popular misal spot known for its spicy and authentic Maharashtrian taste.','http://127.0.0.1:8000/static/images/missal%20spots/peruchivadi.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.05286055,73.72652052,'Low'),(89,'Bhamre Misal','Famous misal place serving traditional and flavorful misal pav.','http://127.0.0.1:8000/static/images/missal%20spots/bhamremisal1.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,19.98101877,73.76670489,'Low'),(90,'Grape Embassy','A misal and snacks outlet known for unique food combinations.','http://127.0.0.1:8000/static/images/missal%20spots/grapesembemcy.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.0265016,73.77086771,'Low'),(91,'Sadhana Misal','One of the most popular misal joints, known for Nashik-style misal.','http://127.0.0.1:8000/static/images/missal%20spots/Sadhnamissal.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.02179183,73.72098761,'Low'),(92,'Vitthal Misal','A well-known misal place serving spicy and tasty misal pav.','http://127.0.0.1:8000/static/images/missal%20spots/vittalmissal.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.0701427,73.7831721,'Low'),(93,'Mamacha Mala','A scenic village-style food spot offering traditional Maharashtrian meals.','http://127.0.0.1:8000/static/images/missal%20spots/MamachaMala.png',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.04899926,73.7661851,'Low'),(94,'Shamsundar Misal','A well-loved misal outlet known for rich flavor and spicy tarri.','http://127.0.0.1:8000/static/images/missal%20spots/ShamsundarMisal.webp',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,20.03707096,73.77030386,'Low'),(95,'Amchi Matti Amchi Manse','A rustic food destination offering village-style ambiance and meals.','http://127.0.0.1:8000/static/images/missal%20spots/Amchimattiamchimanse.jpg',1,'Misal Food Trail','Breakfast / Brunch (2 hrs)',2,19.92330872,73.834827,'Low'),(96,'Aishwarya Garden Misal','A popular misal spot in Sinner, Nashik known for its flavorful Nashik-style misal and family-friendly ambiance.','http://127.0.0.1:8000/static/images/missal%20spots/aishwaryamissal.jpg',15,'Sinnar Region','Morning (4 hrs)',2,19.84814819,73.99157607,'Low'),(97,'Zonkers Adventure Park','Adventure and amusement park offering go-karting, ATV, rope courses, bungee trampoline and more.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/ZonkersAdventurePark.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,20.00950664,73.66355135,'Low'),(98,'Ashoka Adventure Park','Adventure zone with rope activities, obstacle courses, wall climbing and outdoor games.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/ashokaadventurepark.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.90628391,73.92332808,'Low'),(99,'SUMA Adventure Park & Resort','Adventure and resort destination featuring zipline, ATV, zorbing, rope activities and family recreation.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/sumaadventurepark.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.96566057,73.65855378,'Low'),(100,'Keshar Baug Adventure Park','Adventure and family entertainment park offering rope games, rides and recreational activities.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/kesharbaugadventurepark.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.82345094,73.86976651,'Low'),(101,'Wonder Zone','Indoor amusement and trampoline park providing VR games, kids area and fun activities.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/wonderzone.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,20.02889122,73.70821551,'Low'),(102,'Watermelon Adventure Park','Recreational adventure and activity park designed for family and group outings.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/watermellon.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.92839006,73.73841597,'Low'),(103,'Fizzy Fox Adventure Park','Fun adventure park for children and families with indoor and outdoor play activities.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/fizzyfox.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,20.02801162,73.76959397,'Low'),(104,'SS Farms Adventure & Agro Tourism','Farm-based tourism destination offering water activities, adventure amenities and outdoor games.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/ssfarms.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,20.60513289,74.24849994,'Low'),(105,'Shagun Water Park','Waterpark with slides, pools and family entertainment located near Igatpuri.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/Shagunwaterpark.jpg',2,'Adventure & Theme Parks','Afternoon (4 hrs)',6,19.70183249,73.6074567,'Low'),(106,'Shubham Water World','Popular waterpark near Nashik featuring slides, pools and wave attractions.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/shubhamwaterpark.png',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.95126008,73.60612694,'Low'),(107,'Pandit Deendayal Upadhyay Theme Park','A well-maintained public theme park featuring landscaped gardens, walking tracks, seating areas, and recreational open spaces suitable for families and children.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/pantitendayaltheampark.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,20.02460756,73.82568829,'Low'),(108,'Mini Fun Land','A family entertainment zone offering arcade games, kiddie rides, and playful indoor amusement activities suitable for children.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/minifunland.jpg',1,'Adventure & Theme Parks','Half Day (5â€“6 hrs)',6,19.95141627,73.83627046,'Low'),(109,'Fantazone Entertainment & Educational Zone','An entertainment and educational park surrounded by natural greenery, offering recreational activities, learning-based attractions, and family fun in a serene environment.','http://127.0.0.1:8000/static/images/TheamparksAndWaterparks/fantazone.jpg',2,'Adventure & Theme Parks','Afternoon (4 hrs)',6,19.91962427,73.59805053,'Low');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `price_per_night` float NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_hotels_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talukas`
--

DROP TABLE IF EXISTS `talukas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talukas` (
  `id` int DEFAULT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talukas`
--

LOCK TABLES `talukas` WRITE;
/*!40000 ALTER TABLE `talukas` DISABLE KEYS */;
INSERT INTO `talukas` VALUES (8,'Chandwad'),(9,'Deola'),(4,'Dindori'),(2,'Igatpuri'),(6,'Kalwan'),(11,'Malegaon'),(12,'Nandgaon'),(1,'Nashik'),(14,'Niphad'),(5,'Peth'),(10,'Satana'),(15,'Sinnar'),(7,'Surgana'),(3,'Trimbakeshwar'),(13,'Yeola');
/*!40000 ALTER TABLE `talukas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firebase_uid` varchar(128) NOT NULL,
  `email` varchar(150) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `firebase_uid` (`firebase_uid`),
  UNIQUE KEY `email` (`email`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2026-07-25  0:40:25
