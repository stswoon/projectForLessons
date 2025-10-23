// function convertToSymbolMap(s) {
//     let m = {};
//     for (let i = 0; i < s.length; ++i) {
//         m[s[i]] = (m[s[i]] ?? 0) + 1;
//     }
//     return m;
// }
//
// function compareMaps(m1,m2) {
//     let keys1 = Object.keys(m1);
//         keys1.sort();
//     let keys2 = Object.keys(m2);
//         keys2.sort();
//
//     if (keys1.length !== keys2.length) {
//         return false;
//     }
//
//     for (let i = 0; i < keys1.length; ++i) {
//         if (keys1[i] !== keys2[i]) {
//             return false;
//         }
//     }
//
//     for (let i = 0; i < keys1.length; ++i) {
//         if (m1[keys1[i]] !== m2[keys1[i]]) {
//             return false;
//         }
//     }
//
//     return true;
// }
//
// var findAnagrams = function(s, p) {
//     const result = [];
//     let lenP = p.length;
//     let mP = convertToSymbolMap(p);
//     for(let i = 0; i < s.length + 1 - lenP; ++i) {
//         let subS = s.substring(i, i + lenP);
//         let mSubS = convertToSymbolMap(subS);
//         if (compareMaps(mP, mSubS)) {
//             result.push(i);
//         }
//     }
//     return result;
// };
//
// findAnagrams("abab", "ab")


var medianSlidingWindow = function (nums, k) {
    const res = []
    for (let i = 0; i < nums.length - k + 1; ++i) {
        let subNums = nums.slice(i, i + k);
        subNums.sort((a, b) => a - b);
        if (k % 2 === 0) {
            const n = Math.ceil(k / 2) - 1;
            const med = (subNums[n] + subNums[n + 1]) / 2;
            res.push(med);
        } else {
            const n = Math.ceil(k / 2) - 1;
            res.push(subNums[n]);
        }
    }
    return res;
};

medianSlidingWindow([1, 2, 3, 4], 2)