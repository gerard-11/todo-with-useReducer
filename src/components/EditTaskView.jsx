const EditTaskView = ({state, dispatch}) => {
    return (
        <div style={{color:'blue',
            display:'flex',
            flexDirection:'column',
            gap:'10px',
            backgroundColor:'white',
            padding:'30px',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:'5px',
            zIndex:'10',
            position:'relative',
            width:'400px',
            height:'200px',
        }}>
            <h1 style={{position:'absolute', top:'-18%', right:'-2%', color:'red',cursor:'pointer', fontSize:'40px'
            }} onClick={()=>dispatch({type:'CLOSE_EDIT'})}>X</h1>
            <h3 style={{marginBottom:'15px'}}>Edita Tu Tarea</h3>
            <input
                value={state.editingText}
                onKeyUp={(e)=>{
                    if(e.key === 'Enter'){
                        if (state.editingText.trim() === "") {
                            alert("No puedes dejar la tarea vacía");
                            return;
                        }
                        dispatch({type:'CONFIRM_TASK_EDIT'})}
                }}
                onChange={(e)=> {
                    dispatch({type: 'SET_EDIT_TEXT', payload: e.target.value})}
                }
                style={{
                    fontSize:'19px',
                    margin:'15px',
                    backgroundColor:'white',
                    color:'black',
                    border:'1px solid gray',
                    borderRadius:'5px',
                    height:'50px',

                }}/>
            <button
                style={{margin:'25px'}}
                onClick={()=> {
                    if (state.editingText.trim() === "") {
                        alert("No puedes dejar la tarea vacía");
                        return;
                    }
                    dispatch({type: 'CONFIRM_TASK_EDIT'})
                }}>Confirmar Tarea editada</button>
        </div>
    )
}

export default EditTaskView;