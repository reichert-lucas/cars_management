export default function ({ route, redirect }) {
  const token = localStorage.getItem('user-token')
  const unprotectedRoutes = [
    '/register',
    '/'
  ]

  let isProtectedRoute = true
  unprotectedRoutes.forEach((unprotectedRoute) => {
    if (unprotectedRoute === route.path) {
      isProtectedRoute = false
    }
  })

  if (isProtectedRoute) {
    if (!token) {
      return redirect('/')
    }
  }

  if (!isProtectedRoute) {
    if (token) {
      return redirect('/dashboard')
    }
  }
}
