import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { ticketsReducer } from './tickets.slice';


export * from './auth.slice'
export * from './users.slice'
export * from './tickets.slice'


// @ts-ignore
export const store = configureStore({
    reducer: {
        auth:         authReducer,
        users:        usersReducer,
        tickets:      ticketsReducer
    },
});