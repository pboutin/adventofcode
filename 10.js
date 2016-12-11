fs = require('fs')

var instructions = [];
var bots = {};
var output = {};

var setValueFor = (key, value) => {
    var target = key.indexOf('bot') == 0 ? bots : output;
    if (target[key]) {
        target[key].push(value);
    } else {
        target[key] = [value];
    }
};

fs.readFile('misc/10.txt', 'utf8', (err, textInput) => {
    if (err) {
        return console.log(err);
    }

    var lines = textInput.split('\n').filter((line) => !!line);

    lines.forEach((instruction) => {
        if (instruction.indexOf('value') == 0) {
            var parsedInstruction = /value (\d+) goes to (bot \d+)/.exec(instruction);
            setValueFor(parsedInstruction[2], parseInt(parsedInstruction[1], 10));
        } else {
            instructions.push(instruction);
        }
    });

    var instructionIndex = 0;
    while (instructions.length) {
        var parsedInstruction = /(bot \d+) gives low to (\w+ \d+) and high to (\w+ \d+)/.exec(instructions[instructionIndex]);
        var sourceBot = parsedInstruction[1];
        var lowerTarget = parsedInstruction[2];
        var higherTarget = parsedInstruction[3];

        if (bots[sourceBot] && bots[sourceBot].length == 2) {
            var lowerValue = Math.min(...bots[sourceBot]);
            var higherValue = Math.max(...bots[sourceBot]);

             if (lowerValue === 17 && higherValue === 61) {
                 console.log('Bot comparing 17 with 61 : ', sourceBot);
             }

            setValueFor(lowerTarget, lowerValue);
            setValueFor(higherTarget, higherValue);
            delete bots[sourceBot];
            instructions.splice(instructionIndex, 1);
            instructionIndex = 0;
        } else {
            instructionIndex++;
        }
    }
    console.log('Output chips for 0, 1 and 2 : ', output['output 0'] * output['output 1'] * output['output 2']);
});
