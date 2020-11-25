<script lang="typescript">
    export let size: string = "200px";
</script>

<style>
    .container {
        margin: auto;
    }
    .image {
        height: 0;
        padding-top: 100%;
        background-image: url("/Me.jpg");
        background-size: cover;
        border-radius: 50%;
        box-shadow: 0px 3px 8px grey;
    }
</style>

<div class="container" style="width: {size}; height: {size};">
    <div class="image" /> 
</div>