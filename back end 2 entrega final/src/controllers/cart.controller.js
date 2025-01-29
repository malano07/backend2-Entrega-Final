import Cart from "../daos/cart.dao.js";
import Product from "../daos/product.dao.js";
import Ticket from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

const cartService = new Cart();
const productService = new Product();

export const purchaseCart = async (req, res) => {
    const { cid } = req.params;  
    const userEmail = req.user.email; 

    try {
        const cart = await cartService.getById(cid);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        let totalAmount = 0;
        let purchasedProducts = [];
        let notPurchasedProducts = [];

        
        for (const item of cart.products) {
            const product = await productService.getById(item.product);

            if (product && product.stock >= item.quantity) {
                
                product.stock -= item.quantity;
                await productService.update(product._id, { stock: product.stock });

                
                purchasedProducts.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price
                });

               
                totalAmount += product.price * item.quantity;
            } else {
                
                notPurchasedProducts.push(item.product);
            }
        }

        
        let ticket = null;
        if (purchasedProducts.length > 0) {
            ticket = await Ticket.create({
                code: uuidv4(),  // Unique Code
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: userEmail
            });
        }

       
        cart.products = cart.products.filter(item => notPurchasedProducts.includes(item.product));
        await cartService.update(cid, cart);

        return res.status(200).json({
            status: "success",
            message: "Purchase completed",
            ticket,
            notPurchasedProducts
        });
    } catch (error) {
        console.error("Error processing purchase:", error);
        return res.status(500).json({ message: "Error processing purchase", error: error.message });
    }
};
