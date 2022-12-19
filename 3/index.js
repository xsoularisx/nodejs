const fs = require("fs");
const readline = require("readline");

const readStream = fs.createReadStream("./access.log", "utf-8");

const ip_1 = "89.123.1.41";
const ip_2 = "34.48.240.111";

const writeStream_1 = fs.createWriteStream(`${ip_1}_requests.log`);
const writeStream_2 = fs.createWriteStream(`${ip_2}_requests.log`);

let numStr = 0;

const rl = readline.createInterface({
    input: readStream,
});

rl.on("line", line => {
    if (line.includes(ip_1)) {
        writeStream_1.write(line + "\n");
    }

    if (line.includes(ip_2)) {
        writeStream_2.write(line + "\n");
    }
    console.log(++numStr);
});