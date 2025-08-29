<script>
    import Pencil from "$lib/assets/pencil.png";
	import Eraser from "$lib/assets/eraser.png";
	import Bucket from "$lib/assets/bucket.png";
	import Undo from "$lib/assets/undo.png";
	import Trash from "$lib/assets/trash.png";

    let gridsize = 8*8;
    let pixels = $state(Array.from({ length: 8 * 8 }, () => "white"));

    let colorList = ["white", "red", "green", "blue", "yellow", "purple", "cyan", "magenta"];

    let selectedColor = $state("red");
    let selectedTool = $state("pencil");

    function selectColor(color) {
        selectedColor = color;
    }
    function selectTool(tool) {
        selectedTool = tool;
    }
</script>
<div id="main">
    <div id="editArea">
        {#each pixels as pixel, i}
            <button class="pixel" style="background-color: {pixel};" aria-label="pixel {i}"></button>
        {/each}
    </div>
    <div class="area">
        {#each colorList as color}
            <button class="color" style="background-color: {color};" aria-label="{color}"></button>
        {/each}
    </div>
    <div class="area">
        <button class="tool {selectedTool === "pencil" ? "selected" : ""}" style="background-image: url({Pencil});" aria-label="Pencil" onclick={() => selectTool("pencil")}></button>
        <button class="tool {selectedTool === "eraser" ? "selected" : ""}" style="background-image: url({Eraser});" aria-label="Eraser" onclick={() => selectTool("eraser")}></button>
        <button class="tool {selectedTool === "bucket" ? "selected" : ""}" style="background-image: url({Bucket});" aria-label="Bucket" onclick={() => selectTool("bucket")}></button>
        <button class="tool" style="background-image: url({Undo});" aria-label="Undo"></button>
        <button class="tool" style="background-image: url({Trash});" aria-label="Trash"></button>
    </div>
    <h1>{selectedTool}</h1>
</div>
<style>
    * {
        font-family: "Silkscreen", sans-serif;
        font-weight: 400;
        font-style: normal;
        color: white;
    }
    #editArea {
        display: grid;
        grid-template-columns: repeat(8, 50px);
        grid-template-rows: repeat(8, 50px);
        /* width: 40vw; */
        /* height: 40vw; */
        gap: 0;
        width: fit-content;
    }
    .pixel {
        border: 1px solid rgba(197, 197, 197, 0.6);
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    .area {
        margin-top: 10px;
        width:100%;
        height: 50px;
        background-color: rgba(204, 204, 204, 0.6);
    }
    .color {
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: cubic-bezier(1, 0, 0, 1) .25s;
    }
    .color:hover {
        transform: scale(1.1);
    }
    .tool {
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-size: cover;
        transition: cubic-bezier(1, 0, 0, 1) .25s;
        image-rendering: pixelated;
		image-rendering: crisp-edges;
		object-fit: contain;
    }
    .tool:hover {
        transform: scale(1.1);
    }
    .selected {
        transform: scale(1.1);
    }
</style>