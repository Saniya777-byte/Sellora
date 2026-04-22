const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');

app.use('/api/orders', orderRoutes);

const cartRoutes = require('./routes/cartRoutes');

app.use('/api/cart', cartRoutes);

module.exports = app;
