<script>
  import SliderMini from './components/SliderMini.svelte'
  import faders from './ccdata'
</script>

<div class="fadergrid">
  {#each faders as { cc, n, range, init, clr }, i}
    {#if cc != undefined}
      <SliderMini value={init} controller={cc} name={n} color={clr} index={i} />
    {/if}
  {/each}
</div>

<style>
  .fadergrid {
    touch-action: none;
    display: flex;
    flex-basis: 25%;
    width: 300px;
    flex-wrap: wrap-reverse;
    height: 354px;
    justify-content: flex-end;
  }
</style>
