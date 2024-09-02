'use client';
import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core';
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from '@mantine/form';

export default function TodoForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
    },

    validate: {
      title: isNotEmpty('Body is required'),
    },
  });

  const handleSubmit = () => {
    if (form.isValid()) {
      const { title } = form.values;
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack align="stretch" justify="center" gap="md">
        <TextInput
          label="Title"
          placeholder="Your title"
          withAsterisk
          key={form.key('title')}
          {...form.getInputProps('title')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
