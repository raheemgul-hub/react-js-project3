import { useRef, useState,useEffect } from "react"
import './Department.css'
function Department(){
 const [name,setName]=useState('');
 const [code,setCode]=useState('');
 const[description,setDescription]=useState('');
 const[department,setDepartment]=useState<department[]>([])
 const[formMode,setFormMode]=useState<number>(0)
 const [currentTaskId, setCurrentTaskId] = useState<number>();
 let id =useRef<number>(0)





const addDepartment=()=>{
    if(name && code && description){
        if(formMode==1){
            const obj={
                id:id.current,
                name,
                code,
                description
            }
            id.current++
            const newsave=[...department, obj]
            setDepartment(newsave);
            setFormMode(0)
            localStorage.setItem("edu", JSON.stringify(newsave));
        }
        else if (formMode === 2) {
          // Editing 
          const updatedepartment= department.map((d) =>{
            if (d.id == currentTaskId) {
              return { ...d, name, code, description };
            } else {
              return d;
            }
          });
          setDepartment(updatedepartment);
          setFormMode(0);
          localStorage.setItem("edu", JSON.stringify(updatedepartment)); 
          setCurrentTaskId(0); 
          
        }
        setName('');
        setCode('');
       setDescription('');
    }else {
      alert('You can handle validation for missing fields here')
  }
    
    
}
//edit//
const editdepartment=(id:number)=>{
  department.map((d)=>{
    if (d.id== id) {
      setName(d.name);
      setCode(d.code); 
      setDescription(d.description);
      setFormMode(2);
      setCurrentTaskId(id);
   
    }
   })
}
//delete//
const deletedepartment =(id:number)=>{
    let index:number=(0);
    department.map((d,i)=>{
      if(d.id === id){
        index=i
      }
    });
    department.splice(index,1)
    setDepartment([...department])
    localStorage.setItem("edu", JSON.stringify(department));
    
  }
  const setShowForm = () => {
  if (formMode == 0) {
    setFormMode(1);
  } else {
    setFormMode(0);
  }
};
//use effect//
useEffect(() => {
    
  if (localStorage.getItem("edu")) {
    console.log('work')
    var old_data = JSON.parse(localStorage.edu);
    setDepartment(old_data);
  }else{
    console.log('not work')
  }
}, []);

return(
    <div className="main">
        <div className='heading'>
            <h2>Department</h2>
            <button className='btn btn-success mb-3' onClick={setShowForm}>
            {formMode == 0 ? 'Add Department ' : 'Back to List'}
          </button> 
        </div>
        {/* add depaerment form */}
        <div className={formMode==0?'employee-form d-none':'employee-form '}>
            <div className="form-group">
                <label htmlFor="Name">Name <span>*</span></label>
                <input 
                type="text" 
                id="Name"
                name="Name" 
                placeholder='Enter department name' 
                value={name}  
                onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="code">Department Code <span>*</span></label>
                <input 
                type="text" 
                id="code" 
                name="code" 
                value={code} 
                placeholder="enter department code" 
                onChange={(e)=>setCode(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description <span>*</span></label>
                <input
                type="text"
                id="description"
                name="description"
                value={description}
                placeholder="enter department description"
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit" className="submit-button" onClick={addDepartment} >save</button>
        </div>
        {/* department table */}
        <div className={formMode==0?'container':'container d-none'}>
            <div className='manage'>
              <h2>Manage Department</h2>
              
            </div>
           <div className='tab'>
              <table className="table table-bordered">
                  <thead>
                    <tr className="table">
                      <th>id</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                {department.map((d) => (
                  <tr className="table" key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.code}</td>
                    <td>{d.description}</td>
                    <td className='icon'>
                    <i className="fa-solid fa-pen-to-square yellow"  onClick={()=>editdepartment(d.id)}></i> 
                    <i className="fa-solid fa-trash red"  onClick={()=>deletedepartment(d.id)}></i>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>

)
}
export default Department
export interface department{
    id:number
    name:string;
    code:string;
    description:string;
}  