const cluster = require('cluster');


    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online.');
    });

if (cluster.isMaster) {
// fork some worker processes
    for (let i = 0; i < 10; i++) {
        cluster.fork();
        console.log(i);
    }
} else {
    console.log(cluster.isMaster);
}
