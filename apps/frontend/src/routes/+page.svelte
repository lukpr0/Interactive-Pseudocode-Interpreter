<div class="grid">
    <div class="code-wrapper">
        <Codemirror bind:value={code} {vimMode} errors={errorLocations} onchange={changecode}></Codemirror>
    </div>
    <div id="variable-table">
        <VariableTable {variables}></VariableTable>
        {#if debug}
        {ast}
        {/if}
    </div>
    <div id="outputs">
        {#if displayedError}
        <div id="errors">
            { displayedError }
        </div>
        {/if}
        <div id="logs">
            {#each logs as message}
                { message }<br>
            {/each}
        </div>
    </div>
    <div id="options">
        <Option name="interpreter-active" bind:checked={interpreterActive}>interpreter-active</Option>
        <Option name="vim-mode" bind:checked={vimMode}>Enable vim mode</Option>
        <input type="button" value="terminate" onclick={ terminateInterpreter }>
        <input type="button" value="share" onclick={share}><input type="text" bind:value={shareLink}>
        <div>
            <span>generate markup</span>
            <Option name="generate-header" bind:checked={headers}>Generate headers (package imports)?</Option>
            <input type="button" value="typst" onclick={generateTypst}>
            <input type="button" value="latex" onclick={generateLatex}>
            <textarea readonly>{markup}</textarea>
        </div>
        {#if debug}
        <span>Versions: Frontend: 1.1.0 Interpreter: 1.1.0 Parser: 1.1.0</span>
        {/if}
    </div>
</div>

<script lang="ts">
    import VariableTable from "$lib/VariableTable.svelte";
    import { AstBuilderVisitor, Slot } from "@interactive-pseudo/interpreter";

    //import workerscript with Vite Query Suffixes
    //https://v3.vitejs.dev/guide/features.html#web-workers
    import Worker from '$lib/interpreterWorker?worker&inline'
    import Codemirror from "$lib/Codemirror.svelte";
    import Option from "$lib/Option.svelte";
    import { page } from "$app/state";
    import { CharStream, CommonTokenStream } from "antlr4";
    import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
    import { LatexVisitor } from "$lib/latexVisitor";
    import { TypstVisitor } from "$lib/typstVisitor";
    import { Codeli } from "$lib/codeli";
    import type ErrorInformation from "$lib/errorLocation";
    import { ASTPrinter } from "@interactive-pseudo/interpreter";


    let code = $state(getCodeFromParam())
    let vimMode = $state(false)
    let interpreterActive = $state(true)
    let shareLink = $state("")
    let displayedError = $state("")
    let errorLocations: ErrorInformation[] = $state([])
    let debug = $state(false)

    let variables = $state(new Map<string, Slot>());
    
    let headers = $state(true)
    let markup = $state("")
    let ast = $state("")

    let worker = new Worker()

    let logs: string[] = $state([])

    function workerOnMessage(event: MessageEvent) {
        const result = event.data
        switch (result.type) {
            case 'log':
                logs.push(result.message)
                break;
            case 'result':
                variables = new Map(result.message)
                break;
            case 'error':
                handleError(result.message);
                break;
        }
    }

    function handleError(error: any) {
        switch (error.type) {
            case 'located':
                while (errorLocations.length > 0)  { errorLocations.pop(); }
                errorLocations.push(error)
                displayedError = `${error.name}: ${error.text}`;
                break
            case 'error':
                displayedError = `${error.name}: ${error.text}`;
            case 'other':
                displayedError = error.error;
                break
        }
    }

    function terminateInterpreter(_: Event) {
        worker.terminate()
    }

    function changecode() {
        if (!interpreterActive) {
            return;
        }
        logs = []
        displayedError = "";
        while (errorLocations.length > 0) errorLocations.pop();
        printAst(code)
        worker.terminate()
        worker = new Worker()
        worker.onmessage = workerOnMessage;
        worker.postMessage(code)
    }

    function printAst(code: string) {
        const chars = new CharStream(code);
        const lexer = new PseudoLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new PseudoParser(tokens);
        const tree = parser.program();
        const printer = new ASTPrinter()
        const astVisitor = new AstBuilderVisitor()
        ast = tree.accept(astVisitor).accept(printer)
    }

    function share(_: Event) {
        const url = new URL(page.url.href.replace(page.url.search, ''))

        const [compressed, size] = Codeli.compress(code)
        const encoded = Codeli.numsToStr(compressed, size)

        url.searchParams.append('code', encoded)
        url.searchParams.append('size', size.toString())
        shareLink = url.toString()
    }

    function generateLatex(_: Event) {
        const chars = new CharStream(code);
        const lexer = new PseudoLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new PseudoParser(tokens);
        const tree = parser.program();

        const visitor = new AstBuilderVisitor()
        const ast = tree.accept(visitor);

        const latexBuilder = new LatexVisitor(headers)
        markup = ast.accept(latexBuilder)
    }

    function generateTypst(_: Event) {
        const chars = new CharStream(code);
        const lexer = new PseudoLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new PseudoParser(tokens);
        const tree = parser.program();

        const visitor = new AstBuilderVisitor()
        const ast = tree.accept(visitor);

        const latexBuilder = new TypstVisitor('  ', headers)
        markup = ast.accept(latexBuilder)
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
            debug = !debug;
        }
    })

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