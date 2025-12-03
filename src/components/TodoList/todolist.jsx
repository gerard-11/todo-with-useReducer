import { useReducer} from "react";

const reducer=(state,action)=> {
    switch (action.type) {
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
        case 'SET_TEXT':{
            return {
                ...state,
                text:action.payload
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
        return savedTasks?JSON.parse(savedTasks) :[]
    })(),
    editingTaskId:null,
    editingText:'',
}

export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <div className=''>
                <input type='text'
                       value={state.text}
                       onKeyUp={(e)=>{
                           if(e.key === 'Enter'){
                           dispatch({type:'ADD_TASK'})}
                       }}
                       onChange={(e)=>
                           dispatch({
                           type:'SET_TEXT',
                           payload: e.target.value })}/>
                <button

                    onClick={()=>dispatch({type:'ADD_TASK'})}>Add Task</button>
            </div>
            <div >
                <ul >
                    {state.tasks.map(task => (
                        <li key={task.id}  style={{
                            margin:'-15px'
                        }}>
                            <span
                                onClick={()=>dispatch({type:'TOGGLE_TASK', payload:task.id})
                                }
                                style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? 'gray' : 'white',
                                    cursor:'pointer',
                                    marginRight:'15px',

                                }}>{task.text}</span>
                            <button onClick={(e)=> {
                                e.stopPropagation()
                                dispatch({type: 'REMOVE_TASK', payload: task.id})
                            }}>❌</button>
                            <button
                                style={{
                                    margin:'15px'
                                }}
                                onClick={(e)=> {
                                e.stopPropagation()
                                dispatch({type: 'START_EDIT', payload: {id: task.id, text: task.text}})
                            }}>🖊️</button>
                            {state.editingTaskId === task.id && (
                                <>
                                    <div style={{color:'blue',
                                        display:'flex',
                                        flexDirection:'column',
                                        gap:'10px',
                                        backgroundColor:'red',
                                        padding:'30px',
                                        marginTop:'10px',
                                        borderRadius:'5px',
                                        zIndex:'10',
                                        position:'absolute',
                                    }}>
                                        <h1 style={{position:'absolute', top:'35%', left:'60%', color:'yellow',cursor:'pointer', fontSize:'30px'

                                            }} onClick={()=>dispatch({type:'CLOSE_EDIT'})}>X</h1>
                                        <h3>Tarea</h3>
                                        <input
                                            value={state.editingText}
                                            onKeyUp={(e)=>{
                                                if(e.key === 'Enter'){
                                                    dispatch({type:'CONFIRM_TASK_EDIT'})}
                                            }}
                                            onChange={(e)=>
                                                dispatch({type:'SET_EDIT_TEXT', payload: e.target.value})
                                            }/>
                                        <button
                                        onClick={()=> dispatch({type:'CONFIRM_TASK_EDIT'})}>Confirmar Tarea editada</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>




            </div>
        </>
    )
}


