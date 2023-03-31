import Image from 'next/image';
import { ReactElement, useMemo } from 'react';
import { IPill } from '@ui/Pill/type';
import Pill from '@ui/Pill';
import Card from '@ui/Card/Card';
import Link from 'next/link';
import useBreakpoints from '../../../hooks/useBreakpoints';

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
  const { sm, md } = useBreakpoints();
  const startDate = useMemo(() => formatter.format(props.startDate), [props.startDate]);
  const endDate = useMemo(() => props.current ? 'Now' : formatter.format(props.endDate), [props]);
  const imgSize = useMemo(() => sm? 60 : (md? 80 : 100), [sm, md]);
  return (
    <Card>
      <Link href={props.companyLink} target="_blank" rel="noopener noreferrer"
            className="px-6 py-6 md:px-10 md:py-10 mb-4 md:mb-16 flex flex-col md:flex-row bg-gray-100 rounded-xl shadow-xl w-full
            dark:bg-spacegray cursor-pointer">
        <Image src={props.imgSrc}
               className="h-[60px] sm:h-[80px] md:h-[100px]  mb-2 md:mb-0 aspect-square object-fit group-hover:opacity-80 rounded"
               width={imgSize}
               height={imgSize}
               alt={`logo`} />
        <div className="pl-0 md:pl-8 flex flex-col gap-0">
          <h3 className="text-xl md:text-3xl font-sans font-semibold dark:text-neutral-200 mb-1">{props.title}</h3>
          <div className="mb-3 md:mb-4">
            <span className="text-sm md:text-base font-light dark:text-[#adadad]">{props.companyName}</span>
            <span className="mx-3 font-light text-sm md:text-base md:font-normal dark:text-[#adadad]">|</span>
            <span className="text-sm md:text-base font-light dark:text-[#adadad]">{`${startDate} - ${endDate}`}</span>
          </div>
          <div className="text-lg font-sans text-neutral-800 dark:text-white">{props.description}</div>
          <div className={'w-full flex flex-row justify-start items-center gap-3 mt-8 flex-wrap'}>
            {props.pillList?.map(pill => {
              return <Pill key={pill.label} {...pill} />;
            })}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default JobItem;
