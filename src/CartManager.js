import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(info);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async createCart(newCart) {
    try {
      const carts = await this.getCarts({});
      let id;
      if (!carts.length) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }
      carts.push({ id, ...newCart });

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      return error;
    }
  }
  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      console.log("prods", carts);
      const cart = carts.find((c) => c.id === cid);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const cart = await this.getCartById(cid);
      console.log("cart", cart);
      selectedProduct = cart.find((product) => product.id === pid);
      if (cart.some((product) => product.id === selectedProduct.id)) {
        let productIndex = cart.findIndex(product.id === selectedProduct.id);
        cart[productIndex].quantity++;
      } else {
        cart.push({
          product: selectedProduct.id,
          quantity: 1,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(cart));
      }
    } catch (error) {
      return error;
    }
  }
}
/*
async function test() {
  const cart = new CartManager("cart.json");
  await cart.createCart();
  console.log(cart);
}
test();*/
export default new CartManager("cart.json");
