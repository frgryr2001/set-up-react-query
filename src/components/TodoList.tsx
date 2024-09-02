'use client';
import { useQuery } from '@tanstack/react-query';
import TodoItem from './TodoItem';
import { todosApi } from '@/apis/todos';
import { todosQueryKey } from '@/app/utils/query-key-factories';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  const todosQuery = useQuery({
    queryKey: todosQueryKey.all,
    queryFn: async () => todosApi.getList(),
  });

  if (todosQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="flex gap-2 flex-col">
      {todosQuery.data!.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
