const express= require('express')
const { analyzeResume } = require("../controllers/analyzeController.js");

const router = express.Router();

router.post("/analyze", analyzeResume);

module.exports=router