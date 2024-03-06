const shortid = require('shortid');
const URL=require('../models/url');

async function handleGenerateNewShortURL(req,res){
  const shortID=shortid(8);
  const body=req.body;
  if(!body.url) return res.status(400).json({error:"url is required"})
  await URL.create({
    user:req.user.id,
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[]
  })

  return res.json({id:shortID})
}

async function handleRedirectURL(req,res){
  const shortId=req.params.shortId;
  const result=await URL.findOneAndUpdate(
  {
    shortId,
  },
  {$push:{
    visitHistory:{date:new Date()}
  }});
  if(!shortId || !result) return res.status(404).json({error:"Incorrect short link!!!"})

  var url=result.redirectURL;
  if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
     res.redirect(url);
    }else{
      res.redirect("http://"+url);
    }
}

async function handleAnalytics(req,res){
  const shortId=req.params.shortId;
  const result=await URL.findOne({shortId});
  if(!shortId || !result) return res.status(404).json({error:"Incorrect short link!!!"})
  return res.status(200).json({totalclicks:result.visitHistory.length,analytics:result.visitHistory})
}

async function handleGetLink(req,res){  
  try{
    const links=await URL.find({user:req.user.id});
    return res.send(links)
    // return res.send(req.user.id)
  }catch(e){
    return res.send(e)
  }
}

module.exports={handleGenerateNewShortURL,handleRedirectURL,handleAnalytics,handleGetLink}