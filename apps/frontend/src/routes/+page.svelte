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
        <Option name="interpreter-active" bind:checked={interpreterActive}>interpreter-active</Option>
        <Option name="vim-mode" bind:checked={vimMode}>Enable vim mode</Option>
        <input type="button" value="terminate" onclick={ terminateInterpreter }>
        <input type="button" value="share" onclick={share}><input type="text" bind:value={shareLink}>
    </div>
</div>

<script lang="ts">
    import VariableTable from "$lib/VariableTable.svelte";
    import { Slot } from "@interactive-pseudo/interpreter";

    //import workerscript with Vite Query Suffixes
    //https://v3.vitejs.dev/guide/features.html#web-workers
    import Worker from '$lib/interpreterWorker?worker&inline'
    import Codemirror from "$lib/Codemirror.svelte";
    import Option from "$lib/Option.svelte";
    import { page } from "$app/state";

    const codeFromParam = page.url.searchParams.get('code')
    let code = $state(codeFromParam ? codeFromParam : "")
    let vimMode = $state(false)
    let interpreterActive = $state(true)
    let shareLink = $state("")
    

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

    function share(_: Event) {
        const url = new URL(page.url.href.replace(page.url.search, ''))
        url.searchParams.append('code', code)
        shareLink = url.toString()
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
</style>