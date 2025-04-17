LawyerSystem_db



User {
int Id PK
string role Enum
string email
string name
string phone
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


CoursePrice{
int id PK
int course_id FK
float price
datetime created_at
datetime updated_at
}

Course {
int id PK
string name
bool is_active
int category
string owner
string requirements
string description
datetime created_at
datetime updated_at
}

CourseProgress{
int id PK
int course_id FK
int user_id FK
int last_watched_content
datetime created_at
datetime updated_at
}

CourseRating{
int id PK
int course_id FK
int user_id FK
string comment
float rating
datetime created_at
datetime updated_at
}

UserCourse{
int id PK
int user_id FK
int course_id FK
datetime created_at
datetime updated_at
}

UserCart{
int id PK
int user_id FK
list[int] course_id
}

UserWishlist{
int id PK
int course_id FK
float price_on_add
bool is_active
datetime created_at
datetime updated_at
}

CourseContentContainer{
int id PK
int course_id FK
int container_id
}