
<div class="editor-wrapper area border border-radius flex flex-column">
    <TabGroup {items} />
</div>

{#snippet editor()}
    <Codemirror bind:value={shared.code} vimMode={shared.vimMode} errors={shared.errorLocations} onchange={changeCode}></Codemirror>
{/snippet}

{#snippet typst()}
    <MarkupArea generator={(headers) => {return new TypstVisitor('  ', headers)}} />
{/snippet}

{#snippet latex()}
    <MarkupArea generator={(headers) => {return new LatexVisitor(headers)}} />
{/snippet}

<script lang="ts">
    import Codemirror from "./Codemirror.svelte";
    import { shared } from "$lib/shared/state.svelte";
    import TabGroup from "./TabGroup.svelte";
    import MarkupArea from "./MarkupArea.svelte";
    import { TypstVisitor } from "./typstVisitor";
    import { LatexVisitor } from "./latexVisitor";

    let { changeCode } = $props();

    const items = [
        {
            id : 0,
            label: 'editor',
            component: editor
        },
        {
            id : 1,
            label: 'typst',
            component: typst
        },
        {
            id : 2,
            label: 'latex',
            component: latex
        },
    ]

</script>

<style>
    .editor-wrapper {
        --height: 60vh;
        grid-column: span 8;
        grid-row: span 6;
        overflow: auto;
    }
</style>