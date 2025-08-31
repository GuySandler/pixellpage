<link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet">
<script>
	import { registerUser, loginUser } from '$lib/apiTools';
	import Pixellogin from './pixellogin.svelte';
	import LeftArrow from "$lib/assets/leftarrow.png";

	let gridref = null;

	let username = $state("");
	let problem = $state("");
	async function register() {
		problem = "";
		let gridPassword = gridref.exportGrid();
		let response = await registerUser(username, gridPassword);
		if (response.message != "User registered successfully") {
			problem = response.message;
		} else {
			userToken = response.token;
			isLoggedIn = true;
			window.location.href = '/';
		}
	}
	async function login() {
		problem = "";
		let gridPassword = gridref.exportGrid();
		let response = await loginUser(username, gridPassword);
		if (response.message != "Login successful") {
			problem = response.message;
		} else {
			userToken = response.token;
			isLoggedIn = true;
			window.location.href = '/';
		}
	}
	let isLoggedIn = $state(false);
	let userToken = $state("");

	import { onMount } from 'svelte';
	onMount(() => {
		const savedToken = localStorage.getItem('userToken');
		if (savedToken) {
			userToken = savedToken;
			isLoggedIn = true;
		}
	});

	$effect(() => {
		if (userToken) {
			localStorage.setItem('userToken', userToken);
		}
	});
	
	function logout() {
		localStorage.removeItem('userToken');
		userToken = "";
		isLoggedIn = false;
	}
</script>
<div id="outer" style="overflow-y: auto;">
	<div id="main">
		<button id="backbutton" onclick={() => window.location.href = "/"}><img src={LeftArrow} alt="Back"/></button>
		<h1>PixellPage</h1>
		
		{#if isLoggedIn}
			<h2>You are logged in!</h2>
			<p>Welcome back, {username || "User"}!</p>
			<button onclick={() => window.location.href = "/"}>Go to Home</button>
			<button onclick={logout}>Log Out</button>
		{:else}
			<h2>Please enter your username</h2>
			<input type="text" id="username" bind:value={username}/>
			<h2>Please draw your password</h2>
			<Pixellogin bind:this={gridref}/>
			<div>
				<button onclick={register}>Register</button>
				<button onclick={login}>Login</button>
			</div>
			<p id="problem" style="display: {problem ? "block" : "none"}">{problem}</p>
		{/if}
	</div>
</div>
<style>
	#main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		background: #8580e6;
		padding:20px 32px;
		border-radius: 20px;
		box-shadow: 0 4px 24px rgba(0,0,0,0.2);
		max-width: 600px;
		margin: 40px auto;
	}
	button {
		background-color: cyan;
		border: none;
		color: white;
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 5px;
		transition: cubic-bezier(1, 0, 0, 1) .25s;
	}
	button:hover {
		background-color: darkcyan;
		transform: scale(1.05);
	}
	* {
		font-family: "Silkscreen", sans-serif;
		font-weight: 400;
		font-style: normal;
		color:white;
	}
	#problem {
		/* color: red; */
		background: #8d1c34;
		padding: 10px;
		border-radius: 6px;
	}
	h1, h2 {
		text-align: center;
		margin: 0;
	}
	h1 {
		font-size: 2.5em;
	}
	h2 {
		font-size: 1.5em;
	}
	input[type="text"] {
		padding: 10px;
		border-radius: 6px;
		border: 2px solid black;
		background: #8d1c34;
	}
	#outer {
		background: #000000;
		width:100vw;
		height:100vh;
		position: fixed;
		top: 0;
		left: 0;
	}
	img {
		width: 80%;
		height: 80%;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		object-fit: contain;
	}
	#backbutton {
		background: none;
		border: none;
		cursor: pointer;
		background: none;
		width: 75px;
		height: 75px;
		position: absolute;
		top: 20px;
		left: 20px;
	}
	#backbutton:hover {
		transform: none;
	}
</style>
