import { Link } from 'react-router-dom';


export default function PostCard({ post }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/post/${post._id}`}>
        <img
          src={
            post.imageUrls[0]
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {post.title}
          </p>
          
          <p className='text-sm text-gray-600 line-clamp-2'>
            {post.description}
          </p>
        </div>
      </Link>
    </div>
  );
}