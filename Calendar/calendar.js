window.onload = function(){
    this.thisMonthCalendar();
}

var today = new Date();
var date = new Date();

function prevCalendar(){
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    calendarBuild();
}

function thisMonthCalendar(){
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    calendarBuild();
}

function nextCalendar(){
    today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    calendarBuild();
}

function calendarBuild(){
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);

    var calendarTitle = document.getElementById('calendarTitle');
    calendarTitle.innerHTML = (firstDate.getMonth()+1) + "월";
    var calendar = document.getElementById('calendar');

    // 남은 테이블 줄 삭제??
    while (calendar.rows.length > 2){
        calendar.deleteRow(calendar.rows.length -1);
    };

    var row = null;
    var cell = null;

    row = calendar.insertRow();
    var cnt = 0; // 셀 개수 카운트

    // firstDate 시작날짜 전까지 빈 셀 생성
    for (let i = 0; i < firstDate.getDay(); i++){ //getDay() 0~6 요일
        cell = row.insertCell();
        cnt += 1;
    }

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++){
        cell = row.insertCell();
        cell.innerHTML = i;
        cnt += 1;

        if (cnt % 7 == 1){ // 일요일일때
        } else if (cnt % 7 == 0){ // 토요일일 때
            row = calendar.insertRow();
        }
    }
}