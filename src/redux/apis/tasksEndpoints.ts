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
        getTask: build.query<ITask, string>({
            query: (id) => ({
                url: `task/${id}`,
                // mode: 'no-cors',
                method: 'GET',
            }),
            transformResponse: (res: ITask) => JSON.parse(JSON.stringify(res)),
            providesTags: (result, error, id) => [{ type: 'Task', id }],

        }),
        newTask: build.mutation<void, ITask>({
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

                console.log("Added: ", result)

                try {
                    await queryFulfilled;
                } catch {
                    result.undo();
                }
            },
            invalidatesTags: [{ type: 'Task', id: 'LIST' }]

        }),
        updateTask: build.mutation<void, ITask>({
            query: (task) => ({
                url: `tasks/update/${task.id}`,
                method: 'PUT',
                body: task,
                headers: { 'Content-Type': 'application/json' }
            }),
            async onQueryStarted({ ...task }, { dispatch, queryFulfilled }) {
                console.log("Before updateQueryData")
                const result = dispatch(tasksApi.util.updateQueryData('getTask', task.id, (draft) => {
                    console.log("Update Query Called")
                    console.log(draft)
                    Object.assign(draft, { ...task });
                }))
                // const resTwo = dispatch(tasksApi.util.patchQueryData('getTask', task.id, result.patches));
                console.log(result)
                console.log("After updateQueryData")

                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log("Failed", err)
                    result.undo();
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }, 'Level']
        }),
        deleteTask: build.mutation<void, string>({
            query: (taskId) => ({
                url: `tasks/delete/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Task', id }]
        }),
        getLevel: build.query<{ level: number, xp: number }, void>({
            query: () => ({
                url: 'level',
                method: 'GET'
            }),
            providesTags: ['Level']
        })
    }),
    overrideExisting: false,
})

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useNewTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,

    useGetLevelQuery
} = tasksApi;