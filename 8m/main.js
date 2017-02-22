var pageIndex = 0;
var RIGHT_ASWERS = []
var answers = [];


function nextPage() {
	document.getElementById("page"+pageIndex).classList.remove("active")
	pageIndex++;
	document.getElementById("page"+pageIndex).classList.add("active")

	if (pageIndex == 11) {
		result();
	} else if (pageIndex == 12) {
		salut();
	}

}

function answer(taskNumber, answer) {
	answers.push[answer]
	nextPage();
}