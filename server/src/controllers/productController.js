const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      createdBy: req.user._id
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i"
          }
        }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const pageSize = 5;
    const page = Number(req.query.page) || 1;

    let sort = {};
    if (req.query.sort === "price") {
      sort = { price: 1 }; // low to high
    } else if (req.query.sort === "-price") {
      sort = { price: -1 }; // high to low
    }

    const count = await Product.countDocuments({
      ...keyword,
      ...category
    });

    const products = await Product.find({
      ...keyword,
      ...category
    })
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
