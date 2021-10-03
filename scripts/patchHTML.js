/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

console.log("Patching HTML...")

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const code = fs.readFileSync(path.join(__dirname, "..", "dist", "index.html"));

const dom = new JSDOM(code);

dom.window.document.querySelector("head").innerHTML += `
    <div id="noscript">
        <h1 style="color: red; font-family: sans-serif; text-align: center">
            Dein Browser unterstützt kein JavaScript!
        </h1>
    </div>
    <link href="assets/incode-400.png" rel="icon" type="image/png"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-Type" content="text/html; utf-8" />
    <meta http-equiv="Pragma" content="cache" />
    <meta name="robots" content="INDEX,FOLLOW" />
    <meta http-equiv="content-Language" content="de" />
    <meta name="description" content="Der offizielle Editor für die InCode Programmiersprache von Ben Siebert und Lukas Birke." />
    <meta name="keywords" content="InCode, Editor, IDE, Ben Siebert, Lukas Birke" />
    <meta name="author" content="The InCode Developers" />
    <meta name="publisher" content="The InCode Developers" />
    <meta name="copyright" content="Copyright © 2021 The InCode Developers." />
    <meta name="audience" content="Alle" />
    <meta name="page-type" content="Software Download" />
    <meta name="page-topic" content="Computer" />
    <meta http-equiv="Reply-to" content="ben@mctzock.de" />
    <meta name="expires" content="" />
    <meta name="revisit-after" content="2 days" />
    <title>InCode Editor</title>
`

fs.writeFileSync(path.join(__dirname, "..", "dist", "index.html"), dom.serialize())
console.log("Patched HTML!")