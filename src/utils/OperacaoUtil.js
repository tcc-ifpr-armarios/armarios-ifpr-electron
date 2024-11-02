const { format, parse } = require('date-fns');

class OperacaoUtil {

    static EDITAR = "Editar";
    static SALVAR = "Salvar";
    static EXCLUIR = "Excluir";
    static DETALHES = "Detalhes";

    static ehEmailValido(email) {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(email);
    }

    static ehTelefoneValido(telefone) {
        const regex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
        return regex.test(telefone);
    }

    static formatarDataHora(dataCriacao) {
        if (!dataCriacao) {
            return "Ocupado";
        } else {
            return format(dataCriacao, 'dd/MM/yyyy HH:mm:ss');
        }
    }

    static formatarDataHoraLocalDateTime(dataCriacao) {
        // Retorna um objeto Date baseado na string formatada
        return parse(dataCriacao, 'dd/MM/yyyy HH:mm:ss', new Date());
    }
}

module.exports = OperacaoUtil;
