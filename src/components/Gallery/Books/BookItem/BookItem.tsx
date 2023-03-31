import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';

interface BookProps {
  title: string;
  author: string;
  imgUrl: string;
  score: number;
}

const BookItem = ({ title, author, imgUrl, score }: BookProps) => {
  return (
    <div className='flex flex-row items-start rounded-xl bg-neutral-100 dark:bg-neutral-800 w-[350px] aspect-video shadow-xl hover:scale-[1.01]'>
      <div className='h-full w-[150px] relative'>
        <Image src={imgUrl} alt='Book cover' fill className='border-inherit box-border rounded-l-xl'/>
      </div>
      <div className='flex flex-col items-start py-2 px-4 justify-between h-full'>
        <div>
          <h3 className='text-base font-bold'>{title}</h3>
          <h5 className='text-sm'>{author}</h5>
        </div>
        <div className='flex flex-row bg-black items-center justify-between rounded-xl px-3 py-1 gap-1 self-end bg-opacity-60'>
          <StarIcon style={{ color: '#FFC728', fontSize: '18px' }} />
          <span className='text-base text-neutral-200'>{`${score}`}</span>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
