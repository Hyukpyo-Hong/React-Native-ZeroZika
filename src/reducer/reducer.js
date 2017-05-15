export const types = {
    SET_INIT: 'SET_INIT',
    SET_GEO: 'SET_GEO',
    SET_FORECAST: 'SET_FORECAST',
    SET_YESTERDAY: 'SET_YESTERDAY',
    SET_TODAY: 'SET_TODAY',
    SET_CITY: 'SET_CITY',
    SET_TEMP: 'SET_TEMP',//temporary store city name
    SET_TODAY: 'SET_TODAY',
    SET_ALARM: 'SET_ALARM',
    SET_RISK: 'SET_RISK',
    ISLOADING: 'ISLOADING',
    ISERROR: 'ISERROR',
    ISINITIAL: 'ISINITIAL',
}


// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
    set_init: (item) => {
        return { type: types.SET_INIT, payload: item }
    },
    set_geo: (item) => {
        return { type: types.SET_GEO, payload: item }
    },
    set_city: (item) => {
        return { type: types.SET_CITY, payload: item }
    },
    set_forecast: (item) => {
        return { type: types.SET_FORECAST, payload: item }
    },
    set_yesterday: (item) => {
        return { type: types.SET_YESTERDAY, payload: item }
    },
    set_today: (item) => {
        return { type: types.SET_TODAY, payload: item }
    },
    set_alarm: (item) => {
        return { type: types.SET_ALARM, payload: item }
    },
    set_temp: (item) => {
        return { type: types.SET_TEMP, payload: item }
    },
    set_risk: (item) => {
        return { type: types.SET_RISK, payload: item }
    },
    iserror: (item) => {
        return { type: types.ISERROR, payload: item }
    },
    isloading: (item) => {
        return { type: types.ISLOADING, payload: item }
    },
    isinitial: (item) => {
        return { type: types.ISINITIAL, payload: item }
    },
}

// Initial state of the store
const initialState = {
    latitude: null,
    longitude: null,
    city: null,
    forecast: null,
    yesterday: null,
    today: null,
    alarm: false,
    iserror: false,
    isloading: true, //<-Not used
    isinitial: true,
    temp: null,
    risk: null,
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.SET_INIT:
            return {
                ...state,
                forecast: null,
                yesterday: null,
                today: null,
            }
        case types.SET_GEO:
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
            }
        case types.SET_CITY:

            return {
                ...state,
                city: payload,
                temp: payload,
            }
        case types.SET_FORECAST:
            return {
                ...state,
                forecast: payload,
            }
        case types.SET_YESTERDAY:
            return {
                ...state,
                yesterday: payload,
            }
        case types.SET_TODAY:
            return {
                ...state,
                today: payload,
            }
        case types.SET_ALARM:
            return {
                ...state,
                alarm: payload,
            }
        case types.SET_RISK:
            return {
                ...state,
                risk: payload,
            }
        case types.ISERROR:
            return {
                ...state,
                iserror: payload,
            }
        case types.ISLOADING:
            return {
                ...state,
                isloading: payload,
            }
        case types.ISINITIAL:
            return {
                ...state,
                isinitial: payload,
            }
        case types.SET_TEMP:
            return {
                ...state,
                temp: payload,
            }

        default:
            return state;
    }
}


