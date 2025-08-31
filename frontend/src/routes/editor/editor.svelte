<script>
    import Pencil from "$lib/assets/pencil.png";
	import Eraser from "$lib/assets/eraser.png";
	import Bucket from "$lib/assets/bucket.png";
	import Undo from "$lib/assets/undo.png";
	import Trash from "$lib/assets/trash.png";
	// import Line from "$lib/assets/line.png";

    let gridsize = 8*8;
    let pixels = $state(Array.from({ length: 8 * 8 }, () => "white"));

    let colorList = ["white", "red", "green", "blue", "yellow", "purple", "cyan", "magenta"];

    let selectedColor = $state("red");
    let selectedTool = $state("pencil");

	let lastAction = $state(null);

    function selectColor(color) {
        selectedColor = color;
    }
    function selectTool(tool) {
        selectedTool = tool;
    }
	function cellClick(i) {
		switch (selectedTool) {
			case "pencil":
				lastAction = { type: "pencil", index: i, color: pixels[i] };
				pixels[i] = selectedColor;
				break;
			case "eraser":
				lastAction = { type: "eraser", index: i, color: pixels[i] };
				pixels[i] = "white";
				break;
			case "bucket":
				let originalColor = pixels[i];
				if (originalColor !== selectedColor) {
					lastAction = { type: "bucket", index: i, originalColor: originalColor, newColor: selectedColor };
					floodFill(pixels, i, selectedColor);
				}
				break;
			// case "line":
			// 	if (lastAction && lastAction.type === "line" && lastAction.index !== i) {
			// 		lineFill(lastAction.index, i);
			// 		lastAction = { type: "line", index: i };
			// 	} else {
			// 		lastAction = { type: "line", index: i };
			// 	}
			// 	break;
		}
	}
	function floodFill(array, start, color, width=8) {
		const targetColor = array[start];
		if (targetColor == color) return;

		let stack = [start];
		let visited = new Set(stack);

		while (stack.length > 0) {
			let index = stack.pop();
			array[index] = color;

			let neighbors = [
				index -1,
				index +1,
				index -width,
				index +width
			]

			for (let neighbor of neighbors) {
				if (neighbor >= 0 && neighbor < array.length && !visited.has(neighbor) && array[neighbor] == targetColor) {
					stack.push(neighbor);
					visited.add(neighbor);
				}
			}

			visited.forEach(cell => {
				if (cell < array.length) {
					array[cell] = color;
				}
			});
		}
	}
	function undo() {
		if (!lastAction) {
			console.log("no undo")
			return;
		}
		console.log("Undoing action:", lastAction.type)
		
		switch (lastAction.type) {
			case "pencil":
				pixels[lastAction.index] = lastAction.color;
				break;
			case "eraser":
				pixels[lastAction.index] = lastAction.color;
				break;
			case "bucket":
				if (lastAction.originalColor) {
					floodFill(pixels, lastAction.index, lastAction.originalColor);
				}
				break;
			case "clear":
				if (lastAction.lastGrid) {
					lastAction.lastGrid.forEach((color, i) => pixels[i] = color);
				}
				break;
		}

		lastAction = null;
	}
	function clear() {
		lastAction = { type: "clear", lastGrid: pixels };
		pixels.fill("white");
	}
	// function lineFill(index1, index2) {
	// 	let point1 = { x: index1 % 8, y: Math.floor(index1 / 8) };
	// 	let point2 = { x: index2 % 8, y: Math.floor(index2 / 8) };

	// 	const dx = Math.abs(point2.x - point1.x);
	// 	const dy = Math.abs(point2.y - point1.y);
	// 	const sx = point1.x < point2.x ? 1 : -1;
	// 	const sy = point1.y < point2.y ? 1 : -1;
	// 	let err = dx - dy;

	// 	while (true) {
	// 		if (point1.x == point2.x && point1.y == point2.y) break;

	// 		if (err > 0) {
	// 			point1.x += sx;
	// 			err -= dy;
	// 		} else {
	// 			point1.y += sy;
	// 			err += dx;
	// 		}
	// 	}

	// 	pixels.fill(selectedColor, Math.min(index1, index2), Math.max(index1, index2) + 1);
	// }
	let canvas = $state(null);
	const nameToRGB = {
		"white": [255, 255, 255],
		"red": [255, 0, 0],
		"green": [0, 255, 0],
		"blue": [0, 0, 255],
		"yellow": [255, 255, 0],
		"purple": [128, 0, 128],
		"cyan": [0, 255, 255],
		"magenta": [255, 0, 255]
	};
	export function exportImg(size=8) {
		const ctx = canvas.getContext("2d");
		const imageData = ctx.createImageData(size, size);
		for (let i = 0; i < pixels.length; i++) {
			const color = pixels[i];
			const [r, g, b] = nameToRGB[color] || [255, 255, 255];
			imageData.data.set([r, g, b, 255], i * 4);
		}
		ctx.putImageData(imageData, 0, 0);
		console.log(canvas.toDataURL("image/png"));
		return canvas.toDataURL("image/png");
	}
</script>
<canvas id="canvas" width="8" height="8" style="display:none;" bind:this={canvas}></canvas>
<div id="main">
    <div id="editArea">
        {#each pixels as pixel, i}
            <button class="pixel" style="background-color: {pixel};" onclick={() => cellClick(i)} aria-label="pixel {i}"></button>
        {/each}
    </div>
    <div class="area">
        {#each colorList as color}
            <button class="color {selectedColor === color ? "selected" : ""}" style="background-color: {color};" aria-label="{color}" onclick={() => selectColor(color)}></button>
        {/each}
    </div>
    <div class="area">
        <button class="tool {selectedTool === "pencil" ? "selected" : ""}" style="background-image: url({Pencil});" aria-label="Pencil" onclick={() => selectTool("pencil")}></button>
        <button class="tool {selectedTool === "eraser" ? "selected" : ""}" style="background-image: url({Eraser});" aria-label="Eraser" onclick={() => selectTool("eraser")}></button>
        <button class="tool {selectedTool === "bucket" ? "selected" : ""}" style="background-image: url({Bucket});" aria-label="Bucket" onclick={() => selectTool("bucket")}></button>
		<!-- <button class="tool {selectedTool === "line" ? "selected" : ""}" style="background-image: url({Line});" aria-label="Line" onclick={() => selectTool("line")}></button> -->
        <button class="tool" style="background-image: url({Undo});" onclick={() => undo()} aria-label="Undo"></button>
        <button class="tool" style="background-image: url({Trash});" onclick={() => clear()} aria-label="Trash"></button>
    </div>
    <h1>{selectedTool}</h1>
	<!-- <h1>{selectedColor}</h1> -->
	<!-- <h1>{lastAction ? lastAction.type : "No Action"}</h1> -->

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