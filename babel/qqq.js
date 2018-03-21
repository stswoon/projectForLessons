//https://www.hackerrank.com/challenges/anagram/problem
function anagram(s){
    let halfL = Math.ceil(s.length/2);
    sA = s.substr(0, halfL);
    sB = s.substr(halfL);
    
    if (sA.length !== sB.length) {
        return -1;
    }

    let arrB = sB.split("");
    sA.split("").forEach(function(char) {
        let index = arrB.indexOf(char);
        index > -1 && arrB.splice(index,1);
    });
    return arrB.length;
}

anagram("xaxbbbxx")


function anagramPerformance(s){
    let halfL = Math.ceil(s.length/2);
    sA = s.substr(0, halfL);
    sB = s.substr(halfL);
    
    if (sA.length !== sB.length) {
        return -1;
    }
    
    function stat(arr) {
      var m = {};
      arr.forEach(item => m[item] = (m[item] || 0) + 1);
      return m;
    }
    
    let statA = stat(sA.split(""));
    let statB = stat(sB.split(""));   
    for (let key in statA) {
        if (statB[key]) {
			if (statA[key] == statB[key]) {
				statA[key] = 0;
				statB[key] = 0
			} else if (statA[key] > statB[key]) {
				statA[key] = statA[key] - statB[key];
				statB[key] = 0;
			} else if (statA[key] < statB[key]) {
				statB[key] = statB[key] - statA[key];
				statA[key] = 0;
			}
        } 
    }
    let diff = 0;
    Object.keys(statA).forEach(key => diff += statA[key]);
    //Object.keys(statB).forEach(key => diff -= statB[key]);
   
    //console.log(diff);
    return diff;
}
anagramPerformance("xaxbbbxx")