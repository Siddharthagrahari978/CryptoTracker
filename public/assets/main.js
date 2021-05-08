function caretColor(){
  var caretUp = document.getElementsByClassName('icon-Caret-up')
  for(var i = 0; i< caretUp.length; i++){
    caretUp[i].innerHTML = "<i class=\"mr-5 fas fa-caret-up text-success\"></i>"
  }

  var caretDown = document.getElementsByClassName('icon-Caret-down')
  for(var i = 0; i< caretDown.length; i++){
    caretDown[i].innerHTML = "<i class=\"mr-5 fas fa-caret-down text-danger\"></i>"
  }
}


let topFour = document.querySelector("#topFour")

const url = '/api/coinInfo'
const apicall = async () => {
  const response = await fetch(url)
  var data = await response.json();
  topFour.innerHTML = ""
  for(var i = 0; i <= 3; i++){
    topFour.innerHTML = topFour.innerHTML + 
    `<div class="col-md-3 mw-full">
      <div class="card p-1">
        <div class="text-center">
          <h3 class="mt-0 mb-0">${data[i]['name']}</h3>
          <p class="text-muted">Price: ${data[i]['price']}</p>
          <div class="text-primary">
            Fluctuation(%)
            <div class="mt-0 content mb-0">
              <div class="row">
                <div class="col-6 text-left"><span class="ml-15">24h</span> <br> ${data[i]['24h%']}</div>
                <div class="col-6 text-right"><span class="mr-15">7d</span> <br> ${data[i]['7d%']}</div>
              </div>
            </div>
          </div>
          <p class="text-muted">Market Cap: ${data[i]['marketCap']}</p>
          <p class="text-muted">Circulating Supply: ${data[i]['circulatingSupply']}</p>
        </div>
      
        <div class="border-left border-bottom mt-20">${data[i]['last7days']}</div>
      </div>
    </div>`
  }
  
  caretColor()
}
apicall()

