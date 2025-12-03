const TodoItems = ({state,dispatch}) => {
    return (
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

                    </li>
                ))}
            </ul>

        </div>
    )
}
export default TodoItems;