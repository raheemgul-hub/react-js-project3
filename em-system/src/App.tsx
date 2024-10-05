import  { useRef, useState,useEffect } from 'react'

import './App.css'
import Department, { DepartmentType } from './Department';

function App() {
  const[first,setFirst]=useState('');
  const[last,setLast]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[phone,setPhone]=useState('');
  const[employee,setEmployee]=useState<employee[]>([])
  const [currentTaskId, setCurrentTaskId] = useState<number>();
  const[formMode,setFormMode]=useState(0)
  const [showdepartment, setShowDepartment] = useState(0);
  let id =useRef<number>(0)
  const [departmentData, setDepartmentData] = useState<DepartmentType[]>([]);
  useEffect(() => {
    if (localStorage.getItem("edu")) {
      console.log('work')
      var old_data = JSON.parse(localStorage.edu);
      setDepartmentData(old_data);
    }else{
      console.log('not work')
    }
  }, []);



//eduaction//
const[educationArray,setEducationsArray]=useState<education[]>([])
const[title,setTitle]=useState('');
const[level,setLevel]=useState('');
const[percentage,setPercentage]=useState('');
//----- ist add emp button onclick-----//
const setShowForm = () => {
  if (formMode === 0) {
    setFormMode(1);
  } else {
    setFormMode(0);
  }
};
//---------save button onclick------// 
  const addEmployees = () => {
    if (first && last && email && address && phone) {
      //-------add-------//
      if(formMode==1){
        
        const newEmployee = {
          id:id.current,
          first,
          last,
          email,
          address,
          phone,
          educations:[]  
        };
        id.current++
        const newsave=[...employee, newEmployee]
        setEmployee(newsave);
        localStorage.setItem("emp", JSON.stringify(newsave));
       
      }else if (formMode === 2) {
      // Editing 
      const updatedemployee= employee.map((e) =>{
        if (e.id === currentTaskId) {
          return { ...e, first, last, email, address, phone };
        } else {
          return e;
        }
      });

      setEmployee(updatedemployee);
      setFormMode(1);
      localStorage.setItem("emp", JSON.stringify(updatedemployee)); 
      setCurrentTaskId(0); 
     
    }
    
    setFirst('');
    setLast('');
    setEmail('');
    setAddress('');
    setPhone('');
    setFormMode(0);
   
  }else{
      alert('please fill all the input fields')
    }
 
  
  } 
  //---------get old data-----------//
  useEffect(() => {
    const storedData = localStorage.getItem("emp");
    if (storedData) {
      console.log("work");
      const old_data = JSON.parse(storedData);
      setEmployee(old_data);
    } else {
      console.log("not work");
    }
  }, []);
  
  
  //-------edit------------//
  const editemployee =(id:number)=>{
    employee.map((e)=>{
     if (e.id==id) {
       setFirst(e.first);
       setLast(e.last); 
       setEmail(e.email);
       setAddress(e.address);
       setPhone(e.phone)
       setFormMode(2);
       setCurrentTaskId(id);
    
     }
    })
 
   }
   //-------------back button----//
   const backbutton =()=>{
    setFormMode(0);
   }
  //-----------delete-------------//
  const deleteemployee =(id:number)=>{
    let index:number=(0);
    employee.map((e,i)=>{
      if(e.id === id){
        index=i
      }
    });
    employee.splice(index,1)
    setEmployee([...employee])
    localStorage.setItem("emp", JSON.stringify(employee));
  }
  //---- education------//
  const educationbutton=()=>{
    setFormMode(3)
  }
  // -----------add-education button----------------
  const addeducation =()=>{
   setFormMode(4)
  }
  //---open department button--------//
const opendepartment=()=>{
 if (showdepartment==0){
  setShowDepartment(1);
  setFormMode(6)
 }
}
//---------save education--------//
const saveeducation = () => {
  if (formMode === 4) {
    const newedu = {
      id: id.current,
      title,
      level,
      percentage
    };
    id.current++;
    const neww = [...educationArray, newedu];
    setEducationsArray(neww);
    localStorage.setItem("emp", JSON.stringify(neww)); 
    setFormMode(3)
  }
  
};
//------------delete education-----//
const deleteeducation=(id:number)=>{
  let index:number=(0);
  educationArray.map((ed,i)=>{
    if(ed.id === id){
      index=i
    }
  });
  educationArray.splice(index,1)
  setEducationsArray([...educationArray])

}


 

  return (
    <div className='main'>
     <div className={showdepartment!==0?'container':'container d-none'}><Department></Department></div>
      {/* nav-bar */}
      <nav className={formMode==6?'navbar bg-body-tertiary d-none':'navbar bg-body-tertiary'}>
          <div className="container-fluid header">
          <i className="fa-solid fa-house-chimney home"></i>
          <div className='but'>
          <button className='btn btn-success mb-3' onClick={setShowForm}>
            {formMode === 0 ? 'Add Employee' : 'Back to List'}
          </button>
          <button type='button' className='btn btn-info mb-3' onClick={opendepartment}> Manage-Department</button>
          </div>
          
           <h2>
           <i className="fa-solid fa-user profile"></i>
            Employee Management</h2>
          </div> 
      </nav>
      {/* new employeee */}
      <div className= {formMode == 1?'form-container':'form-container d-none'}>
          <div className='heading'>
            <h2>New Employee</h2>
            <button type='button' className='btn btn-success arrow' onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
              Back to main
              </button>
          </div>
          <div className="employee-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name <span>*</span></label>
                    <input 
                    type="text" 
                    id="firstName"
                    name="firstName" 
                    placeholder='Enter first name' 
                    value={first}  
                    onChange={(e)=>setFirst(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name <span>*</span></label>
                    <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={last}  
                    onChange={(e)=>setLast(e.target.value)} />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email <span>*</span></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                
                />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address <span>*</span></label>
                    <input 
                    id="address" 
                    name="address" 
                    value={address}  
                    onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone <span>*</span></label>
                    <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={phone}  
                    onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                <label htmlFor="department">Department<span>*</span></label>
                
                <select className="form-select" aria-label="Default select example">
                  <option selected disabled> Select Department</option>
                  {departmentData.map(department => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                </div>
                <div className='drop'>
                  <button type="submit" className="submit-button" onClick={addEmployees}>{formMode === 1 ? 'Save Task' : 'Save Changes'}</button>
                 
                </div>
            </div>
      </div>
        {/* edit employee */}
      <div className= {formMode == 2?'form-container':'form-container d-none'}>
          <div className='heading'>
            <h2>EDIT Employee</h2>
            <button type='button' className='btn btn-success arrow' onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
              Back to main
              </button>
          </div>
          <div className="employee-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name <span>*</span></label>
                    <input 
                    type="text" 
                    id="editfirstName"
                    name="firstName" 
                    placeholder='Enter first name' 
                    value={first}  
                    onChange={(e)=>setFirst(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name <span>*</span></label>
                    <input 
                    type="text" 
                    id="editlastName" 
                    name="lastName" 
                    value={last}  
                    onChange={(e)=>setLast(e.target.value)} />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email <span>*</span></label>
                <input
                  type="text"
                  id="editemail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                
                />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address <span>*</span></label>
                    <input 
                    id="editaddress" 
                    name="address" 
                    value={address}  
                    onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone <span>*</span></label>
                    <input 
                    type="tel" 
                    id="editphone" 
                    name="phone" 
                    value={phone}  
                    onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <button type="submit" className="submit-button" onClick={addEmployees}>save-changes</button>
            </div>
        </div>
       {/* table  */}
      <div className={formMode == 0 ?'container':'container d-none'}>
            <div className='manage'>
              <h2>Manage Employees</h2>
            </div>
           <div className='tab'>
              <table className="table table-bordered">
                  <thead>
                    <tr className="table">
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Actions</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                {employee.map((e) => (
                  <tr className="table" key={e.id}>
                    <td>{e.first}</td>
                    <td>{e.last}</td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.phone}</td>
                    <td className='icon'>
                    <i className="fa-solid fa-pen-to-square yellow"  onClick={()=>editemployee(e.id)}></i>
                    <i className="fa-solid fa-trash red"  onClick={()=>deleteemployee(e.id)}></i>
                    <button type='button' className='edu' onClick={educationbutton}>Education</button>
                    </td>
                    {departmentData.map((d: DepartmentType) => (
                    <td className={d.id === e.id? 'NN' : 'NN d-none'}>
                    {d.name}
                    </td>
                  ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

      {/* education data */}
        <div className={formMode == 4 ?'container':'container d-none'}>
        <div className="form-group">
            <label htmlFor="educationTitle">Education Title</label>
            <input
              type="text"
              id="educationTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="educationLevel">Education Level</label>
            <input
              type="number"
              id="educationLevel"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="educationPercentage">Percentage</label>
            <input
              type="number"
              id="educationPercentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-secondary" onClick={saveeducation}>
            Add Education
          </button>
        </div>

      {/* education table */}
      <div className= {formMode == 3?'form-container':'form-container d-none'}>
            <div className='manage'>
              <h2>Employee education</h2>
              <button type='button' onClick={addeducation}>add-employee-education</button>
            </div>
           <div className='tab'>
              <table className="table table-bordered">
                  <thead>
                    <tr className="table">
                      <th>id</th>
                      <th>title</th>
                      <th>Level</th>
                      <th>Percentage</th>
                      
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                {educationArray.map((ed) => (
                  <tr className="table" key={ed.id}>
                    <td>{ed.id}</td>
                    <td>{ed.title}</td>
                    <td>{ed.level}</td>
                    <td>{ed.percentage}</td>
                    <td className='icon'>
                    <i className="fa-solid fa-pen-to-square yellow"  onClick={()=>editemployee(ed.id)}></i>
                    <i className="fa-solid fa-trash red"  onClick={()=>deleteeducation(ed.id)}></i>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}


export default App
export interface employee{
  id:number
  first:string;
  last:string;
  email:string;
  address:string;
  phone:string;
  education:Array<education>
}
export interface education{
  id:number;
  title:string;
  level:string;
  percentage:string;
}