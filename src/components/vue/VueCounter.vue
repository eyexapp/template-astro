<template>
	<div class="counter">
		<button @click="decrement()">-</button>
		<pre>{{ count }}</pre>
		<button @click="increment()">+</button>
	</div>
	<div class="counter-message">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { useStore } from '@nanostores/vue';
import { $count, increment, decrement } from '../../stores/counter.store';

const count = useStore($count);
</script>
