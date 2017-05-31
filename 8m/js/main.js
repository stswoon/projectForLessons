var pageIndex = 0;
var RIGHT_ASWERS = ['7 years', 'sun', 'blue', 'green', 'son', 'tola', 'family', 'crazy'];
var answers = [];


function nextPage() {
	document.getElementById("page"+pageIndex).classList.remove("active");
	pageIndex++;
	document.getElementById("page"+pageIndex).classList.add("active");

	if (pageIndex == 9) {
		result();
	} 
}

function answer(taskNumber, answer) {
	answers.push(answer);
	nextPage();
}

function result() {
	var result = 0;
	for (var i = 0; i < RIGHT_ASWERS.length; ++i) {
		if (RIGHT_ASWERS[i] === answers[i]) {
			result++;
		}
	}
	document.getElementById("result").innerHTML = result;
	document.getElementById("result").textContent = result;
}

//for dev
//setTimeout(function() {
//	nextPage();
//	nextPage();
//	nextPage();
//	nextPage();
//	nextPage();
//}, 500);