
const HTTP_RESPONSE_CODE = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQURED: 402,
  AUTH_REQUIRED: 403,
  NOT_FOUND: 404
}

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const errName = err.name
    const errMessage = err.message;

    console.error({ errName })
    if (!errMessage) errMessage = err;

    if (errName === "CriticalError") {
      return res.status(500).json({
        success: false,
        level: 'high',
        message: 'Something went wrong, our team is looking into it.',
        error: err?.message
      })
    }

    if (errName === "CastError") {
      return res.status(400).json({
        success: false,
        level: 'high',
        message: 'Invalid payload',
        error: err?.message
      })
    }

    if (errName === "ErrorWarning") {
      return res.status(200).json({
        success: false,
        level: 'warning',
        message: errMessage,
        data: err?.public_data,
      })
    }

    if (errName === "InvalidPayload") {
      return res.status(400).json({
        success: false,
        level: 'high',
        message: errMessage,
        data: err?.public_data,
        error: err?.error
      })
    }

    console.error('CaughtError:', err);
    console.error('ErrorStack:', err.stack)
    console.error('ErrorPayload:', JSON.stringify(req.body));
    console.error('ErrorParams:', req.params);
    console.error('--------------------xxxxxx--------------------');
    console.error(err.stack)

    let responseStatusCode = 500;
    if (err.statusCode) responseStatusCode = err.statusCode

    try {
      errMessage = JSON.parse(errMessage)
      errMessage = errMessage.map(ex => ex.message).join(",")
    } catch (e) { }

    return res.status(responseStatusCode).json({
      success: false,
      message: errMessage,
    });
  });
};


export {
  HTTP_RESPONSE_CODE,
  catchAsync
}