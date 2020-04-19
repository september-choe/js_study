$(document).ready(function() {
	var jsonURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
	var key = "?key=7129b7966563a262b3eec8de4c22addd";
	var targetDt = "&targetDt=20180101";
	var weekGb = "&weekGb=0";
	var multiMovieYn = "&multiMovieYn=Y";
    var urlString = jsonURL + key + targetDt + weekGb + multiMovieYn;
    
	$.ajax({
		url: urlString,
		type:'GET',
		dataType: 'json',
		success: function(success){
            var data = success.boxOfficeResult.weeklyBoxOfficeList;

            for (let i = 0; i < data.length; i++){
                console.log("번호: " + (i+1));
                console.log("영화제목: " + data[i].movieNm);
                console.log("누적관객수: " + data[i].audiAcc);
            }
		},
		error: function(){
			alert('fail');
		}
	});
});