const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
    console.log("aaaaaaaaaaaaa");
    var sc = req.body.sc;
    console.log(sc);
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '55f55e265bmshb1c59a0d35fc62cp1b4572jsn0adf876da6fa',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: 50,
            source_code: (sc)
        }
    };

    var token = "";

    try {
        axios.request(options).then((response)=>{
            token = response.data.token;

            console.log(token);

            const opt = {
                method: 'GET',
                url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
                params: {
                token: token,
                base64_encoded: 'true',
                fields: '*'
                },
                headers: {
                'X-RapidAPI-Key': '55f55e265bmshb1c59a0d35fc62cp1b4572jsn0adf876da6fa',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            };
            
            try {
                axios.request(opt).then((result)=>{
                    res.send(atob(result.data.stdout).replaceAll('\n', '<br>'));
                });
            } catch (error) {
                console.error(error);
            }

        })
    } catch (error) {
        console.error(error);
    }

});

app.listen(3000, () => {
    console.log("Server started on port 3000!");
});

