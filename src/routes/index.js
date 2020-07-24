var express = require("express");
var reimbRoutes = require("./reimb.routes");

const router = express.Router();

router.use('/reimbursements', reimbRoutes);

module.exports = router;