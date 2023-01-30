module.exports = (res, error) => {
  if (error)
    return res.status(500).json({
      error,
      result_code: "500",
      result_message: "Internal Server Error",
    });

  return res.status(500).json({
    error: "Internal Server Error",
    result_code: "500",
    result_message: "Internal Server Error",
  });
};
