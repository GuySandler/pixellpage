<script>
	import { fetchFromAPI } from '$lib/apiTools';
	import TopBar from './topbar.svelte';
	import Title from "$lib/assets/title.png";

	let lastProjects = $state(["_", "_", "_"]);
</script>
<div id="main">
	<TopBar />
	<div id="content">
		<div id="title">
			<img src={Title} alt="title" />
		</div>
		<div id="jumpback" class="card">
			<h1 class="cardheader">Jump Back In</h1>
			<div class="cardcontent">
				{#each lastProjects as project}
					<div class="lastProject">{project}</div>
				{/each}
			</div>
		</div>
		<div class="card">

		</div>
	</div>
</div>
<style>
	* {
		font-family: "Silkscreen", sans-serif;
		font-weight: 400;
		font-style: normal;
		color: white;
	}
	#main {
		background: black;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#content {
		padding: 20px;
		position: relative;
		top: 40px;
		background: #8580e6;
		width: 50%;
		height: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-radius: 10px;
	}
	img {
		object-fit: contain;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
	#title {
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 5%;
		margin-bottom: 50px;
	}
	.card {
		width: 80%;
		padding: 20px;
		border-radius: 6px;
		background: #8d1c34;
	}
	.cardheader {
		font-size: 1.5rem;
		font-weight: bold;
		position: relative;
		bottom: 15px;
		right: 15px;
	}
	.cardcontent {
		background: green;
		padding: 40px;
		position: relative;
		border-radius: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.lastProject {
		display: inline-block;
		padding: 50px;
		width: 4vw;
		height: 4vw;
		background: blue;
		border-radius: 5px;
	}
</style>