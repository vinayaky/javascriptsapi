const express = require("express");
const router = express.Router();
const {
  getDetails,
  createDetails,
  getDetail,
  updateDetail,
  deleteDetails,
} = require("../controllers/detailController");
const validateToken = require("../middleware/valiodateTokenHandler");


router.use(validateToken)
router.route("/").get(getDetails).post(createDetails);
router.route("/:id").get(getDetail).put(updateDetail).delete(deleteDetails);

module.exports = router;