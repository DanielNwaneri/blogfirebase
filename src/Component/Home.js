import {useState, useEffect} from 'react'
import { getDocs, collection, deleteDoc,  doc,} from 'firebase/firestore'
import {auth, db} from '../Firebase_config/Firebase_config'
// import { async } from '@firebase/util';
import {MdDeleteForever} from 'react-icons/md';


const Home = ({isAuth}) => {


  // storing in data in an array
  
  const [postList, setPostList] = useState([]);

  // creating a collection in the firebase

  const collectionRef = collection(db, 'POST');


useEffect(() =>{
  const getposts = async ()=>{
    const data = await getDocs(collectionRef);
    setPostList(data.docs.map((e)=> ({
      ...e.data(), id: e.id
    })))
  }
  getposts();
},[collectionRef]);

          //  DELETE FUNCTION 

  const deletPost = async(id) =>{
  if (window.confirm ('DELETE POST?')){
    const postDoc =doc(db, 'POST', id)
    await  deleteDoc(postDoc);
       }
   };


  return (
    <div className='homePage'>
      {postList.map((post, index) =>{
        return (
          
         <div className="post" key={index}>

          <div className="postHeader">
            <span className="Title">
                <h1>{post.Title}</h1>
            </span>

           <section className='deletepost'>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <MdDeleteForever className = 'iconstyle' onClick={()=> deletPost(post.id)} />
              )}

            </section>
              

            </div>
         <span className='postTextContainer'>{post.post}</span>
         <h4> @ {post.author.name} </h4>
         <h5> @ {post.author.email} </h5>
         <h6> @ {post.author.id} </h6>
         {/* <h6> @ {post.author.date} </h6> */}
      
       </div>
        )
      })}
      
    </div>
  )
}

export default Home;
