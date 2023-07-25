import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers';

interface ExtraActions {
    getUser: {
        pending: string;
        fulfilled: string;
        rejected: string;
    };
}

interface State {
    user: {
        loading?: boolean;
        error?: any;
    } & Partial<any>;
}

interface Action {
    payload?: any;
    error?: any;
}

// create slice
const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        user: {}
    }
}

function createExtraActions() {
    // @ts-ignore
    // const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/users`;
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;

    return {
        getUser: createAsyncThunk(`${name}/getUser`, async (body:any) => {
            // @ts-ignore
            return await fetchWrapper.get(`${baseUrl}/user`);
        }),
        updateUser: createAsyncThunk(`${name}/updateUser`, async (body: any) => {
            return await fetchWrapper.put(`${baseUrl}/${body.id}`, body);
        }),
    };
}

function createReducers() {
    return {
        setLoading: (state:any, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    };
}

function createExtraReducers(): any {
    return {
        ...getUser,
    };


    function getUser(extraActions: ExtraActions) {
        const { pending, fulfilled, rejected } = extraActions.getUser;
        return {
            [pending]: (state: State) => {
                state.user = { loading: true };
            },
            [fulfilled]: (state: State, action: Action) => {
                state.user = action.payload!;
            },
            [rejected]: (state: State, action: Action) => {
                state.user = { error: action.error };
            },
        };
    }
}

