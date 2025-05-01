let todos: Todo[] = [];

export function getTodos() {
	return todos;
}

export function addTodo(text: string) {
	const todo = {
		id: crypto.randomUUID(),
		text,
		status: 'pending' as const
	};

	todos.push(todo);
}

export function completeTodo(id: string) {
	const i = todos.findIndex((d) => d.id === id);
	todos[i].status = 'complete';
}

export function toggleTodo(id: string) {
	const i = todos.findIndex((d) => d.id === id);
	todos[i].status = todos[i].status === 'paused' ? 'pending' : 'paused';
}

export function deleteTodo(id: string) {
	const i = todos.findIndex((d) => d.id === id);
	todos = [...todos.slice(0, i), ...todos.slice(i + 1)];
}

export function resetTodos() {
	todos = todos.filter((d) => d.status !== 'complete');
	todos.forEach((d) => (d.status = 'pending'));
}

export function clearTodos() {
	todos = [];
}
