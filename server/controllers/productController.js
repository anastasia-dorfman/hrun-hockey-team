import Product from "../models/ProductModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllproducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export const createProduct = async (req, res) => {
  // try {
  //   const product = await Product.create(req.body);
  //   res.status(201).json({ product });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: "server error" });
  // }
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId });
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Product modified", product: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const removedProduct = await Product.findOneAndDelete({
    productId: req.params.productId,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product deleted", product: removedProduct });
};
