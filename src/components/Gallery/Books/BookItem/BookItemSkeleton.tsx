import styles from './BookItemSkeleton.module.scss';
import { useTheme } from '~/contexts/ThemeContext';

const BookItemSkeleton = () => {
  const { isDark } = useTheme();
  const itemClass = isDark ? styles.skeletonItemDark : styles.skeletonItemLight;
  return (
    <div
      className="w-full min-h-[240px] aspect-video rounded-xl bg-neutral-200 dark:bg-spacegray flex flex-row items-start relative">
      <div className={`h-full aspect-book rounded-l-xl min-w-[150px] ${itemClass}`}></div>
      <div className="flex flex-col items-start py-2 px-3 md:px-4 justify-between h-full w-full">
        <div className="flex flex-col gap-2 w-full ">
          <span className={`w-[80%] h-[20px] rounded ${itemClass}`}></span>
          <span className={`w-[60%] h-[18px] rounded ${itemClass}`}></span>
        </div>
        <div className="absolute right-2 bottom-2 ">
          <div
            className={`w-[55px] h-[32px] rounded-xl ${itemClass}`}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItemSkeleton;
