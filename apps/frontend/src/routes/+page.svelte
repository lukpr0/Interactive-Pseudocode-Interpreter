<div class="grid">
    <div class="code-wrapper">
        <Codemirror bind:value={code} {vimMode} onchange={changecode}></Codemirror>
    </div>
    <div id="variable-table"><VariableTable {variables}></VariableTable></div>
    <div id="outputs">
        {#each logs as message}
            { message }<br>
        {/each}
    </div>
    <div id="options">
        <div class="option">
            <input id="interpreter-active" name="interpreter-active" type="checkbox" bind:checked={ interpreterActive }>
            <label for="interpreter-active">interpreter active</label>
        </div>
        <div class="option">
            <input id="vim-mode" type="checkbox" bind:checked={vimMode}>
            <label for="vim-mode">Enable vim mode</label>
        </div>
        <input type="button" value="terminate" onclick={ terminateInterpreter }>
    </div>
</div>

<script lang="ts">
    import VariableTable from "$lib/VariableTable.svelte";
    import { Slot } from "@interactive-pseudo/interpreter";

    //import workerscript with Vite Query Suffixes
    //https://v3.vitejs.dev/guide/features.html#web-workers
    import Worker from '$lib/interpreterWorker?worker&inline'
    import Codemirror from "$lib/Codemirror.svelte";

    let code = $state("")
    let vimMode = $state(false)
    let interpreterActive = $state(true)
    

    let variables = $state(new Map<string, Slot>());


    let worker = new Worker()

    let logs: string[] = $state([])

    function workerOnMessage(event: MessageEvent) {
        const result = event.data
        if (result.type == 'log') {
            logs.push(result.message)
        } else if (result.type == 'result') {
            variables = new Map(result.message)
        }
    }

    function terminateInterpreter(_: Event) {
        worker.terminate()
    }

    function changecode(_: Event) {
        if (!interpreterActive) {
            return;
        }
        logs = []
        worker.terminate()
        worker = new Worker()
        worker.onmessage = workerOnMessage;
        worker.postMessage(code)
    }

</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(8, 12vh);
    }

    .code-wrapper {
        margin: 1em;
        height: 60vh;
        grid-column: span 8;
        grid-row: span 6;
        overflow: auto;
    }

    #variable-table {
        grid-column: span 4;
    }

    #outputs {
        grid-column: span 8;
        grid-row: span 2;
        overflow: auto;
    }

    #options {
        grid-column: span 4;
    }

    .option {
        display: flex;
    }

    label {
        display: block;
    }

    input[type="checkbox"] {
        vertical-align: middle;
    }


</style>