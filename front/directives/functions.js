export const tools = {
    prepareErrorMessasge: (error, defaultMessage) => {
        if (!error.response) {
            throw new Error(defaultMessage)
        }
    
        if (error.response.status == 422 && error.response.data.errors) {
            let firstErrorIndex = Object.keys(error.response.data.errors)
    
            throw new Error(error.response.data.errors[firstErrorIndex][0])
        }
        if (error.response.status == 422 && error.response.data.errors) {
            let firstErrorIndex = Object.keys(error.response.data.errors)
    
            throw new Error(error.response.data.errors[firstErrorIndex][0])
        }
    
        if (error.response.status == 422 && error.response.data.erro.erros_validacao){
            let firstErrorIndex = Object.keys(error.response.data.erro.erros_validacao)
    
            throw new Error(error.response.data.erro.erros_validacao[firstErrorIndex][0])
        }
    
        if (error.response.data.erro) {
            throw new Error(error.response.data.erro.mensagem)
        }
    
        if (error.response.data.mensagem) {
            throw new Error(error.response.data.mensagem)
        }

        if (error.response.status == 403 && error.response.data[0]){    
            throw new Error(error.response.data[0])
        }
    
        throw new Error(defaultMessage)
    }
}