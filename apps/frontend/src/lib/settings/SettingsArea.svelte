<div id="options" class="area border border-radius">
    <div class="flex-item">
        <Option name="interpreter-active" bind:checked={shared.interpreterActive}>interpreter-active</Option>
        <Option name="vim-mode" bind:checked={shared.vimMode}>Enable vim mode</Option>
        <input type="button" value="terminate" onclick={ terminateInterpreter }>
        <input type="button" value="share" onclick={share}><input type="text" bind:value={shared.shareLink}>
    </div>
    <div class="flex-item">
        <a href="https://github.com/lukpr0/Interactive-Pseudocode-Interpreter">report bugs</a>
        {#if shared.debug}
        <span>Versions: Frontend: 1.2.0 Interpreter: 1.2.0 Parser: 1.2.0</span>
        {/if}
    </div>
</div>

<script lang="ts">
    import { page } from "$app/state";
    import { LatexVisitor } from "$lib/editor/latexVisitor";
    import { TypstVisitor } from "$lib/editor/typstVisitor";
    import Option from "$lib/shared/Option.svelte";
    import { shared } from "$lib/shared/state.svelte";
    import { Codeli } from "./codeli";
    import { parserChain } from "$lib/shared/ParserChain";

    let { terminateInterpreter } = $props()
    
    function generateLatex(_: Event) {
        const ast = parserChain(shared.code)
        const latexBuilder = new LatexVisitor(shared.headers)
        shared.markup = ast.accept(latexBuilder)
    }

    function generateTypst(_: Event) {
        const ast = parserChain(shared.code);
        const latexBuilder = new TypstVisitor('  ', shared.headers);
        shared.markup = ast.accept(latexBuilder);
    }

    function share(_: Event) {
        const url = new URL(page.url.href.replace(page.url.search, ''))

        const [compressed, size] = Codeli.compress(shared.code)
        const encoded = Codeli.numsToStr(compressed, size)

        url.searchParams.append('code', encoded)
        url.searchParams.append('size', size.toString())
        shared.shareLink = url.toString()
    }

</script>

<style>
    #options {
        grid-column: span 4;
        grid-row: span 2;
        display: flex;
    }

    .flex-item {
        min-height: 0;
        flex: 1;
    }
</style>