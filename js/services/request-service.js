import RequestException from "./exceptions/request-exception.js";

export async function getJson(url){ //função que faz a requisição na api e devolve o corpo da resposta, pegando o corpo da resposta e transformando em Json
    try { //vai tentar executar
        const response = await fetch(url);
        const jsonBody = await response.json();
        return jsonBody;
    }
    catch (e) {
        throw new RequestException("Erro ao realizar requisição")
    }
}