// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../_helpers';


interface AuthState {
    error: { message: string } | null;
    user: any
    isLoggedOut: false
}

const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
// @ts-ignore
const authSlice = createSlice({ name: 'auth', initialState, reducers, extraReducers });

export const authActions = { ...authSlice.actions, ...extraActions };
export const authReducer = authSlice.reducer;

function createInitialState() {
    return {
        draw: "",
    };
}

function createReducers() {
    return {
        setDraw
    };


    function setDraw(state: any, action: PayloadAction<boolean>): void {
        state.draw = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return {
        getDraw: getDraw(),
    };

    function getDraw() {
        const url = `${baseUrl}/current-draw`;
        // @ts-ignore
        return createAsyncThunk(`${name}/getDraw`, async () => await fetchWrapper.get(`${url}`));
    }

}

function createExtraReducers() {
    return {
        ...login(),
        ...verifySms()
    };

    function login() {
        // @ts-ignore
        const { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending.toString()]: (state: AuthState) => {
                state.error = null;
            },
            [fulfilled.toString()]: (state: AuthState, action: any) => {
                const user = action.payload;
                localStorage.setItem('payout-user', JSON.stringify(user));
                state.user = user;
                state.isLoggedOut = false;
            },
            [rejected.toString()]: (state: AuthState, action: any) => {
                console.log("rejected error", action)
                if (action.error.message.includes('401')) {
                    state.error = { message: 'Username or password is incorrect!' };
                    return;
                }

                if (action.error.message.includes('403')) {
                    state.error = { message: 'Your password has expired! Please reset your password.' };
                    return;
                }
                if (action.error.message.includes('429')) {
                    state.error = { message: 'Account locked due to too many failed login attempts.' };
                    return;
                }


                state.error = action.error;
                console.log('error object', action);
            },
        };
    }

    function verifySms() {
        // @ts-ignore
        const { pending, fulfilled, rejected } = extraActions.verifySms;
        return {
            [pending.toString()]: (state: any) => {
                state.isVerified = { loading: true };
            },
            [fulfilled.toString()]: (state: any, action: any) => {
                state.isVerified = (action.payload.verified);
                localStorage.setItem('user-verified', action.payload.verified);

            },
            [rejected.toString()]: (state: any, action: any) => {
                state.isVerified = { error: action.error };
            },
        };
    }
}
