import Vue from 'vue'

export default {
    async login ({commit}, payload) { 
        return await this.$axios.$post("auth/login", payload)
            .then(res => {
                const user = res.user
                const token = res.token
                
                localStorage.setItem('user-token', token)
                localStorage.setItem('user', JSON.stringify(user))

                commit('SET_AUTHENTICATED_USER', user)
                commit('SET_USER_TOKEN', token)

                return res
            })
            .catch(error => {
                return Promise.reject(new Error("Não foi possível validar suas credenciais. Verifique os dados informados e tente novamente"))
            })    
    },
    
    checktoken ({commit}) {    
        const token = localStorage.getItem('user-token')
        const user = localStorage.getItem('user')
    
        if (!token) {
            return Promise.reject(new Error('Token Inválido'))
        }
    
        if (!user) {
            return Promise.reject(new Error('Usuário não encontrado'))
        }
        
        this.$axios.setToken(token, 'Bearer')
        commit('SET_USER_TOKEN', token)
        commit('SET_AUTHENTICATED_USER', JSON.parse(user))
    },
    
    async signOut ({commit}) {   
        return await this.$axios.$post("auth/logout")
            .then(() => {                
                localStorage.setItem('user-token', '')
                localStorage.setItem('user', '')
            
                commit('SET_AUTHENTICATED_USER', {})   
                commit('SET_USER_TOKEN', null)
            })
            .catch(error => {
                return Promise.reject(new Error('Ocorreu um erro ao fazer o logout'))
            }) 
    },

    async registerUser ({commit}, payload) { 
        return await this.$axios.$post("auth/register", payload)
            .then(res => {
                const user = res.user
                const token = res.token
                
                localStorage.setItem('user-token', token)
                localStorage.setItem('user', JSON.stringify(user))

                commit('SET_AUTHENTICATED_USER', user)
                commit('SET_USER_TOKEN', token)

                return res
            })
            .catch(error => {
                return Promise.reject(new Error("Ocorreu um erro ao cadastrar o usuário"))
            })    
    },
}