import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {toast } from 'react-toastify';
import {auth, provider} from '../Firebase_config/Firebase_config';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';

const initialState ={
  password:'',
  email:'',
}


const Login = ({setisAuth, setuser}) => {

  const navigate = useNavigate ();


  const [ formValue, setFormValue] = useState(initialState);
  const {email, password} = formValue;

  const onInputChange = (e) => {
    setFormValue ( { ... formValue, [e.target.name]: e.target.value})
  };
      

     const HandleSubmit = async (e) => {
      e.preventDefault ();


      try {
        if ( email && password) {
        const {user} = await signInWithEmailAndPassword
        (auth, email, password);
        setuser(user);
        toast.success('login successfully');
        navigate('/');  
        localStorage.setItem('isAuthorised', true);
        setisAuth(true);
       }

    } catch (error) {
      toast.error('User not found');
     }

    }

    const GoogleBtn = () => {
      signInWithPopup(auth, provider).then((result) =>{
        toast.success('signup succesufully')
        localStorage.setItem('isAuthorised', true);
        navigate('/')
        setisAuth(true);
      })
    }



  return (
   
    <div className="container">
    <h1>login</h1>
   
    <form onSubmit={HandleSubmit}>

        <label htmlfor="email">Email</label>
        <input type="email" id="email" name="email" required value={email} onChange={onInputChange}/>

        <label htmlfor="password">Password</label>
        <input type="password" id="password" name="password" required value={password} onChange = {onInputChange}/>

        <button class='btn' type="submit">LOGIN</button>
    </form>

<div className='loginPage'>
  <button className='login-with-google-btn' onClick={GoogleBtn}> sign in with Google </button>
</div>

<div> dont have an account? <Link className='linkstyle' to='/register'> Register</Link></div>

</div>
  )
}

export default Login
