const nSchedule = require('node-schedule');
const { exec } = require("child_process");
const mongoose = require('mongoose');
const outputfile = '../automate-ookla-speedtest/internetspeed.json';


mongoose.connect('mongodb://localhost:27017/speedtestdb',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const speedTest = require('./models/speedtest.schema');

const job = nSchedule.scheduleJob('*/30 * * * *', function(){
    console.log('Job has been triggered at: ', new Date().toLocaleTimeString());
    exec("speedtest --format=json-pretty --unit=Mbps", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        const resultObj = JSON.parse(stdout);
        const newTest = new speedTest(resultObj);
        try {
            await newTest.save();
        } catch (error) {
            console.error(error);
        }
    });
});