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
  if (existingAddress.length === 0) {
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

  const addresses = await addressModel.find({
    user_id
  });

  return res.status(200).send({
    success: true,
    addresses,
  })
});

const DeleteHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { addressId } = req.params;
  if (!addressId) {
    return res.status(400).send({
      success: false,
      message: "Address Id id Required!"
    })
  }
  await addressModel.findByIdAndDelete(addressId);

  return res.status(200).send({
    success: true,
    message: "Address deleted successfully"
  })
})

const MakeDefaultHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { addressId } = req.params;
  if (!addressId) {
    return res.status(400).send({
      success: false,
      message: "Address Id id Required!"
    })
  }

  await addressModel.findOneAndUpdate({
    is_default: true
  }, {
    is_default: false
  });

  await addressModel.findOneAndUpdate({ _id: addressId }, { is_default: true });

  return res.status(200).send({
    success: true,
    message: "Default Address updated successfully"
  })

});

const UpdateAddressHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { addressId } = req.params;
  if (!addressId) {
    return res.status(400).send({
      success: false,
      message: "Address Id id Required!"
    })
  }

  const { UpdateAddressFormData } = req.body;
  await addressModel.findOneAndUpdate({ _id: addressId }, UpdateAddressFormData);

  return res.status(200).send({
    success: true, 
    message: "Address updated successfully"
  })
})

export { CreateHandler, GetHandler, DeleteHandler, MakeDefaultHandler, UpdateAddressHandler }