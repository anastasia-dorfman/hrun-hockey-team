import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Something went wrong, try again later";

  let errorMessages = [];
  if (err.messages) {
    errorMessages = err.messages;
  } else if (typeof msg === "object") {
    errorMessages = [JSON.stringify(msg)];
  } else {
    errorMessages = [msg];
  }

  res.status(statusCode).json({ msg: errorMessages });
};

export default errorHandlerMiddleware;
