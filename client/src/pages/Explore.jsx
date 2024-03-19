import React from "react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Explore() {
  const [loading, setLoading] = useState(false);
  // const [showMore, setShowMore] = useState()
  const [posts, setPosts] = useState([]);
  console.log(posts)

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/post/get");
//         const data = await res.json();
//         console.log(data)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchPosts()
//   });
const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post/get");
      const data = await res.json();
      const allPosts = data
      setPosts(allPosts)
      console.log(posts)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  },[])

  return (
    <div>
        <div><h1 className="text-center">Find Your Next Recipe</h1></div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  );
}
