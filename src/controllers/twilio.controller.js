import { catchAsync } from "../utils/response.util.js";
import { sendMessage } from "../vendors/twilio.vendor.js";

const SendMessageHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { message, mobile_number } = req.body;
  if (!mobile_number) {
    return res.status(400).send({
      success: false,
      message: "Mobile Number Required!"
    })
  }

  if (mobile_number.length !== 10) {
    return res.status(400).send({
      success: false,
      message: "Please enter a valid mobile number"
    });
  }

  await sendMessage(mobile_number, message);
  
  return res.status(200).send({
    success: true,
    message: "WhatsApp message sent successfully"
  })

})

export {
  SendMessageHandler
}