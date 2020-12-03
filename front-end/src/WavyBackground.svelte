<script lang="typescript">
    import { animateCallback } from './methods/animateCallback';
    import BezierEasing from 'bezier-easing';

    export let animating: boolean = true;

    let container: HTMLElement;

    const root = document.documentElement;
    const range = 200;
    const easing = BezierEasing(0.40, 0.10, 0.58, 0.81);

    const cycle = () => {
        let v = -range;
        let w = 0; 
        const duration = 6000;
        const vColor = "#428af5";
        const wColor = "#0066ff";
        root.style.setProperty("--v-color", vColor);
        root.style.setProperty("--w-color", wColor);

        return animateCallback((t, x) => {
            root.style.setProperty("--v", `${x*range*2 + v}%`);
            root.style.setProperty("--w", `${x*range*2 + w}%`);
        }, { duration, easing }).then(() => {
            root.style.setProperty("--v-color", wColor);
            root.style.setProperty("--w-color", vColor);
            v = -range;
            w = 0;
            return animateCallback((t, x) => {
                root.style.setProperty("--v", `${x*range*2 + v}%`);
                root.style.setProperty("--w", `${x*range*2 + w}%`);
            }, { duration: duration/2, easing })
        })
    }

    async function run() {
        while (animating) {
            await cycle();
        }
    }

    $: {
        /*
            BUG: There is a bug when the user scrolls down, then up before the animation is over.
            Overlapping animations are caused. The cycle should be cancelled if it is restarted again.
        */
        if (animating) {
            // run()
        }
    }

</script>

<style>
    .container {
        /* background-image: linear-gradient(160deg, var(--v-color) var(--v), var(--w-color) var(--w)); */
        background-color: #428af5;
        position: absolute;
        z-index: -100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<div bind:this={container} class="container"></div>