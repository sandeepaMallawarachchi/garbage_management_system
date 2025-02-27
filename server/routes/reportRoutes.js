const express = require("express");
const router = express.Router();
const reportDetails = require("../controller/reportController");

router.post('/post', reportDetails.reportSave);
router.get('/get', reportDetails.reportFetch);
router.delete('/delete/:reportID', reportDetails.reportDelete);
router.get('/generate', reportDetails.generateAndSaveReport);

module.exports = router;