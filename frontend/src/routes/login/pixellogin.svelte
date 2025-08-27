<script>
	import Pencil from '$lib/assets/pencil.png';
	import Eraser from '$lib/assets/eraser.png';
	import Bucket from '$lib/assets/bucket.png';
	import Undo from '$lib/assets/undo.png';
	import Trash from '$lib/assets/trash.png';

	let grid = $state(Array.from({ length: 6 * 6 }, () => "white"));
	let colors = ["red", "green", "blue", "yellow", "magenta", "cyan", "gray", "black"];
	let tools = ["pencil", "eraser", "bucket", "undo"];

	let selectedColor = $state("none");
	function selectColor(color) {
		selectedColor = color;
	}

	let lastAction = null;

	function cellClick(i) {
		if (selectedTool === "undo" || selectedTool === "redo") {
			return;
		}

		switch (selectedTool) {
			case "pencil":
				if (grid[i] !== selectedColor) {
					lastAction = { type: "pencil", position: i, oldColor: grid[i] };
					grid[i] = selectedColor;
				}
				break;
			case "eraser":
				if (grid[i] !== "white") {
					lastAction = { type: "eraser", position: i, oldColor: grid[i] };
					grid[i] = "white";
				}
				break;
			case "bucket":
				let originalColor = grid[i];
				if (originalColor !== selectedColor) {
					lastAction = { type: "bucket", position: i, oldColor: originalColor, newColor: selectedColor };
					floodFill(grid, i, selectedColor);
				}
				break;
			default:
				console.log("problem");
		}
	}
	
	function undo() {
		if (lastAction != null) {
			switch (lastAction.type) {
				case "pencil":
				case "eraser":
					grid[lastAction.position] = lastAction.oldColor;
					break;
				case "bucket":
					floodFill(grid, lastAction.position, lastAction.oldColor);
					break;
				default:
					console.log("Problem");
			}
			lastAction = null;
		} else {
			console.log("no lastaction");
		}
	}

	let selectedTool = $state("pencil");
	function selectTool(tool) {
		selectedTool = tool;
	}

	function floodFill(array, start, color, width=6) {
		let originalColor = array[start];
		if (originalColor == color) {
			return
		}
		let height = array.length / width;
		let stack = [start];
		let visited = new Set();

		while (stack.length > 0) {
			let idX = stack.pop();
			
			if (visited.has(idX) || array[idX] !== originalColor) {
				continue;
			}

			visited.add(idX);
			array[idX] = color;

			let row = Math.floor(idX / width);
			let column = idX % width;

			if (column > 0 && array[idX - 1] === originalColor && !visited.has(idX - 1)) {
				stack.push(idX - 1);
			}
			if (column < width - 1 && array[idX + 1] === originalColor && !visited.has(idX + 1)) {
				stack.push(idX + 1);
			}
			if (row > 0 && array[idX - width] === originalColor && !visited.has(idX - width)) {
				stack.push(idX - width);
			}
			if (row < height - 1 && array[idX + width] === originalColor && !visited.has(idX + width)) {
				stack.push(idX + width);
			}
		}
	}

	function clear() {
		grid = Array.from({length: 6 * 6}, () => "white");
	}

	export function exportGrid() {
		let gridPassword = "";
		for (let i = 0; i < grid.length; i++) {
			gridPassword += grid[i];
		}
		return gridPassword;
	}

</script>
<div id="pixellogin">
	<div id="pixelgrid">
		{#each grid as color, i}
			<button style="background-color: {color};" class="pixel-cell" id="{i.toString()}" onclick={() => cellClick(i)} aria-label="pixel {i}"></button>
		{/each}
	</div>
	<div id="colors">
		{#each colors as color}
			<button class="color-cell" class:selected={selectedColor === color} style="background-color: {color};" onclick={() => selectColor(color)} aria-label="{color}"></button>
		{/each}
	</div>
	<div id="tools">
		<button class="tool-cell" onclick={() => selectTool("pencil")} aria-label="select tool"><img src={Pencil} alt="Pencil" class:selected={selectedTool === 'pencil'}/></button>
		<button class="tool-cell" onclick={() => selectTool("eraser")} aria-label="select tool"><img src={Eraser} alt="Eraser" class:selected={selectedTool === 'eraser'}/></button>
		<button class="tool-cell" onclick={() => selectTool("bucket")} aria-label="select tool"><img src={Bucket} alt="Bucket" class:selected={selectedTool === 'bucket'}/></button>
		<button class="tool-cell" onclick={() => undo()} aria-label="undo last action"><img src={Undo} alt="Undo" /></button>
		<button class="tool-cell" onclick={() => clear()} aria-label="clear grid"><img src={Trash} alt="Clear" /></button>
	</div>
</div>
<style>
	#pixelgrid {
		display: grid;
		grid-template-columns: repeat(6, 60px);
		grid-template-rows: repeat(6, 60px);
		border: 1px solid black;
		width: fit-content;
	}
	.pixel-cell {
		width: 60px;
		height: 60px;
		border: .25px solid gray;
		margin:0;
	}
	#colors {
		display: grid;
		grid-template-columns: repeat(8, 60px);
		grid-template-rows: 60px;
		gap: 0px;
		margin-top: 15px;
	}
	.color-cell {
		width: 60px;
		height: 60px;
		border: 1px solid black;
	}
	.color-cell.selected {
		transform: scale(1.2);
	}
	#tools {
		display: grid;
		grid-template-columns: repeat(8, 60px);
		grid-template-rows: 60px;
		gap: 0px;
		margin-top: 15px;
	}
	.tool-cell {
		width: 60px;
		height: 60px;
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #656565
	}
	#pixellogin {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		width: 80%;
		height: 80%;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		object-fit: contain;
		transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
	}
	img.selected {
		transform: scale(1.2);
		background-color: #888888;
	}
</style>