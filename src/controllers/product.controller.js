import { catchAsync } from "../utils/response.util.js"
import { ErrorInvalidPayload } from "../utils/error.util.js";
import { productModel } from "../models/product.model.js";

const createHandler = catchAsync(async (req, res) => {
  const { title, price, sellerId, discount, inStock, about, details, images, tags } = req.body;

  if (!title) throw new ErrorInvalidPayload("Title is required!");
  if (!price) throw new ErrorInvalidPayload("Price is required!");
  if (!sellerId) throw new ErrorInvalidPayload("sellerId is required!");
  if (!images || images.length < 1) throw new ErrorInvalidPayload("Atleast one image must be provided!");
  if (inStock === undefined) throw new ErrorInvalidPayload("seller must provide stock info");
  if (!tags || tags.length < 1) throw new ErrorInvalidPayload("Atleast one tag is required for SEO");

  const product = await productModel.create({
    title, price, sellerId, discount, inStock, about, details, images, tags
  });

  return res.status(201).send({
    success: true,
    message: "Product added successfully",
    product_id: product._id,
  })
});

export { createHandler }