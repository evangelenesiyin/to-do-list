const sendResponse = (res, status, data = null, message) => {
  res.status(status).json({
    status: status < 400 ? "success" : "error",
    data: data,
    code: status,
    message: message,
  });
};

export default sendResponse;
