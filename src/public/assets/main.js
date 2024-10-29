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
let topTen = document.querySelector("#topTen")
const url = '/api/coinInfo'
const apicall = async () => {
  const response = await fetch(url)
  var data = await response.json();
  console.log(data);
  topFour.innerHTML = ""
  for(var i = 0; i <= 3; i++){
    topFour.innerHTML = topFour.innerHTML + 
    `<div class="col-md-3 mw-full">
      <div class="card p-1 ml-10 mr-10" style="height:28.5rem">
        <div class="text-center">
          <h3 class="mt-0 mb-0">${data[i]['name']}</h3>
          <p class="text-muted">Price: ${data[i]['price']}</p>
          <div class="text-primary">
            <span class="mb-6 font-weight-bold font-size-16">Fluctuation</span>
            <div class="mt-0 content mb-0">
              <div class="row">
                <div class="col-6 text-left"><span class="font-weight-bold ml-15">24h</span> <br> ${data[i]['24h%']}</div>
                <div class="col-6 text-right"><span class="font-weight-bold mr-15">7d</span> <br> ${data[i]['7d%']}</div>
              </div>
            </div>
          </div>
          <p class="text-muted">Market Cap:
          <br>
          ${data[i]['marketCap']}</p>
          <p class="text-muted">Circulating Supply:
          <br>
          ${data[i]['circulatingSupply']}</p>
        </div>
      
        <!-- <div class="border-left border-bottom mt-20">${data[i]['last7days']}</div> --> 
      </div>
    </div>`
  }
  for(var i = 4; i<data.length; i++){
    topTen.innerHTML = topTen.innerHTML + 
      `<div class="6th-10th row mb-15 mt-15 font-size-16">
        <div class="col-md-1 font-weight-bold">${data[i]['rank']}</div>
        <div class="col-md-2">${data[i]['name']}</div>
        <div class="col-md-2">${data[i]['price']}</div>
        <div class="col-md-1">${data[i]['24h%']}</div>
        <div class="col-md-1">${data[i]['7d%']}</div>
        <div class="col-md-2" style="margin-left:4rem;">${data[i]['marketCap']}</div>
        <div class="col-md-2">${data[i]['circulatingSupply']}</div>
      </div>`
  }
  
  caretColor()
}
apicall()

$(window).resize(function() {
  if ($(window).width() <= 768) {
      $("#topTen").addClass('text-center');
      $(".6th-10th").addClass('pb-15');
      document.querySelector("#tableTitles").style.display = 'none';
  }
  if ($(window).width() > 768) {
    $("#topTen").removeClass('text-center');
    $(".6th-10th").removeClass('pb-15');
    document.querySelector("#tableTitles").style.display = 'block';
  }
});
