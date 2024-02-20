import React, { useState } from 'react'
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
                            <Table.Tr>
                                <Table.Td>Hello</Table.Td>
                                <Table.Td>Hello</Table.Td>
                                <Table.Td>Hello</Table.Td>
                                <Table.Td>Hello</Table.Td>
                                <Table.Td>Hello</Table.Td>
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
                                            >
                                                <IconTrash size={15} />
                                            </Button>
                                        </Tooltip>
                                        {/* <Checkbox
                                            onClick={() => { userData(index) }}
                                        /> */}
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Card.Section>
            </Card>
            <Modal opened={taskModal} onClose={closeTaskModal} size="xl" withCloseButton={false}>
                <AddTaskForm
                    closeTaskModal={closeTaskModal}
                />
            </Modal>
        </Container>
    )
}

export default Tasklistwrapper