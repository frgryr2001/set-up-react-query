import { Checkbox, Flex } from '@mantine/core';
import { Todo } from './TodoList';
import { useMutation } from '@tanstack/react-query';
import { todosApi } from '@/apis/todos';
import { todosQueryKey } from '@/app/utils/query-key-factories';

export default function TodoItem({ todo }: Readonly<{ todo: Todo }>) {
  const { mutate } = useMutation({
    mutationFn: async (id: number) =>
      todosApi.updateTodoCompleted(id, !todo.completed),
    mutationKey: todosQueryKey.all,
  });

  return (
    <li className={`${todo.completed ? 'line-through' : ''}`}>
      <Flex gap="md" align={'center'}>
        <Checkbox checked={todo.completed} onChange={() => mutate(todo.id)} />
        <h3>{todo.title}</h3>
      </Flex>
    </li>
  );
}
