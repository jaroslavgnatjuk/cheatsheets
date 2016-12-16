//создаем сервер слушающий порт 5432, через telnet тестируем подключение новых коннектов, 
//собираем массив коннектов, при событии изменения файла оповещаем все коннекты
'use strict';
const
    fs = require('fs'),
    net = require('net'),
    filename = process.argv[2],
    subscribers = [],
    server = net.createServer(function(connection) {
// reporting
        console.log('Subscriber connected.');
        connection.write("Now watching '" + filename + "' for changes...\n");

        subscribers.push(connection);

// cleanup
        connection.on('close', function() {
            console.log('Subscriber disconnected.');
            watcher.close();
        });
    });

let watcher = fs.watch(filename, function() {
    subscribers.forEach(con => con.write("File '" + filename + "' changed: " + Date.now() + "\n"));
});

if (!filename) {
    throw Error('No target filename was specified.');
}
server.listen(5432, function() {
    console.log('Listening for subscribers...');
});

$ telnet localhost 5432


//для unix-сокетов (не сетевых, а файловых на одном комьпютере)
server.listen('/tmp/watcher.sock', ....)

$nc -U /tmp/watcher.sock

//создаем клиента - конннект к серверу
let client = net.createConnection({port: 5432}); // или let client = net.connect({port: 5432});
client.on('data', (chunk) => {
    console.log(chunk.toString());
});



