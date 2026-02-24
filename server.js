import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

const cache = new Map();

app.get("/", (req,res)=>{
  res.send("Ultra Pro TikTok API Running 🚀");
});

app.get("/api", async (req,res)=>{

  const url = req.query.url;
  const key = req.query.apikey;

  if(key !== "xg_superfast_2026"){
    return res.json({error:"Invalid API Key"});
  }

  if(!url){
    return res.json({error:"URL Required"});
  }

  // Cache System
  if(cache.has(url)){
    return res.json(cache.get(url));
  }

  try{

    const api = await axios.get(
      "https://www.tikwm.com/api/?url="+encodeURIComponent(url)
    );

    const result = {
      title: api.data.data.title,
      author: api.data.data.author.nickname,
      hd: api.data.data.hdplay,
      nowm: api.data.data.play
    };

    cache.set(url,result);

    res.json(result);

  }catch{
    res.json({error:"Video Not Found"});
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
