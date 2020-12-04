<script lang="typescript">
    import Hammer from 'hammerjs';

    import ProjectCard from './ProjectCard.svelte';
    import ContentColumn from '../ui/ContentColumn.svelte';
    import type { Project } from './Project';
    import { getPropertyValue } from '../methods/getPropertyValue';
    import { depend } from '../methods/depend';

    /** Number of property cards to display*/
    const NUM_CARDS: number = 2;

    /** retrieve the projects from content management */
    async function getProjects() {
        let response = await fetch('/content/projects')
        return response.json() as Promise<Project[]>
    }

    let projectList: HTMLElement;
    let projectListContainer: HTMLElement;

    // get card dimension properties
    $: cardWidth = depend(projectListContainer, 
        () => parseFloat(getPropertyValue(projectListContainer, '--card-width'))
    )
    $: cardGutter = depend(projectListContainer,
        () => parseFloat(getPropertyValue(projectListContainer, '--card-gutter'))
    )
    $: columnWidth = depend(projectListContainer,
        () => window.innerWidth - parseFloat(window.getComputedStyle(projectListContainer).paddingLeft)*2
    )
    /** Set which property card is focused */
    function setCardFocus(cardNumber: number) {
        if (cardNumber === 0) {
            projectList.style.marginLeft = "0px";
        } else {
            const marginLeft = 
                (columnWidth/2) 
                - (cardWidth/2) 
                - (cardGutter/2) 
                - (cardNumber*cardWidth) 
                - (cardNumber*cardGutter) 
                + "px";
            projectList.style.marginLeft = marginLeft;
        }
    }

    /** focus the next card */
    function nextCard() {
        if (focusedCard < NUM_CARDS - 1) {
            focusedCard++;
        }
    }

    /** focus the previous card */
    function prevCard() {
        if (focusedCard > 0) {
            focusedCard--;
        }
    }

    // when focused card is changed, update in the dom
    let focusedCard: number = 0;
    $: depend(
        projectList,
        projectListContainer,
        () => {
            setCardFocus(focusedCard);
        }
    )

    // set up swipe listener on project list
    let hammertime: HammerManager;
    $: hammertime = depend(
        projectList,
        () => {
            const h = new Hammer(projectList);

            h.on('swipe', (ev) => {
                if (ev.direction === Hammer.DIRECTION_LEFT) {
                    nextCard();
                } else if (ev.direction === Hammer.DIRECTION_RIGHT) {
                    prevCard();
                }
            })

            return h;
        }
    )
</script>

<style>
    h1 {
        margin-top: 64px;
        margin-bottom: 64px;
        font-weight: 400;
        color: #202020;
    }
    .project-list-container {
        padding-left: var(--master-side-margins);
        overflow: hidden;

        --card-width: 350px;
        --card-gutter: 16px;
    }
    .project-list {
        display: flex;
        flex-direction: row;
        width: fit-content;
        transition: margin-left .8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .card-slot {
        margin-right: var(--card-gutter);
        width: 350px;
    }

</style>

<ContentColumn>
    <h1>Here are some things I have been working on...</h1>
</ContentColumn>

<button on:click={() => prevCard()}>Prev Card</button>
<button on:click={() => nextCard()}>Next Card</button>

<!-- TODO: add HammerJS here to recognize side swiping gestures when mobile sized -->
<!-- TODO: add buttons for navigation on 'hover' to account for slim windows on desktops -->
<div class="project-list-container" bind:this={projectListContainer}>
    {#await getProjects()}
        <p>waiting...</p>
    {:then projects}
        <div class="project-list" bind:this={projectList}>
            {#each projects as project}
                <div class="card-slot">
                    <ProjectCard project={project}></ProjectCard>
                </div>
            {/each}
        </div>
    {:catch error}
        <p>There was an error fetching the projects.</p>
    {/await}
</div>
