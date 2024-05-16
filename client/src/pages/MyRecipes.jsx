import React from 'react'
import PostCard from '../components/PostCard'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyRecipes() {
    const { currentUser, error } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false)
    // const [showMore, setShowMore] = useState()
    const [posts, setPosts] = useState([])
    const [userPosting, setUserPosting] = useState([]);
    useEffect(() => {
   
    
       
    
        const fetchPosts = async () => {
          setLoading(true);
          // setShowMore(false);
       
          const res = await fetch(`/api/user/posts/${currentUser._id}`);
          const data = await res.json();
          // if (data.length > 8) {
          //   setShowMore(true);
          // } else {
          //   setShowMore(false);
          // }
          setPosts(data);
          setLoading(false);
        };
    
        fetchPosts();
      },[]);
      console.log(posts)
      const handleListingDelete = async (postingId) => {
        try {
          const res = await fetch(`/api/post/delete/${postingId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          setUserPosting((prev) =>
            prev.filter((posting) => posting._id !== postingId)
          );
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className=''>

   
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 '>
         <div className='mx-auto'>
     <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/createpost'}
        >
          Post A Recipe
        </Link>
        </div> 
        <div className='p-7 flex flex-wrap gap-4'>
        {!loading &&
        posts &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
          
        ))}
            </div>  
            
    
</div>

</div>
  )
}
