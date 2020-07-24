var express = require('express');
var router = express.Router();
const multer = require("multer");
const moment = require('moment');
const path = require('path');

const reimbCont = require("../api/controllers/reimb/reimbController");
// const middleware = require("../api/middleware");

// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

var storage = multer.diskStorage({
    destination: function(req, file, cb) {

        cb(null, path.normalize(BASEPATH+'/public/attachments/'));
        // cb(null, CONSTANT.BULK_UPLOAD_PATH+'/bulk_leads');
     },
    filename: function (req, file, cb) {
		    let dateTime = moment().utcOffset("+05:30").format("DD_MM_YYYY_HH_MM_SS");
        // let customFileName = req.requester.id.toString(),
        	// console.log(customFileName)
            fileExtension = file.originalname.split('.')[1] // get file extension from original file name
            let fileName = file.originalname.split('.')[0].split(" ").join("_").toLowerCase();
            cb(null, fileName+'_'+dateTime+ '.' + fileExtension)
    }
});
var upload = multer({ 
	storage:storage,
	fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
        return cb(new Error('Only csv files are allowed!'));
    }
    cb(null, true);
  }

 });

router.get("/", reimbCont.index);
// router.post("/", middleware.inputCheck, upload.single('attach'), reimbCont.create);
router.post("/", upload.single('attach'),reimbCont.create);
router.get("/:type/:id", reimbCont.show);

module.exports = router;
