# Cars Management

Para facilitar a execução, o back e o front estão no presente repositório. Para a execução do projeto, basta ter o Docker configurado no computador, já que ele vai ser utilizado para levantar os containers do ambiente.

## Executando o ambiente
#### Configurando o arquivo de ambiente
Para rodar o projeto, é necessário que o arquivo `.env` seja criado, para isso, há um exemplo dele no diretório `back`, basta usar o comando `cp back/.env.example back/.env`. Vale salientar, você pode personalizar esse arquivo para seu ambiente.

#### Levantando o ambiente
Você pode fazer a criação dos containers do ambiente usando o comando `docker-compose up`, sendo que esse comando vai deixar o terminal preso com a saída de logs de todos os containers.

#### Migrando as informações para a base de dados
Para criar e popular a base de dados, pode ser usado o comando `docker exec -it cars_management_back php artisan migrate --seed`. Esse comando vai ser executado dentro do container do back, já que ele tem todas as dependências necessárias do backend do projeto.

### Vídeo demonstrativo
<video src='./video-demonstrativo.webm' width=180/>