<div class="grid">
    <textarea bind:value={code} oninput={changecode}></textarea>
    <textarea contenteditable="false">{code}</textarea>

    <table>
        <thead>
            <tr>
                <th>Variable</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {#each variables as [name, value] }
                <tr>
                    <td>
                        { name }
                    </td>
                    <td>
                        { value }
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<script lang="ts">
    import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable } from "@interactive-pseudo/interpreter";
    import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
    import { CharStream, CommonTokenStream } from 'antlr4'

    let code = $state("")
    
    const chars = $derived(new CharStream(code));
    const lexer = $derived(new PseudoLexer(chars));
    const tokens = $derived(new CommonTokenStream(lexer));
    const parser = $derived(new PseudoParser(tokens));

    let test = $state(new Map())
    let name = $state("")
    let value = $state("")


    let variables = $state(new Map<string, Slot>());

    function changecode(e: Event) {
        const symbolTable = new SymbolTable<Slot>();
        const functionTable = new SymbolTable<FunctionTree>();
        const interpreter = new InterpretingVisitor(symbolTable, functionTable);
        const parseTree = parser.program();
        const visitor = new AstBuilderVisitor()
        const ast = parseTree.accept(visitor);
        ast.accept(interpreter)
        variables = new Map(symbolTable.getAllVariables())
    }

</script>

<style>
    textarea {
        height: 60vh;
    }

    .grid {
        display: grid;
        grid-column: 1 1;
        justify-items: stretch;
    }
</style>
