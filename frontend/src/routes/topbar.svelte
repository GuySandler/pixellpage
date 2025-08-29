<link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet">
<script>
	import House from "$lib/assets/house.png";
	import Account from "$lib/assets/account.png";

	let isAccountMenuOpen = false;
</script>
<div id="outer">
	<div id="main">
		<button class="mainbutton" id="home" onclick={() => window.location.href = "/"}><img src={House} alt="home"/></button>
		<button class="mainbutton" id="editor" onclick={() => window.location.href = "/editor"}>Editor</button>
		<button class="mainbutton" id="account" onclick={() => isAccountMenuOpen = !isAccountMenuOpen}><img src={Account} alt="account"/></button>
	</div>
</div>
{#if isAccountMenuOpen}
<div id="accountmenu">
	<div id="divit"></div>
	<button onclick={() => window.location.href = "/login"}>
		<p>log in/sign up</p>
	</button>
	<button onclick={() => window.location.href = "/"}>
		<p>settings</p>
	</button>
</div>
{/if}
<style>
	#main {
		display: flex;
		justify-content: space-between;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 60px;
		background: #db8a4c;
		padding-left: 20px;
		padding-right: 20px;
        z-index: 2;
	}
	img {
		width: 40px;
		height: 40px;
		object-fit: contain;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
	.mainbutton {
		transition: cubic-bezier(1, 0, 0, 1) .25s;
	}
	.mainbutton:hover {
		transform: scale(1.1);
		cursor: pointer;
	}
	#accountmenu {
		position: absolute;
		top: 60px;
		right: 20px;
		background: #8d1c34;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
        z-index: 10;
	}
	button {
		cursor: pointer;
	}
	* {
		font-family: "Silkscreen", sans-serif;
		font-weight: 400;
		font-style: normal;
		color: white;
	}
	#divit {
		position:absolute;
		top: -10px;
		right: 8px;
		width: 0;
		height: 0;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		border-bottom: 12px solid #8d1c34;
		z-index: 4;
	}
</style>