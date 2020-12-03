<script lang="typescript">
    import ProjectCard from './ProjectCard.svelte';
    import ContentColumn from '../ui/ContentColumn.svelte';

    import type { Project } from './Project';

    let projects: Project[];

    async function getProjects() {
        let response = await fetch('/content/projects')
        return response.json() as Promise<Project[]>
    }
</script>

<style>
    h1, h2, h3, h4, h5, h6 {
        margin-top: 64px;
        margin-bottom: 64px;
        font-weight: 400;
        color: #202020;
    }

    .project-list {
        display: flex;
        flex-direction: row;
        width: 1000px;
    }

    .project-list-container {
        padding-left: var(--master-side-margins);
        overflow: hidden;
    }

</style>

<ContentColumn>
    <h1>Here are some things I have been working on...</h1>
</ContentColumn>

<!-- TODO: add HammerJS here to recognize side swiping gestures when mobile sized -->
<!-- TODO: add buttons for navigation on 'hover' to account for slim windows on desktops -->
<div class="project-list-container">
    {#await getProjects()}
        <p>waiting...</p>
    {:then projects}
        <div class="project-list">
            {#each projects as project}
                <ProjectCard project={project}></ProjectCard>
            {/each}
        </div>
    {:catch error}
        <p>There was an error fetching the projects.</p>
    {/await}
</div>
