import createHttpError from "http-errors";
import prisma from "../dbConfig/dbConfig";
import { ProductModel } from "../models/product.model";

export const checkProductExists = async (productId: number) => {
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw createHttpError(404, "Product not found");
  }
  return product;
};

export const updateProductDetails = async (productId: number, data: ProductModel) => {
  const updatedProduct = await prisma.products.update({
    where: {
      id: productId,
    },
    data: {
      ...data,
    },
  });
  return updatedProduct;
};
