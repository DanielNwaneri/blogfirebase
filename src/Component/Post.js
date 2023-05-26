import {useEffect, useState} from 'react'
import { addDoc, collection,} from 'firebase/firestore'
import { db, auth } from '../Firebase_config/Firebase_config'
import { useNavigate } from 'react-router-dom';
import Loading from './LoadingGif';


const initialState ={
Title: '',
post: ''
};

const Post = ({isAuth}) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [formValue, setFormValue] = useState(initialState);
  const {Title, post} = formValue;

  const onInputChange =  (e) => {
    setFormValue ({...formValue, [e.target.name]: e.target.value})
    }

    const HandleSubmit = async (e)=>{
      e.preventDefault();
      setloading(true);


      const collectionRef = collection (db, 'POST')
      
      try {
        await addDoc(collectionRef, {
          ...formValue,


        //  timestamp:serverTimestamp(),

        date:new Date(),
          
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
            email: auth.currentUser.email
          }});
setloading(false)
navigate('/');

} catch (error) {
console.log(error);
setloading(false)
}
}

useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
  }, [ isAuth, navigate]);
  
  return (
<>
{loading && <Loading/>}
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create a post</h1>
      
    <form onSubmit={HandleSubmit}>
        <div className='inputGp'>
          <label>Title:</label>
          <input type='text' name='Title' placeholder='Title' required value={Title} onChange={onInputChange}/>
        </div>


        <div className='inputGP'>
          <label> post: </label>
          <textarea placeholder='post an article' name='post' required value={post} onChange={onInputChange}/> 
           </div>
           <button type='submit'> submit Post</button>
            </form>
      </div>     
    </div>

</>
 )
};

export default Post 