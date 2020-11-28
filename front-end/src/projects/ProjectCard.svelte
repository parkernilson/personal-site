<script lang="typescript">
    import type { Project } from "./Project";
    import Card from '../ui/Card.svelte';

    export let project: Project;
</script>

<style>

</style>

<Card>
    <img src="{project.imageGallery[0].formats.medium.url}" alt="project thumbnail"/>
    <h1>{project.title}</h1>
    <p>{project.shortDescription}</p>
</Card>