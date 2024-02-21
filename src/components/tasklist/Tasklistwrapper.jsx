import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Checkbox, Container, Group, Modal, Table, Text, Tooltip } from '@mantine/core'
import AddTaskForm from './AddTaskForm'
import { IconEdit, IconTrash } from '@tabler/icons-react';
import EditTaskForm from './EditTaskForm';
import { openConfirmModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
const getLocalItems = () => {
    const all_tasks = JSON.parse(localStorage.getItem('tasks'))
    if (all_tasks) {
        return all_tasks
    } else {
        return []
    }
}

function Tasklistwrapper() {

    const [taskForm, setTaskForm] = useState({
        taskTitle: '',
        dueDate: null,
        taskDescription: '',
    })

    const updateTaskForm = (value, name) => {
        setTaskForm({ ...taskForm, [name]: value })
    }

    // add task modal form
    const [taskModal, setTaskModal] = useState(false)
    const OpenTaskModal = () => {
        setTaskModal(true)
        setTaskForm({
            taskTitle: '',
            dueDate: null,
            taskDescription: '',
        });
    }
    const closeTaskModal = () => {
        setTaskModal(false)
    }
    
    // edit task modal form
    const [editTaskModal, setEditTaskModal] = useState(false)
    const [TaskId, setTaskId] = useState(null)
    const openEditTaskModal = (id) => {
        setEditTaskModal(true)
        setTaskId(id)
    }
    const closeEditTaskModal = () => {
        setEditTaskModal(false)
    }

    const [allTasks, setAllTasks] = useState(getLocalItems())
    // add task
    const addTaskDetails = () => {
        if (taskForm.taskTitle === '') {
            alert('enter the task')
            return false
        }
        const newTask = { ...taskForm, completed: false };
        const updatedTasks = [...allTasks, newTask];
        setAllTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setTaskForm({
            taskTitle: '',
            dueDate: null,
            taskDescription: '',
        });
        notifications.show({
            title: 'Successfully',
            message: 'Task Added',
            color: "green"
        })
        closeTaskModal();
    }

    // edit task
    const EditTaskDetails = (id) => {
        const updatedTaskList = [...allTasks]
        updatedTaskList[id] = taskForm
        setAllTasks(updatedTaskList)
        localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
        setTaskForm({
            taskTitle: '',
            dueDate: null,
            taskDescription: '',
        });
        notifications.show({
            title: 'Successfully',
            message: 'Task updated',
            color: "green"
        })
        closeEditTaskModal()
    }

    // delete task
    const deleteTask = (id) => {
        openConfirmModal({
            title: 'Please confirm your action',
            children: (
                <Text size="md" fw={600}>
                    Are you sure, you want to delete the task....
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                const updatedList = allTasks.filter((ele, index) => {
                    return id !== index
                })
                setAllTasks(updatedList)
                localStorage.setItem('tasks', JSON.stringify(updatedList));
                notifications.show({
                    title: 'Successfully',
                    message: 'Task deleted',
                    color: 'red'
                })
            },
            centered: true,
        });
    }

    useEffect(() => {
        getLocalItems()
    }, [allTasks])

    return (
        <Container size={1350} mt={50}>
            <Text style={{ fontSize: "25px" }} mb={20} fw={700} ta="center">Task Lists</Text>
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
                                <Table.Th>View Details</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {allTasks.length !== 0 ?
                                allTasks.map((ele, id) => (
                                    <Table.Tr key={id}>
                                        <Table.Td>{id}</Table.Td>
                                        <Table.Td>{ele.taskTitle}</Table.Td>
                                        <Table.Td>
                                            {
                                                ele.taskDescription ?
                                                    <Text>{ele.taskDescription}</Text>
                                                    :
                                                    <Text>--</Text>
                                            }
                                        </Table.Td>
                                        <Table.Td>
                                            {
                                                ele.dueDate ?
                                                    <Text>{ele.dueDate.toString()}</Text>
                                                    :
                                                    <Text>---</Text>
                                            }
                                        </Table.Td>
                                        <Table.Td>
                                            <Checkbox defaultChecked label="Completed" />
                                        </Table.Td>
                                        <Table.Td>
                                            <Group grow>
                                                <Tooltip label="edit" withArrow arrowPosition="center">
                                                    <Button
                                                        variant="light"
                                                        size="xs"
                                                        radius="50%"
                                                        pl={5}
                                                        pr={5}
                                                        onClick={() => {
                                                            openEditTaskModal(id);
                                                        }}
                                                    >
                                                        <IconEdit size={15} />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip label="delete" withArrow position="top-end">
                                                    <Button
                                                        variant="light"
                                                        size="xs"
                                                        radius="50%"
                                                        color="red"
                                                        pl={5}
                                                        pr={5}
                                                        onClick={() => {
                                                            deleteTask(id);
                                                        }}
                                                    >
                                                        <IconTrash size={15} />
                                                    </Button>
                                                </Tooltip>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Button component='a' href={`/task/${id}`} size='xs' variant="light">View</Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))
                                :
                                <Alert >
                                    <Text fw={600} component='span' mr={10}>No Data</Text>
                                    <Button onClick={OpenTaskModal}> Add Task</Button>
                                </Alert>
                            }

                        </Table.Tbody>
                    </Table>
                </Card.Section>
            </Card>

            {/* add task modal */}
            <Modal opened={taskModal} onClose={closeTaskModal} size="xl" withCloseButton={false} closeOnClickOutside={false}>
                <AddTaskForm
                    closeTaskModal={closeTaskModal}
                    taskForm={taskForm}
                    updateTaskForm={updateTaskForm}
                    addTaskDetails={addTaskDetails}
                    TaskId={null}

                />
            </Modal>

            {/* edit task modal */}
            <Modal opened={editTaskModal} onClose={closeEditTaskModal} size="xl" withCloseButton={false} closeOnClickOutside={false}>
                <EditTaskForm
                    closeEditTaskModal={closeEditTaskModal}
                    taskForm={taskForm}
                    updateTaskForm={updateTaskForm}
                    TaskId={TaskId}
                    allTasks={allTasks}
                    setTaskForm={setTaskForm}
                    EditTaskDetails={EditTaskDetails}
                />
            </Modal>
        </Container>
    )
}

export default Tasklistwrapper