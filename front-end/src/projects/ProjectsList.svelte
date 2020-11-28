<script lang="typescript">
    import marked from 'marked';
    import ProjectCard from './ProjectCard.svelte';
    import ContentColumn from '../ui/ContentColumn.svelte';

    import type { Project } from './Project';

    let projects;

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
        color: #707070;
    }
</style>

<ContentColumn>
    <h1>Here are some things I have been working on...</h1>

    {#await getProjects()}
        <p>waiting...</p>
    {:then projects}
        {#each projects as project}
            <ProjectCard project={project}></ProjectCard>
        {/each}
    {:catch error}
        <p>There was an error fetching the projects.</p>
    {/await}
</ContentColumn>
