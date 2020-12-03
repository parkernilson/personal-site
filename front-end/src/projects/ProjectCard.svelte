<script lang="typescript">
    import type { Project } from "./Project";
    import Card from '../ui/Card.svelte';

    export let project: Project;

</script>

<style>
    .container {
        max-width: 350px;
        margin-right: 16px;
        margin-top: 16px;
        margin-bottom: 16px;
        border-radius: var(--card-border-radius);
        overflow: hidden;
        box-shadow: 0px 3px 10px gray;

        --side-padding: 16px;
    }
    .card-header {
        padding: 16px;
    }
    .project-logo-container {
        margin: auto;
        width: 64px;
        height: 64px;
        padding: 4px;
        box-sizing: border-box;
    }
    .project-logo {
        height: 100%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    .project-title {
        margin-top: 0;
        margin-bottom: 0;
        color: white;
        font-weight: 700;
        font-size: 24px;
        text-align: center;
    }
    .short-description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;

        margin-left: var(--side-padding);
        margin-right: var(--side-padding);
        margin-bottom: 24px;
    }
</style>

<div class="container">
    <div 
        class="card-header"
        style="background-color: {project.projectLogoBackgroundColor}"
    >
        <div class="project-logo-container">
            <div 
                class="project-logo" 
                style="background-image: url({`${project.projectLogo.formats.medium.url}`})" 
            />
        </div>
        <p class="project-title">{project.title}</p>
    </div>
    <p class="short-description">{project.shortDescription}</p>
</div>