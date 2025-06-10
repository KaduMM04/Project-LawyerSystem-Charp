import {
    Drawer,
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import CaseService from '../../../api/services/case';
import statusNotification from '../../../utils/status_notification';

function ModalCase({ isOpen, onClose, clients }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const lawyerOAB = user?.lawyerOAB || '';

    const [caseData, setCaseData] = useState({
        type: '',
        description: '',
        status: '',
        clientId: '',
    });

    const handleCaseChange = (e) => {
        const { name, value } = e.target;
        setCaseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitCase = async (e) => {
        e.preventDefault();

        const data = {
            type: caseData.type,
            description: caseData.description,
            status: caseData.status,
            lawyerOAB: lawyerOAB,
            clientId: caseData.clientId,
        };

        try {
            await CaseService.createCase(data);
            statusNotification.showSuccess('Processo criado com sucesso');
            onClose();
        } catch (error) {
            statusNotification.showError('Erro ao criar o processo');
        }
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{ width: 400, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Novo Processo
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <form onSubmit={handleSubmitCase}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="type-label">Tipo de Processo</InputLabel>
                        <Select
                            labelId="type-label"
                            name="type"
                            value={caseData.type}
                            onChange={handleCaseChange}
                            required
                            label="Tipo de Processo"
                        >
                            <MenuItem value="">
                                <em>Selecione</em>
                            </MenuItem>
                            <MenuItem value="0">Direito Civil</MenuItem>
                            <MenuItem value="1">Família e Sucessões</MenuItem>
                            <MenuItem value="2">Direito Empresarial</MenuItem>
                            <MenuItem value="3">Direito Trabalhista</MenuItem>
                            <MenuItem value="4">Direito Penal</MenuItem>
                            <MenuItem value="5">Direito Tributário</MenuItem>
                            <MenuItem value="6">Direito Administrativo</MenuItem>
                            <MenuItem value="7">Direito Constitucional</MenuItem>
                            <MenuItem value="8">Direito Imobiliário</MenuItem>
                            <MenuItem value="9">Direito Ambiental</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Descrição"
                        name="description"
                        value={caseData.description}
                        onChange={handleCaseChange}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            name="status"
                            value={caseData.status}
                            onChange={handleCaseChange}
                            required
                            label="Status"
                        >
                            <MenuItem value="">
                                <em>Selecione</em>
                            </MenuItem>
                            <MenuItem value="Pending">Pendente</MenuItem>
                            <MenuItem value="InProgress">Em Andamento</MenuItem>
                            <MenuItem value="Completed">Completo</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="OAB do Advogado"
                        name="lawyerOAB"
                        value={lawyerOAB}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="client-label">Cliente</InputLabel>
                        <Select
                            labelId="client-label"
                            name="clientId"
                            value={caseData.clientId}
                            onChange={handleCaseChange}
                            required
                            label="Cliente"
                        >
                            <MenuItem value="">
                                <em>Selecione</em>
                            </MenuItem>
                            {clients.map((client) => (
                                <MenuItem key={client.clientId} value={client.clientId}>
                                    {client.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button onClick={onClose} sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Salvar Processo
                        </Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
}

export default ModalCase;
