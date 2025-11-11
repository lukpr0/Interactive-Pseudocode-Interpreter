
<div class="option">
    <input id={name} {name} type="checkbox" bind:checked={ checked }>
    <label for={name}>{@render children()}</label>
</div>

<script>
    let {
        children,
        name = "",
        checked = $bindable(false)
    } = $props()
</script>

<style>
    .option {
        display: flex;
    }
</style>