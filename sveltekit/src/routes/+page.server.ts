import * as database from '$lib/server/database';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = () => {
	return {
		todos: database.getTodos()
	};
};

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const text = data.get('text') as string;
		if (text !== null) {
			database.addTodo(text);
		}
	},
	complete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		database.completeTodo(id);
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		database.toggleTodo(id);
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		database.deleteTodo(id);
	}
} satisfies Actions;
