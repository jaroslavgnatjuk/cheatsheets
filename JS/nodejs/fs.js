//наблюдаем за изменением файла и если оно было стартуем отдельным процессом команду ls и переводим ее вывод в стандартный вывод основного процесса
const fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];

fs.watch(filename, () => {
    let ls = spawn('ls', ['-lh', filename]);
    ls.stdout.pipe(process.stdout);
    console.log('File has been changed!');
});

console.log('start!');

//простое чтение файла целиком
fs.readFile('test.php', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});

//простая запись в файл
fs.writeFile('target.txt', 'a witty message', function (err) {
if (err) {
throw err;
}
console.log("File saved!");
});

//чтение через потоки, программа аналогичная cat
require('fs').createReadStream(process.argv[2]).pipe(process.stdout);

//или аналогично через события
const
    fs = require('fs'),
    stream = fs.createReadStream(process.argv[2]);
stream.on('data', function(chunk) {
    process.stdout.write(chunk);
});
stream.on('error', function(err) {
    process.stderr.write("ERROR: " + err.message + "\n");
});

//ЗАДАНИЕ: добавить реакцию на удаленный файл который мониторится и передача в ком.строке параметров для генерации дочернего процесса
const fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2],
    cmd = process.argv[3],
    params = process.argv.slice(4);

if (!cmd) {
    console.log('bad params');
    return;
}

fs.watch(filename, function () {
if (!fs.existsSync(filename)) {
    console.dir('no file');
    process.exit(1);
}

    let childProcess = spawn(cmd, params);
    childProcess.stdout.pipe(process.stdout);
});

console.log(`start ${filename} ${cmd} ${params} !!!`);


