module.exports = (res, error) => {
  const response = {
    result_code: "400",
    result_message: "failed",
  };

  if (error) {
    response.error = error;
  } else {
    response.error = "Bad Request";
  }

  return res.status(400).json(response);
};
