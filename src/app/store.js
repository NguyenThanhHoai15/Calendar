import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from '../features/calendar/caledarSlice';

const rootReducer = {
    appointments: calendarReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;