fs = require('fs')

var rect = (x, y, screen) => {
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            screen[i][j] = true;
        }
    }
    return screen;
};

var rotateColumn = (x, screen) => {
    var lastPixel = screen[screen.length - 1][x];
    for (var i = screen.length - 2; i >= 0; i--) {
        screen[i + 1][x] = screen[i][x];
    }
    screen[0][x] = lastPixel;
    return screen;
};

var rotateRow = (y, screen) => {
    var lastPixel = screen[y][screen[0].length - 1];
    for (var j = screen[0].length - 2; j >= 0; j--) {
        screen[y][j + 1] = screen[y][j];
    }
    screen[y][0] = lastPixel;
    return screen;
};

var countPixelsFor = (screen) => {
    return screen.reduce((count, row) => {
        return count + row.reduce((subCount, cell) => {
            return subCount + (!!cell ? 1 : 0);
        }, 0);
    }, 0);
};

var display = (screen) => {
    screen.forEach((row) => {
        console.log(row.reduce((tempRow, cell) => {
            return tempRow + (!!cell ? '#' : ' ');
        }, ''))
    });
}

fs.readFile('misc/08.txt', 'utf8', (err, textInput) => {
    if (err) {
        return console.log(err);
    }

    var instructions = textInput.split('\n').filter((line) => !!line);

    var screen = []
    for (var i = 0; i < 6; i++) { screen.push(new Array(50)) }

    instructions.forEach((instruction) => {
        var tempInstr = /rect (\d+)x(\d+)/.exec(instruction);
        if (tempInstr) {
            screen = rect(parseInt(tempInstr[1], 10), parseInt(tempInstr[2], 10), screen);
            return;
        }
        tempInstr = /rotate row y=(\d+) by (\d+)/.exec(instruction);
        if (tempInstr) {
            for (var i = 0; i < parseInt(tempInstr[2], 10); i++) {
                screen = rotateRow(parseInt(tempInstr[1], 10), screen);
            }
            return;
        }
        tempInstr = /rotate column x=(\d+) by (\d+)/.exec(instruction);
        if (tempInstr) {
            for (var i = 0; i < parseInt(tempInstr[2], 10); i++) {
                screen = rotateColumn(parseInt(tempInstr[1], 10), screen);
            }
            return;
        }
        throw 'Uncatched instruction : ' + instruction;
    });

    console.log('Pixels on : ', countPixelsFor(screen));
    display(screen);
});
