import { catchAsync } from "../utils/response.util.js";
import { addressModel } from "../models/address.model.js";

const CreateHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { 
    full_name,
    mobile_number,
    state, 
    city, 
    pin_code,
    landmark,
    address,
  } = req.body;

  const existingAddress = await addressModel.find({ user_id });
  let is_default = false;
  if(existingAddress.length === 0) {
    is_default = true;
  }

  await addressModel.create({
    user_id,
    full_name,
    mobile_number,
    state,
    city,
    pin_code,
    landmark,
    address,
    is_default
  });

  return res.status(201).send({
    success: true,
    message: "Address added successfully"
  });
})

const GetHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  
});

export { CreateHandler, GetHandler }