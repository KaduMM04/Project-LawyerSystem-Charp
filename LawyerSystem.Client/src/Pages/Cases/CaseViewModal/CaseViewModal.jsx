// CaseViewModal.jsx
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Divider,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Close as CloseIcon,
    Gavel as GavelIcon,
    Person as PersonIcon,
    Event as EventIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import CaseEventService from '../../../api/services/case_event';
import ClientService from '../../../api/services/client';
import UserService from '../../../api/services/user';	
import statusNotification from '../../../utils/status_notification';

const StyledModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    overflowY: 'auto',
    borderRadius: theme.shape.borderRadius,
}));

const CaseViewModal = ({ isOpen, onClose, caseData }) => {
    const [caseEvents, setCaseEvents] = useState([]);
    const [clientData, setClientData] = useState(null);
    const [clientError, setClientError] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [user, setUser] = useState([null]);


    const eventTypeMap = {
        0: 'Reuniao',
        1: 'Audiência',
        2: 'Petição',
        3: 'Sentença',
        4: 'Despacho',
    };

    useEffect(() => {
        if (!isOpen || !caseData?.id) return;

        const controller = new AbortController();
        const { signal } = controller;

        const fetchCaseEvents = async () => {
            try {
                const data = await CaseEventService.getAllCaseEvents();

                setCaseEvents(data.filter(event => event.caseId === caseData.id));
            } catch (error) {
                statusNotification.showError(err || 'Erro ao buscar eventos do caso');
            }
        };

        const fetchClientData = async () => {
            try {
                const clientInfo = await ClientService.getClientById(caseData.clientId)
                const userInfo = await UserService.getUserById(clientInfo.userId);
                
                setUser(userInfo);
                setClientData(clientInfo);
                setClientError(false);
            } catch (error) {
                statusNotification.showError(error || 'Erro ao buscar informações do cliente');
                setClientError(true);
            }
        };

        fetchCaseEvents();
        if (caseData.clientId) {
            fetchClientData();
        }

        return () => controller.abort();
    }, [isOpen, caseData]);

    if (!caseData) return null;

    const handleTabChange = (_, newValue) => setTabIndex(newValue);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <StyledModalBox>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Detalhes do Processo</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="Detalhes do processo"
                >
                    <Tab label="Informações do Caso" icon={<GavelIcon />} iconPosition="start" />
                    <Tab label="Informações do Cliente" icon={<PersonIcon />} iconPosition="start" />
                    <Tab label="Eventos do Caso" icon={<EventIcon />} iconPosition="start" />
                </Tabs>

                {tabIndex === 0 && (
                    <Card sx={{ mt: 2 }}>
                        <CardHeader avatar={<Avatar><GavelIcon /></Avatar>} title="Informações do Caso" />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography><b>Número do Processo:</b> {caseData.caseNumber}</Typography>
                                    <Typography><b>Tipo:</b> {caseData.typeCases}</Typography>
                                    <Typography><b>Status:</b> {caseData.status}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        title={caseData.description}
                                        sx={{
                                            whiteSpace: 'pre-wrap',      // mantém quebras de linha do texto original e quebra linhas longas
                                            wordBreak: 'break-word',     // força quebra de palavras muito longas
                                        }}
                                    >
                                        <b>Descrição:</b> {caseData.description}
                                    </Typography>
                                    
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {tabIndex === 1 && (
                    <Card sx={{ mt: 2 }}>
                        <CardHeader avatar={<Avatar><PersonIcon /></Avatar>} title="Informações do Cliente" />
                        <CardContent>
                            {clientError ? (
                                <Typography color="error">Erro ao carregar informações do cliente.</Typography>
                            ) : clientData ? (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><b>Nome:</b> {user.name}</Typography>
                                        <Typography><b>Email:</b> {user.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><b>Telefone:</b> {user.phone}</Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Typography variant="body2">Carregando informações do cliente...</Typography>
                            )}
                        </CardContent>
                    </Card>
                )}

                {tabIndex === 2 && (
                    <Card sx={{ mt: 2 }}>
                        <CardHeader avatar={<Avatar><EventIcon /></Avatar>} title="Eventos do Caso" />
                        <CardContent>
                            {caseEvents.length === 0 ? (
                                <Typography variant="body2">Nenhum evento cadastrado para este caso.</Typography>
                            ) : (
                                <List>
                                    {caseEvents.map(event => (
                                        <Paper key={event.id} sx={{ mb: 2 }}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1">
                                                            {eventTypeMap[event.eventType] || event.eventType} — {new Date(event.eventDate).toLocaleString('pt-BR', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography variant="body2"><b>Status:</b> {event.eventStatus}</Typography>
                                                            <Typography
                                                                title={caseData.description}
                                                                sx={{
                                                                    whiteSpace: 'pre-wrap',      // mantém quebras de linha do texto original e quebra linhas longas
                                                                    wordBreak: 'break-word',     // força quebra de palavras muito longas
                                                                }}
                                                            >
                                                                <b>Descrição:</b> {event.description}
                                                            </Typography>
                                                            {event.notes && (
                                                                <Typography variant="body2"><b>Notas:</b> {event.notes}</Typography>
                                                            )}
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        </Paper>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                )}
            </StyledModalBox>
        </Modal>
    );
};

export default CaseViewModal;
