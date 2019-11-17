class Errors {
  static respond_errors(res, error) {
    res.status(400).send(error.message);
  }
}

export default Errors;
