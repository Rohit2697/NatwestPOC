const fs = require("fs");
const { parse } = require("csv-parse");
//const elasticClient = require('./elastic-client')
//const axios = require('axios')
const payload = []
fs.createReadStream("./Book.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", async function (row) {
        try {
            payload.push({
                feature: row[0].replaceAll('\n',''),
                code: row[1].replaceAll('\n',''),
                action: row[2].replaceAll('\n',''),
                ios: row[3].replaceAll('\n',''),
                android: row[4].replaceAll('\n','')
            })
            // let index = payload.findIndex(document => document.description === row[2])
            // if (index == -1) {
            //     payload.push({
            //         description: row[2],
            //         intent: [row[0]],
            //         label: row[1]
            //     })
            // }
            // else {
            //     payload[index].intent = [...payload[index].intent, row[0]]
            // }
            // const { data } = await axios.post('http://localhost:8081/create-post', {
            //     "intent": row[0],
            //     "label": row[1]
            // })
            // console.log(data)
        } catch (err) {
            console.log(err)
        }

    })
    .on("end", function () {
        try {
           // console.log(payload)
            fs.writeFile('deeplink.json', JSON.stringify(payload), 'utf8', (err) => {
                if (err) return console.error("error occured", err)
                console.log("file saved!!")
            })
            console.log("finished");
        } catch (err) {
            console.log(err)
        }

    })
    .on("error", function (error) {
        console.log(error.message);
    });

