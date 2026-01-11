
<div id="codemirror-container" bind:this={container} class="flex-item">

</div>
<script lang="ts">
    import { highlightWhitespace, keymap } from "@codemirror/view";
    import { basicSetup, EditorView } from "codemirror";
    import { indentWithTab } from "@codemirror/commands";
    import { vim } from "@replit/codemirror-vim";
    import { Compartment, EditorState } from "@codemirror/state";
    import { onMount } from "svelte";
    import { lintGutter, setDiagnostics } from "@codemirror/lint"
    import type ErrorInformation from "../shared/errorLocation";
    import { shared } from "$lib/shared/state.svelte";

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

    const baseTheme = EditorView.theme({
        "&": {
            color: "var(--text)",
            backgroundColor: "var(--bg)"
        },
        ".cm-content": {
            caretColor: "var(--text-mute)"
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "var(--text-mute)"
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "var(--primary)"
        },
        ".cm-gutters": {
            backgroundColor: "var(--bg-light)",
            color: "var(--text-mute)",
            border: "none"
        },
        ".cm-highlightSpace": {
            backgroundImage: "radial-gradient(circle at 50% 55%, var(--highlight) 20%, transparent 5%)"
        }
    })

    const darkTheme = EditorView.theme({
    }, {dark: true})
    
    const lightTheme = EditorView.theme({
    }, {dark: false})
    
    const themeCompartment = new Compartment()
    const themePlugin = themeCompartment.of([])

    const state = EditorState.create({
        doc: value,
        extensions: [
            basicSetup,
            vimPlugin,
            baseTheme,
            themePlugin,
            lintGutter(),
            highlightWhitespace(),
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
        () => view.dispatch({
            effects: [themeCompartment.reconfigure(shared.darkMode ? darkTheme : lightTheme)]
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

<style>
    :global {
        /*.cm-gutters, .cm-content {
            min-height: 300px !important;
        }*/
        .cm-editor.cm-focused {
            outline: none;
        }
        .cm-gutters {
            background-color: var(--bg-light);
        }

        .cm-focused .cm-selection-Background ::selection {
            background-color: rgb(255, 101, 217) !important;
        }
    }

</style>