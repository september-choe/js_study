var calendarTitle = document.getElementById('calendarTitle');
var date = new Date(Date.now());

calendarTitle.innerHTML = date.getMonth()+1 + '월';

var firstDate = new Date(date.getFullYear(), date.getMonth(),1);
var lastDate = new Date(date.getFullYear(), date.getMonth()+1,0);

var seven = 7;

// calendar has 7 cols
// firstDate goes into...
for (var i = 1; i <= seven; i++){
   // (date.getDate / 7) * 10 + 1 --> calendar row
   // (date.getDate % 7)  --> calendar col

} 