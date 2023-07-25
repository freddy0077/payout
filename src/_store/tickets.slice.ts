import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../_helpers';

const name = 'tickets';
const initialState = {
    loading: false,
    drawResults: {},
    winnings: {},
    settings: {},
    error: {}
};

const extraActions = {

    getWinnings: createAsyncThunk(`${name}/getWinnings`, async (drawNumber) => {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
        return await fetchWrapper.get(`${baseUrl}/winnings?drawNo=${drawNumber}`);
    }),

    getDraw: createAsyncThunk(`${name}/getDraw`, async (drawNumber) => {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
        return await fetchWrapper.get(`${baseUrl}/current-draw-results?drawNumber=${drawNumber}`);
    }),

    getSettings: createAsyncThunk(`${name}/getSettings`, async () => {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
        return await fetchWrapper.get(`${baseUrl}/settings`);
    }),

    makePayment: createAsyncThunk(`${name}/makePayment`, async (serial_number) => {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
        return await fetchWrapper.post(`${baseUrl}/make-single-payment/${serial_number}`);
    }),
};

const reducers = {
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },

    setDrawResults: (state, action: PayloadAction<any>) => {
        state.drawResults = action.payload;
    },

    setSettings: (state, action: PayloadAction<any>) => {
        state.settings = action.payload;
    },
};

const extraReducers = (builder) => {
    builder

        .addCase(extraActions.getWinnings.pending, (state) => {
            state.loading = true;
        })
        .addCase(extraActions.getWinnings.fulfilled, (state, action) => {
            state.loading = false;
            state.winnings = action.payload;
        })

        .addCase(extraActions.getWinnings.rejected, (state, action) => {
            state.winnings = action.payload;
        })

        .addCase(extraActions.getDraw.pending, (state) => {
            state.error = null
            state.loading = true;
        })

        .addCase(extraActions.getDraw.fulfilled, (state, action) => {
            state.error = null
            state.loading = false;
            state.drawResults = action.payload;
        })
        .addCase(extraActions.getDraw.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error;
        })
        .addCase(extraActions.getSettings.pending, (state) => {
            state.loading = true;
        })
        .addCase(extraActions.getSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.settings = action.payload.data[0]?.draw_info;
        })
        .addCase(extraActions.getSettings.rejected, (state) => {
            state.loading = false;
            state.settings = { error: true };
        })

        .addCase(extraActions.makePayment.pending, (state) => {
        state.loading = true;
        })
        .addCase(extraActions.makePayment.fulfilled, (state, action) => {
            state.loading = false;
        })


        .addCase(extraActions.makePayment.rejected, (state, action) => {
            state.winnings = action.payload;
        })


};

const ticketsSlice = createSlice({ name, initialState, reducers, extraReducers });

export const ticketActions = { ...ticketsSlice.actions, ...extraActions };
export const ticketsReducer = ticketsSlice.reducer;
