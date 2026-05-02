<div class="grid">
    <EditorArea changeCode = { resetInterpreter } />
    <DebugArea />
    <OutputArea />
    <SettingsArea { runInterpreter } { stepInterpreter } { resetInterpreter }/>
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
    import type { WorkerMessage } from '$lib/background/messages';
    import { InterpreterState } from '$lib/shared/interpreterState';

    shared.code = getCodeFromParam();

    let worker = new Worker();
    let timeout: NodeJS.Timeout;
    resetInterpreter()

    function workerOnMessage(event: MessageEvent) {
        const result = event.data as WorkerMessage
        switch (result.type) {
            case 'log':
                shared.logs.push(result.message)
                break;
            case 'result':
                setVariables(result.message);
                if (result.finished) {
                    shared.interpreterState = InterpreterState.FINISHED;
                }
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

    function resetInterpreter() {
        shared.logs = []
        shared.displayedError = "";
        shared.variables = []
        shared.interpreterState = InterpreterState.READY;
        while (shared.errorLocations.length > 0) shared.errorLocations.pop();
        worker.terminate()
        clearTimeout(timeout)
        worker = new Worker()
        console.log("new worker")
        worker.onmessage = workerOnMessage;
        worker.postMessage({
            type: "code",
            message: shared.code
        });
        if (shared.autorun) {
            runInterpreter();
        }
    }

    function runWithTimeout() {
        worker.postMessage({type: "next"})
        if (shared.interpreterState == InterpreterState.RUNNING) {
            timeout = setTimeout(runWithTimeout, shared.stepDuration)
        }
    }

    function stepInterpreter(_: Event) {
        if (shared.interpreterState == InterpreterState.RUNNING) {
            return;
        }
        worker.postMessage({type: "next"});
    }

    function runInterpreter() {
        if (shared.interpreterState == InterpreterState.RUNNING) {
            return;
        }
        if (shared.interpreterState == InterpreterState.FINISHED) {
            resetInterpreter()
        }
        shared.interpreterState = InterpreterState.RUNNING;
        if (shared.stepDuration == 0) {
            worker.postMessage({
                type: "run"
            })
        } else {
            runWithTimeout()
        }
    }

    function setVariables(variables: string[][][]) {
        shared.variables = variables;
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