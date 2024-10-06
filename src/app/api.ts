import axios from "axios";

const api = axios.create({baseURL: 'https://api.pacelearn.co/api'})

export default api