<script>
    import Editor from "./editor.svelte";
    import Topbar from "../topbar.svelte";
</script>
<Topbar />
<div id="main">
    <div id="content">
        <h1>Editor</h1>
        <Editor />
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
</style>