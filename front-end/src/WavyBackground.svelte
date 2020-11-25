<script lang="typescript">
    import { animateCallback } from './methods/animateCallback';

    const root = document.documentElement;
    const range = 150;
    let v = -range;
    let w = 0; 

    animateCallback(t => {
        root.style.setProperty("--v", `${t*range*2 + v}%`);
        root.style.setProperty("--w", `${t*range*2 + w}%`);
    }, 1000);

</script>

<style>
    :root {
        --p: 0%;
    }
    .target {
        background-image: linear-gradient(160deg, #428af5 var(--v), blue var(--w));
        position: absolute;
        width: 400px;
        height: 400px;
    }
</style>

<div class="container">
    <div class="target">

    </div>
</div>