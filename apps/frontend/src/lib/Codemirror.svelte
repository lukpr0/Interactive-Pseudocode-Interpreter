<div id="codemirror-container" bind:this={container}>

</div>
<script lang="ts">
    import { keymap } from "@codemirror/view";
    import { basicSetup, EditorView } from "codemirror";
    import { indentWithTab } from "@codemirror/commands";
    import { vim } from "@replit/codemirror-vim";
    import { Compartment, EditorState } from "@codemirror/state";
    import { onMount } from "svelte";

    let { 
        onchange = () => {},
        value = $bindable(''),
        vimMode = $bindable(false)
    } = $props()

    let container: HTMLElement;
    const vimCompartment = new Compartment()
    const vimPlugin = vimCompartment.of([])

    let view: EditorView;
    onMount(() => {
        const state = EditorState.create({
            doc: value,
            extensions: [
                basicSetup,
                vimPlugin,
                EditorView.updateListener.of(v => {
                    if (v.docChanged) {
                        value = v.state.doc.toString()
                        onchange()
                    }
                }),
                //add info how to exit editor component
                //https://codemirror.net/examples/tab/
                keymap.of([indentWithTab])
            ],
        });
        view = new EditorView({state, parent: container});
    })

    $effect(
        () => view.dispatch({
            effects: [vimCompartment.reconfigure(vimMode ? vim() : [])]
        })
    )

</script>