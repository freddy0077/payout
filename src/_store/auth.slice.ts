// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../_helpers';

interface User {
    // Add properties according to your user object structure
}

interface AuthState {
    user: User | null;
    isLoggedOut: boolean;
    error: { message: string } | null;
    isAdminLoginOpen: boolean;
    isAssessmentLoginOpen: boolean;
    isVerified: boolean | null;
    isLoading: boolean
}

const initialState: AuthState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const authSlice = createSlice({ name: 'auth', initialState, reducers, extraReducers });

export const authActions = { ...authSlice.actions, ...extraActions };
export const authReducer = authSlice.reducer;

function createInitialState(): AuthState {
    return {
        user: JSON.parse(localStorage.getItem('payout-user') || 'null'),
        isLoggedOut: false,
        error: null,
        isAdminLoginOpen: false,
        isAssessmentLoginOpen: false,
        isVerified: (Boolean(localStorage.getItem('user-verified')) || false),
        isLoading: false
    };
}

function createReducers() {
    return {
        logout,
        setLogout,
        openAdminLogin,
    };

    function logout(state: AuthState): void {
        state.user = null;
        localStorage.removeItem('payout-user');
    }

    function openAdminLogin(state: AuthState): void {
        state.isAdminLoginOpen = true;
        state.error = null;
    }

    function setLogout(state: AuthState, action: PayloadAction<boolean>): void {
        state.isLoggedOut = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return {
        login: login(),
        changePassword: changePassword(),
        verifySms: verifySms(),
    };

    function login() {
        return createAsyncThunk(
            'auth/login',
            async ({ email, password }: { email: string; password: string }) =>
                await fetchWrapper.post(`${baseUrl}/payout/login`, { email, password }),
        );
    }

    function changePassword() {
        return createAsyncThunk(
            'auth/changePassword',
            async ({ password }: { password: string }) =>
                await fetchWrapper.post(`${baseUrl}/auth/change-password`, { password }),
        );
    }

    function verifySms() {
        return createAsyncThunk(
            'auth/verify-sms',
            async ({ code }: { code: string }) =>
                await fetchWrapper.post(`${baseUrl}/auth/verify-sms`, { code }),
        );
    }
}

function createExtraReducers() {
    return {
        ...login(),
        ...verifySms()
    };

    function login() {
        const { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending.toString()]: (state: AuthState) => {
                state.error = null;
                state.isLoading = true
            },
            [fulfilled.toString()]: (state: AuthState, action: any) => {
                const user = action.payload;
                localStorage.setItem('payout-user', JSON.stringify(user));
                state.user = user;
                state.isLoggedOut = false;
                state.isLoading = false
            },
            [rejected.toString()]: (state: AuthState, action: any) => {
                state.isLoading = false

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
