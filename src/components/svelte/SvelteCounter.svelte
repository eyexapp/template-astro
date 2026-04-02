<!-- @component
A counter written with Svelte — uses shared Nano Store
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { $count as count, increment, decrement } from '../../stores/counter.store';

	interface Props {
		children?: Snippet
	}

	let { children }: Props = $props();

	let value = $state(count.get());

	$effect(() => {
		return count.subscribe((v) => {
			value = v;
		});
	});
</script>

<div class="counter">
	<button onclick={decrement}>-</button>
	<pre>{value}</pre>
	<button onclick={increment}>+</button>
</div>
<div class="counter-message">
	{@render children?.()}
</div>
