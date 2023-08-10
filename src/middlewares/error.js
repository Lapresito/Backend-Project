import Errors from "../errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause);

  switch (error.code) {
    case Errors.NO_PRODUCT:
      res
        .status(404)
        .json({ status: "error", error: error.name, cause: error.cause });
      break;
    case Errors.NO_CART:
      res
        .status(404)
        .json({ status: "error", error: error.name, cause: error.cause });
    break;
    case Errors.EMPTY_FIELDS:
      res
        .status(404)
        .json({ status: "error", error: error.name, cause: error.cause });
    break;
    default:
      res.send({ status: "error", error: "Unhandled error" , msg: error.message });
      break;
  }
};