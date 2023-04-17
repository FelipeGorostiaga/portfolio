import styles from './BookItemSkeleton.module.scss';

const BookItemSkeleton = () => {
  return (
    <div
      className="w-full min-h-[240px] aspect-video rounded-xl bg-neutral-200 dark:bg-spacegray flex flex-row items-start relative">
      <div className={`h-full aspect-book rounded-l-xl min-w-[150px] ${styles.skeletonItem}`}></div>
      <div className="flex flex-col items-start py-2 px-3 md:px-4 justify-between h-full w-full">
        <div className="flex flex-col gap-2 w-full ">
          <span className={`w-[80%] h-[20px] rounded ${styles.skeletonItem}`}></span>
          <span className={`w-[60%] h-[18px] rounded ${styles.skeletonItem}`}></span>
        </div>
        <div className="absolute right-2 bottom-2 ">
          <div
            className={`w-[55px] h-[32px] rounded-xl dark:bg-black dark:bg-opacity-100 ${styles.skeletonItem}`}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItemSkeleton;
