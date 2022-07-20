export default function ({route, redirect}){
    const token = localStorage.getItem('user-token')

    if (route.path !== '/') { //painel
        if(!token) {
            return redirect('/')
        }
    } else if (route.path === '/') { //login
        if(token) {
            return redirect('/dashboard')
        }
    }
}