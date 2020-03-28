var calendarTitle = document.getElementById('calendarTitle');
var calendar = document.getElementById('calendar');
var date = new Date(Date.now());

calendarTitle.innerHTML = date.getMonth()+1 + '월';

var firstDate = new Date(date.getFullYear(), date.getMonth(),1);
var lastDate = new Date(date.getFullYear(), date.getMonth()+1,0);
var dateCnt = firstDate.getDate();
var sevenCnt = 1;
var seven = 7;

var row = '';
var cell = '';

row = calendar.insertRow();
// calendar has 7 cols
for (var i = 1; i <= lastDate.getDate(); i++){
   while(sevenCnt <= seven){     
      cell = row.insertCell();
      cell.innerText = dateCnt;
      dateCnt++;
      sevenCnt++;
      if (sevenCnt > 7){
         sevenCnt = 1;
         row = calendar.insertRow();
         break;
      }
   };

   if 
} ;