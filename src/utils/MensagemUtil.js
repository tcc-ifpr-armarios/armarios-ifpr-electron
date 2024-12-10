"use strict";

module.exports = class MensagemUtil {
    static ARMARIO_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar o armário";
    static ARMARIO_ATUALIZACAO_SUCESSO = "Armário Atualizado com Sucesso!";
    static ARMARIO_CAMPO_OBRIGATORIO = "Todos os campus obrigatórios (*) devem ser preenchidos!";
    static ARMARIO_EXCLUSAO_CONFIRMACAO = "Tem certeza que deseja realizar a exclusão do armário número ";
    static ARMARIO_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir o armário";
    static ARMARIO_EXCLUSAO_SUCESSO = "Armário Excluído com Sucesso!";
    static ARMARIO_INSERCAO_ERRO_PADRAO = "Erro não identificado ao inserir um armário";
    static ARMARIO_INSERCAO_SUCESSO = "Armário Cadastrado com Sucesso!";
    static ARMARIO_JA_CADASTRADO_NA_LOCALIZACAO = "Número de armário já cadastrado";
    static ARMARIO_REMOVIDO = "Não foi possível realizar essa operação! Esse armário já foi removido!";
    static ARMARIO_VINCULADO_EMPRESTIMO = "Impossível excluir esse armário, pois existem empréstimos (ativos ou inativos) vinculados a ele!";
    static ARMARIO_ESCOLHA_UM = "Nenhum armário selecionado";
    static ARMARIO_EMPRESTADO = "Consta o empréstimo do armário: ";
    static ERRO_BUSCAR_ARMARIO = "Erro ao buscar armário!";
    static ARMARIO_NAO_ENCONTRADO = "Armário não encontrado!";

    static CURSO_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar o curso";
    static CURSO_ATUALIZACAO_SUCESSO = "Curso Atualizado com Sucesso!";
    static CURSO_CAMPO_OBRIGATORIO = "Todos os campos obrigatórios (*) devem ser preenchidos!";
    static CURSO_EXCLUSAO_CONFIRMACAO = "Tem certeza que deseja realizar a exclusão do curso";
    static CURSO_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir o curso";
    static CURSO_EXCLUSAO_SUCESSO = "Curso Excluído com Sucesso!";
    static CURSO_INSERCAO_ERRO_PADRAO = "Erro não identificado ao inserir um novo curso";
    static CURSO_INSERCAO_SUCESSO = "Curso Cadastrado com Sucesso!";
    static CURSO_NOME_DUPLICADO = "Nome do curso duplicado";
    static CURSO_NOME_OBRIGATORIO = "Nome do curso obrigatório";
    static CURSO_REMOVIDO = "Não foi possível realizar essa operação! Este curso já foi removido!";
    static CURSO_VINCULADO_ESTUDANTE = "Impossível excluir esse curso, pois existem estudantes vinculados a ele!";
    static ERRO_BUSCAR_CURSO = "Erro ao buscar curso!";
    static CURSO_NAO_ENCONTRADO = "Curso não encontrado!";
    static LOCALIZACAO_ERRO_BUSCANDO = "Não foi possível listar os cursos!";

    static BANCO_ERRO_CONFIGURACAO = "Não foi possível iniciar a aplicação!\nVerifique as configurações de conexão com o Banco de Dados!";
    static BANCO_SUCESSO_CONEXAO = "Banco de Dados conectado com sucesso!";
    static BANCO_SUCESSO_CARREGAMENTO = "Banco de Dados carregado com sucesso!";

    static EMPRESTIMO_ARMARIO_POSSUI_EMPRESTIMO_ATIVO = "Armário possui empréstimo ativo!";
    static EMPRESTIMO_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar o empréstimo";
    static EMPRESTIMO_CAMPO_ARMARIO_OBRIGATORIO = "Obrigatório informar o armário!";
    static EMPRESTIMO_CAMPO_ESTUDANTE_OBRIGATORIO = "Obrigatório informar o estudante!";
    static EMPRESTIMO_ESTUDANTE_POSSUI_EMPRESTIMO_ATIVO = "Estudante possui empréstimo ativo!";
    static EMPRESTIMO_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir o empréstimo";
    static EMPRESTIMO_INSERCAO_ERRO_PADRAO = "Erro não identificado ao efetuar o empréstimo";
    static EMPRESTIMO_CANCELADO_USUARIO = "Empréstimo cancelado pelo usuário";
    static EMPRESTIMO_SUCESSO = "Empréstimo realizado com sucesso";
    static EMPRESTIMO_CONFIRMA_EMPRESTIMO = "Confirma o empréstimo";
    static EMPRESTIMO_CONFIRMA_DEVOLUCAO = "Confirma a devolucão do armário: ";
    static EMPRESTIMO_JA_FINALIZADO = "Não foi possível realizar essa operação! Este empréstimo já foi finalizado!";
    static EMPRESTIMO_REMOVIDO = "Não foi possível realizar essa operação! Este empréstimo já foi removido!";
    static EMPRESTIMO_CONFIRMA_DEVOLUCAO_SERVIDOR = "Confirma a devolução da chave do armario ";
    static EMPRESTIMO_NAO_REALIZADO_ERRO = "Erro ao realizar o empréstimo";
    static ERRO_BUSCAR_EMPRESTIMO = "Erro ao buscar o empréstimo";
    static EMPRESTIMO_CAMPO_OBRIGATORIO = "Todos os campos obrigatórios (*) devem ser preenchidos!";

    static CONCESSAO_CONCEDIDA = "Concessão concedida";
    static CONCESSAO_SERVIDOR_ERRO = "Erro ao salvar a concessão: Servidor não informado";
    static CONCESSAO_JA_FINALIZADA = "Concessão já finalizada";
    static CONCESSAO_CONFIMA_DEVOLUCAO = "Confirma o fim da concessão do armário número ";

    static ESTUDANTE_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar o estudante";
    static ESTUDANTE_ATUALIZACAO_SUCESSO = "Estudante Atualizado com Sucesso!";
    static ESTUDANTE_CAMPO_OBRIGATORIO = "Todos os campos obrigatórios (*) devem ser preenchidos!";
    static ESTUDANTE_EXCLUSAO_CONFIRMACAO = "Tem certeza que deseja realizar a exclusão do estudante";
    static ESTUDANTE_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir o estudante";
    static ESTUDANTE_EXCLUSAO_SUCESSO = "Estudante Excluído com Sucesso!";
    static ESTUDANTE_INSERCAO_ERRO_PADRAO = "Erro não identificado ao inserir um novo estudante";
    static ESTUDANTE_INSERCAO_SUCESSO = "Estudante Cadastrado com Sucesso!";
    static ESTUDANTE_RA_DUPLICADO = "Ra já cadastrado";
    static ESTUDANTE_REMOVIDO = "Não foi possível realizar essa operação! Este estudante já foi removido!";
    static ESTUDANTE_VINCULADO_EMPRESTIMO = "Impossível excluir esse estudante, pois existem empréstimos (ativos ou inativos) vinculados a ele!";
    static ESTUDANTE_RA_DUPLICADA = "Ra do estudante duplicado";
    static ESTUDANTE_JA_CADASTRADO = "Estudante já cadastrado!";
    static VALIDACAO_TELEFONE_INVALIDO = "Telefone inválido!";
    static VALIDACAO_EMAIL_INVALIDO = "Email inválido!";
    static ERRO_BUSCAR_ESTUDANTE = "Erro ao buscar estudante!";
    static ESTUDANTE_VINCULADO_EMPRESTIMO = "Impossível excluir esse estudante, pois existem empréstimos (ativos ou inativos) vinculados a ele!";
    static ESTUDANTE_NAO_ENCONTRADO = "Estudante já cadastrado!";

    static LOCALIZACAO_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar a localização";
    static LOCALIZACAO_ATUALIZACAO_SUCESSO = "Localização Atualizada com Sucesso!";
    static LOCALIZACAO_CAMPO_OBRIGATORIO = "Todos os campos obrigatórios (*) devem ser preenchidos!";
    static LOCALIZACAO_DESCRICAO_DUPLICADA = "Descrição da localização duplicada";
    static LOCALIZACAO_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir a localização";
    static LOCALIZACAO_EXCLUSAO_SUCESSO = "Localização Excluída com Sucesso!";
    static LOCALIZACAO_EXCLUSAO_CONFIRMACAO = "Tem certeza que deseja realizar a exclusão da localização";
    static LOCALIZACAO_INSERCAO_ERRO_PADRAO = "Erro não identificado ao inserir uma nova localização";
    static LOCALIZACAO_INSERCAO_SUCESSO = "Localização Cadastrada com Sucesso!";
    static LOCALIZACAO_REMOVIDA = "Não foi possível realizar essa operação! Essa localização já foi removida!";
    static LOCALIZACAO_VINCULADA_ARMARIO = "Impossível excluir essa localização, pois existem armários vinculados a ela!";
    static LOCALIZACAO_ERRO_BUSCANDO = "Não foi possível listar as localizações";

    static LOGIN_CADASTRO_INEXISTENTE = "Cadastro não encontrado. Tente novamente!";
    static LOGIN_EMAIL_OU_SIAPE_OBRIGATORIO = "Informe o e-mail ou o SIAPE";
    static LOGIN_SENHA_INCORRETA = "Senha Incorreta";
    static LOGIN_RA_OBRIGATORIO = "Informe sua matrícula";
    static LOGIN_SENHA_OBRIGATORIA = "Informe sua senha";
    static LOGIN_SUCESSO = "Sucesso no login!";

    static SISTEMA_AUTOR = "Allan Fernando Oliveira de Andrade";
    static SISTEMA_ORIENTADOR = "prof. Marcelo F. Terenciani";
    static SISTEMA_ANO = 2023;

    static SISTEMA_DESENVOLVIDO_POR = `Desenvolvido por ${MensagemUtil.SISTEMA_AUTOR} sob supervisão do ${MensagemUtil.SISTEMA_ORIENTADOR} - ${MensagemUtil.SISTEMA_ANO}`;

    static SERVIDOR_ATUALIZACAO_ERRO_PADRAO = "Erro não identificado ao atualizar o servidor";
    static SERVIDOR_ATUALIZACAO_SUCESSO = "Servidor Atualizado com Sucesso!";
    static SERVIDOR_EXCLUSAO_CONFIRMACAO = "Tem certeza que deseja realizar a exclusão do servidor";
    static SERVIDOR_EXCLUSAO_ERRO_PADRAO = "Erro não identificado ao excluir o servidor";
    static SERVIDOR_EXCLUSAO_SUCESSO = "Servidor Excluído com Sucesso!";
    static SERVIDOR_INSERCAO_ERRO_PADRAO = "Erro não identificado ao inserir um novo servidor";
    static SERVIDOR_INSERCAO_SUCESSO = "Servidor Cadastrado com Sucesso!";
    static SERVIDOR_ERRO_BUSCANDO = "Erro ao buscar os servidores";
    static SERVIDOR_NAO_ENCONTRADO = "Não foi possível buscar o servidor";
    static SERVIDOR_CAMPO_OBRIGATORIO = "Faltam campos no cadastro do servidor"
    static SERVIDOR_DUPLICADO = "Já existe um servidor com esses dados";
    static SERVIDOR_SIAPE_DUPLICADO = "Já existe um servidor com esse siape";
    static SERVIDOR_EMAIL_DUPLICADO = "Já existe um servidor com esse email";
    static SERVIDOR_SENHA_PEQUENA = "A senha precisa ter ao menos 4 digitos";
    static SERVIDOR_SENHA_VAZIA =  "A senha não pode ser vazia";
    static SERVIDOR_EMAIL_SIAPE_DUPLICADO = "Email e siape já utilizados";

    static TITULO_AREA_ADMINISTRADOR = "Gerenciamento de Administradores";
    static TITULO_AREA_CONCESSAO = "Gerenciamento de Concessão de Armários";
    static TITULO_AREA_ARMARIOS = "Gerenciamento de Armários";
    static TITULO_AREA_CURSO = "Gerenciamento de Cursos";
    static TITULO_AREA_EMPRESTIMO = "Gerenciamento de Empréstimos";
    static TITULO_AREA_ESTUDANTE = "Gerenciamento de Estudantes";
    static TITULO_AREA_LOCALIZACAO = "Gerenciamento de Localizações";
    static TITULO_AREA_SERVIDORES = "Gerenciamento de Servidores";
    static TITULO_AREA_SISTEMA = "Gerenciamento do Sistema";
    static TITULO_SISTEMA = "Sistema de Gestão de Armários";


    static CRONOS_AIR_OUT = "Cronos pode não estar disponível. Tente novamente mais tarde.";
    static CRONOS_SUCESSO = "Sucesso ao cadastrar estudante";

    static INTERNAL_SERVER_ERROR = "Erro interno do servidor";
}