import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Post() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {posting && !loading && !error && (
        <div>
          <Swiper navigation>
            {posting.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-10">
            <p className="text-2xl font-semibold">{posting.title}</p>
            <p className="text-slate-800">
              <span className="font-semibold text-black text">Description: </span><br></br>
              {posting.description}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black text">Ingredients: </span><br></br>
              {posting.ingredients}
            </p>
          

            <p className=" text-slate-800  ">
              <span className="font-semibold text-black">Instructions:</span>
              <p
                className="flex items-center mt-6 gap-2 text-slate-800"
                dangerouslySetInnerHTML={{
                  __html: posting && posting.instructions,
                }}
              ></p>

            
            </p>
            

          </div>
        </div>
      )}
    </main>
  );
}
