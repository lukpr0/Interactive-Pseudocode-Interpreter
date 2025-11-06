<div class="grid">
    <textarea bind:value={ code } oninput={changecode}></textarea>
    <div id="variable-table"><VariableTable {variables}></VariableTable></div>
    <div id="outputs">
        {#each logs as message}
            <p>{ message }</p>
        {/each}
    </div>
</div>

<script lang="ts">
    import VariableTable from "$lib/VariableTable.svelte";
    import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable } from "@interactive-pseudo/interpreter";
    import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
    import { CharStream, CommonTokenStream } from 'antlr4'

    let code = $state("")
    
    const chars = $derived(new CharStream(code));
    const lexer = $derived(new PseudoLexer(chars));
    const tokens = $derived(new CommonTokenStream(lexer));
    const parser = $derived(new PseudoParser(tokens));

    let variables = $state(new Map<string, Slot>());

    let logs: string[] = $state([])
    const observer = {
        update(message: string) {
            logs.push(message)
        }
    }

    function changecode(e: Event) {
        const symbolTable = new SymbolTable<Slot>();
        const functionTable = new SymbolTable<FunctionTree>();
        const interpreter = new InterpretingVisitor(symbolTable, functionTable);
        interpreter.addPrintObserver(observer)
        const parseTree = parser.program();
        const visitor = new AstBuilderVisitor()
        const ast = parseTree.accept(visitor);
        logs = []
        ast.accept(interpreter)
        variables = new Map(symbolTable.getAllVariables())
    }

</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }

    textarea {
        height: 60vh;
        grid-column: span 8;
    }

    #variable-table {
        grid-column: span 4;
    }

    #outputs {
        grid-column: span 8;
    }

</style>
