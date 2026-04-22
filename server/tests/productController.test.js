const request = require('supertest');
const app = require('../src/app');
const Product = require('../src/models/Product');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Product Controller', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await require('bcryptjs').hash('password123', 10),
      isAdmin: true,
    });
    userId = user._id;
    authToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET || 'testsecret');
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Product',
          description: 'Test description',
          price: 99.99,
          category: 'rings',
          stock: 10,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Test Product');
      expect(res.body.price).toBe(99.99);
    });

    it('should not create product without required fields', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Product',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'All fields are required');
    });
  });

  describe('GET /api/products', () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: 'Product 1',
          description: 'Description 1',
          price: 10.99,
          category: 'rings',
          stock: 5,
          createdBy: userId,
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          price: 20.99,
          category: 'necklaces',
          stock: 10,
          createdBy: userId,
        },
      ]);
    });

    it('should get all products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('products');
      expect(res.body.products).toHaveLength(2);
    });

    it('should search products by keyword', async () => {
      const res = await request(app).get('/api/products?keyword=Product 1');

      expect(res.statusCode).toBe(200);
      expect(res.body.products).toHaveLength(1);
      expect(res.body.products[0].name).toBe('Product 1');
    });

    it('should filter products by category', async () => {
      const res = await request(app).get('/api/products?category=rings');

      expect(res.statusCode).toBe(200);
      expect(res.body.products).toHaveLength(1);
      expect(res.body.products[0].category).toBe('rings');
    });

    it('should sort products by price', async () => {
      const res = await request(app).get('/api/products?sort=price');

      expect(res.statusCode).toBe(200);
      expect(res.body.products[0].price).toBeLessThan(res.body.products[1].price);
    });
  });

  describe('GET /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
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

    it('should get product by id', async () => {
      const res = await request(app).get(`/api/products/${productId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('PUT /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
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

    it('should update product', async () => {
      const res = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Product',
          price: 149.99,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Product');
      expect(res.body.price).toBe(149.99);
    });

    it('should return 404 for non-existent product', async () => {
      const res = await request(app)
        .put('/api/products/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('DELETE /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
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

    it('should delete product', async () => {
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Product removed successfully');

      const deletedProduct = await Product.findById(productId);
      expect(deletedProduct).toBeNull();
    });

    it('should return 404 for non-existent product', async () => {
      const res = await request(app)
        .delete('/api/products/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });
});
