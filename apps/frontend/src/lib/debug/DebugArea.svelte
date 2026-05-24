

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
    import { findGraph } from "$lib/background/GraphConverter";

    /*let [A, B, C, D, E, F, G] = [
        new Node("A"),
        new Node("B"),
        new Node("C"),
        new Node("D"),
        new Node("E"),
        new Node("F"),
        new Node("G"),
    ]
    let edges = [
        new Edge(A, B, 1),
        new Edge(B, E, 1),
        new Edge(B, F, 1),
        new Edge(D, E, 1),
        new Edge(C, D, 1),
        new Edge(E, C, 1),
        new Edge(C, F, 1),
        new Edge(F, A, 1),
        new Edge(A, G, 1),
        new Edge(G, D, 1),
        new Edge(B, G, 1),
        new Edge(G, F, 1),
    ]*/
    /*let nodes = [
        new Node("0"),
        new Node("1"),
        new Node("2"),
        new Node("3"),
        new Node("4"),
        new Node("5"),
        new Node("6"),
        new Node("7"),
    ]

    let edges = [
        new Edge(nodes[0], nodes[2]),
        new Edge(nodes[0], nodes[3]),
        new Edge(nodes[0], nodes[5]),
        new Edge(nodes[1], nodes[0]),
        new Edge(nodes[1], nodes[5]),
        new Edge(nodes[2], nodes[6]),
        new Edge(nodes[3], nodes[5]),
        new Edge(nodes[4], nodes[3]),
        new Edge(nodes[4], nodes[6]),
        new Edge(nodes[5], nodes[2]),
        new Edge(nodes[5], nodes[6]),
        new Edge(nodes[7], nodes[2]),
        new Edge(nodes[7], nodes[5]),
        new Edge(nodes[7], nodes[6]),
    ]
    let example = new Graph(nodes)*/

    //let example = new Graph([A, B, C, D, E, F, G]);
    //example.addEdges(edges);
    let example: Graph | undefined = $state(undefined);

    $effect(() => {example = shared.graph; console.log("new graph")})

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