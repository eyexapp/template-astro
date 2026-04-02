/** @jsxImportSource solid-js */

import type { JSX } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { $count, increment, decrement } from '@stores/counter.store';

/** A counter written with Solid — uses shared Nano Store */
export default function SolidCounter(props: { children?: JSX.Element }) {
	const count = useStore($count);

	return (
		<>
			<div id="solid" class="counter">
				<button onClick={decrement}>-</button>
				<pre>{count()}</pre>
				<button onClick={increment}>+</button>
			</div>
			<div class="counter-message">{props.children}</div>
		</>
	);
}
