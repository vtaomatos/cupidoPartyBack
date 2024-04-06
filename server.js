const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

  // Mocked data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      description: 'A brief description about John',
      photo: `https://picsum.photos/200?random=${Math.random()}`,
      isInterested: true
    },
    {
      id: 2,
      name: 'Jane Doe',
      description: 'A brief description about Jane',
      photo: `https://picsum.photos/200?random=${Math.random()}`,
      isInterested: false
      },
      {
        id: 3,
        name: 'Bob Smith',
        description: 'A brief description about Bob',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: true
      },
      {
        id: 4,
        name: 'Alice Johnson',
        description: 'A brief description about Alice',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: false
      },
      {
        id: 5,
        name: 'Charlie Brown',
        description: 'A brief description about Charlie',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: true
      },
      {
        id: 6,
        name: 'Marry Poppins',
        description: 'A brief description about Marry',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: false
      },
      {
        id: 7,
        name: 'James Bond',
        description: 'A brief description about James',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: true
      },
      {
        id: 8,
        name: 'Harry Potter',
        description: 'A brief description about Harry',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: false
      },
      {
        id: 9,
        name: 'Ron Weasley',
        description: 'A brief description about Ron',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: true
      },
      {
        id: 10,
        name: 'Hermione Granger',
        description: 'A brief description about Hermione',
        photo: `https://picsum.photos/200?random=${Math.random()}`,
        isInterested: false
      }
    ];

// Login route
app.post('/login', (req, res) => {
  console.log('Login request received'); // Log to indicate that a request has been received

  // In a real application, you would authenticate the user here
  const { documento } = req.body;

  console.log(`Documento received: ${documento}`); // Log the received documento

  // Regex patterns for RG and CPF with or without punctuation
  const rgPattern = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{1}$/;
  const cpfPattern = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/;

  if (rgPattern.test(documento) || cpfPattern.test(documento)) {
    console.log('Valid documento, logging in'); // Log successful login
    res.json({ success: true, message: 'Logged in successfully' });
  } else {
    console.log('Invalid documento, login failed'); // Log failed login
    res.json({ success: false, message: 'Invalid RG or CPF' });
  }
});

// Route to get users catalog
app.get('/users', (req, res) => {
  res.json(users);
});

// Create a transporter for sending emails
let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'vamatos48@hotmail.com',
    pass: 'Senhadificil2@'
  }
});

// Route to handle likes
app.post('/like', (req, res) => {
  const { name } = req.body;

  let mailOptions = {
    from: 'vamatos48@hotmail.com',
    to: 'SSZ.VMATOS@cma-cgm.com',
    subject: 'Curtiu você!',
    text: `Você curtiu ${name}!`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'cupid_db'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the database');
// });

// // Create users table
// let sql = `CREATE TABLE users (
//   id INT AUTO_INCREMENT,
//   name VARCHAR(100),
//   document VARCHAR(100),
//   photo VARCHAR(255),
//   biography TEXT,
//   password VARCHAR(100),
//   PRIMARY KEY(id)
// )`;

// db.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log('Users table created');
// });

// // Create events table
// sql = `CREATE TABLE events (
//   id CHAR(36),
//   name VARCHAR(100),
//   date DATETIME,
//   PRIMARY KEY(id)
// )`;

// db.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log('Events table created');
// });

// // Create users_events table
// sql = `CREATE TABLE users_events (
//   user_id INT,
//   event_id CHAR(36),
//   PRIMARY KEY(user_id, event_id),
//   FOREIGN KEY(user_id) REFERENCES users(id),
//   FOREIGN KEY(event_id) REFERENCES events(id)
// )`;

// db.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log('Users_Events table created');
// });

// // Create likes table
// sql = `CREATE TABLE likes (
//   id INT AUTO_INCREMENT,
//   liker_id INT,
//   liked_id INT,
//   date DATETIME,
//   PRIMARY KEY(id),
//   FOREIGN KEY(liker_id) REFERENCES users(id),
//   FOREIGN KEY(liked_id) REFERENCES users(id)
// )`;

// db.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log('Likes table created');
// });

// // Route to handle likes
// app.post('/like', (req, res) => {
//   const { liker_id, liked_id } = req.body;

//   sql = `INSERT INTO likes (liker_id, liked_id, date) VALUES (?, ?, NOW())`;
//   db.query(sql, [liker_id, liked_id], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json({ success: false, message: 'Failed to like' });
//     } else {
//       console.log('Like registered');
//       res.json({ success: true, message: 'Like registered successfully' });
//     }
//   });
// });



// Other routes...

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
