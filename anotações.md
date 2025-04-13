como acessar o prisma{
sempre colocar await exemplo:
awit this.prisma.nome da tabela.method
}

proximas tasks{
• A data de vencimento deve ser no futuro.
• Uma tarefa só pode ter até 3 colaboradores alocados. RESOLVIDO
• O status só pode ser alterado por um Gerente ou por um Colaborador alocado na
tarefa.{
    cenario para editar uma task {
        precisa existir uma task;
        se for colaborador precisa esta alocado para editar se não, 
        tem que ser gerente;
    }

    dados necessarios: task_id, user_id, status(task). Todos os dados vem do DTO

}CONCLUIDO

• Tarefas concluídas não podem ser editadas.
}

*lembrete*{
    sempre que estiver com duvida imagine o fluxo da operação
    pilares:{
        o que preciso fazer?
        quais são os dados que preciso?
        de onde vem esses dados? vem do DTO? está no banco de dados?
        manipulação dos dados
        imaginar todo o fluxo
    }
}