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

    let pause: boolean = false;

    window.addEventListener('blur', () => pause = true )
    window.addEventListener('focus', () => pause = false )

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

    const g = new PIXI.Graphics();
    // g.beginFill(0x2C8DE3)
    // g.drawRect(0, 0, window.innerWidth, window.innerHeight);
    // g.endFill()
    g.beginFill(0xffd000)
    g.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 100)
    g.endFill()
    g.zIndex = 1
    app.stage.addChild(g)

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
        if (!pause) {
            const cloudSpeed = 3;

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
        }
    }, { duration: "infinite" })

    /*
        TODO: set up a system where we can pause the clouds generating and moving,
        so we can pause when the window is out of focus and when the user scrolls down.
    */

    /** Spawn a random cloud to move across the screen */
    function spawnRandomCloud(forceOffscreen=true) {
        const newCloud = Sprite.from(cloud.texture)
        newCloud.anchor.set(1,1)
        newCloud.alpha = 0.5
        newCloud.zIndex = -1
        if (forceOffscreen) {
            newCloud.y = Math.random() * window.innerHeight
        } else {
            newCloud.x = Math.random() * window.innerWidth
            newCloud.y = Math.random() * window.innerHeight
        }
        app.stage.addChild(newCloud)
        clouds = { ...clouds, [randomId()]: newCloud }
    }

    /** On an interval, determine if a cloud should be generated */
    function generateCloud() {
        if (!pause) {
            const cloudChance = 0.9;
            if (Math.random() < cloudChance) {
                spawnRandomCloud()
            }
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