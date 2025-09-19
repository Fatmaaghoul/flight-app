# flight-app
Application web full-stack permettant de rechercher, gérer et réserver des vols.
Le projet est composé d'un backend en Spring Boot et d'un frontend en Angular 18.

# Structure du projet
testtechniq/
├── flightm-frontend/          # Frontend Angular
└── flight-app-backend/        # Backend Spring Boot
Backend (Spring Boot)
Technologies
Java 17
Spring Boot 3
Spring Data JPA
SQLite
Hibernate
Maven
# Configuration
La base de données SQLite est gérée automatiquement via Hibernate. Le fichier flights.db est créé automatiquement dans le dossier du projet.
application.properties :
spring.application.name=flight-app-backend
spring.datasource.url=jdbc:sqlite:flights.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=update
logging.level.org.hibernate.SQL=DEBUG
# Installation et lancement
bash
# Se positionner dans le dossier du backend
cd flight-app-backend

# Installer les dependances et lancer l'application
mvn spring-boot:run
Le backend demarre sur http://localhost:8080.

# Endpoints principaux
Methode	Endpoint	Description
GET	/api/vols	Recuperer tous les vols
POST	/api/vols	Ajouter un nouveau vol
POST	/api/vol/{volId}	Supprimer un nouveau vol
GET	/api/vols/search	Rechercher des vols avec filtres
POST	/api/reservations/{volId}	Reserver un vol
DELETE	/api/reservations/{id}	Annuler une reservation
GET	/api/audits	Consulter les journaux d'audit
Frontend (Angular 18)
# Technologies
Angular 18 (composants standalone)
Angular Material
SCSS
TypeScript
# Installation et lancement
bash
# Se positionner dans le dossier du frontend
cd flightm-frontend

# Installer les dependances
npm install

# Lancer l'application en mode developpement
ng serve
L'application sera disponible sur http://localhost:4200.

# Fonctionnalites principales
Recherche de vols par ville de depart, ville d'arrivee, dates et tri (prix ou duree)

Reservation de vols avec gestion du nombre de places disponibles

Annulation de reservations

Journalisation des reservations dans un systeme d'audit

Interface utilisateur moderne avec Angular Material

Interface d'administration pour gerer les vols et reservations

# Structure de l'application
Composants principaux : Recherche, Reservation, Administration

Services : Communication avec l'API backend

Modeles : Interfaces TypeScript pour les donnees

Styles : SCSS avec variables CSS et design responsive

# Donnees de test
Un fichier trajets.json est fourni pour inserer rapidement des vols de test via l'endpoint POST /api/vols.

# Developpement
Pre-requis
Node.js 18+ et npm pour le frontend

Java 17 et Maven pour le backend

# Commandes utiles
Backend :

bash
mvn clean install    # Nettoyer et construire le projet
mvn test             # Executer les tests
Frontend :

bash
ng build             # Construire le projet pour la production
ng test              # Executer les tests unitaires
ng lint              # Verifier la qualite du code
# Notes
La base de données SQLite est auto-gérée, aucune configuration supplémentaire n'est nécessaire
L'application est entièrement responsive et s'adapte aux mobiles et tablettes

# Réalisé dans le cadre du test technique MAJRADeep _ Développé par Belghoul Fatma
