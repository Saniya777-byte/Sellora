const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product');
        res.json(cart);

};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
};


exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.json(cart);
}
