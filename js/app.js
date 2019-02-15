'use strict';

//helper functions
var _random = function(min,max){
  return Math.random()*(max-min)+min;
};
var store_open = 6;
var store_close = 20;

var Store = function(store_name,min_customer,max_customer,avg_cookies){
  this.store_name = store_name;
  this.min_customer = min_customer;
  this.max_customer = max_customer;
  this.avg_cookies = avg_cookies || 6.3;
  this.cookies_sold_each_hour = [];
  this.total_cookies = [];
  this.daily_hour_total = [];
};

Store.prototype.calculate_cookies_per_hour = function(){
  var random_customers = Math.floor(_random(this.min_customer,this.max_customer));
  return Math.floor(this.avg_cookies * random_customers);
};

Store.prototype.caulculate_cookies_sold_each_hour = function(){
  for(var i = store_open; i < store_close; i++){
    var cookies_sold = this.calculate_cookies_per_hour();
    this.cookies_sold_each_hour.push(cookies_sold);
  }
};

Store.prototype.calculate_total_cookies = function(){
  var resultSum = 0;
  for(var i = 0; i < this.cookies_sold_each_hour.length; i++){
    resultSum += this.cookies_sold_each_hour[i];
  }
  this.total_cookies.push(resultSum);
};

Store.prototype.calculate_daily_hour_total = function(){
  var hour_total = 0;
  for(var i = store_open; i < store_close; i++){
    var total = 0;
    for(var j = 0; j < 4; j++){
      total += all_stores[j].cookies_sold_each_hour[i];
    }
    hour_total += total;
    this.daily_hour_total.push(hour_total);
  }
  console.log(this.daily_hour_total);
};



Store.prototype.render = function(){

  this.caulculate_cookies_sold_each_hour();
  this.calculate_total_cookies();
  // this.calculate_daily_hour_total();

  var target = document.getElementById('store-container');
  // var table_el = document.createElement('table');
  var tr_el = document.createElement('tr');
  var td_el = document.createElement('td');

  //add store name
  td_el = document.createElement('td');
  td_el.textContent = this.store_name;
  tr_el.appendChild(td_el);

  //add cookies for each hour
  for(var i = 0; i < this.cookies_sold_each_hour.length; i++){
    td_el = document.createElement('td');
    td_el.textContent = this.cookies_sold_each_hour[i] + ' cookies';
    tr_el.appendChild(td_el);
  }

  //add location total
  td_el = document.createElement('td');
  td_el.textContent = this.total_cookies + ' cookies';
  tr_el.appendChild(td_el);

  //add daily hour total
  // var hour_total = document.getElementById('"overall-total');
  // var tr_el_footer = document.createElement('tr');
  // var td_el_footer = document.createElement('td');
  // td_el_footer.textContent = 'Hourly totals';

  // tr_el_footer.appendChild(td_el_footer);

  // hour_total.appendChild(tr_el_footer);

  target.appendChild(tr_el);
};

function footer(){
  var footer_total = document.getElementById('overall-total');
  var tr_el = document.createElement('tr');
  tr_el.id = 'footer-tr';
  var td_el = document.createElement('td');
  td_el.textContent='Total';
  tr_el.appendChild(td_el);
  var hour_total = 0;
  for(var i = 0; i < 14; i++){
    var total = 0;
    for(var j = 0; j < all_stores.length ; j++){
      total += all_stores[j].cookies_sold_each_hour[i];
    }
    td_el=document.createElement('td');
    td_el.textContent=total;
    tr_el.appendChild(td_el);
    hour_total += total;
  }
  td_el = document.createElement('td');
  td_el.textContent = hour_total;
  tr_el.appendChild(td_el);
  footer_total.appendChild(tr_el);

  var footer_update= document.getElementById('footer-tr');

  for(var l = 0; l < hour_total.length; l++)
    footer_update.childNodes.length.textContent= hour_total[l];
}



//instantiating objects

var pike = new Store('Pike and 1st', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);


var all_stores = [pike,seaTac,seattleCenter,capitolHill,alki];


for(var i = 0; i < all_stores.length; i++){
  all_stores[i].render();
}
footer();
var form = document.getElementById('new-store-form');

// function footer_update(){
//   var footer_total = document.getElementById('overall-total');
//   var hour_total = 0;
//   for(var i = 0; i < 14; i++){
//     var total = 0;
//     for(var j = 0; j < all_stores.length ; j++){
//       total += all_stores[j].cookies_sold_each_hour[i];
//     }
//     var td_el.textContent=total;
//     tr_el.appendChild(td_el);
//     hour_total += total;
//   }
//   td_el = document.createElement('td');
//   td_el.textContent = hour_total;
//   tr_el.appendChild(td_el);
//   footer_total.appendChild(tr_el);
//   td_el = document.clear

// }


//collect form response by adding event listener
form.addEventListener('submit',function(submitForm){
  submitForm.preventDefault(); //doesn't refresh page
  var store_name = submitForm.target.store_name.value;
  var min_customer = submitForm.target.min_customer.value;
  var max_customer = submitForm.target.max_customer.value;
  var avg_cookies = submitForm.target.avg_cookies.value;

  var new_store = new Store(store_name,min_customer,max_customer,avg_cookies);
  
  new_store.render();

  all_stores.push(new_store);
  
 

});




