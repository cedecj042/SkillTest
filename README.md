# Laravel Inertia React Application

This repository contains a Laravel application integrated with Inertia.js and React for the frontend. Follow the instructions below to set up and run the application.

---

## Prerequisites

Before proceeding, ensure you have the following installed:

- **PHP** (>=8.1)
- **Composer** (Dependency manager for PHP)
- **Node.js** (>=14.x) and **npm** or **yarn** (Node package manager)
- **MySQL** or any database supported by Laravel
- **Git** (to clone the repository)
- **A web server** (e.g., Apache, Nginx, or Laravel Valet)
- **Laravel CLI** (optional but recommended)

---

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/cedecj042/SkillTest.git
cd SkillTest
```

### 2. Install Backend & Frontend Dependencies

Install PHP Dependencies
```
composer install
``` 
Install JavaScript Dependencies
```
npm install
```
This will install all required Laravel and React dependencies.


### 3. Configure the Environment File

Create a copy of the .env.example file and rename it to .env:
```
cp .env.example .env
```

Then update the .env file with your database credentials and other configurations:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<your_database_name>
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
```


### 4. Generate Application Key

Laravel requires an application key for security. Generate it using:
```
php artisan key:generate
```
This will update the .env file with a valid APP_KEY.

### 5. Migrate the Database

Run the following command to create the necessary database tables:
```
php artisan migrate
```

To seed the database with initial data, run:
```
php artisan db:seed
```

### 6. Build Frontend Assets
Compile the frontend assets for development
```
npm run dev
```

### 7. Start the Application
Start the Laravel development server:
```
php artisan serve
```