export const types = {
    SET_GEO: 'SET_GEO',
    SET_FORECAST: 'SET_FORECAST',
    SET_YESTERDAY: 'SET_YESTERDAY',
    SET_CITY: 'SET_CITY',
    SET_TODAY: 'SET_TODAY',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
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
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
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

        default:
            return state;
    }
}


