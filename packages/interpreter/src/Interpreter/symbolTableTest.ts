import SymbolTable from "./SymbolTable.js";


const table = new SymbolTable()

const child = new SymbolTable()

table.addChild(child)

table.setVariable('test', 1)

console.log(table)