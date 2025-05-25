import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
function LawyerListPage() {
    const [lawyers, setLawyers] = useState([]);

    const getLawyers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Lawyer/all');
            if (!response.ok) {
                throw new Error('Failed to fetch lawyers');
            }
            const data = await response.json();
            console.log("teste");
            console.log(data);

            // AQUI: Atualiza o estado!
            setLawyers(data);
        } catch (error) {
            console.error('Error fetching lawyers:', error);
            setLawyers([]);  // Deixa o estado vazio em caso de erro.
        }
    }

    useEffect(() => {
        getLawyers();
    }, []);

    return (
        <div className="lawyer-container-list">
            <h1>Lista de Advogados</h1>
            {lawyers.length === 0 ? (
                <p>Nenhum advogado encontrado.</p>
            ) : (
                <div>
                    {lawyers.map((lawyer) => (
                        <div className="lawyer-item" key={lawyer.OAB}>
                            <div className="lawyer-details">
                                <div>OAB:{lawyer.OAB}</div>
                                <button
                                    className="action-button"
                                    /*onClick={() => editLawyer(lawyer.OAB) }                                        */
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className='action-button delete'
                                    /*onClick={() => deletePlayer(player.id)}*/
                                >
                                    <DeleteOutlineIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LawyerListPage;
