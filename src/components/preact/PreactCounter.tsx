/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact';
import { useStore } from '@nanostores/preact';
import { $count, increment, decrement } from '@stores/counter.store';

/** A counter written with Preact — uses shared Nano Store */
export function PreactCounter({ children }: { children?: ComponentChildren }) {
	const count = useStore($count);

	return (
		<>
			<div class="counter">
				<button onClick={decrement}>-</button>
				<pre>{count}</pre>
				<button onClick={increment}>+</button>
			</div>
			<div class="counter-message">{children}</div>
		</>
	);
}
