

<div id="variable-table" class="area border border-radius">
    <VariableTable variables={shared.variables}></VariableTable>
    {#if shared.debug}
    {printAst(shared.code)}
    {/if}
</div>

<script lang="ts">
    import VariableTable from "./VariableTable.svelte";

    import { shared } from "$lib/shared/state.svelte";
    import { parserChain } from "$lib/shared/ParserChain";
    import { ASTPrinter } from "@interactive-pseudo/interpreter";

    function printAst(code: string) {
        const ast = parserChain(code);
        const printer = new ASTPrinter()
        return ast.accept(printer)
    }
</script>

<style>
    #variable-table {
        grid-column: span 4;
        grid-row: span 6;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
</style>