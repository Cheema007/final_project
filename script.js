import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
    vus: 1000, // Number of virtual users
    duration: '30s', // Test duration
};

export default function () {
    let res = http.get('http://a9fccb21d7789402cb6d4119898d82aa-765672355.ap-northeast-3.elb.amazonaws.com/'); // Replace with your LoadBalancer URL of the frontend service

    check(res, {
        'is status 200': (r) => r.status === 200, // Ensure the response is OK
        'response time < 500ms': (r) => r.timings.duration < 500, // Check response time
    });

    sleep(1); // Pause for 1 second between requests
}

// Command to run the test
// Launch a new EC2 machine or on your local machine
// Install k6 on the machine
// sudo apt update
// sudo apt install k6 -y

// k6 run --vus 1000 --duration 30s --out json=output.json script.js
