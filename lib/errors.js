class Errors {
  static respond_errors(res, error) {
    res.json({
      message: error.message
    });
  }
}

export default Errors;
