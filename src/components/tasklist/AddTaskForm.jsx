import { Button, Card, Grid, Group, Text, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { DateInput } from '@mantine/dates';
function AddTaskForm({closeTaskModal}) {
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
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Due Date"
              placeholder="select the date"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder='description'
              label="Task Description"
            />
          </Grid.Col>
        </Grid>
      </Card.Section>
      <Card.Section inheritPadding py={15}>
        <Group justify='space-between'>
          <Button variant='default' onClick={closeTaskModal}>Close</Button>
          <Button color='dark'>Add Task</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default AddTaskForm