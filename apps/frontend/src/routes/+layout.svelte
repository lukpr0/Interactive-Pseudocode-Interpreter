<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="An interactive interpreter for pseudocode programming education educational learn learning algorithms computer science">
	<title>PseudoInterpreter</title>
</svelte:head>

{@render children()}

<style>
:global(.cm-gutters) {
	min-height: 300px !important;
}
</style>