import { ITask } from '../../components/Task';
import { api } from './api'

const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<ITask[], void>({
            query: () => ({
                url: `tasks`,
                // mode: 'no-cors',
                method: 'GET',
            }),
            transformResponse: (res: ITask[]) => JSON.parse(JSON.stringify(res)),
            providesTags: (result = [], error, arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Task' as const, id })),
                        { type: 'Task', id: 'LIST' },
                    ]
                    : [{ type: 'Task', id: 'LIST' }],
        }),
        newTask: build.mutation<string, ITask>({
            query: (task: ITask) => ({
                url: `tasks/create`,
                // mode: 'cors',
                method: 'POST',
                body: task,
                headers: { 'Content-Type': 'application/json' }
            }),
            async onQueryStarted(task, { dispatch, queryFulfilled }) {
                const result = dispatch(
                    tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
                        draft.push(task)
                    })
                )

                try {
                    await queryFulfilled;
                } catch {
                    result.undo();
                }
            },
            invalidatesTags: [{ type: 'Task', id: 'LIST' }]

        }),
    }),
    overrideExisting: false,
})

export const {
    useGetTasksQuery,
    useNewTaskMutation
} = tasksApi;