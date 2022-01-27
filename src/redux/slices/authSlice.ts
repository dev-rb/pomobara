import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initializeApp } from "firebase/app";
import { User, signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from "../../configs/firebase";

interface LoginInfo {
    email: string,
    password: string
}

interface AuthError {
    error: string
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signInUser = createAsyncThunk('auth/signIn', async (info: LoginInfo, thunkApi) => {
    const { email, password } = info;
    try {
        const response = signInWithEmailAndPassword(auth, email, password).then((newUser) => newUser.user.getIdToken());
        return response;
    }
    catch (err) {
        return thunkApi.rejectWithValue("Failed")
    }
})

export const signUpUser = createAsyncThunk('auth/signUp', async (info: LoginInfo, thunkApi) => {
    const { email, password } = info;
    createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
        // return thunkApi.fulfillWithValue((await response).user) as unknown as User
        return newUser.user.getIdToken();
    }).catch((err) => {
        return err;
    })
})

interface Auth {
    user: string | null,
    error: AuthError | null
}

const initialState: Auth = { user: null, error: null }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state: Auth, { payload }: PayloadAction<string>) => {
            state.user = payload;
        },
        signOut: (state: Auth) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.fulfilled, (state, { payload }) => {
                state.user = payload as unknown as string;
            })
            .addCase(signInUser.rejected, (state, { payload }) => {
                state.error = payload as AuthError;
            })
            .addCase(signUpUser.fulfilled, (state, { payload }) => {
                state.user = payload as unknown as string;
            })
            .addCase(signUpUser.rejected, (state, { payload }) => {
                state.error = payload as AuthError;
            })
    }
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;