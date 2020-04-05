window.onload = function(){
    this.thisMonthCalendar();
    loadSchedules();
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

    // 선택된 date가 속하는 year, month, day 가져오기
    var selectedYear = today.getFullYear();
    var selectedMonth = today.getMonth()+1;

    // 달력 출력
    for (let i = 1; i <= lastDate.getDate(); i++){
        cell = row.insertCell();
        cell.innerHTML = "<span id='" + selectedYear + "-" + selectedMonth + "-" + i + "' onclick='addSchedule(this.id)'>" + i +"</span>";
        cnt += 1;

        if (cnt % 7 == 1){ // 일요일일때
        } else if (cnt % 7 == 0){ // 토요일일 때
            row = calendar.insertRow();
        }
    }
}

let scheduleObjArr = [];

// 일정등록 모달열기
function addSchedule(scheduleId){
    var localStorageKey = scheduleId;
    var scheduleId = scheduleId;
    var modalWrapper = document.getElementById('modalWrapper');
    modalWrapper.style.display = 'flex';

    var add = document.getElementById('add');
    var close = document.getElementById('close');

    add.onclick = () =>{
        var scheduleContent = document.getElementById('scheduleContent').value;

        const scheduleObj = {
            scheduleId: scheduleId,
            scheduleContent: scheduleContent
        };
        
        scheduleObjArr.push(scheduleObj);
        console.log(scheduleObjArr);
        saveSchedules(localStorageKey);

        modalWrapper.style.display = 'none';
        loadSchedules();
        
    }

    close.onclick = () =>{
        modalWrapper.style.display = 'none';
    }
};

function saveSchedules(localStorageKey){
    var localStorageKey = localStorageKey;
    localStorage.setItem(localStorageKey, JSON.stringify(scheduleObjArr));
}

function loadSchedules(){
    const loadSchedules = localStorage.getItem(localStorageKey);

    // 배열 초기화
    // scheduleObjArr = [];

    if (loadSchedules !== null){ // load할 스케줄이 있다면
        const parsedSchedules = JSON.parse(loadSchedules);
        parsedSchedules.forEach(function(v){
            showSchedules(v.scheduleId, v.scheduleContent);
            // console.log(v.scheduleContent);
        })
    } else {
        console.log('load error');
    }
}

function showSchedules(scheduleId, scheduleContent){
    var scheduleId = scheduleId;
    let localStorageKey = scheduleId;
    // console.log(scheduleId);
    var scheduleContent = scheduleContent;
    // var selectedDate = document.querySelector(`#${scheduleId}`); // querySelector에서는 숫자로 된 id 지원하지 않음
    var selectedDate = document.getElementById(scheduleId); // ok
    // console.log(selectedDate);

    const li = document.createElement('li');
    const span = document.createElement('span');

    // parsedSchedules.forEach(function(v){
        // if (v.scheduleId == scheduleId){
            selectedDate.appendChild(li).appendChild(span).innerHTML = scheduleContent;
        // }
    // })
    
}