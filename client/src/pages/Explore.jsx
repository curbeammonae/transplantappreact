import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

export default function Search() {
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
  

  
  const handleChange = (e) => {
    if(e.target.id === 'searchTerm' ){
      setSidebardata({...sidebardata, searchTerm: e.target.value})
    }
    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_') || 'created_at';

      const order = e.target.value.split('_') || 'desc';
      setSidebardata({...setSidebardata, sort, order})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm)
    urlParams.set('sort', sidebardata.sort)
    urlParams.set('order', sidebardata.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
    

  }

  // const onShowMoreClick = async () => {
  //   const numberOfPosts = posts.length;
  //   const startIndex = numberOfPosts;
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set('startIndex', startIndex);
  //   const searchQuery = urlParams.toString();
  //   const res = await fetch(`/api/post/get?${searchQuery}`);
  //   const data = await res.json();
  //   if (data.length < 9) {
  //     setShowMore(false);
  //   }
  //   setPosts([...posts, ...data]);
  // };
  return (
    <div>
      
      <div className=''>
        <h1>recipe results</h1>
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
