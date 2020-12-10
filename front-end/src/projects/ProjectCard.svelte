<script lang="typescript">
    import type { Project } from "./Project";

    export let project: Project;

</script>

<style>
    .container {
        margin-top: 16px;
        margin-bottom: 16px;
        border-radius: var(--card-border-radius);
        overflow: hidden;
        box-shadow: 0px 3px 10px gray;

        --side-padding: 16px;
    }
    .cover-image {
        background-size: cover;
        background-position: center;
        height: 300px;
    }
    .project-title {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;  
        overflow: hidden;

        margin-top: 0;
        margin-bottom: 0;
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
        class="cover-image" 
        style="background-image: url({`${project.coverImage.formats.medium.url}`})" 
    />
    <p class="project-title">{project.title}</p>
    <p class="short-description">{project.shortDescription}</p>
</div>