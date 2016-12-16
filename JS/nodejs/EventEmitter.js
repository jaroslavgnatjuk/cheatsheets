//навешиваем на обьект stdout процесса слушатель событий data и на сам процесс событие close, (хотя можно и на поток)
//сохраняем куски данных в output переменной
const fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];

fs.watch(filename, () => {
    let ls = spawn('ls', ['-lh', filename]),
        output = '';

    ls.stdout.on('data', (chunk) => {
        output += chunk.toString();
        console.log(output);
    });

    ls.on('close', () => {
        console.log('close' + output);
    });

    console.log('File has been changed!');
});

console.log('start!');

//пример наследования от EventEmitter для создания врапера, который бы генерил сообщения, когда сообщение собирается из кусков
LDJClient = function(stream) {
    events.EventEmitter.call(this);
    let
        self = this,
        buffer = '';
    stream.on('data', function(data) {
        buffer += data;
        let boundary = buffer.indexOf('\n');
        while (boundary !== -1) {
            let input = buffer.substr(0, boundary);
            buffer = buffer.substr(boundary + 1);
            self.emit('message', JSON.parse(input));
            boundary = buffer.indexOf('\n');
        }
    });
};

//пример использования EventEmitter для поиска паттерна внутри файлов
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
function findPattern(files, regex) {
    var emitter = new EventEmitter();
    files.forEach(function(file) {
        fs.readFile(file, 'utf8', function(err, content) {
            if(err)
                return emitter.emit('error', err);
            emitter.emit('fileread', file);
            var match = null;
            if(match = content.match(regex))
                match.forEach(function(elem) {
                    emitter.emit('found', file, elem);
                });
        });
    });
    return emitter;
}

findPattern(
    ['fileA.txt', 'fileB.json'],
    /hello \w+/g
)
    .on('fileread', function (file) {
        console.log(file + ' was read');
    })
    .on('found', function (file, match) {
        console.log('Matched "' + match + '" in file ' + file);
    })
    .on('error', function (err) {
        console.log('Error emitted: ' + err.message);
    });
    
    

