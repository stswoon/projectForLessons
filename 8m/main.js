var pageIndex = 0;
var RIGHT_ASWERS = []
var answers = [];


function nextPage() {
	document.getElementById("page"+pageIndex).classList.remove("active")
	pageIndex++;
	document.getElementById("page"+pageIndex).classList.add("active")
}

function answer(taskNumber, answer) {
	answers.push[answer]
	nextPage();
}