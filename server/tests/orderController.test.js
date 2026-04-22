const request = require('supertest');
const app = require('../src/app');
const Order = require('../src/models/Order');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const jwt = require('jsonwebtoken');

describe('Order Controller', () => {
  let authToken;
  let userId;
  let productId;

  beforeEach(async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: await require('bcryptjs').hash('password123', 10),
    });
    userId = user._id;
    authToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET || 'testsecret');

    const product = await Product.create({
      name: 'Test Product',
      description: 'Test description',
      price: 99.99,
      category: 'rings',
      stock: 10,
      createdBy: userId,
    });
    productId = product._id;
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          orderItems: [
            {
              product: productId,
              name: 'Test Product',
              quantity: 2,
              price: 99.99,
              image: 'test.jpg',
            },
          ],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.orderItems).toHaveLength(1);
      expect(res.body.totalPrice).toBe(199.98);
    });

    it('should not create order without order items', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ orderItems: [] });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'No order items');
    });
  });

  describe('GET /api/orders/myorders', () => {
    beforeEach(async () => {
      await Order.create({
        user: userId,
        orderItems: [
          {
            product: productId,
            name: 'Test Product',
            quantity: 1,
            price: 99.99,
            image: 'test.jpg',
          },
        ],
        totalPrice: 99.99,
      });
    });

    it('should get user orders', async () => {
      const res = await request(app)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('orderItems');
    });
  });

  describe('GET /api/orders (admin)', () => {
    let adminToken;

    beforeEach(async () => {
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: await require('bcryptjs').hash('password123', 10),
        isAdmin: true,
      });
      adminToken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET || 'testsecret');

      await Order.create({
        user: userId,
        orderItems: [
          {
            product: productId,
            name: 'Test Product',
            quantity: 1,
            price: 99.99,
            image: 'test.jpg',
          },
        ],
        totalPrice: 99.99,
      });
    });

    it('should get all orders for admin', async () => {
      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('PUT /api/orders/:id/status', () => {
    let orderId;
    let adminToken;

    beforeEach(async () => {
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: await require('bcryptjs').hash('password123', 10),
        isAdmin: true,
      });
      adminToken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET || 'testsecret');

      const order = await Order.create({
        user: userId,
        orderItems: [
          {
            product: productId,
            name: 'Test Product',
            quantity: 1,
            price: 99.99,
            image: 'test.jpg',
          },
        ],
        totalPrice: 99.99,
        status: 'pending',
      });
      orderId = order._id;
    });

    it('should update order status', async () => {
      const res = await request(app)
        .put(`/api/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('shipped');
    });

    it('should return 404 for non-existent order', async () => {
      const res = await request(app)
        .put('/api/orders/507f1f77bcf86cd799439011/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Order not found');
    });
  });
});
