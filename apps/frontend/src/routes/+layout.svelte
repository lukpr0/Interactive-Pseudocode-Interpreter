<script lang="ts">
    import favicon from '$lib/assets/favicon.png';
    import { shared } from '$lib/shared/state.svelte';
    import '$lib/shared/main.css'
    let { children } = $props();
    $effect(() => {
        if (shared.darkMode) {
            document.body.classList.add('darkmode')
        } else {
            document.body.classList.remove('darkmode')
        }
    })
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            shared.darkMode = true;
        }
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta name="description" content="An interactive interpreter for pseudocode programming education educational learn learning algorithms computer science">
    <title>PseudoInterpreter</title>
</svelte:head>

{@render children()}

<style>

</style>