import API from '../../API'
import TokenHandler from '../../Utils/TokenHandler'
import {
    ADD_NEW_FLIGHT_ERROR,
    ADD_NEW_FLIGHT_LOADING,
    ADD_NEW_FLIGHT_SUCCESS,
    DELETE_FLIGHT_ERROR,
    DELETE_FLIGHT_LOADING,
    DELETE_FLIGHT_SUCCESS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_LOADING,
    GET_FLIGHTS_SUCCESS,
    GET_USER_ERROR,
    GET_USER_LOADING,
    GET_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    REGISTER_ERROR,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    RESET_DIALOG
} from '../ActionTypes'

const api = new API()
const tokenHandler = new TokenHandler()

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_LOADING })
        try {
            const { token, refreshToken } = await api.login(email, password)
            tokenHandler.set(token)
            tokenHandler.setRefresh(refreshToken)
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: { token, refreshToken }
            })
        } catch (e) {
            return dispatch({
                type: LOGIN_ERROR,
                payload: e
            })
        }
    }
}

export const register = (name, email, password, role) => {
    return async (dispatch) => {
        dispatch({ type: REGISTER_LOADING })
        try {
            const { token, refreshToken, message } = await api.register(
                name,
                email,
                password,
                role
            )
            tokenHandler.set(token)
            tokenHandler.setRefresh(refreshToken)
            return dispatch({
                type: REGISTER_SUCCESS,
                payload: { token, refreshToken, message }
            })
        } catch (e) {
            return dispatch({
                type: REGISTER_ERROR,
                payload: e
            })
        }
    }
}

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_LOADING })
        try {
            const { user } = await api.getUser()
            return dispatch({
                type: GET_USER_SUCCESS,
                payload: user
            })
        } catch (e) {
            return dispatch({
                type: GET_USER_ERROR,
                payload: e
            })
        }
    }
}

export const getFlights = () => {
    return async (dispatch) => {
        dispatch({ type: GET_FLIGHTS_LOADING })
        try {
            const { flights } = await api.getFlights()
            return dispatch({
                type: GET_FLIGHTS_SUCCESS,
                payload: flights
            })
        } catch (e) {
            return dispatch({
                type: GET_FLIGHTS_ERROR,
                payload: e
            })
        }
    }
}

export const newFlight = (
    origin,
    destination,
    departure,
    arrival,
    currency,
    cost
) => {
    return async (dispatch) => {
        dispatch({ type: ADD_NEW_FLIGHT_LOADING })
        try {
            const { flight } = await api.newFlight(
                origin,
                destination,
                departure,
                arrival,
                currency,
                cost
            )
            return dispatch({
                type: ADD_NEW_FLIGHT_SUCCESS,
                payload: flight
            })
        } catch (e) {
            return dispatch({
                type: ADD_NEW_FLIGHT_ERROR,
                payload: e
            })
        }
    }
}

export const deleteFlight = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_FLIGHT_LOADING })
        try {
            const response = await api.deleteFlight(id)
            return dispatch({
                type: DELETE_FLIGHT_SUCCESS,
                payload: {
                    ...response,
                    id
                }
            })
        } catch (e) {
            return dispatch({
                type: DELETE_FLIGHT_ERROR,
                payload: e
            })
        }
    }
}

export const resetDialog = (dialogName) => {
    return (dispatch) => {
        dispatch({
            type: RESET_DIALOG,
            payload: dialogName
        })
    }
}
