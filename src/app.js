const express = require("express");
const app = express.Router();
const cheerio = require('cheerio')
const axios = require('axios')
const path = require('path');

// app.get('/',(req,res)=>{
//   return res.json({
//     message:"Hello!!"
//   })
// })

const getPriceFeed = async () => {
  try {
    const siteURL = 'https://coinmarketcap.com/'
    const {data} = await axios({
      method: 'GET',
      url: siteURL
    })
    const $ = cheerio.load(data)
    let elemSelector = '.cmc-table > tbody:nth-child(3) > tr'

    const key = [
      'rank',
      'name',
      'price',
      '24h%',
      '7d%',
      'marketCap',
      'volume',
      'circulatingSupply',
      'last7days'
    ]

    const coinArray = []

    $(elemSelector).each((parentIdx, parentElem)=>{
      let keyIdx = 0
      const coinObj = {}
      if(parentIdx <= 9){
        $(parentElem).children().each((childIdx, childElem) => {
          let childElemVal = $(childElem).text()
          
          if(keyIdx === 1 || keyIdx === 6 ){
            
            childElemVal = $('p:first-child',$(childElem).html()).text()
            
          }
          if(keyIdx === 3 || keyIdx === 4){
            childElemVal = $(childElem).children().children().toString() + $(childElem).text()
          }

          if(keyIdx === 8){
            childElemVal = $(childElem).children().children().toString()
          }
          
          if(childElemVal){
            
            coinObj[key[keyIdx]] = childElemVal

            keyIdx++
          }
        })

        coinArray.push(coinObj)
      }
    })
    return coinArray
  } catch (error) {
    console.log(error)
  }
}

const staticFolderPath = path.join(__dirname, 'public');
app.use(express.static(staticFolderPath))
app.get('/', (req, res) => {
  res.sendFile(path.join(staticFolderPath, 'index.html')); 
});
app.get('/assets/favicon.ico', (req, res) => {
  res.sendFile(path.join(staticFolderPath,'assets/favicon.ico')); 
});

app.get('/api/coinInfo', async (req, res) => {
  try {
    const coinInfo = await getPriceFeed()

    return res.status(200).json(coinInfo)
  } catch (error) {
    return res.status(500).json({
      err: error.toString()
    })
  }
})

module.exports = app;