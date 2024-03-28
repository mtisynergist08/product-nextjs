import express from "express";
import * as ProductController from "../products/product.controller";

const router = express.Router();

// for user session -> tak guna untuk sekarang
// app.get('/set-session', (req, res) => {
//     req.session.username = 'JohnDoe';
//     res.send('Session variable set.');
// });
//
// app.get('/get-session', (req, res) => {
//     const username = req.session.username || 'No username found in session';
//     res.send(`Session username: ${username}`);
// });

router.get("/api/products", ProductController.getProducts);

router.post("/api/products", ProductController.createProduct);

router.get("/api/products/:id", ProductController.getProduct);

router.delete("/api/products/:id", ProductController.deleteProduct);

router.put("/api/products/:id", ProductController.updateProduct);

router.patch("/api/products/:id", ProductController.updateProductDetailsID);

export default router;
