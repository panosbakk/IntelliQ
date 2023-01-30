module.exports = (res, error) => {
  if (error)
    return res.status(402).json({
      error,
      result_code: "402",
      result_message: "No Data",
    });

  return res.status(402).json({
    error: "No Data",
    result_code: "402",
    result_message: "No Data",
  });
};
