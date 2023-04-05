exports.successHandler = (res, statusCode, data) => {
    res.status(statusCode).json({
      statusCode,
      status: 'success',
      data,
    });
  };