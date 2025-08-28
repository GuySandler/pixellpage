<script>
	import { fetchFromAPI } from '$lib/apiTools';
	import TopBar from './topbar.svelte';
	import Title from "$lib/assets/title.png";
    import HypeFire from "$lib/assets/hypefire.png";

	let lastProjects = $state(["_", "_", "_"]);
    let otherProjects = $state(["_", "_", "_"]);
    let hypedProjects = $state(["_", "_", "_"]);
</script>
<div id="main">
	<TopBar />
	<div id="content">
		<div id="title">
			<img style="width: 30vw; height: auto;" src={Title} alt="title" />
		</div>
		<div id="jumpback" class="card">
			<h1 class="cardheader">Jump Back In</h1>
			<div class="cardcontent">
				{#each lastProjects as project}
					<div class="project">{project}</div>
				{/each}
			</div>
		</div>
		<div class="card">
            <h1 class="cardheader">Browse Other's</h1>
            <div class="cardcontent">
                {#each otherProjects as project}
                    <div class="project"><div style="width:100%;height:100%;border:1px solid white;"></div></div>
                {/each}
            </div>
		</div>
        <div class="card">
            <h1 class="cardheader">Hyped Projects <img style="width: 20px; height: 20px;display: inline-block;" src={HypeFire} alt="hypefire" /></h1>
            <div class="cardcontent">
                {#each hypedProjects as project}
                    <div class="project">{project}</div>
                {/each}
            </div>
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
		overflow: hidden;
	}
	#content {
		padding: 20px;
		position: relative;
		top: 40px;
		/* background: #8580e6; */
		width: 80%;
		height: 90%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		border-radius: 10px;
        overflow-y: auto;
        overflow-x: hidden;
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
		/* width: 100%; */
		margin-bottom: 20px;
		flex-shrink: 0;
        background: #8580e6;
        padding: 15px;
        border-radius: 10px;
        transition:cubic-bezier(1, 0, 0, 1) .25s;
	}
    #title:hover {
        transform: scale(1.05);
    }
	.card {
		width: 80%;
		padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
		border-radius: 6px;
		background: #8d1c34;
        margin: 15px 0;
		flex-shrink: 0;
	}
	.cardheader {
		font-size: 1.5rem;
		font-weight: bold;
		position: relative;
		bottom: 8px;
		right: 8px;
	}
	.cardcontent {
		background: #8580e6;
		padding: 20px;
		position: relative;
		border-radius: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.project {
		display: inline-block;
		padding: 20px;
        margin: 10px;
		width: 15vw;
		height: 15vw;
		background: blue;
		border-radius: 5px;
	}
</style>