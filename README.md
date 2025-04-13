<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

🛠️ Tecnologias utilizadas
NestJS — Framework Node.js para aplicações escaláveis

TypeScript — Linguagem principal

npm — Gerenciador de pacotes

⚙️ Configuração do projeto

Clone o repositório:
git clone git@github.com:vidaal126/Teste-tecnico-InfinityPay.git
cd Teste-tecnico-InfinityPay

Instale as dependências:
npm i

▶️ Como rodar o projeto
Modo produção
npm run start

Modo desenvolvimento
npm run start:dev

📁 Estrutura do projeto
src/
├── @types/ # Tipagens globais
├── tasks/ # Módulo de tarefas
│ ├── **mocks**/ # Mocks para testes
│ ├── **tests**/ # Testes automatizados
│ ├── dto/ # Data Transfer Objects
│ ├── tasks.controller.ts # Controller com rotas relacionadas a tarefas
│ ├── tasks.module.ts # Módulo de tarefas
│ └── tasks.service.ts # Regras de negócio das tarefas
├── users/ # Módulo de usuários
│ ├── **mocks**/ # Mocks para testes de usuários
│ ├── **tests**/ # Testes automatizados
│ ├── dto/ # DTOs para usuários
│ ├── users.controller.ts # Controller com rotas relacionadas a usuários
│ ├── users.module.ts # Módulo de usuários
│ └── users.service.ts # Regras de negócio dos usuários
├── app.module.ts # Módulo principal da aplicação
├── main.ts # Ponto de entrada da aplicação

📌 Observações
Este projeto foi desenvolvido com foco na clareza, organização e boas práticas do NestJS.

Caso tenha dúvidas sobre a execução ou estrutura, fique à vontade para entrar em contato.
