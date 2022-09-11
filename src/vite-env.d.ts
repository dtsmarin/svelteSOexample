/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { svelte } from '@sveltejs/vite-plugin-svelte'
import type { Hammer } from 'svelte-hammer'
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclick_outside: () => void
  }
  interface HTMLProps<T> {
    onpanup?: (event: any) => any
    onpandown?: (event: any) => any
    onpanstart?: (event: any) => any
    ondoubletap?: (event: any) => any
    onpanmove?: (event: any) => any
    ontap?: (event: any) => any
  }
}
