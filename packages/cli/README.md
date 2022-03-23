
# InCode CLI

This is the official Command Line Tool (CLI) for the InCode Programming Language.



## Installation

Install the InCode CLI with npm

```bash
  npm install @incodelang/cli -g
```


## Options

| **Option** | **Description** | **Required** |
|-----|-----|----|
|``-i, --input <file>``|Specifies the input file that will be compiled|*yes*|
|``-o, --output <file>``|Specifies the compiling target|*yes*|
|``-f, --foce``|Force overwrites the output file if it exists|*no*|
|``-a, --save-ast``|Saves the Abstract Syntax Tree|*no*|
|``-s, --std-out``|Prints the compiled code to the standard output|*no*|

## Examples

```bash
    incode -i test.ic -o test.js -a -s -f
    incode -i test.ic -o test.js -a -s
    incode -i test.ic -o test.js -a
    incode -i test.ic -o test.js
```



## Authors

- [Ben Siebert](https://www.github.com/MCTzOCK)
- [Lukas Birke](https://www.github.com/MisterMysticOfficial)
## License

[GPL-3.0-only](https://choosealicense.com/licenses/gpl-3.0/)