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
	}
} satisfies Actions;
