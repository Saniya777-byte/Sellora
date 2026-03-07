const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require("./routes/authRoutes");
// Middleware
app.use(cors());
app.use(express.json());
 

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);



module.exports = app;
