import { Todo } from '@/components/TodoList';

export const todosApi = {
  getList: async (): Promise<Todo[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await res.json();
  },

  get: async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return await res.json();
  },

  updateTodoCompleted: async (id: number, completed: boolean) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          completed,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    return await res.json();
  },
};
