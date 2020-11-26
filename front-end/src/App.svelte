<script lang="typescript">
	import MePicture from './MePicture.svelte';
	import { fade } from 'svelte/transition';
	import WavyBackground from './WavyBackground.svelte';

	let downArrowVisible = true;
	let scrollY: number;

	$: downArrowVisible = scrollY > 0 ? false : true;
</script>

<svelte:window bind:scrollY={scrollY} />

<style>
	:global(body) {
		padding: 0;
	}
	.app-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;

		margin: 0;
		height: 100vh;
		box-sizing: border-box;
		/* background: linear-gradient(160deg, #7CC2FF 0%, #2C8DE3 100%); */
	}

	:root {
		--branding-spacing: 24px;
	}

	.upper-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.lower-content {
		height: 64px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.circle {
		width: 200px;
		height: 200px;
		border-radius: 100px;
		background: linear-gradient(130deg, white 0%, #FFCB3C 60%);
		margin: 0;
		margin-bottom: calc(var(--branding-spacing) * 3);
		box-shadow: 0px 3px 50px rgba(255, 192, 203, 0.5);
	}
	.tagline {
		font-family: Consolas, monospace;
		color: white;
		margin: 0;
		text-align: center;
		margin-bottom: var(--branding-spacing);
	}
	.title {
		margin: 0;
		color: white;
		font-family: Lato, sans-serif;
		font-weight: 400;
		text-align: center;
	}
	.occupation {
		margin: 0;
		text-align: center;
		color: #FFCB3C;
		font-weight: 400;
	}

	.scroll-down {
		color: white;
		margin: 0;
	}
	@keyframes bobble {
		from {
			margin-bottom: 0px;
		}
		to {
			margin-bottom: 6px;
		}
	}
	.down-arrow {
		width: 32px;

		animation-name: bobble;
		animation-duration: .5s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
</style>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<WavyBackground />
	<div class="upper-content">
		<div class="circle" />
		<p class="tagline">simple, concise, productive,</p>
		<h1 class="title">Parker Nilson.</h1>
		<h2 class="occupation">Web Developer</h2>
	</div>
	<div class="lower-content">
		{#if downArrowVisible}
			<div transition:fade class="scroll-down">Scroll down</div>
			<img transition:fade class="down-arrow" src="down-arrow.svg" alt="down arrow" />
		{/if}
	</div>
</div>