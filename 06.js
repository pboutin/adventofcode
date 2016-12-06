fs = require('fs')

var getCharFor = (index, lines, mostFrequent) => {
    var hash = {};
    lines.forEach((line) => {
        hash[line[index]] = hash[line[index]] ? hash[line[index]] + 1 : 1;
    });

    var tempCount = mostFrequent ? 0 : Infinity;
    return Object.keys(hash).reduce((nextLetter, char) => {
        if ((mostFrequent && hash[char] > tempCount) ||
            ( ! mostFrequent && hash[char] < tempCount)) {

            nextLetter = char;
            tempCount = hash[char];
        }
        return nextLetter;
    }, '')
}

fs.readFile('misc/06.txt', 'utf8', (err, textInput) => {
    if (err) {
        return console.log(err);
    }

    var lines = textInput.split('\n').filter((line) => !!line);

    var answer_v1 = '';
    var answer_v2 = '';

    for (var index = 0; index < lines[0].length; index++) {
        answer_v1 += getCharFor(index, lines, true);
        answer_v2 += getCharFor(index, lines, false);
    }

    console.log('Message v1 : ', answer_v1);
    console.log('Message v2 : ', answer_v2);
});
