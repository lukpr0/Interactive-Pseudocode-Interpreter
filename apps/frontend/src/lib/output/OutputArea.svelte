
<div id="outputs" class="area border border-radius">
    {#if shared.displayedError}
    <div id="errors">
        { shared.displayedError }
    </div>
    {/if}
    <div id="logs">
        {#each shared.logs as message}
            { message }<br>
        {/each}
    </div>
</div>

<script lang="ts">

    import { shared } from "$lib/shared/state.svelte";

</script>

<style>
    #outputs {
        grid-column: span 8;
        grid-row: span 2;
        overflow: auto;
    }
</style>