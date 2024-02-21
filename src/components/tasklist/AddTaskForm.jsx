import { Button, Card, Grid, Group, Text, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { DateInput } from '@mantine/dates';
import 'react-datepicker/dist/react-datepicker.css';
function AddTaskForm({ closeTaskModal, taskForm, updateTaskForm, addTaskDetails }) {
  return (
    <Card withBorder>
      <Card.Section withBorder inheritPadding py={15}>
        <Text fw={700} >Task Form</Text>
      </Card.Section>
      <Card.Section withBorder inheritPadding py={15}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              placeholder='title'
              label="Task Title"
              withAsterisk
              name='taskTitle'
              value={taskForm.taskTitle}
              onChange={(e) => { updateTaskForm(e.currentTarget.value, 'taskTitle') }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Due Date"
              placeholder="select the date"
              name='dueDate'
              value={taskForm.dueDate}
              onChange={(value) => { updateTaskForm(value, 'dueDate') }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder='description'
              label="Task Description"
              name='taskDescription'
              value={taskForm.taskDescription}
              onChange={(e) => { updateTaskForm(e.currentTarget.value, 'taskDescription') }}
            />
          </Grid.Col>
        </Grid>
      </Card.Section>
      <Card.Section inheritPadding py={15}>
        <Group justify='space-between'>
          <Button variant='default' onClick={closeTaskModal}>Close</Button>
          <Button color='dark' onClick={addTaskDetails}>Add</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default AddTaskForm