import Image from 'next/image';
import { ReactElement } from 'react';
import { IPill } from '@ui/Pill/type';

export interface JobProps {
  title: string;
  companyName: string;
  companyLink: string;
  imgSrc: string;
  startDate: Date;
  endDate: Date;
  current?: boolean;
  description: string | ReactElement;
  pillList?: IPill[];
}

const JobItem = (props: JobProps) => {
  return (
    <section className='px-6 mb-16 flex flex-row'>
      <Image src={props.imgSrc} alt="" width={100} height={100} />
      <div>
        <h3 className='text-3xl'>{props.title}</h3>
        <span>{`${props.startDate.toLocaleDateString()} - ${props.current ? 'Now' : props.endDate.toLocaleDateString()}`}</span>
        <p>{props.description}</p>
        <div>
          {/* pill list here ---> map... */}
        </div>
      </div>
    </section>
  );
};

export default JobItem;
