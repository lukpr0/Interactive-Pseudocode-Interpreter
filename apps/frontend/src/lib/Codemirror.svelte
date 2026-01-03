<div id="codemirror-container" bind:this={container}>

</div>
<script lang="ts">
    import { keymap } from "@codemirror/view";
    import { basicSetup, EditorView } from "codemirror";
    import { indentWithTab } from "@codemirror/commands";
    import { vim } from "@replit/codemirror-vim";
    import { Compartment, EditorState } from "@codemirror/state";
    import { onMount } from "svelte";
    import { lintGutter, setDiagnostics } from "@codemirror/lint"
    import type ErrorInformation from "./errorLocation";

    let { 
        onchange = () => {},
        value = $bindable(''),
        vimMode = $bindable(false),
        errors = []
    }: {
        onchange: () => void,
        value: string,
        vimMode: boolean,
        errors: ErrorInformation[]
    } = $props();

    let container: HTMLElement;
    const vimCompartment = new Compartment()
    const vimPlugin = vimCompartment.of([])

    const state = EditorState.create({
        doc: value,
        extensions: [
            basicSetup,
            vimPlugin,
            lintGutter(),
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

    let view: EditorView;
    onMount(() => {
        view = new EditorView({state, parent: container});
    })

    $effect(
        () => view.dispatch({
            effects: [vimCompartment.reconfigure(vimMode ? vim() : [])]
        })
    )
    
    $effect(
        () => {
            let specs = [setDiagnostics(state, errors.map(error => { return {
                from: error.start,
                to: error.stop+1,
                severity: "error",
                message: error.text
            }}))]
            view.dispatch(...specs)
        }
    )

</script>