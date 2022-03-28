import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: 'appointments',
    initialState: [],
    reducers: {
        addAppointment(state, action) {
            state.push(action.payload);
        },
        removeAppointment(state, action) {
            const appointmentId = action.payload;
            state = state.filter(appointment => appointment.id !== appointmentId)
            return state;
        },
        updateAppointment(state, action) {
            const newAppointment = action.payload;
            const appointmentIndex = state.findIndex(appointment => appointment.id === newAppointment.id);
            if (appointmentIndex >= 0) {
                state[appointmentIndex] = newAppointment;
            }
        }
    }
});

const { actions, reducer } = calendarSlice;
export const { addAppointment, removeAppointment, updateAppointment } = actions;
export default reducer;