<div class="grid">
    <EditorArea { changeCode } />
    <DebugArea />
    <OutputArea />
    <SettingsArea { terminateInterpreter } />
</div>

<script lang="ts">

    //import workerscript with Vite Query Suffixes
    //https://v3.vitejs.dev/guide/features.html#web-workers
    import Worker from '$lib/background/interpreterWorker?worker&inline'
    import { page } from "$app/state";
    import { Codeli } from "$lib/settings/codeli";
    import EditorArea from "$lib/editor/EditorArea.svelte";
    import DebugArea from "$lib/debug/DebugArea.svelte";
    import OutputArea from "$lib/output/OutputArea.svelte";
    import SettingsArea from "$lib/settings/SettingsArea.svelte";

    import { shared } from "$lib/shared/state.svelte";

    shared.code = getCodeFromParam();

    let worker = new Worker()

    function workerOnMessage(event: MessageEvent) {
        const result = event.data
        switch (result.type) {
            case 'log':
                shared.logs.push(result.message)
                break;
            case 'result':
                shared.variables = new Map(result.message)
                break;
            case 'error':
                handleError(result.message);
                break;
        }
    }

    function handleError(error: any) {
        switch (error.type) {
            case 'located':
                while (shared.errorLocations.length > 0)  { shared.errorLocations.pop(); }
                shared.errorLocations.push(error)
                shared.displayedError = `${error.name}: ${error.text}`;
                break
            case 'error':
                shared.displayedError = `${error.name}: ${error.text}`;
                break;
            case 'other':
                shared.displayedError = error.error;
                break
        }
    }

    function terminateInterpreter(_: Event) {
        worker.terminate()
    }

    function changeCode() {
        if (!shared.interpreterActive) {
            return;
        }
        shared.logs = []
        shared.displayedError = "";
        while (shared.errorLocations.length > 0) shared.errorLocations.pop();
        worker.terminate()
        worker = new Worker()
        worker.onmessage = workerOnMessage;
        worker.postMessage(shared.code)
    }

    function getCodeFromParam() {
        if (page.url.searchParams.has('size')) {
            const size = page.url.searchParams.get('size')
            const code = page.url.searchParams.get('code')
            
            const nums = Codeli.strToNums(code!, Number(size!))
            const decompressed = Codeli.decompress(nums)
            return decompressed;
        } else {
            return page.url.searchParams.has('code') ? page.url.searchParams.get('code')! : ''
        }
    }

    let codePosition = $state(0)
    window.addEventListener('keyup', (e) => {
        if (!['a', 'b', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            codePosition = 0
            return;
        }
        const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
        if (e.key == code[codePosition]) {
            codePosition += 1;
        }
        if (codePosition == 10) {
            codePosition = 0;
            shared.debug = !shared.debug;
        }
    })

</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(8, 12vh);
    }
</style>