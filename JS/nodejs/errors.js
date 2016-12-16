//пример обработки ошибок в асинхронном коде в стиле node.js
var fs = require('fs');
function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
        var parsed;
        if(err)
//propagate the error and exit the current function
            return callback(err);
        try {
//parse the file contents
            parsed = JSON.parse(data);
        } catch(err) {
//catch parsing errors
            return callback(err);
        }
//no errors, propagate just the data
        callback(null, parsed);
    });
};


//таким образом можно обработать ошибки, которые не учтены ранее ни где в коде
process.on('uncaughtException', function(err){
    console.error('This will catch at last the ' +
        'JSON parsing exception: ' + err.message);
//without this, the application would continue
    process.exit(1);
});

