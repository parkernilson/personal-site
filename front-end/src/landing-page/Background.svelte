<script lang="typescript">
    import * as PIXI from 'pixi.js'
    import { AsciiFilter } from 'pixi-filters'

    import { depend } from '../methods/depend'
    import { animateCallback } from '../methods/animateCallback';
    import { randomId } from '../methods/randomId';

    const Application = PIXI.Application
    const Sprite = PIXI.Sprite
    const Point = PIXI.Point

    let canvas: HTMLElement

    // create pixi cloud app
    const app = new Application({
        transparent: true
    })
    const asciiFilter = new AsciiFilter(24)
    asciiFilter.padding = 16
    app.stage.filters = [asciiFilter]

    // create cloud sprite
    const cloud = Sprite.from('white-cloud.png')
    let clouds: { [id: string]: PIXI.Sprite } = {};


    /* Displacement */
    // const cloudDisplacement = Sprite.from('cloud-displacement-map.png')
    // cloudDisplacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    // cloudDisplacement.scale = new Point(5, 5)
    // app.stage.addChild(cloudDisplacement)

    // const displacementFilter = new PIXI.filters.DisplacementFilter(cloudDisplacement)
    // displacementFilter.padding = 16
    // displacementFilter.scale = new Point(50, 50)

    // animate the clouds moving
    animateCallback((t, x, elapsed) => {
        const cloudSpeed = 0.5;

        for (let [id, cloud] of Object.entries(clouds)) {
            // if the cloud has moved out of the canvas, delete it
            if (cloud.x > window.innerWidth + cloud.width) {
                app.stage.removeChild(cloud)
                delete clouds[id]
            } else {
                // move each cloud
                cloud.x += cloudSpeed
            }
        }
    }, { duration: "infinite" })

    /*
        TODO: set up a system where we can pause the clouds generating and moving,
        so we can pause when the window is out of focus and when the user scrolls down.
    */

    /** Spawn a random cloud to move across the screen */
    function spawnRandomCloud() {
        const newCloud = Sprite.from(cloud.texture)
        newCloud.anchor.set(1,1)
        newCloud.alpha = 0.2
        newCloud.y = Math.random() * window.innerHeight
        app.stage.addChild(newCloud)
        clouds = { ...clouds, [randomId()]: newCloud }
    }

    /** On an interval, determine if a cloud should be generated */
    function generateCloud() {
        const cloudChance = 0.5;
        if (Math.random() < cloudChance) {
            spawnRandomCloud()
        }
        setTimeout(() => generateCloud(), 1000);
    }
    // start the generation interval
    generateCloud()

    // when the canvas element is ready, attach the PIXI app to it
    $: depend(
        canvas,
        () => {
            canvas.appendChild(app.view)
            app.resizeTo = canvas
        }
    )
</script>

<style>
    .canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>

<div bind:this={canvas} class="canvas">

</div>