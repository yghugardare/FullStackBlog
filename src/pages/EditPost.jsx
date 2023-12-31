import React, { useEffect,useState } from 'react'
import {Container,PostForm} from '../components/index'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function EditPost() {
    const [post,setPost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then(postSelected=>{
                if(postSelected){
                    setPost(postSelected)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : <div>No post selected...</div>
}

export default EditPost