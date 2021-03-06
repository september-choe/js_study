window.onload = function(){
    thisMonthCalendar();
}

var today = new Date();

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

    // calendar row 1 = 한달치 캘린더
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

    // 선택된 date가 속하는 year, month, day 가져오기
    var selectedYear = today.getFullYear();
    var selectedMonth = today.getMonth()+1;

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++){
        cell = row.insertCell();
        cell.innerHTML = "<span id='" + selectedYear + "-" + selectedMonth + "-" + i + "' onclick='showScheduleBoard(this.id)'>" + i +"</span>";
        cnt += 1;

        if (cnt % 7 == 1){ // 일요일일때
        } else if (cnt % 7 == 0){ // 토요일일 때
            row = calendar.insertRow();
        }
    }
}


// 캘린더 셀 누르면 스케줄보드 보이기
function showScheduleBoard(scheduleId){
    var scheduleId = scheduleId;
    document.getElementById(scheduleId).setAttribute('class','selected');

    var scheduleBoard = document.getElementById('scheduleBoard');
    scheduleBoard.style.display = 'flex';

    refreshScheduleOutput();

    loadSchedule(scheduleId);
}

// Add 버튼 누르면 
$("#scheduleAdd").click(function() {
    var scheduleInput = document.getElementById('scheduleInput');
    var scheduleContent = scheduleInput.value;

    var scheduleId = document.getElementsByClassName('selected')[0].getAttribute('id');
    saveSchedule(scheduleId, scheduleContent);

    scheduleInput.value = null;
    document.getElementById(scheduleId).removeAttribute('class');
});

// 스케줄목록 초기화
function refreshScheduleOutput(){
    // scheduleOutput div 초기화
    var scheduleOutput = document.getElementById('scheduleOutput');
    scheduleOutput.innerHTML = null;
}

// 스케줄목록 가져오기
function loadSchedule(scheduleId){
    var storedScheduleObjArr = JSON.parse(localStorage.getItem(scheduleId));

    if (storedScheduleObjArr != null){
        storedScheduleObjArr.forEach(v => {
            showSchedules(v.scheduleContent);
        });
    }
}

// 로컬스토리지에 스케줄아이디, 스케줄내용 저장
function saveSchedule(scheduleId, scheduleContent){
    
    var scheduleObj = {
        scheduleContent: scheduleContent
    }

    // 로컬스토리지에 해당 키가 이미 존재한다면
    if (localStorage.getItem(scheduleId) != null){
        console.log(JSON.stringify(localStorage[scheduleContent]));
        // var tmp = JSON.stringify(localStorage.getItem(scheduleId));
        // console.log(tmp); // "[{\"scheduleContent\":\"a,b,c\"}]"
    } else {
        var scheduleObjArr = [];
        scheduleObjArr.push(scheduleObj);
        localStorage.setItem(scheduleId, JSON.stringify(scheduleObjArr));
        scheduleObjArr = null;
    }

}

// scheduleOutput div 안에 li 달아서 화면에 스케줄 보이기
function showSchedules(scheduleContent){
    var li = document.createElement('li');

    scheduleOutput.appendChild(li).innerHTML = scheduleContent;
}


