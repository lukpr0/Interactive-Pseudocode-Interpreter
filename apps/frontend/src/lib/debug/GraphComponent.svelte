<canvas id="canvas" width={WIDTH} height={HEIGHT} bind:this={canvas}></canvas>

<button onclick={() => draw(true, true)}>Redraw</button>

<script lang="ts">
    import { onMount } from "svelte";
    import { Graph, SimulatedAnnealingSolver, Vector, Node } from "@interactive-pseudo/graph";
    import { shared } from "$lib/shared/state.svelte";
    import type { Solver } from "@interactive-pseudo/graph/dist/Solver";

    let { graph }: { graph: Graph } = $props()

    const [WIDTH, HEIGHT] = [1280, 1000];

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let solver: Solver | undefined;


    onMount(() => {
        canvas = document.querySelector<HTMLCanvasElement>("#canvas")!
        ctx = canvas.getContext("2d")!
        shared.updateGraph = draw;
        draw(true);
    });


    function draw(update: boolean, reset?: boolean) {
        if (!solver || shared.resetGraph || reset) {
            const config = {
                iterations: 15000,
                electric: 10,
                startTemp: 500,
                coolingRate: 0.997,
                stepSize: 0.3,
            }
            solver = new SimulatedAnnealingSolver(graph, config);
        }

        if (update) {
            solver.solve();
        }

        let rescaled = solver.rescale(WIDTH, HEIGHT);
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        drawGraph(graph, rescaled)
    }

    function filledCircle(x: number, y: number, radius: number) {
        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.arc(x, y, radius, 2*Math.PI, 0);
        ctx.fill();
        ctx.stroke();
    }

    function line(fromX: number, fromY: number, toX: number, toY: number) {
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
    
    function arrow(fromX: number, fromY: number, toX: number, toY: number) {
        let dx = (toX - fromX)
        let dy = (toY - fromY)
        let length = Math.sqrt(dx**2 + dy**2)
        let endX = toX - 30 * dx / length
        let endY = toY - 30 * dy / length
        line(fromX, fromY, endX, endY);
        let something = 30 / Math.sqrt(dx**2 + dy**2)
        let alpha = 5 * Math.PI / 6
        let beta = -5 * Math.PI / 6
        let sina = Math.sin(alpha)
        let cosa = Math.cos(alpha)
        let sinb = Math.sin(beta)
        let cosb = Math.cos(beta)
        line(endX, endY, endX + (dx * cosa - dy * sina) * something, endY + (dx * sina + dy * cosa) * something )
        line(endX, endY, endX + (dx * cosb - dy * sinb) * something, endY + (dx * sinb + dy * cosb) * something )
    }

    function drawGraph(G: Graph, positions: Map<Node, Vector>) {
        ctx.lineWidth = 3;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for (const edge of G.allEdges()) {
            let fromPosition = positions.get(edge.from)!;
            let toPosition = positions.get(edge.to)!;
            let fromX = fromPosition.x
            let fromY = fromPosition.y
            let toX = toPosition.x
            let toY = toPosition.y
            ctx.strokeStyle = edge.color ?? "black"
            arrow(fromX, fromY, toX, toY);
        }
        for (const node of G.nodes.values()) {
            let position = positions.get(node)!;
            let x = position.x;
            let y = position.y;
            ctx.strokeStyle = node.color ?? "black";
            filledCircle(x, y, 30);
            ctx.fillStyle = node.color ?? "black";
            ctx.lineWidth = 1;
            ctx.font = "25px sans-serif";
            let text = ctx.measureText(node.label);
            ctx.fillText(node.label, position.x - text.width/2, position.y + text.emHeightAscent/2);
            ctx.lineWidth = 3;
        }
    }

</script>