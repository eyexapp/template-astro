/** @jsxImportSource react */

import { type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { $count, increment, decrement } from '@stores/counter.store';

/** A counter written with React — uses shared Nano Store */
export function Counter({ children }: { children?: ReactNode }) {
	const count = useStore($count);

	return (
		<>
			<div className="counter">
				<button onClick={decrement}>-</button>
				<pre>{count}</pre>
				<button onClick={increment}>+</button>
			</div>
			<div className="counter-message">{children}</div>
		</>
	);
}
