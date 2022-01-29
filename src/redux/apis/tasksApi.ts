import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword, AuthError, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { ITask } from '../../components/Task';
import { firebaseConfig } from '../../configs/firebase';
import { signIn } from '../slices/authSlice';
import { IRootState } from '../store';


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const BASE_URL = 'http://localhost:5000/';

export const tasksApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).user.user;

            if (token) {
                // headers.set('Access-Control-Allow-Origin', '*')
                headers.set('Access-Control-Allow-Credentials', 'true')
                headers.set('Authorization', `${token}`);
            }
            // console.log(headers.get('Authorization'))
            return headers;
        }
    }),
    endpoints: (build) => ({
        getTasksForUser: build.query<ITask[], void>({
            query: () => ({
                url: `tasks`,
                // mode: 'no-cors',
                method: 'GET',
            })
        }),
        newTaskForUser: build.mutation<string, ITask>({
            query: (task: ITask) => ({
                url: `tasks/create/${task.id}`,
                // mode: 'no-cors',
                method: 'POST',
                body: task,
            }),

            async onQueryStarted(task, { dispatch, queryFulfilled }) {
                const result = dispatch(
                    tasksApi.util.updateQueryData('getTasksForUser', undefined, (draft) => {
                        draft.push(task);
                    })
                )

                try {
                    await queryFulfilled;
                } catch {
                    result.undo();
                }
            }
        }),
        signInUser: build.mutation<string, { email: string, password: string }>({
            queryFn: async ({ email, password }: { email: string, password: string }) => {
                try {
                    // console.log("Sign in called in thunk")
                    // console.log(endpoint)
                    const response = await signInWithEmailAndPassword(auth, email, password).then((newUser) => newUser.user.getIdToken());
                    // fetch(tasksApi.util.)
                    return { data: response };
                }
                catch (err) {
                    const error = err as AuthError;
                    console.log(error.code)
                    return { error: { error: error.code, status: 'CUSTOM_ERROR', data: { errorMsg: "Failed to sign in." } } }
                }
            }
        }),
        signInWithGoogle: build.mutation<string, void>({
            queryFn: async (_, { endpoint }) => {
                try {
                    // console.log(endpoint)
                    // console.log("Sign in called in thunk")
                    const response = await signInWithPopup(auth, provider).then((newUser) => newUser.user.getIdToken());
                    await fetch(BASE_URL + 'signup', { headers: { 'Authorization': response } })
                    return { data: response };
                }
                catch (err) {
                    const error = err as AuthError;
                    console.log(error.code)
                    return { error: { error: error.code, status: 'CUSTOM_ERROR', data: { errorMsg: "Failed to sign in." } } }
                }
            }
        }),
        signUpUser: build.mutation<string, { email: string, password: string }>({
            queryFn: async ({ email, password }: { email: string, password: string }) => {
                try {
                    // console.log("Sign in called in thunk")
                    const response = await createUserWithEmailAndPassword(auth, email, password).then((newUser) => newUser.user.getIdToken());
                    return { data: response };
                }
                catch (err) {
                    const error = err as AuthError;
                    console.log(error.code)
                    return { error: { error: error.code, status: 'CUSTOM_ERROR', data: { errorMsg: "Failed to sign up." } } }
                }
            }
        }),
        signOutUser: build.mutation<string, void>({
            queryFn: async () => {
                try {
                    // console.log("Sign in called in thunk")
                    await signOut(auth);
                    return { data: "Sign out successful" };
                }
                catch (err) {
                    const error = err as AuthError;
                    console.log(error.code)
                    return { error: { error: error.code, status: 'CUSTOM_ERROR', data: { errorMsg: "Failed to sign out." } } }
                }
            }
        }),
    })

})

export const {
    useSignInUserMutation,
    useSignInWithGoogleMutation,
    useGetTasksForUserQuery,
    useNewTaskForUserMutation
} = tasksApi;