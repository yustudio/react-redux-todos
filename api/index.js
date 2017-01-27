import { v4 } from 'node-uuid';

// Fake in-memory implementation of what would be calling a REST server

const fakeDatabase = {
	todos: [{
		id: v4(),
		text: 'hey',
		completed: true
	}, {
		id: v4(),
		text: 'ho',
		completed: true	
	}
	]
}

const delay = (ms) => 
	new Promise(resolve => setTimeout(resolve, ms));

// Simulate async fetching data
export const fetchTodos = (filter) =>
	delay(100).then(() => {
		switch (filter) {
			case 'all':
				return fakeDatabase.todos;
			case 'active':
				return fakeDatabase.filter(t => !t.completed);
			case 'completed':
				return fakeDatabase.filter(t => t.completed);
			default:
				throw new Error('Unknown filter: ${filter}');
		}
	});