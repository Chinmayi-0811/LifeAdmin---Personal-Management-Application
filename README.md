LifeAdmin — Personal Management Application

LifeAdmin is a full-stack personal management web application designed to help users organize their daily tasks, manage assignments, and improve productivity. It combines a web-based frontend with a Java Spring Boot backend and MySQL database.
The application includes login and registration functionality and aims to provide a simple, user-friendly experience for managing personal activities.

Features

* User Registration: Provides a registration page for new users.
* User Login: Provides a login page for registered users.
* Authentication and Security: Uses Spring Security to support backend security.
* Task Management: Helps users organize their daily tasks.
* Assignment Management: Supports organizing personal assignments and activities.
* Productivity Management: Helps users structure their daily activities.
* Database Integration: Uses MySQL for data storage.

🛠️ Technology Stack

Frontend

* HTML5
* CSS3
* JavaScript

Backend

* Java
* Spring Boot
* Spring Web
* Spring Security
* Spring Data JPA

Database
* MySQL
  
Development and Testing Tools

* Apache Maven
* Visual Studio Code
* Postman
  
🏗️ Project Structure

```
LifeAdmin/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── lifeadmin/
│   │       │           ├── config/
│   │       │           ├── controller/
│   │       │           ├── dto/
│   │       │           ├── entity/
│   │       │           ├── repository/
│   │       │           ├── security/
│   │       │           ├── service/
│   │       │           └── LifeAdminApplication.java
│   │       └── resources/
│   └── pom.xml
├── database/
├── frontend/
├── postman/
└── README.md
```

⚙️ Prerequisites

Before running the application, ensure you have the following installed:

* Java Development Kit (JDK)
* Apache Maven
* MySQL Server
* Visual Studio Code or another suitable code editor
* A modern web browser
  
🚀 Getting Started

1. Clone the Repository
```bash
git clone https://github.com/Chinmayi-0811/LifeAdmin---Personal-Management-Application.git
```

2. Open the Project
Open the downloaded project folder in Visual Studio Code.

3. Configure the Database

1. Start your MySQL server.
2. Create the database required by the application.
3. Open the backend configuration files.
4. Configure the database URL, username, and password to match your local MySQL setup.

Keep database credentials private. Do not commit passwords or other secrets to GitHub.

4. Run the Backend

Open a terminal in the `backend` directory and run:
```bash
mvn spring-boot:run
```
Ensure that the database is running and the application configuration is correct before starting the backend.

5. Open the Frontend

Navigate to the `frontend` folder and open the application's HTML entry point in your browser, or use a local development server if the project requires one.
Make sure the frontend's API configuration matches the address and port used by the backend.

🔐 Authentication and Security

LifeAdmin includes login and registration functionality. The backend uses Spring Security to provide security-related capabilities.
The authentication workflow depends on the application's actual implementation and configuration.

🎯 Project Objectives

* Simplify daily task organization.
* Provide a convenient way to manage personal activities.
* Connect a web frontend to a Java backend.
* Integrate a relational database for application data.
* Apply full-stack development concepts in a practical project.

🔮 Future Enhancements

* Task deadlines and reminders.
* Task completion status and progress tracking.
* A productivity dashboard.
* Improved user experience and responsive design.
* Additional reporting and activity management features.

👩‍💻 Author

Chinmayi MS
GitHub: [Chinmayi-0811](https://github.com/Chinmayi-0811)

⭐ If you find this project interesting, feel free to explore the repository.
