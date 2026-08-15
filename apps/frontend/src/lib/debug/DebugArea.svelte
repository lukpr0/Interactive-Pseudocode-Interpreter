

<div id="variable-table" class="area border border-radius">
    <TabGroup {items}/>
    {#if shared.debug}
    {printAst(shared.code)}
    state:
    {#if shared.interpreterState == InterpreterState.READY}
    ready
    {:else if shared.interpreterState == InterpreterState.RUNNING}
    running
    {:else if shared.interpreterState == InterpreterState.FINISHED}
    finished
    {/if}
    autorun: {shared.autorun}
    {/if}
</div>
{#snippet variables()}
    <VariableTable variables={shared.variables}></VariableTable>
{/snippet}

{#snippet graph()}
    {#if example}
    <GraphComponent graph={example}/>
    {/if}
{/snippet}

<script lang="ts">
    import VariableTable from "./VariableTable.svelte";

    import { shared } from "$lib/shared/state.svelte";
    import { parserChain } from "$lib/shared/ParserChain";
    import { ASTPrinter } from "@interactive-pseudo/interpreter";
    import { InterpreterState } from "$lib/shared/interpreterState";
    import TabGroup from "$lib/shared/TabGroup.svelte";
    import GraphComponent from "./GraphComponent.svelte";
    import { Graph, Node, Edge } from "@interactive-pseudo/graph";

    let example: Graph | undefined = $state(undefined);

    const items = [
        {
            id: 0,
            label: "Variables",
            component: variables
        },
        {
            id: 1,
            label: "Graph",
            component: graph 
        }
    ]

    function printAst(code: string) {
        const ast = parserChain(code);
        const printer = new ASTPrinter()
        return ast.accept(printer)
    }
</script>

<style>
    #variable-table {
        grid-column: span 5;
        grid-row: span 6;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
</style>