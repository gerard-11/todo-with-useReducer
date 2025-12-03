import { useReducer} from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItems from "./TodoItems.jsx";
import EditTaskView from "./EditTaskView.jsx";

const reducer=(state,action)=> {
    switch (action.type) {
        case 'SET_TEXT':{
            return {
                ...state,
                text:action.payload
            }
        }
        case 'ADD_TASK': {
           if(state.text.trim() === "") return state
            const newTask = {
                id: Date.now(),
                text: state.text,
                completed: false,
            }
           const updateTask = [...state.tasks,newTask];
           localStorage.setItem("tasks",JSON.stringify(updateTask));
            return {
                ...state,
                tasks: updateTask,
                text: '',
            }
        }

        case 'REMOVE_TASK': {
            const removeTask = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem("tasks",JSON.stringify(removeTask));
            return {
                ...state,
                tasks: removeTask,
            }
        }
        case 'TOGGLE_TASK': {
            const taskCompleted = state.tasks.map((task) => task.id !== action.payload ? task : {
                ...task,
                completed:!task.completed,
            })
            localStorage.setItem("tasks",JSON.stringify(taskCompleted));
            console.log(taskCompleted)
            return {
                ...state,
                tasks:taskCompleted,
            }
        }
        case 'START_EDIT': {
            return{
                ...state,
                editingTaskId:action.payload.id,
                editingText:action.payload.text,
                editView:true
            }
        }
        case 'SET_EDIT_TEXT':{
            return {
                ...state,
                editingText:action.payload,

            }
        }
        case 'CLOSE_EDIT':{
                return {
                    ...state,
                    editingTaskId:null,
                    editingText:'',
                    editView:false
                }
        }
        case 'CONFIRM_TASK_EDIT':{

            const updateTask = state.tasks.map(task => task.id !== state.editingTaskId? task : {...task, text:state.editingText }
            )
            localStorage.setItem("tasks",JSON.stringify(updateTask));
            return{
                ...state,
                tasks:updateTask,
                editingTaskId:null,
                editingText:'',
                editView:false
            }
        }
        default:
            return state;
    }
}
const initialState={
    text:'',
    tasks:(()=>{
        const savedTasks=localStorage.getItem("tasks")
        return savedTasks ? JSON.parse(savedTasks) : []
    })(),
    editingTaskId:null,
    editingText:'',
    editView:false,
}

export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            {!state.editView&&(
                <>
                    <TodoForm state={state} dispatch={dispatch}/>
                    <TodoItems state={state} dispatch={dispatch}/>
                </>
            )}
            {state.editView && (

                <EditTaskView state={state} dispatch={dispatch}/>
            )}
        </>

    )
}




