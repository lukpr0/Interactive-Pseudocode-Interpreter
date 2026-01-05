<div class="code-wrapper">
    <Codemirror bind:value={shared.code} vimMode={shared.vimMode} errors={shared.errorLocations} onchange={changeCode}></Codemirror>
</div>

<script lang="ts">
    import Codemirror from "./Codemirror.svelte";
    import { shared } from "$lib/shared/state.svelte";

    let { changeCode } = $props();

</script>

<style>
    .code-wrapper {
        margin: 1em;
        height: 60vh;
        grid-column: span 8;
        grid-row: span 6;
        overflow: auto;
    }
</style>