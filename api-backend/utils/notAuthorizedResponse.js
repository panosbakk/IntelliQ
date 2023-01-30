module.exports = (res, error) => {
  if (error)
    return res.status(401).json({
      error,
      result_code: "401",
      result_message: "Not Authorized",
    });

  return res.status(401).json({
    error: "Not Authorized",
    result_code: "401",
    result_message: "Not Authorized",
  });
};
