<script>
  import { Motion, useMotionValue } from 'svelte-motion'
  import { onMount } from 'svelte'
  import svelteHammer from 'svelte-hammer'
  import { sliderArray } from './sliderarray'
  const map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
  let area
  export let value
  export let color
  export let index
  export let name
  export let controller
  let converted = map(value, 0, 127, 113, -113)
  let y = useMotionValue(converted)
  let slidebarvalue
  $: yText = clamp(Math.round(map($y, 113, -113, 0, 127)), 0, 127) || 0
  $: slidebarvalue = $y

  onMount(() => {
    slidebarvalue = converted
    yText = Math.round(map(converted, 113, -113, 0, 127))
    $sliderArray[index].value.set(Math.round(map(converted, 113, -113, 0, 127)))
  })

  function handleTouch() {
    console.log(yText)
  }

  function handleTap(index) {
    // console.log('You tapped the pip!')
    slidebarvalue = converted
    y = useMotionValue(converted)
    yText = Math.round(map(converted, 113, -113, 0, 127))
    //here will transmit to socket.IO
    updateStores(index, converted)
  }

  function updateStores(index, y) {
    $sliderArray[index].value.set(Math.round(map(y, 113, -113, 0, 127)))
  }
</script>

<div class="background">
  <div class="drag-area" bind:this={area} />
  <Motion
    drag
    style={{ y }}
    dragConstraints={{ current: area }}
    dragDirectionLock={true}
    dragMomentum={false}
    dragElastic={false}
    let:motion
    onDrag={() => {
      updateStores(index, $y)
      handleTouch()
    }}
    whileTap={{ backgroundColor: '#222222' }}
  >
    <div class="box center unselectable" use:motion>
      <div class="label">{yText}</div>
    </div>
  </Motion>
  <div class="sliderbar" style="--minvalue:{map(slidebarvalue, 113, -113, 52, 278)}px;  background-color:{color}" />
  <div
    class="defaultpip"
    style="--startpip:{map(value, 0, 127, 20, 248)}px"
    use:svelteHammer.tap={{ event: 'tap', taps: 1 }}
    on:click={() => {
      handleTap(index)
    }}
  />
  <div class="name">{name} (CC{controller})</div>
</div>

<style>
  .background {
    position: relative;
    background-color: #231d2a;
    display: flex;
    flex-direction: column;
    height: 280px;
    border-radius: 9px;
    justify-content: center;
    align-items: center;
    touch-action: none;
    --webkit-touch-action: none;
    border: solid 2px #9c9c9c;
  }
  .box {
    z-index: 2;
    width: 70px;
    height: 50px;
    position: absolute;
    opacity: 1;
    border-radius: 8px;
    box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0.4);
  }
  .drag-area {
    box-sizing: content-box;
    /* opacity: 0.2; */
    background: #434343;
    /* position: absolute; */
    width: 70px;
    height: 280px;
    border-radius: 7px;
    touch-action: none;
    --webkit-touch-action: none;
  }
  .unselectable {
    user-select: none;
  }
  .center {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .background > .sliderbar {
    z-index: 1;
    position: absolute;
    width: 70px;
    border-radius: 8px 8px 7px 7px;
    opacity: 0.25;
    bottom: 0px;
    height: var(--minvalue);
    touch-action: none;
    --webkit-touch-action: none;
  }
  .background > .defaultpip {
    z-index: 1;
    position: absolute;
    width: 35px;
    border-radius: 0px 5px 5px 0px;
    border: 1px solid black;
    border-left: 0;
    opacity: 0.25;
    background-color: green;
    bottom: var(--startpip);
    right: 48%;
    height: 10px;
  }
  .box > .label {
    font-size: 1.1em;
    margin-left: 0px;
    background-color: transparent;
    opacity: 0.75;
    position: absolute;
    width: 40px;
    touch-action: none;
    --webkit-touch-action: none;
  }
  .name {
    position: absolute;
    z-index: 2;
    left: calc(100% - 1.2em);
    bottom: -0.8em;
    font-size: 1em;
    line-height: 1;
    direction: ltr;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
    transform: rotate(-90deg);
    transform-origin: top left;
  }
</style>
