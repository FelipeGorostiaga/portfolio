import Image from 'next/image';
import { ReactElement, useMemo } from 'react';
import { IPill } from '@ui/Pill/type';
import Pill from '@ui/Pill';

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

const formatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

const JobItem = (props: JobProps) => {
  const startDate = useMemo(() => formatter.format(props.startDate), [props.startDate]);
  const endDate = useMemo(() => props.current ? 'Now' : formatter.format(props.endDate), [props]);
  return (
    <section className="mb-16 flex flex-row bg-gray-100 px-10 py-10 rounded-xl shadow-xl w-full dark:bg-[#080808]">
      <Image src={props.imgSrc}
             className="h-[90px] md:h-[120px] aspect-square object-fit group-hover:opacity-80 rounded"
             width={120}
             height={120}
             alt={`logo`} />
      <div className="pl-8 flex flex-col gap-0">
        <h3 className="text-3xl font-sans font-semibold dark:text-white mb-1">{props.title}</h3>
        <div className="mb-4">
          <span className="text-base font-light dark:text-white">{props.companyName}</span>
          <span className="mx-3 dark:text-white">|</span>
          <span className=" text-base font-light dark:text-white">{`${startDate} - ${endDate}`}</span>
        </div>
        <div className="text-lg font-sans text-neutral-800 dark:text-white">{props.description}</div>
        <div className={'w-full flex flex-row justify-start items-center gap-3 mt-8'}>
          {props.pillList?.map(pill => {
            return <Pill key={pill.label} {...pill} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default JobItem;
