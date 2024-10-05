import { useRef, useState } from 'react'

import './App.css'

function App() {
  const[task,setTask]=useState('')
  const[status,setStatus]=useState('')  
  const[priority,setPriority]=useState('')
  const[date,setDate]=useState('')
  const [tasks, setTasks] = useState([]);
 const[FormMode,setFormMode]=useState(0);
 const [currentTaskId, setCurrentTaskId] = useState('');
 
  let id=useRef(1)
  const setShowForm = () => {
    if (FormMode === 0) {
      setFormMode(1);
    } else {
      setFormMode(0);
    }
  };
  const saveTask = () => {
    if (task && status && priority && date) {
      if(FormMode==1){
        //adding
        const all= { 
          id:id.current,
          task, 
          status, 
          priority, 
          date 
        }
        id.current++
        setTasks([...tasks, all]);
      }
      else if (FormMode === 2) {
        // Editing 
        const updatedTasks = tasks.map((t) =>{
          if (t.id === currentTaskId) {
            return { ...t, task, status, priority, date };
          } else {
            return t;
          }
        });
        setTasks(updatedTasks);
        setFormMode(1); 
        //setCurrentTaskId(''); 
      }
      setTask('');
      setStatus('');
      setPriority('');
      setDate('');
      setFormMode(0);
    }
     else {
      alert('Please fill all fields before saving.');
    } 
  };
  //-----------------------------//
  const editTask =(id)=>{
   tasks.map((t)=>{
    if (t.id==id) {
      setTask(t.task);
      setStatus(t.status); 
      setPriority(t.priority);
      setDate(t.date);
      setFormMode(2);
      setCurrentTaskId(id);
   
    }
   })

  }
  


   //------------------------//
    const deleteTask =(id)=>{
    let index;
    tasks.map((t,i)=>{
      if(t.id === id){
        index=i
      }
    });
    tasks.splice(index,1)
    setTasks ([...tasks])
    }
    
  return (
    <div className='container col-md-4'>
      <h1>To-DO-list</h1>
      <button className='btn btn-primary mb-3' onClick={() => setShowForm()}>
          Add Task
        </button>
        <div className={FormMode !==0?'form': 'form d-none'}>
        <input className="input-group mb-3" type="text" placeholder='Enter Task Here' value={task}  onChange={(e)=>setTask(e.target.value)}/>
     <div>
      <select className="form-select" name='status'value={status}  onChange={(e)=>setStatus(e.target.value)}>
        <option value=""selected disabled >select status</option>
        <option value="Low">low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div>
      <select  className="form-select mt-3" name='priority'value={priority}    onChange={(e)=>setPriority(e.target.value)}>
        <option value="" selected disabled >select priority</option>
        <option value="incomplete">incomplete </option>
        <option value="inprogress">in-progress</option>
        <option value="complete">complete</option>
      </select>
     </div>
     <div>
     <input className="input-group mt-3" type="date" value={date}    onChange={(e)=>setDate(e.target.value)}/>
     <button className="btn btn-success mt-4"type='button' onClick={saveTask} >{FormMode === 1 ? 'Save Task' : 'Save Changes'}</button>
     
     </div>
        </div>
     
   
        {tasks.map((t) => (
          <div className='print' key={t.id}> 
          <p><strong>Id:</strong>{t.id}</p>
            <p ><strong>Description: </strong> {t.task} </p>
           <p ><strong>Status: </strong> {t.status} </p>
           <p ><strong>Priority: </strong> {t.priority} </p>
            <p ><strong>Date: </strong> {t.date} </p>
          <div className='buttons'>
        
          <button className='btn btn-info' type='button' onClick={()=>editTask(t.id)}>EDIT</button>
          <button className='btn btn-danger'type='button' onClick={()=>deleteTask(t.id)}>DELETE-task</button>
          </div>
          </div>
        
        ))}
      </div>
   
  )
}

export default App
