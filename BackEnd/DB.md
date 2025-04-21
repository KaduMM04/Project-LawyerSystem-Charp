LawyerSystem_db



User {
int Id PK.
string role Enum.
string email.
string name.
string phone.
string hashed_password
datetime created_at
datetime updated_at  
}

Lawyer
{
OAB PK
Area_atucao
numero_casos FK
}

Cliente {
CPF	PF
Endereco_id FK
}

Endereco {
id  PK
Rua
Numero
Bairro
CEP
}

Caso {


}

Evento {


}