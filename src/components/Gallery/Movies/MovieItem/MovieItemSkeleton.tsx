import styles from './MovieItemSkeleton.module.scss';
import { useTheme } from '~/contexts/ThemeContext';

const MovieItemSkeleton = () => {
  const { isDark } = useTheme();
  const itemClass = isDark ? styles.skeletonItemDark : styles.skeletonItemLight;
  return (
    <div className="flex flex-col items-start rounded-xl bg-neutral-100 dark:bg-spacegray dark:bg-opacity-50
      w-full min-h-[240px] shadow md:shadow-xl relative gap-3 h-full">
      <div className={`w-full aspect-movie relative rounded-t-lg ${itemClass}`}></div>
      <div className="px-4 flex flex-col gap-1 w-full ">
        <div className={`w-[80%] h-[20px] rounded ${itemClass}`} />
        <div className={`w-[60%] h-[18px] rounded ${itemClass}`} />
      </div>
      <div className="w-full bg-transparent h-[32px]"></div>
      <div
        className="absolute right-2 bottom-2 rounded-x">
        <div
          className={`w-[55px] h-[32px] rounded-xl ${itemClass}`}>
        </div>
      </div>
    </div>
  );
};

export default MovieItemSkeleton;
