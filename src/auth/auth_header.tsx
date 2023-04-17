export default function authHeader() {
    let tokenString = localStorage.getItem('token')
    if (tokenString !== null) {
        const token = JSON.parse(tokenString); 
        if (token) {
            return { Authorization: 'Bearer ' + token };
          } else {
            return {}
          }
    } else {
        return {}
    }
}