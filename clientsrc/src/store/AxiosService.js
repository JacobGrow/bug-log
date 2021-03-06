import Axios from "axios"




let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
    baseURL: base + "api/",
    timeout: 4000,
    withCredentials: true
})

export default api