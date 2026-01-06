<div id="" class="flex flex-item flex-column">
<Option name="generate-header" bind:checked={checked}>Generate imports?</Option>
<textarea class="flex-item" readonly style:resize="none">
{generateMarkup()}
</textarea>
</div>

<script lang="ts">
    import Option from "$lib/shared/Option.svelte";
    import { parserChain } from "$lib/shared/ParserChain";
    import { shared } from "$lib/shared/state.svelte";
    import type { MarkupGenerationVisitor } from "./markupGenerationVisitor";

    let checked = $state(true);

    let { 
        generator
    }: {
        generator: (headers: boolean) => MarkupGenerationVisitor
    } = $props();

    function generateMarkup() {
        const ast = parserChain(shared.code)
        const visitor = generator(checked)
        try {
            const markup = ast.accept(visitor)
            return markup;
        } catch (e) {
            return e;
        }
    }
</script>

<style>
    textarea {
        height: 100%;
    }
</style>