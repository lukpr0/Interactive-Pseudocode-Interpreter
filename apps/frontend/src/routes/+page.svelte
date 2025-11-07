<div class="grid">
    <textarea bind:value={ code } oninput={changecode}></textarea>
    <div id="variable-table"><VariableTable {variables}></VariableTable></div>
    <div id="outputs">
        {#each logs as message}
            { message }<br>
        {/each}
    </div>
    <div id="options">
        <label for="interpreter-active">
            <input id="interpreter-active" name="interpreter-active" type="checkbox" bind:checked={ interpreterActive }>
            <span>interpreter active</span>
        </label>
        <input type="button" value="terminate" onclick={ terminateInterpreter }>
    </div>
</div>

<script lang="ts">
    import VariableTable from "$lib/VariableTable.svelte";
    import { Slot } from "@interactive-pseudo/interpreter";

    //import workerscript with Vite Query Suffixes
    //https://v3.vitejs.dev/guide/features.html#web-workers
    import Worker from '$lib/interpreterWorker?worker&inline'

    let code = $state("")
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

    #options {
        grid-column: span 4;
    }

    label {
        display: block;
    }

</style>
