<script>
  const map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
  import { Hammer, pan } from 'svelte-hammer'
  let isDragging = false
  let posY = 0
  let rect
  export let height
  export let width
  let offset = 51 / height
  console.log(offset)
  let ratio = offset

  let label
  $: label = Math.round(map(ratio, offset, 1, 0, 127))

  function endDrag() {
    isDragging = false
  }

  function updateRatio(event) {
    if (!isDragging) return
    posY = event.detail.center.y - rect.top
    ratio = clamp((height - posY) / height, offset, 1)
  }

  function logme(event) {
    isDragging = true
    console.log(event.detail.center.y)
    rect = event.target.getBoundingClientRect()
    updateRatio(event)
  }
</script>

<div
  class="slider"
  style="--height:{height}px; --width:{width}px;"
  use:pan={{ direction: Hammer.DIRECTION_VERTICAL, threshold: 1 }}
  on:panmove={logme}
>
  <div class="bar" style:height={Math.round(ratio * height) + 'px'}>
    <div class="handle">{label}</div>
  </div>
</div>

<!-- <div style="margin-top: 20px;font-size:2rem;">HEY BRO</div> -->

<!-- <div class="ratiometer">
  Ratio: {ratio}
</div> -->
<style>
  .slider {
    width: var(--width);
    height: var(--height);
    background-color: black;
    position: relative;
    border-radius: 8px;
    border: 1px solid;
  }

  .bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: tomato;
    width: var(--width);
    pointer-events: none;
    align-content: center;
    text-align: center;
    border-radius: 8px;
  }
  .handle {
    border: 1px solid;
    border-radius: 8px;
    user-select: none;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  /* .ratiometer {
    position: absolute;
    top: 0%;
  } */
</style>
