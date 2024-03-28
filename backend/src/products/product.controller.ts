import { RequestHandler } from "express";
import createHttpError from "http-errors";
import prisma from "../dbConfig/dbConfig";
import { checkProductExists, updateProductDetails } from "./product.service";
import { ProductModel } from "../models/product.model";

export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await prisma.products.findMany();
  res.send(products);
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const newProduct: ProductModel = req.body;

    // Check if all required fields are provided
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      throw createHttpError(400, "Missing required fields");
    }

    const product = await prisma.products.create({
      data: newProduct,
    });

    res.status(201).send({ data: product, message: "Product created" });
  } catch (error) {
    next(error);
  }
};

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await checkProductExists(parseInt(req.params.id));
    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await checkProductExists(parseInt(id));
    // Product exists, proceed with deletion
    await prisma.products.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.sendStatus(204); // Send 204 No Content when the product is successfully deleted
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  try {
   
    // }
    await checkProductExists(parseInt(id));

    // Check for missing fields
    if (!name || !price || !description || !image) {
      throw createHttpError(400, "Missing required fields");
    }
    const updatedProduct = await updateProductDetails(parseInt(id), req.body);
    res.status(200).send({ data: updatedProduct, message: "Product updated!" });
  } catch (error) {
    next(error);
  }
};

export const updateProductDetailsID: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  try {
    await checkProductExists(parseInt(id));

    const updatedProductDetails = await updateProductDetails(
      parseInt(id),
      req.body,
    );
    res
      .status(200)
      .send({ data: updatedProductDetails, message: "Product updated!" });
  } catch (error) {
    next(error);
  }
};
