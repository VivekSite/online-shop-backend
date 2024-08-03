import { shoppingCartModel } from "../models/shopping-cart.model.js";
import { catchAsync } from "../utils/response.util.js"

const GetCartSubTotal = async (user_id) => {
  const userCart = await shoppingCartModel
    .findOne({
      user_id
    }).populate({ path: 'products.product', model: 'products' })

  const subTotal = userCart.products.reduce((total, productData) => {
    if (productData.isSelected) {
      const discountedPrice = Math.round(
        productData.product.price - productData.product.price * (productData.product.discount / 100)
      )
      return total + discountedPrice * productData.quantity;
    }
    return total;
  }, 0)

  return subTotal;
}

const addToCartHandler = catchAsync(async (req, res) => {
  const { _id } = req.auth;
  if (!_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { productId } = req.body;
  if (!productId) {
    return res.status(400).send({
      success: false,
      message: "ProductId is not specified"
    });
  }

  const existingCart = await shoppingCartModel.findOne({ user_id: _id });
  if (!existingCart) {
    await shoppingCartModel.create({
      user_id: _id,
      products: [
        {
          product: productId,
          quantity: 1
        }
      ]
    })
  } else {
    const isProductAlreadyExists = existingCart.products.find(productDate => productDate.product.toString() === productId)
    if (isProductAlreadyExists) {
      return res.status(209).send({
        success: false,
        message: "Product already exists!"
      })
    }

    await shoppingCartModel.findOneAndUpdate(
      { user_id: _id },
      {
        products: [
          ...existingCart.products, {
            product: productId,
            quantity: 1
          }
        ]
      }
    );
  }

  return res.status(201).send({
    success: true,
    message: "Product Added To Cart successfully"
  });
})

const removeFromCartHandler = catchAsync(async (req, res) => { })

const getCartDataHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const userCart = await shoppingCartModel
    .findOne({
      user_id
    }).populate({ path: 'products.product', model: 'products' })

  const subTotal = userCart.products.reduce((total, productData) => {
    if (productData.isSelected) {
      const discountedPrice = Math.round(
        productData.product.price - productData.product.price * (productData.product.discount / 100)
      )
      return total + discountedPrice * productData.quantity;
    }
    return total;
  }, 0)

  return res.send({ cartData: userCart, subTotal });

});

const ProductSelectionHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { isSelected, productId } = req.body;
  await shoppingCartModel.findOneAndUpdate(
    { user_id, 'products.product': productId },
    { $set: { 'products.$.isSelected': isSelected } },
    { new: true }
  );

  const CartSubTotal = await GetCartSubTotal(user_id);

  return res.status(200).send({
    success: true,
    subTotal: CartSubTotal,
    message: "Selections updated successfully"
  })
})

const UpdateProductQuantityHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { quantity, productId } = req.body;
  await shoppingCartModel.findOneAndUpdate(
    { user_id, 'products.product': productId },
    { $set: { 'products.$.quantity': quantity } },
    { new: true }
  );

  const CartSubTotal = await GetCartSubTotal(user_id);

  return res.status(200).send({
    success: true,
    subTotal: CartSubTotal,
    message: "Quantity updated successfully"
  })
})

export {
  addToCartHandler,
  removeFromCartHandler,
  getCartDataHandler,
  ProductSelectionHandler,
  UpdateProductQuantityHandler,
}