import { Button, Card, Grid, Group, Text, TextInput, Textarea } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DateInput } from '@mantine/dates';

function EditTaskForm({ closeEditTaskModal, taskForm, setTaskForm, updateTaskForm, EditTaskDetails, TaskId, allTasks }) {

    const filterData = allTasks.filter((ele, id) => {
        return id === TaskId
    })

    const singleData = filterData[0]
    let converted_Due_date

    if(singleData.dueDate !==null){
        converted_Due_date = new Date(Date.parse(singleData.dueDate.toString()))
    }else{
        converted_Due_date = null
    }

    let obj = {
        taskTitle: singleData.taskTitle,
        dueDate: converted_Due_date,
        taskDescription: singleData.taskDescription,
    }

    useEffect(() => {
        setTaskForm(obj)
    }, [])

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
                    <Button variant='default' onClick={closeEditTaskModal}>Close</Button>
                    <Button color='dark' onClick={()=>{EditTaskDetails(TaskId)}}>Edit</Button>
                </Group>
            </Card.Section>
        </Card>
    )
}

export default EditTaskForm