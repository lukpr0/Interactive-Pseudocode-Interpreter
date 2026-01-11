import { describe } from "node:test";
import SymbolTable from "../src/Interpreter/SymbolTable.js";
import { expect, test } from 'vitest'

describe('SymbolTable tests', () => {
    test('symbol table with child set value', () => {
        const table = new SymbolTable<any>()

        const child = new SymbolTable<any>()

        table.addChild(child)

        table.setVariable('test', 1)

        const variable = table.getVariable('test')
        expect(variable).toBe(1)

    })

    test('symbol table with child no value', () => {
        const table = new SymbolTable<any>()

        const child = new SymbolTable<any>()

        table.addChild(child)

        const variable = table.getVariable('test')
        expect(variable).toBeUndefined()

    })

    test('symbol table with 2 childs set variable', () => {
        const table = new SymbolTable<any>()

        const child1 = new SymbolTable<any>()

        table.addChild(child1)
        
        const child2 = new SymbolTable<any>()

        table.addChild(child2)

        table.setVariable('test', 1)

        const variable = table.getVariable('test')
        expect(variable).toBe(1)

    })

    test('symbol table change variable', () => {
        const table = new SymbolTable<any>()

        table.setVariable('test', 1)
        table.setVariable('test', 2)

        const variable = table.getVariable('test')
        expect(variable).toBe(2)

    })

    test('symbol table get all', () => {
        const table = new SymbolTable<any>()

        table.setVariable('test', 1)

        const variable = table.getAllVariables()
        expect(variable.keys()).toContain('test')

        expect(variable.values()).toContain(1)

    })

    test('symbol table remove children', () => {
        const table = new SymbolTable<any>()

        table.setVariable('a', 1)
        
        const child1 = new SymbolTable<any>()
        table.addChild(child1)
        
        const child2 = new SymbolTable<any>()
        table.addChild(child2)
        
        table.setVariable('a', 2)
        table.setVariable('b', 2)
        table.setVariable('c', 2)

        table.removeChild()
        table.removeChild()
        table.removeChild()

        const a = table.getVariable('a')
        const b = table.getVariable('b')
        const c = table.getVariable('c')

        expect(a).toBe(2)
        expect(b).toBeUndefined()
        expect(c).toBeUndefined()

    })

    test('symbol table to string', () => {
        const table = new SymbolTable<any>()
        table.setVariable('test', 1)
        const tableString = table.toString()
        expect(tableString).toBe(`Table: test: 1, Child: (undefined)`)

    })
})