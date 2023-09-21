import Router from "express";

import CartManager from "../CartManager.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(200).json({ message: "Cart created", cart: newCart });
    req.cart = newCart;
    res.redirect(`/product/${newCart.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  console.log(cid);
  try {
    const cart = await CartManager.getCartById(+cid);
    if (!cart) {
      res.status(400).json({ message: "Cart not found with the id" });
      return;
    }
    res.status(200).json({ message: "Cart found", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:cid/product/:pid ", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const getCart = await CartManager.addProductToCart(cid, pid);
    res.status(200).json({ message: "Product added to Cart", getCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
