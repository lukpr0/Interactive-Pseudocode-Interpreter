<div>
    <span>Variables</span><input type="checkbox" bind:checked={showVariables}>
</div>
<div id="table-wrapper">
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
        {#each variables as scope }
        <tbody>
            {#if scope.length == 0}
            <tr><td colspan="2"></td></tr>
            {/if}
            {#each scope as [name, value] }
            <tr>
                <td>{ name }</td>
                <td>{ value }</td>
            </tr>
            {/each}
        </tbody>
        {/each}
</table>
</div>
<script lang="ts">
    let { variables }: { variables: string[][][] } = $props();
    let showVariables = $state(true)
</script>

<style>
    #table-wrapper {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }

    table {
        border-collapse: collapse;
    }

    tbody tr:last-child td {
        border-bottom: 1px solid;
    }
</style>
