# **CBT App (Computer-Based Testing System)**

*Project Description*

This CBT (Computer-Based Testing) app is designed to streamline the management and execution of exams. The platform allows admins to register lecturers and students, assign courses to lecturers, and manage the entire examination process. Lecturers can set exams for their assigned courses and view the results of students once the exams are completed.

**Features**

*Admin Panel:*
1. Register lecturers and students.
2. Assign courses to lecturers.

*Lecturer Portal:*
1. Create and manage exams for assigned courses.
2. View student performance and exam results.

*Student Portal:*
1. Access exams for their registered courses.
2. Submit answers and view results once the exam is graded.

**Technology Stack**

Backend: *Node.js*

Frontend:  *EJS*

Database: *MongoDB*

**Installation and Setup**

Clone the repository: *git clone https://github.com/Jayranking/CBT-app.git*

Navigate to the project directory: *cd CBT-app*

Start the development server: *npm install*

Set up environment variables in a .env file: 

APP_PORT = 8000

DB_URL= mongodb://127.0.0.1:27017/cbt_app

SECRET = ""

**Email config**

EMAILFROM = ''

EMAIL_KEY = ''
