import { orderModel } from "../models/order.model.js";
import { productModel } from "../models/product.model.js";
import { catchAsync } from "../utils/response.util.js"

const getOrdersByUserId = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const orders = await orderModel.find({
    user_id
  }).populate('product').populate('shipping_address');

  return res.status(200).send({
    success: true,
    orders
  })
})

const createOrder = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const {
    productId,
    addressId,
    quantity,
    payment_method } = req.body;

  if (!productId) {
    return res.status(400).send({
      success: false,
      message: "Product ID is required!"
    })
  }

  if (!addressId) {
    return res.status(400).send({
      success: false,
      message: "Address ID is required!"
    })
  }

  const product = await productModel.findById(productId);
  const Subtotal = Math.round(product.price - product.price * (product.discount / 100)) * quantity;
  const Shipping = Subtotal > 499 ? 0 : 50;
  const order_summary = {
    Subtotal,
    Shipping,
    Total: Subtotal + Shipping,
    GrandTotal: Subtotal
  }

  await orderModel.create({
    user_id,
    product: productId,
    quantity,
    shipping_address: addressId,
    payment_method,
    order_summary,
  })

  return res.status(201).send({
    success: true,
    message: "Your order has been placed successfully"
  });
})

const CancelOrderHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).send({
      success: false,
      message: "Order ID is required!"
    })
  }

  const cancelled_at = Date.now();
  await orderModel.findByIdAndUpdate(orderId, {
    shipping_status: "cancelled",
    payment_status: "cancelled",
    is_cancelled: true,
    cancelled_at,
  })

  return res.status(200).send({
    success: true,
    message: "Order cancelled successfully",
    cancelled_at
  })
})

export {
  getOrdersByUserId,
  createOrder,
  CancelOrderHandler
}