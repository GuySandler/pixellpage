<script>
    import Editor from "./editor.svelte";
    import Topbar from "../topbar.svelte";
	import { publishImg } from "$lib/apiTools";
	let editor;

	function fullExport() {
		let token = localStorage.getItem('userToken');
		publishImg(editor.exportImg(), token);
	}
</script>
<Topbar />
<div id="main">
    <div id="content">
        <h1>Editor</h1>
        <Editor bind:this={editor} />
		<div id="buttonContainer">
			<button id="publish" onclick={() => fullExport()}>Publish</button>
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
        position: relative;
        top: 60px;
        /* background-color:red; */
        width:60%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* TODO: center horizontally only */
        /* background: blue; */
    }
	#publish {
		background-color: #8580e6;
		border: none;
		color: white;
		padding: 10px 20px;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	#publish:hover {
		background-color: #5b57a1;
	}
</style>