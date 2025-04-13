MailScheduler is a task scheduler for emails, built using **React**, **React Flow**, **Nodemailer**, and **Agenda**. 
It allows users to schedule emails to be sent automatically at specified times.

To run this:

Backend:

1) Run the following command in the frontend folder terminal : npm install express nodemailer agenda dotenv cors
which will install all the necessary dependencies for this project

2)Inside backend folder create a dotenv folder and paste this : 
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
MONGO_URI=your_mongodb_connection_url
Here paste the necessary credentials

3) Run the backend server using this command in the terminal : node index.js

Frontend

1) Navigate to frontend folder and run this command: npm install react react-dom react-scripts react-flow

2) In the terminal run : npm start

The project should be initialised. 
Thank you!
