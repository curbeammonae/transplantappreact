import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

export default function Explore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  // const [showMore, setShowMore] = useState()
  const[posts, setPosts] = useState([])
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    sort: 'created_at',
    order: 'desc',
  });
  //console.log(sidebardata);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      // setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/get?${searchQuery}`);
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
  }, [location.search]);
  console.log(posts)
  

  
 



 
  return (
    <div>
      
      <div className=''>
      
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}
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
