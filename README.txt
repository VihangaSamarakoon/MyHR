---------------------
HR Management System|
---------------------
-------------
Introduction|
-------------

The HR Management System is a web-based application designed to streamline human resource activities within an organization. It provides features for managing employee data, leave applications, attendance records, and notifications. This README file provides instructions for setting up the project environment and running the application locally.

-------------
Prerequisites|
-------------

Before running the application, ensure you have the following prerequisites installed:

Node.js
MongoDB

------------------
Setup Instructions|
------------------

Clone the Repository: Clone the HR Management System repository to your local machine.

=> https://github.com/VihangaSamarakoon/MyHR

---------------
Database Setup:|
---------------

Install MongoDB on your local machine if not already installed.
Start MongoDB service.

Connect to MongoDB and create a new database named 
	=> hr_management_db.

Create the following collections in the hr_management_db database:
	=> admins
	=> attendance_records
	=> employees
	=> leave_applications
	=> notifications

Insert sample data into the admins collection:

	=> hr_management_db.admins.insertOne({ username: "admin1", password: "$2a$08				$4DzD3emoWNR0ERaw88GYxuve9vXDBUlnThQfGJ4c356K1pKWors3G" })

***NOTE: Password Should be encrypted***

--------------
Project Setup:|
--------------

Open the project folder in Visual Studio Code or any preferred code editor.

Open two terminals within Visual Studio Code.

Navigate to the hr-management-back folder in one terminal.

Navigate to the hr-management-app folder in the other terminal.

Install Dependencies:

Run the following command in both terminals to install npm dependencies:

	=> npm install

---------------------
Run the Applications:|
---------------------

In the terminal for the hr-management-back folder, run the following command to start the backend server:

	=> npm run dev

In the terminal for the hr-management-app folder, run the following command to start the frontend application:

	=> npm start

------------------------
Access the Application:|
------------------------

Open a web browser and navigate to http://localhost:3000 to access the HR Management System.
Usage

The HR Management System provides user-friendly interfaces for employees and administrators to manage various HR tasks.

Employees can apply for leave, manage documents, record attendance, and receive notifications.

Administrators can approve leave applications, manage employee data, track attendance, and send notifications.
Contributing

Contributions are welcome! Please follow the contribution guidelines.
