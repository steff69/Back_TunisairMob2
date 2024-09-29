const express = require('express');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');


const {
addVole,
getAllVole,getVoleById,searchVole,esizeProductImages,uploadProductImages
} = require('../services/vole');

const router = express.Router();


router.post( "/",uploadProductImages,esizeProductImages,addVole) ;
router.get ("/",getAllVole);
router.get ("/:id",getVoleById);
router.get ("/search/:search",searchVole);











module.exports = router;
