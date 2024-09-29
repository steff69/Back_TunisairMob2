const express = require('express');



const {
addVoleMain,getAllVoleMain,getVoleById
} = require('../services/volemain');

const router = express.Router();


router.post( "/",addVoleMain) ;
router.get ("/:fm/:to",getAllVoleMain);
router.get ("/:id",getVoleById);












module.exports = router;
