import Image from 'next/image';
import { ReactElement } from 'react';
import { IPill } from '@ui/Pill/type';

interface JobProps {
  title: string;
  companyName: string;
  companyLink: string;
  imgSrc: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  description: string | ReactElement;
  pillList?: IPill[];
}

const JobItem = (props: JobProps) => {
  return (
    <section>
      <Image src={props.imgSrc} alt="" />
      <div>
        <h3></h3>
        <span></span>
        <p></p>
        <div>
          {/* pill list here ---> map... */}
        </div>
      </div>

    </section>
  );
};

export default JobItem;
