<div class="flex">
{#each items as item}
    <button onclick={() => active = item.id} class={[active == item.id ? 'active' : '', 'tab']}>
        {item.label}
    </button>
{/each}
</div>
<div id="tab-content" class="flex flex-column border flex-item">
    {@render items[active].component()}
</div>


<script lang="ts">
    import type { Snippet } from "svelte";


    let { 
        items
    }: {
        items: {
            id: number,
            label: string,
            component: Snippet 
        }[]
    } = $props()

    let active = $state(0)

</script>

<style>

    .active {
        background-color: rgb(202, 202, 202);
    }

    .tab {
        font-size: 1rem;
        border-radius: 3px 3px 0 0;
        border: 0;
        margin-right: 5px;
        padding: 7px 15px 3px;
    }
    
    #tab-content {
        overflow: auto;
    }

</style>