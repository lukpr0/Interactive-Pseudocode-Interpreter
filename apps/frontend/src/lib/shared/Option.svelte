
<div class="option">
    <input id={name} {name} type="checkbox" bind:checked={ checked }>
    <label for={name}>{@render children()}</label>
</div>

<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        name = "",
        checked = $bindable(false)
    }: {
        children: Snippet,
        name: string,
        checked: boolean
    } = $props()
</script>

<style>
    .option {
        display: flex;
    }
</style>