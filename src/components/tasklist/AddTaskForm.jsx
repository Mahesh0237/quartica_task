import { Button, Card, Grid, Group, Text, TextInput, Textarea } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DateInput } from '@mantine/dates';
function AddTaskForm({ closeTaskModal, taskForm, updateTaskForm, addTaskDetails, TaskId, allTasks }) {
  const [editingTask, setEditingTask] = useState(null);

  // useEffect to populate form fields when editingTask or TaskId changes
  useEffect(() => {
    if (TaskId !== null && allTasks.length > 0) {
      const taskToEdit = allTasks.find(task => task.id === TaskId);
      if (taskToEdit) {
        setEditingTask(taskToEdit);
        // Update taskForm state with task data when editing
        updateTaskForm(taskToEdit.taskTitle, 'taskTitle');
        updateTaskForm(taskToEdit.dueDate, 'dueDate');
        updateTaskForm(taskToEdit.taskDescription, 'taskDescription');
      }
    }
  }, [TaskId, allTasks]);

  // Function to handle editing of task
  const handleEditTask = () => {
    // Implement your logic to update the task details
    // For example, you might find the task in allTasks array and update its properties
    // Once the task is updated, you can close the modal
    closeTaskModal();
  };
  return (
    <Card withBorder>
      <Card.Section withBorder inheritPadding py={15}>
        <Text fw={700} >Task Form {TaskId}</Text>
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
              onChange={(e) => { updateTaskForm(e.currentTarget.value, 'taskDescription') }}
            />
          </Grid.Col>
        </Grid>
      </Card.Section>
      <Card.Section inheritPadding py={15}>
        <Group justify='space-between'>
          <Button variant='default' onClick={closeTaskModal}>Close</Button>
          {TaskId !== null ? (
            <Button color='dark' onClick={handleEditTask}>Edit</Button>
          ) : (
            <Button color='dark' onClick={addTaskDetails}>Add</Button>
          )}
        </Group>
      </Card.Section>
    </Card>
  )
}

export default AddTaskForm