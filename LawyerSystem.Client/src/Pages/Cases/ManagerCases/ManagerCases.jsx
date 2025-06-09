// ManagerCases.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import {
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    Gavel as GavelIcon,
    Search as SearchIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Widgets as WidgetsIcon,
} from '@mui/icons-material';
import ModalCase from '../CaseModal/ModalCase';
import CaseEventModal from '../CaseEventModal/CaseEventModal';
import CaseViewModal from '../CaseViewModal/CaseViewModal';
import Sidebar from '../../../Components/Sidebar/Sidebar';

function ManagerCases() {
    const [cases, setCases] = useState([]);
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCaseForEvent, setSelectedCaseForEvent] = useState(null);
    const [selectedCaseForView, setSelectedCaseForView] = useState(null);

    useEffect(() => {
        // Buscar os casos
        const fetchCases = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/case/all');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os casos');
                }
                const data = await response.json();
                setCases(data);
            } catch (error) {
                console.error('Erro ao buscar casos:', error);
                setCases([]);
            }
        };

        // Buscar os clientes
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/all');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os usuários');
                }
                const data = await response.json();
                const clientUsers = data.filter((user) => user.role === 'Cliente');
                setClients(clientUsers);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setClients([]);
            }
        };

        fetchCases();
        fetchClients();
    }, []);

    // Função para obter o nome do cliente pelo clientId
    const getClientName = (clientId) => {
        const clientUser = clients.find((user) => user.clientId === clientId);
        return clientUser ? clientUser.name : 'Cliente não encontrado';
    };

    // Filtro de busca
    const filteredCases = cases.filter((caseItem) => {
        const searchLower = search.toLowerCase();
        const clientName = getClientName(caseItem.clientId).toLowerCase();

        return (
            caseItem.caseNumber.toString().toLowerCase().includes(searchLower) ||
            caseItem.status.toLowerCase().includes(searchLower) ||
            caseItem.typeCases.toLowerCase().includes(searchLower) ||
            clientName.includes(searchLower)
        );
    });

    const handleOpenCaseEventModal = (caseItem) => {
        setSelectedCaseForEvent(caseItem);
    };

    const handleCloseCaseEventModal = () => {
        setSelectedCaseForEvent(null);
    };

    const handleOpenCaseDetailModal = (caseItem) => {
        setSelectedCaseForView(caseItem);
    };

    const handleCloseCaseDetailModal = () => {
        setSelectedCaseForView(null);
    };

    return (
        <>
            <Sidebar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gerenciamento de Processos
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar por número, status, tipo ou cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 4 }}
                />

                <Grid container spacing={3} justifyContent="center">
                    {filteredCases.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">
                                Nenhum processo encontrado.
                            </Typography>
                        </Grid>
                    ) : (
                        filteredCases.map((caseItem) => (
                            <Grid
                                item
                                key={caseItem.id}
                                xs={12}
                                sm={6}
                                md={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Card
                                    sx={{
                                        width: 300,
                                        height: 250,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: 3,
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                color: 'primary.main',
                                                display: 'flex',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <GavelIcon sx={{ mr: 1 }} />
                                            Processo: <b>{caseItem.caseNumber}</b>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <AssignmentTurnedInIcon sx={{ mr: 1 }} color="action" />
                                            Status: <b>{caseItem.status}</b>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <PersonIcon sx={{ mr: 1 }} color="action" />
                                            Cliente: <b>{getClientName(caseItem.clientId)}</b>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <WidgetsIcon color="action" sx={{ mr: 1 }} />
                                            Tipo: <b>{caseItem.typeCases}</b>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton
                                            color="primary"
                                            title="Visualizar"
                                            onClick={() => handleOpenCaseDetailModal(caseItem)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="primary" title="Editar">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            title="Cadastrar Evento"
                                            onClick={() => handleOpenCaseEventModal(caseItem)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setShowModal(true)}
                    sx={{ mt: 4 }}
                >
                    Criar Novo Processo
                </Button>
            </Container>
            <ModalCase
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                clients={clients}
            />
            {selectedCaseForEvent && (
                <CaseEventModal
                    isOpen={!!selectedCaseForEvent}
                    onClose={handleCloseCaseEventModal}
                    caseId={selectedCaseForEvent.id}
                />
            )}
            {selectedCaseForView && (
                <CaseViewModal
                    isOpen={!!selectedCaseForView}
                    onClose={handleCloseCaseDetailModal}
                    caseData={selectedCaseForView}
                />
            )}
        </>
    );
}

export default ManagerCases;
