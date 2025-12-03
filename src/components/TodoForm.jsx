const TodoForm=({state, dispatch})=>{
    return (
        <div className=''>
            <input type='text'
                   value={state.text}
                   onChange={(e)=>
                       dispatch({
                           type:'SET_TEXT',
                           payload: e.target.value })}
                   onKeyUp={(e)=>{
                       if(e.key === 'Enter'){
                           dispatch({type:'ADD_TASK'})}
                   }}/>
            <button onClick={()=>dispatch({type:'ADD_TASK'})}>Add Task</button>
        </div>
    )
}
export default TodoForm