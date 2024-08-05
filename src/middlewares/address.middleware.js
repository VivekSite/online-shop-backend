import { catchAsync } from "../utils/response.util.js";
import { ErrorInvalidPayload } from "../utils/error.util.js";

const isDigit = (str) => {
  return /^\d+$/.test(str);
};

const VerifyAddressBody = catchAsync(async (req, res, next) => {
  const {
    full_name,
    mobile_number,
    state,
    city,
    pin_code,
  } = req.body;

  if (!full_name || full_name.length < 3) {
    throw new ErrorInvalidPayload("Full name must be at least 3 characters",); I
  }

  if (!mobile_number) {
    throw new ErrorInvalidPayload("Mobile number is required");
  } else if (mobile_number.length !== 10 || !isDigit(mobile_number)) {
    throw new ErrorInvalidPayload("Invalid Mobile Number")
  }

  if (!state) {
    throw new ErrorInvalidPayload("Please select a state!");
  }

  if (!city) {
    throw new ErrorInvalidPayload("Please select a city!");
  }

  if (!pin_code) {
    throw new ErrorInvalidPayload("Pincode is required!");
  } else if (pin_code.length !== 6 || !isDigit(pin_code)) {
    throw new ErrorInvalidPayload("Invalid pin code!");
  }

  next();
})

export {
  VerifyAddressBody
}
