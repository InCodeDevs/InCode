/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const {app} = require('../../server')
const fs = require("fs");
const path = require("path");
const express = require("express");
const serverIndex = require('serve-index');
const url = require("url");

if(!fs.existsSync(path.join(__dirname, '../../../template-public', 'templates.json'))) {
    fs.writeFileSync(path.join(__dirname, '../../../template-public', 'templates.json'), "{}")
}

if(!fs.existsSync(path.join(__dirname, '../../../template-public', 'templates'))) {
    fs.mkdirSync(path.join(__dirname, '../../../template-public', 'templates'))
}

app.use("/api/v1/template/data", express.static(path.join(__dirname, '../../../template-public')))

app.use("/api/v1/template/data", serverIndex(path.join(__dirname, '../../../template-public'), {
    icons: true
}))

app.get("/api/v1/template", (req, res) => {
    res.end("{\"error\": true, \"message\": \"Invalid API Endpoint.\"}")
})

app.get("/api/v1/template/upload", (req, res) => {
    let o = url.parse(req.url, true).query;
    let type = o.type;
    let name = o.name
    let code = o.code;
    if (fs.existsSync(path.join(__dirname, '../../../template-public', 'templates/', name + '.ic'))) {
        res.status(501)
        res.send("Already Exists")
    } else {

        console.log(code)
        fs.writeFileSync(path.join(__dirname, '../../../template-public', 'templates/', name + '.ic'), code);
        let j = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../template-public/templates.json')).toString());
        j[name] = {
            verified: false,
            directURL: "/api/v1/template/data/templates/" + name + ".ic",
            uploaded: new Date(),
            type: type
        }
        fs.writeFileSync(path.join(__dirname, '../../../template-public/templates.json'), JSON.stringify(j))
        res.status(200);
        res.send("Successful")
    }
})
