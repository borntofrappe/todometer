import * as database from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		tasks: database.getTodos()
	};
};
