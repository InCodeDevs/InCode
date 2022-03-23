#!/usr/bin/env node

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs');
const path = require('path');
const {program} = require('commander');
const logger = require('./logger');
const {Compiler} = require("@incodelang/compiler");

program.name("incode")

program.version(JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json")).toString()).version);

program
    .requiredOption("-i, --input <file>", "Specify the InCode file you want to compile.")
    .option("-a, --save-ast", "Save the Abstract-Syntax-Tree File.")
    .requiredOption("-o, --output <file>", "Set the output file.")
    .option("-s, --std-out", "Print the compiled code to the Standard Output.", false)
    .option("-f, --force", "Force overwrite the output file if it exists.", false)

program.parse();

const opts = program.opts();

const input = opts.input;
const output = opts.output;
const force = opts.force;

if(!fs.existsSync(input)) {
    console.log(`Could not find the input ${input}`, 2)
    process.exit(1)
}

if(fs.existsSync(output) && !force){
    console.log(`The output file ${output} does already exist and the option -f (--force) is not set.`, 2)
    process.exit(1)
}

const inCodeContent = fs.readFileSync(input).toString();
let outputContent;
if(isValidJSON(inCodeContent)){
    outputContent = JSON.parse(inCodeContent);
}else {
    outputContent = Compiler.compile(inCodeContent);
}

if(opts.stdOut) {
    logger.__print(outputContent);
}

if(opts.saveAst) {
    let ast;
    if(isValidJSON(inCodeContent)){
        ast = JSON.parse(inCodeContent);
    }else {
        ast = Compiler.compile(inCodeContent);
    }
    fs.writeFileSync(output + ".ast", JSON.stringify(ast))
}

fs.writeFileSync(output, outputContent);

function isValidJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}