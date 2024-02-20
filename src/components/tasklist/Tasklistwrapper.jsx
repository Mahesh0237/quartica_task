import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Group, Modal, Table, Text, Tooltip } from '@mantine/core'
import AddTaskForm from './AddTaskForm'
import { IconEdit, IconTrash } from '@tabler/icons-react';
function Tasklistwrapper() {
    const [taskModal, setTaskModal] = useState(false)
    const OpenTaskModal = () => {
        setTaskModal(true)
    }
    const closeTaskModal = () => {
        setTaskModal(false)
    }

    const [editTaskModal, setEditTaskModal] = useState(false)
    const [TaskId, setTaskId] = useState(null)
    const openEditTaskModal = (id) => {
        setEditTaskModal(true)
        setTaskId(id)
    }
    const closeEditTaskModal = () => {
        setEditTaskModal(false)
    }

    const [taskForm, setTaskForm] = useState({
        taskTitle: '',
        dueDate: null,
        taskDescription: '',
    })

    const updateTaskForm = (value, name) => {
        setTaskForm({ ...taskForm, [name]: value })
    }

    const [allTasks, setAllTasks] = useState([])
    const addTaskDetails = () => {
        const newTask = { ...taskForm, id: Date.now(), completed: false };
        const updatedTasks = [...allTasks, newTask];
        setAllTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setTaskForm({
            taskTitle: '',
            dueDate: null,
            taskDescription: '',
        });
        closeTaskModal();
    };

    useEffect(() => {
        const all_tasks = JSON.parse(localStorage.getItem('tasks'))
        if (all_tasks) {
            setAllTasks(all_tasks)
        }
    }, [])

    const deleteTask = (id) => {
        const updatedList = allTasks.filter((ele, index) => {
            return id !== index
        })
        setAllTasks(updatedList)
    }

    return (
        <Container>
            <Card withBorder>
                <Card.Section withBorder inheritPadding py={15}>
                    <Group justify="space-between">
                        <Text fw={700} >Task List</Text>
                        <Button color='dark' onClick={OpenTaskModal}>Add Task</Button>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py={15}>
                    <Table highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Task ID</Table.Th>
                                <Table.Th>Task Title</Table.Th>
                                <Table.Th>Task Description</Table.Th>
                                <Table.Th>Due Date</Table.Th>
                                <Table.Th>Completion Status</Table.Th>
                                <Table.Th>Edit/delete</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {
                                allTasks.length !== 0 &&
                                allTasks.map((ele, id) => (
                                    <Table.Tr key={id}>
                                        <Table.Td>{id}</Table.Td>
                                        <Table.Td>{ele.taskTitle}</Table.Td>
                                        <Table.Td>{ele.taskDescription}</Table.Td>
                                        <Table.Td>{ele.dueDate.toString()}</Table.Td>
                                        <Table.Td>{ele.completed.toString()}</Table.Td>
                                        <Table.Td>
                                            <Group grow>
                                                <Tooltip
                                                    label="edit"
                                                    withArrow
                                                    arrowPosition="center"
                                                >
                                                    <Button
                                                        variant='light'
                                                        size='xs'
                                                        radius="50%"
                                                        pl={5} pr={5}
                                                        onClick={() => { openEditTaskModal(id) }}
                                                    >
                                                        <IconEdit size={15} />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip
                                                    label="delete"
                                                    withArrow
                                                    position="top-end"
                                                >
                                                    <Button
                                                        variant='light'
                                                        size='xs'
                                                        radius="50%"
                                                        color='red'
                                                        pl={5} pr={5}
                                                        onClick={() => { deleteTask(id) }}
                                                    >
                                                        <IconTrash size={15} />
                                                    </Button>
                                                </Tooltip>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))

                            }
                        </Table.Tbody>
                    </Table>
                </Card.Section>
            </Card>

            <Modal opened={taskModal} onClose={closeTaskModal} size="xl" withCloseButton={false}>
                <AddTaskForm
                    closeTaskModal={closeTaskModal}
                    taskForm={taskForm}
                    updateTaskForm={updateTaskForm}
                    addTaskDetails={addTaskDetails}
                    TaskId={null}
                />
            </Modal>
            {/* edit modal */}
            <Modal opened={editTaskModal} onClose={closeEditTaskModal} size="xl" withCloseButton={false}>
                <AddTaskForm
                    closeTaskModal={closeEditTaskModal}
                    taskForm={taskForm}
                    updateTaskForm={updateTaskForm}
                    addTaskDetails={addTaskDetails}
                    TaskId={TaskId}
                    allTasks={allTasks}
                />
            </Modal>
        </Container>
    )
}

export default Tasklistwrapper