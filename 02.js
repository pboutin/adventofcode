fs = require('fs')

var computeCodeFor = (textInput, keyPad, xPosInit, yPosInit) => {
    var xPos = xPosInit;
    var yPos = yPosInit;

    var buttons = {
        'U': () => yPos -= (yPos > 0 && keyPad[yPos - 1][xPos] ? 1 : 0),
        'D': () => yPos += (yPos < keyPad.length - 1 && keyPad[yPos + 1][xPos] ? 1 : 0),
        'L': () => xPos -= (xPos > 0 && keyPad[yPos][xPos - 1] ? 1 : 0),
        'R': () => xPos += (xPos < keyPad.length - 1 && keyPad[yPos][xPos + 1] ? 1 : 0)
    };

    return textInput.split('\n').reduce((buffer, line) => {
        if (line.length === 0) {
            return buffer;
        }
        line.split('').forEach((char) => buttons[char]())
        return buffer + keyPad[yPos][xPos];
    }, '');

}

fs.readFile('misc/02.txt', 'utf8', (err, textInput) => {
    if (err) {
        return console.log(err);
    }
    console.log('First code : ', computeCodeFor(textInput, [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9']
    ], 1, 1));

    console.log('Second code : ', computeCodeFor(textInput, [
        [null, null, '1', null, null],
         [null, '2', '3', '4', null],
          ['5', '6', '7', '8', '9'],
         [null, 'A', 'B', 'C', null],
        [null, null, 'D', null, null],
    ], 0, 2));
});
