import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { Container, Space, Text } from '@mantine/core';

export default function Home() {
  return (
    <Container className="mt-20 ">
      <Text size="xl" fw={700}>
        Todo List
      </Text>
      <Space h="lg" />
      <TodoForm />
      <TodoList todos={[{ id: 1, title: 'First todo', completed: false }]} />
    </Container>
  );
}
