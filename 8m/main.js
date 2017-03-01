var pageIndex = 0;
var RIGHT_ASWERS = ['7 years', 'sun', 'blue', 'green', 'son', 'tola', 'family', 'crazy'];
var answers = [];


function nextPage() {
	document.getElementById("page"+pageIndex).classList.remove("active");
	pageIndex++;
	document.getElementById("page"+pageIndex).classList.add("active");

	if (pageIndex == 9) {
		result();
	} else if (pageIndex == 10) {
		salut();
	}

}

function answer(taskNumber, answer) {
	answers.push[answer];
	nextPage();
}

//for dev
setTimeout(function() {
	nextPage();
	nextPage();
	nextPage();
	nextPage();
	nextPage();
}, 500);