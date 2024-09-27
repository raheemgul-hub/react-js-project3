import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[first,setFirst]=useState('');
  const[last,setLast]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[phone,setPhone]=useState('');
  const[employee,setEmployee]=useState([])
  const [currentTaskId, setCurrentTaskId] = useState('');
  const[formMode,setFormMode]=useState(0)
  let id =useRef(1)
//-------add-------//
const setShowForm = () => {
  if (formMode === 0) {
    setFormMode(1);
  } else {
    setFormMode(0);
  }
};
  const addEmployees = () => {
    if (first && last && email && address && phone) {
      if(formMode==1){
        const newEmployee = {
          id:id.current,
          first,
          last,
          email,
          address,
          phone
        };
        id.current++
        setEmployee([...employee, newEmployee]);
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
      //setCurrentTaskId('');
      
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
    
  //-------edit------------//
  } 
  const editemployee =(id)=>{
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
  //------------------------//
  const deleteemployee =(id)=>{
    let index;
    employee.map((e,i)=>{
      if(e.id === id){
        index=i
      }
    });
    employee.splice(index,1)
    setEmployee([...employee])
    }



  return (
    <div className='main'>
      <nav className="navbar bg-body-tertiary">
          <div className="container-fluid header">
          <i className="fa-solid fa-house-chimney home"></i>
          <button className='btn btn-success mb-3' onClick={() => setShowForm()}>
           Add Employee
          </button>
           <h2>
           <i className="fa-solid fa-user profile"></i>
            Employee Management</h2>
          </div>
      </nav>

      <div className= {formMode !==0 ?'form-container':'form-container d-none'}>
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
                  type="email"
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
                <button type="submit" className="submit-button" onClick={addEmployees}>{formMode === 1 ? 'Save Task' : 'Save Changes'}</button>
            </div>
        </div>
       
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
