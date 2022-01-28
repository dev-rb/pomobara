import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword, AuthError, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { ITask } from '../../components/Task';
import { firebaseConfig } from '../../configs/firebase';
import { signIn } from '../slices/authSlice';


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const tasksApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'localhost:5000/' }),
    endpoints: (build) => ({
        getTasksForUser: build.query<ITask[], string>({
            query: (userId) => `tasks/${userId}`
        }),
        signInUser: build.mutation<string, { email: string, password: string }>({
            queryFn: async ({ email, password }: { email: string, password: string }, { dispatch }) => {
                try {
                    // console.log("Sign in called in thunk")
                    const response = await signInWithEmailAndPassword(auth, email, password).then((newUser) => newUser.user.getIdToken());
                    return { data: response };
                }
                catch (err) {
                    const error = err as AuthError;
                    console.log(error.code)
                    return { error: { error: error.code, status: 'CUSTOM_ERROR', data: { errorMsg: "Failed to sign in." } } }
                }
            }
        })
    })

})

export const { useSignInUserMutation } = tasksApi;