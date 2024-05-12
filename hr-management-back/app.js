const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const db = require('./config/db');
const empRoutes = require('./routes/empRoutes');
const notifi = require("./routes/notificationRoute");

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

app.use('/admin', adminRoutes);
app.use('/employee', empRoutes);
app.use('/notification',notifi)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


db.on('error', (error) => {
  console.error("Database connection error:", error);
  process.exit(1); 
});
