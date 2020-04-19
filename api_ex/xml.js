// XMLHttpRequest 객체 생성
var request = new XMLHttpRequest();

var jsonURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";

// 영화진흥위원회 오픈 API key
var key = "?key=7129b7966563a262b3eec8de4c22addd";
var targetDt = "&targetDt=20180101";
var weekGb = "&weekGb=0";
var multiMovieYn = "&multiMovieYn=Y";

// API URL string
var urlString = jsonURL + key + targetDt + weekGb + multiMovieYn;

// Initialize XMLHttpRequest (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)
// 첫번째 파라미터는 GET, POST, PUT, DELETE 등
// 두번째 파라미터는 request를 보낼 URL
// 세번째 파라미터는 async boolean
request.open('GET', urlString , true);

//Send request
request.send();

// request의 상태(readyState)에 따라 반환 데이터를 어떻게 처리할 것인지 이벤트핸들러 추가
// https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener
// 첫번째 파라미터는 반응할 이벤트 유형을 나타내는 문자열
// 두번째 파라미터는 상기 타입의 이벤트가 발생했을 때 호출당하는 객체
// 세번째 파라미터는 상기의 함수가 preventDefault()를 호출할 것인지 말지 boolean
request.addEventListener("readystatechange", processRequest, false);

// request의 readyState에 변화가 있을 때마다 processRequest 객체를 호출함
request.onreadystatechange = processRequest;

function processRequest(e){
	// readyState == 4 data fully received
	// status == 200 request succeeded
	if (request.readyState == 4 && request.status == 200){
		var response = JSON.parse(request.responseText);
		var json = response.boxOfficeResult;
		var array = json.weeklyBoxOfficeList;

		for (var i = 0; i < array.length ; i++){
			console.log("번호: " + (i+1));
			console.log("영화제목: " + array[i].movieNm);
			console.log("누적관객수: " + array[i].audiAcc);
		}
	}
}