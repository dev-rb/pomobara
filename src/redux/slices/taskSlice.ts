import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, TaskStatus } from "../../components/Task";

interface TaskState {
    tasks: ITask[]
}

const initialState: TaskState = {
    tasks: []
}

const taskSlice = createSlice({
    initialState: initialState,
    name: 'taskSlice',
    reducers: {
        addTask: (state: TaskState, { payload }: PayloadAction<ITask>) => {
            state.tasks.push(payload);
        },
        updateTask: (state: TaskState, { payload }: PayloadAction<ITask>) => {
            let findTask = state.tasks.find((val) => val.id === payload.id);

            if (findTask) {
                findTask = { ...payload };
            }
        },
        changeTaskStatus: (state: TaskState, { payload }: PayloadAction<{ taskId: string, newStatus: TaskStatus }>) => {
            let taskWithId = state.tasks.find((val) => val.id === payload.taskId);

            if (taskWithId) {
                taskWithId.status = payload.newStatus;
            }
        }
    }
});

export const { addTask, changeTaskStatus, updateTask } = taskSlice.actions;

export default taskSlice.reducer;