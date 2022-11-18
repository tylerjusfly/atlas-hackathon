//Error handling

exports.handleError = (res, error, statusCode) => {
  return res.status(statusCode).json({
    type: "Error",
    message: error.message || "an error occurred",
  });
};

exports.handleBadRequest = (res, message = "bad request", statusCode) => {
  return res.status(statusCode).json({
    type: "Error",
    message: message || "an error occurred",
  });
};

/*Handle Sucess Message */
exports.successHandler = (res, message = undefined, result = null, isCreated = false, paging = undefined) => {
  let statusCode;

  switch (isCreated) {
    case true:
      statusCode = 201;
      break;

    default:
      statusCode = 200;
      break;
  }

  return res.status(statusCode).json({
    type: "Success",
    message,
    result,
    paging,
  });
};