/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as Blockly from 'blockly'

export class BlocklyCompiler {

    private compiledBlocks: any[] = [];

    compile(): string {
        let code = "";
        Blockly.getMainWorkspace().getAllBlocks(true).forEach(block => {
            if (!this.compiledBlocks.includes(block)) {
                code += this.compileBlock(block);
            }
        })
        return code;
    }

    private compileBlock(block: Blockly.Block): string {

        this.compiledBlocks.push(block);

        let code = "";

        let b = block.getInputTargetBlock("STATEMENT");

        if (b) {
            code += this.getBlockTabs(block, true) + this.getBlockText(block) + "\n"
            do {
                this.compiledBlocks.push(b);
                code += this.getBlockTabs(b, true) + this.compileBlock(b) + "\n";
            } while (b = b.getNextBlock());
        } else {
            code += this.getBlockTabs(block, true) + this.getBlockText(block) + "\n"
        }

        return code;
    }

    private getBlockTabs(block: Blockly.Block, log: boolean = false, b1: boolean = true): string {
        let tabs = "";

        let currentBlock = block;

        if (block.getParent() != null && b1) {
            let neededTabs = -1;
            neededTabs = neededTabs + this.getBlockTabs(block.getParent(), log, true).length;
            if (block.getParent().getInputTargetBlock("STATEMENT"))
                neededTabs++;
            console.log(neededTabs)
            // tabs = this.getBlockTabs(block.getParent(), log, false);
            for (let i = 0; i < neededTabs; i++) {
                tabs += "\t";
            }
        }

        while (currentBlock.getParent() != null) {
            let b = currentBlock.getParent().getInputTargetBlock("STATEMENT");

            if (b) {
                do {
                    if (b === block) tabs += "\t";
                } while (b = b.getNextBlock());
            }
            currentBlock = currentBlock.getParent();
        }
        // debug
        if (log) {
            console.log(JSON.stringify(tabs))
        }

        return tabs;
    }

    private canHasInnerCode(block: Blockly.Block): boolean {
        let canHasInnerCode = false;
        block.inputList.forEach(i => {
            if (!canHasInnerCode) {
                canHasInnerCode = i.type === 3;
            }
        })
        return canHasInnerCode
    }

    private getBlockText(block: Blockly.Block): string {
        let c = "";
        block.inputList.forEach(i => {
            i.fieldRow.forEach(r => {
                if (r.value_ != "Start") {
                    c += r.value_ + " "
                }
            })
        })
        return c;
    }
}

