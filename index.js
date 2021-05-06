const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

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
      '7h%',
      'marketCap',
      'volume',
      'circulatingSupply'
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

const app = express()

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
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
})
