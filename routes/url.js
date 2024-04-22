const express=require('express');
const {handleGenerateNewShortURL,handleGetLink, handleRedirectURL, handleAnalytics}=require('../controllers/url');
const router=express.Router();
const {authUser}=require("../middleware/authUser")

router.get('/hello',(req, res)=>res.send("Hello"))
router.post('/createUrl',authUser,handleGenerateNewShortURL);
router.get('/:shortId',handleRedirectURL);
router.get('/analytics/getLinks',authUser,handleGetLink)
router.get('/analytics/:shortId',authUser,handleAnalytics);

module.exports=router;