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
    <tbody>
        {#if showVariables}
            {#each variables as [name, value] }
                <tr>
                    <td>
                        { name }
                    </td>
                    <td>
                        { value }
                    </td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>
</div>
<script lang="ts">
    import type { Slot } from "@interactive-pseudo/interpreter";

    let { variables }: { variables: Map<string, Slot> } = $props();
    let showVariables = $state(true)
</script>

<style>
    #table-wrapper {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }
</style>
