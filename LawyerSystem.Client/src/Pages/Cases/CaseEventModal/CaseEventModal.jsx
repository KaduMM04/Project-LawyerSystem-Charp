import React from 'react';
import { Modal, Button, Form, Input, Select, List } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'antd/dist/antd.css';
import './CaseEventModal.css';

const { TextArea } = Input;

const eventTypes = [
    { value: 'Hearing', label: 'Hearing' },
    { value: 'Filing', label: 'Filing' },
];

const eventStatuses = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
];

const CaseEventModal = ({ isOpen, onClose, caseId }) => {
    const [events, setEvents] = React.useState([]);
    const [antdForm] = Form.useForm();

    const showError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values,
                caseId,
            };

            const response = await fetch(`http://localhost:/api/caseEvent/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                showError("Erro ao enviar o formulário. Por favor, tente novamente.");
                return;
            }

        } catch (ex) {
            console.error("Error submitting form:", ex);
            showError("Erro ao enviar o formulário. Por favor, tente novamente.");
        }
    };

    return (
        <Modal
            open={isOpen}
            title="Case Events"
            onCancel={onClose}
            footer={null}
            className="case-event-modal"
        >
            <div className="events-list">
                <List
                    dataSource={events}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                title={`${item.eventType} on ${item.eventDate}`}
                                description={item.description}
                            />
                            <div>{item.notes}</div>
                        </List.Item>
                    )}
                />
            </div>
            <Form
                form={antdForm}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="eventDate"
                    label="Event Date"
                    rules={[{ required: true, message: 'Please select a date' }]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name="eventType"
                    label="Event Type"
                    rules={[{ required: true, message: 'Please select an event type' }]}
                >
                    <Select options={eventTypes} />
                </Form.Item>
                <Form.Item
                    name="eventStatus"
                    label="Event Status"
                    rules={[{ required: true, message: 'Please select an event status' }]}
                >
                    <Select options={eventStatuses} />
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
            <ToastContainer />
        </Modal>
    );
};

export default CaseEventModal;
