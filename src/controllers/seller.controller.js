import { catchAsync } from "../utils/response.util.js"
import { ErrorInvalidPayload } from "../utils/error.util.js";
import { sellerModel } from "../models/seller.model.js";

const createHandler = catchAsync(async (req, res) => {
  const {
    user_id,
    gst, pan,
    packaging_service,
    shipping_service
  } = req.body;

  if (!req.body?.bank_details) throw new ErrorInvalidPayload("Bank details are required!");

  const { bank,
    account_number,
    ifsc,
    micr
  } = req.body?.bank_details

  if (!user_id) throw new ErrorInvalidPayload("UserId is required!");
  if (!gst) throw new ErrorInvalidPayload("GST Number is required!");
  if (!pan) throw new ErrorInvalidPayload("PAN is required!");
  if (!bank) throw new ErrorInvalidPayload("Bank Name is required!");
  if (!account_number) throw new ErrorInvalidPayload("Account Number is required!");
  if (!ifsc) throw new ErrorInvalidPayload("IFSC code is required!");

  const account = await sellerModel.create({
    user_id, gst, pan, 
    packaging_service, 
    shipping_service,
    bank_details: {
      bank, account_number, ifsc, micr
    }
  });

  return res.status(201).send({
    success: true,
    message: "Account created successfully",
    sellerId: account._id
  })
});

const getHandler = catchAsync(async (req, res) => {
  const { sellerId } = req.query;

  const seller = await sellerModel.findById(sellerId);

  return res.send(null);
})

const getMerchantNameById = catchAsync(async (req, res) => {
  const { sellerId } = req.query;

  const seller = await sellerModel.findById(sellerId);
  return res.send({
    success: true,
    merchant_name: seller.merchant_name
  })
});

export {
  createHandler, 
  getHandler,
  getMerchantNameById
}