import axios from 'axios'
import TokenHandler from '../Utils/TokenHandler'
import Interceptors from './Interceptors'
import { BASE_URL, API_PORT } from '../Config'

const { RefreshAccessToken } = Interceptors

const tokenHandler = new TokenHandler()

const BASE_API_URL = `${BASE_URL}/api`
const URL_USERS = `${BASE_API_URL.replace('$PORT', API_PORT)}/users`
const URL_FLIGHTS = `${BASE_API_URL.replace('$PORT', API_PORT)}/flights`
const URL_AUTH = `${URL_USERS}/auth`

axios.interceptors.request.use(RefreshAccessToken, Promise.reject)

export default class API {
    async login(email, password) {
        const URL = `${URL_AUTH}/login`
        const body = {
            email,
            password
        }
        return (await axios.post(URL, body)).data
    }

    async register(name, email, password, role) {
        const URL = `${URL_AUTH}/register`
        const body = {
            name,
            email,
            password,
            role
        }
        return (await axios.post(URL, body)).data
    }

    async getUser() {
        const URL = URL_USERS
        const options = {
            headers: {
                Authorization: tokenHandler.get().token
            }
        }
        return (await axios.get(URL, options)).data
    }

    async getFlights() {
        const URL = URL_FLIGHTS
        const options = {
            headers: {
                Authorization: tokenHandler.get().token
            }
        }
        return (await axios.get(URL, options)).data
    }

    async newFlight(origin, destination, departure, arrival, currency, cost) {
        const URL = URL_FLIGHTS
        const body = {
            origin,
            destination,
            departure,
            arrival,
            currency,
            cost
        }
        const options = {
            headers: {
                Authorization: tokenHandler.get().token
            }
        }
        return (await axios.post(URL, body, options)).data
    }

    async deleteFlight(id) {
        const URL = `${URL_FLIGHTS}/${id}`

        const options = {
            headers: {
                Authorization: tokenHandler.get().token
            }
        }
        return (await axios.delete(URL, options)).data
    }

    async refreshAccess() {
        const URL = `${URL_AUTH}/refresh`
        const options = {
            headers: {
                Authorization: tokenHandler.get().refresh
            }
        }
        return await axios.post(URL, {}, options)
    }
}
