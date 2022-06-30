import axios from "axios"

console.log(import.meta.env.VITE_API_URL)
export const api = axios.create({
  baseURL: "http://localhost:3000/api"
})