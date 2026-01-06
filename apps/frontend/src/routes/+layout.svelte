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
    :global {

        .area {
            padding: 15px;
            margin: 1em;
        }

        .border {
            border: 1px solid gray;
        }

        .border-radius {
            border-radius: 5px;
        }

        .flex {
            display: flex;
        }

        .flex-column {
            flex-direction: column;
        }

        .flex-row {
            flex-direction: row;
        }

        .flex-item {
            flex: 1;
        }

    }

</style>