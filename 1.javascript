<div id="container"></div>

<script>
  const input = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

  // Function to calculate water levels
  function calculateWaterLevels(arr) {
    let left = new Array(arr.length).fill(0);
    let right = new Array(arr.length).fill(0);
    let waterLevels = new Array(arr.length).fill(0);

    // Find the highest block on the left of each block
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
      left[i] = max;
    }

    // Find the highest block on the right of each block
    max = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] > max) {
        max = arr[i];
      }
      right[i] = max;
    }

    // Calculate the water level on top of each block
    for (let i = 0; i < arr.length; i++) {
      waterLevels[i] = Math.min(left[i], right[i]) - arr[i];
    }

    return waterLevels;
  }

  // Function to create an SVG visualization of the water tank
  function createSVG(arr, waterLevels) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // Create rect elements for each block
    for (let i = 0; i < arr.length; i++) {
      let block = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      block.setAttribute("x", i * 50);
      block.setAttribute("y", 100 - arr[i]);
      block.setAttribute("width", 50);
      block.setAttribute("height", arr[i]);
      block.setAttribute("fill", "blue");
      svg.appendChild(block);
    }

    // Create path elements for each unit of water
    for (let i = 0; i < arr.length; i++) {
      if (waterLevels[i] > 0) {
        let water = document.createElementNS("http://www.w3.org/2000/svg", "path");
        water.setAttribute("d", `M ${i * 50} ${100 - waterLevels[i]} h 50 v ${waterLevels[i]} h -50 Z`);
        water.setAttribute("fill", "green");
        svg.appendChild(water);
      }
    }

    return svg;
  }

  // Calculate water levels and create SVG
  const waterLevels = calculateWaterLevels(input);
  const svg = createSVG(input, waterLevel
