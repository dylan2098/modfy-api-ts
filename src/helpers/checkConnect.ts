const _SECONDS = 5000;
import os from 'os';
import process from 'process';

const checkOverload = () => {
    setInterval(() => {
        // count connection ... <code check>
        const numConnections = 40;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximum number of connections based on number of cores
        // Example: my computer has 5 cores and can suffer 5 connection;

        const maxConnections = numCores * 5;

        console.log('active connections: ' + numConnections);
        console.log(`Memory ussage: ${memoryUsage / 1024 / 1024}`)

        if(numConnections > maxConnections) {
            console.log('Connetion overload detected. Please upgrade this server');
            // notify send team
        }

    }, _SECONDS) // Monitor every 5 seconds
}