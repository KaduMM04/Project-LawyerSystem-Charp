import React from 'react';
import { Modal, Button, Form, Input, Select, List } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'antd/dist/antd.css';
import './CaseEventModal.css';
import CaseEventService from '../../../api/services/case_event';
import statusNotification from '../../../utils/status_notification';

const { TextArea } = Input;
const { Option } = Select;

const CaseEventModal = ({ isOpen, onClose, caseId }) => {
    const [events, setEvents] = React.useState([]);
    const [antdForm] = Form.useForm();

    const handleSubmit = async (values) => {
        try {

            if (!caseId) {
                statusNotification.showError('Erro: ID do caso não foi definido.');
                return;
            }
            const formattedDate = new Date(values.EventDate).toISOString();
            const data = {
                Title: values.Title,
                Description: values.Description,
                EventDate: formattedDate,
                EventType: parseInt(values.EventType, 10),
                EventStatus: parseInt(values.EventStatus, 10),
                Notes: values.Notes,
                CaseId: caseId, 
            };
            
            data.EventType = parseInt(data.EventType, 10);
            data.EventStatus = parseInt(data.EventStatus, 10);
            await CaseEventService.createCaseEvent(data);

            antdForm.resetFields();
        } catch (ex) {
            statusNotification.showError('Erro ao enviar o formulário. Por favor, tente novamente.');
        }
    };

    return (
        <Modal
            open={isOpen}
            title="Eventos do Caso"
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
                                title={`${item.Title} em ${item.EventDate}`}
                                description={item.Description}
                            />
                            <div>{item.Notes}</div>
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
                    name="Title"
                    label="Título"
                    rules={[{ required: true, message: 'Por favor, insira um título' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Description"
                    label="Descrição"
                    rules={[{ required: true, message: 'Por favor, insira uma descrição' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="EventDate"
                    label="Data do Evento"
                    rules={[{ required: true, message: 'Por favor, selecione uma data' }]}
                >
                    <Input type="datetime-local" />
                </Form.Item>
                <Form.Item
                    name="EventType"
                    label="Tipo de Evento"
                    rules={[{ required: true, message: 'Por favor, selecione um tipo de evento' }]}
                >
                    <Select placeholder="Selecione o tipo de evento">
                        <Option value="0">Reunião</Option>
                        <Option value="1">Audiência</Option>
                        <Option value="2">Petição</Option>
                        <Option value="3">Sentença</Option>
                        <Option value="4">Despacho</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="EventStatus"
                    label="Status do Evento"
                    rules={[{ required: true, message: 'Por favor, selecione um status' }]}
                >
                    <Select placeholder="Selecione o status do evento">
                        <Option value="0">Agendado</Option>
                        <Option value="1">Realizado</Option>
                        <Option value="2">Cancelado</Option>
                        <Option value="3">Adiado</Option>
                        <Option value="4">Outro</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="Notes" label="Notas">
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Adicionar Evento
                    </Button>
                </Form.Item>
            </Form>
            <ToastContainer />
        </Modal>
    );
};

export default CaseEventModal;
