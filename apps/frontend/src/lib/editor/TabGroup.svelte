<div class="flex">
{#each items as item}
    <button onclick={() => active = item.id} class={[active == item.id ? 'active' : '', 'tab']}>
        {item.label}
    </button>
{/each}
</div>
{#each items as item}
<div id="tab-content" class="tab-content flex-column border flex-item" style:display={active == item.id ? 'flex' : 'none'}>
    {@render item.component()}
</div>
{/each}

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


    .tab {
        font-size: 1rem;
        border-radius: 3px 3px 0 0;
        border: 0;
        margin-right: 5px;
        padding: 7px 15px 3px;
        background-color: var(--secondary);
    }
    
    .active {
        background-color: var(--primary);
    }
    
    .tab-content {
        overflow: auto;
    }

</style>