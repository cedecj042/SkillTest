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
Using a new terminal, start the Laravel development server:
```
php artisan serve
```

## Sample Accounts for Testing
In my database seeder, I've created accounts for testing:

Email: test@email.com
Password: usjr1234



## Testing and Integration

#### Routes
```
Route::prefix('todos')->name('todos.')->group(function(){
    Route::get('/', [TodoController::class, 'index'])->name('index');
    Route::post('/',[TodoController::class,'store'])->name('store');
    Route::get('/{id}',[TodoController::class,'show'])->name('show');
    Route::put('/{id}',[TodoController::class,'update'])->name('update');
    Route::delete('/{id}',[TodoController::class,'delete'])->name('delete');
});
```


1. Request and Response for todos.index:
#### Request
```
curl -X GET http://localhost:8000/todos \
     -H "Accept: application/json"
```
### Response

```
[
    {
        "todo_id": 166,
        "title": "Et praesentium cumque assumenda quia",
        "description": "Est impedit exercitationem illum voluptatem. Porro nam et ut quaerat illo placeat eaque. Temporibus nemo voluptates natus est ipsam est reiciendis rerum.",
        "due_date": "February 14, 2025",
        "created_at": "January 28, 2025"
    },
    {
        "todo_id": 167,
        "title": "Iure eveniet nesciunt ut.",
        "description": "Dolorem earum cum est impedit incidunt. Est rerum tempora sint reiciendis quasi repellat et. Dolorem ea adipisci a non perferendis earum a. Et vel natus et qui delectus provident quisquam odio.",
        "due_date": "February 20, 2025",
        "created_at": "January 28, 2025"
    }
]
```

2. Request and Response for todos.show
```
curl -X GET http://localhost:8000/todos/166 \
     -H "Accept: application/json"
```
### Response
```
{
    "todo_id": 166,
    "title": "Et praesentium cumque assumenda quia",
    "description": "Est impedit exercitationem illum voluptatem. Porro nam et ut quaerat illo placeat eaque. Temporibus nemo voluptates natus est ipsam est reiciendis rerum.",
    "due_date": "February 14, 2025",
    "created_at": "January 28, 2025"
}
```

3. Request and Response for todos.store
### Request
```
curl -X POST http://localhost:8000/todos \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Complete API Development",
           "description": "Finish the CRUD API for the Full Stack Developer test",
           "due_date": "2025-03-01"
         }'
```
### Response
```
{“success”:”Todo created successfully”}
```

4. Request and Response for todos.delete
### Request
```
curl -X DELETE http://localhost:8000/todos/166 \
     -H "Accept: application/json"

```
### Response
```
{“success”:”Todo deleted successfully”}
```

5. Request and Response for todos.update
### Request
```
curl -X POST http://localhost:8000/todos/167 \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
           "todo_id": 167,
           "title": "Complete API Development",
           "description": "Finish the CRUD API for the Full Stack Developer test",
           "due_date": "2025-03-01"
         }'
```
### Response
```
{
    "todo_id": 166,
    "title": "Et praesentium cumque assumenda quia",
    "description": "Est impedit exercitationem illum voluptatem. Porro nam et ut quaerat illo placeat eaque. Temporibus nemo voluptates natus est ipsam est reiciendis rerum.",
    "due_date": "February 14, 2025",
}
```

## FrontEnd Screenshots
1. Signup
![signup](https://github.com/user-attachments/assets/94359e90-f54d-4528-a2e8-fcb305d2957a)
2. Login
![login](https://github.com/user-attachments/assets/8a182046-4f9b-42ac-84e2-80e2b65335f8)
3. Index
![index](https://github.com/user-attachments/assets/9f460900-2728-4435-93ca-83c58a48b7a0)
4. Add
![add](https://github.com/user-attachments/assets/0826c4ac-5adc-444c-90f7-e85ec1b17ee4)
5. Show
![show](https://github.com/user-attachments/assets/77263536-db30-42eb-8e7c-fc88bb08aefb)
6. Update
![update](https://github.com/user-attachments/assets/31452e1b-88ab-404e-b864-670e2cbf3068)
7. Delete
![delete](https://github.com/user-attachments/assets/8b043a87-e4ee-415f-9b2c-07840165899c)
