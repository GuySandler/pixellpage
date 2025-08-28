<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet">
</svelte:head>

<style>
	* {
		font-family: "Silkscreen", sans-serif;
		font-weight: 400;
		font-style: normal;
		color: white;
	}
</style>

{@render children?.()}
