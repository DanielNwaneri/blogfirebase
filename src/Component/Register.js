import { useState } from 'react'
import {auth} from '../Firebase_config/Firebase_config';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


const initialState ={ 
  Username:'',
  email:'',
  password:'',
  ComfirmedPassword:''
};



const Register = ({setisAuth, setuser}) => {

  const navigate = useNavigate();

  const [ formValue, setFormValue] = useState(initialState);
  const {Username, email, password, ComfirmedPassword} = formValue;


  const onInputChange =  (e) => {
    setFormValue ({...formValue, [e.target.name]: e.target.value})
    }


    const HandleSubmit = async (e) => {
      e.preventDefault();


      
      if (Username === '' || password === '' || ComfirmedPassword === ''){
        toast.error('please fill in the input field');
        return;
      }
      
      if (password.length <6 ) {
        toast.error( 'password is too short')
      }


      if ( password !== ComfirmedPassword ){
        toast.error ('Password do not match');
        return
      };

      try {
        const { user }  = await createUserWithEmailAndPassword ( auth, email, password);
        await updateProfile( user, {displayName: Username});

        toast.success ('user registered succesfully');

        navigate('/');
        localStorage.setItem('isAuthorised', true);  
        setisAuth(true);
      }
      catch (error) {
        console.log ('User already in use');
      }
    }
return (
    <div className="container">
    <h1>Register</h1>


    <form onSubmit={HandleSubmit}>

        <label htmlfor="username">Username</label>
        <input type="text" name="Username" required value={Username} onChange ={onInputChange} />

        <label htmlfor="email">Email</label>
        <input type="email" name="email" required  value={email} onChange ={onInputChange} />

        <label htmlfor="password">Password</label>
        <input type="password" name="password" required  value={password} onChange ={onInputChange} />

        <label htmlfor="confirm-password">Confirm Password</label>
        < input type="password" name="ComfirmedPassword" required  value={ComfirmedPassword} onChange ={onInputChange} />

        <button type="submit">Register</button>
    </form>

    <div> Already have an account
      ? <Link className='linkstyle' to='/Login'> Login</Link></div>

</div>
  )
}

export default Register
