fs = require('fs')

var getChecksumFor = (name) => {
    var hash = name.split('').reduce((buffer, letter) => {
        buffer[letter] = buffer[letter] ? buffer[letter] + 1 : 1;
        return buffer;
    }, {});

    var getNextLetterFrom = (hash) => {
        var candidate = Object.keys(hash).reduce((candidate, letter) => {
            if (hash[letter] > candidate.count ||
               (hash[letter] === candidate.count && letter < candidate.letter)) {
                return { letter: letter, count: hash[letter] };
            }
            return candidate;
        }, { letter: '', count: 0 });
        delete hash[candidate.letter];
        return candidate.letter;
    }

    var checksum = '';
    for (var i = 0; i < 5; i++) {
        checksum += getNextLetterFrom(hash);
    }
    return checksum;
}

var parse = (room) => {
    return {
        original: room,
        name: room.match(/[a-z\-]+/)[0].replace(/\-/g, ''),
        sectorId: parseInt(room.match(/\d+/)[0], 10),
        checksum: room.match(/\[.+\]/)[0].replace(/[\[\]]/g, '')
    };
}

var rotateName = (room) => {
    var rot = room.sectorId % 26;
    var decrypted = '';
    for (var letter of room.original.split('')) {
        if (letter === '-') {
            decrypted += ' ';
        } else if (/\d/.test(letter)) {
            room.name = decrypted.trim();
            return room;
        } else {
            var charCode = letter.charCodeAt();
            charCode += (charCode + rot > 122 ? -1 * (26 - rot) : rot);
            decrypted += String.fromCharCode(charCode);
        }
    }
    return null;
}

fs.readFile('misc/04.txt', 'utf8', (err, textInput) => {
    if (err) {
        return console.log(err);
    }

    var rooms = textInput.split('\n').filter((line) => !!line).map(parse);
    console.log(rooms);

    var sumOfValidIds = rooms.reduce((sum, room) => {
        return sum + (getChecksumFor(room.name) === room.checksum ? room.sectorId : 0)
    }, 0);

    var northPoleRoom = rooms.map(rotateName).find((room) => {
        return room.name.indexOf('north') > -1;
    });

    console.log('Sum of valid rooms : ', sumOfValidIds);
    console.log('North pole ID : ', northPoleRoom.sectorId);
});
