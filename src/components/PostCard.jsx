import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featuredImage}) {
  let img =  appwriteService.getFilePreview(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-blue-500 rounded-xl text-wrap p-4">
            <div>
                <img 
                className='rounded-xl'
                src={img} alt={title} />

            </div>
            <h2 className="lg:text-xl text-[10px]  font-bold">
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard