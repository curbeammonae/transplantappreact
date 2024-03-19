import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import { FaShare, FaMapMarkerAlt} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


export default function Post() {
  const navigate = useNavigate()
  SwiperCore.use( [Navigation]);
  const params = useParams();
  const [posting, setPosting] = useState(null)
  const[like, setLike] = useState('')
  const [loading, setLoading]  = useState(false)
  const [error, setError]  = useState(false)
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  
  

    useEffect(() => {
         
        const fetchPost = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/post/get/${params.postingId}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setPosting(data);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchPost();
      }, [params.postingId]);
  
    

      const handleLike = async () => {
        const postingId = params.postingId

        try {
          if (!currentUser) {
            navigate('/signin');
            return;
          }
          const res = await fetch(`/api/post/likePost/${postingId}`, {
            method: 'PUT',
          });
          
          
        } catch (error) {
          console.log(error.message);
        }
        
      };
    return (
      <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {posting && !loading && !error && (
        <div>
          <Swiper navigation>
            {posting.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button onClick={handleLike} color="dark">Dark</Button>

         
    
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <div>
              {/* insert likes */}

            </div>
            <p className='text-2xl font-semibold'>
              {posting.title} 
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {posting.description}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <span className='font-semibold text-black'>Ingredients</span>
  
              {posting.ingredients}
            </p>
            
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <span className='font-semibold text-black'>Instructions</span>
  
              {posting.instructions}
            </p>
            
           
         
          </div>
        </div>
      )}
    </main>
  )
}
