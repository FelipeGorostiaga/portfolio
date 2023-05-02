import Button from '@ui/Button/Button';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useMemo } from "react";

interface ControlProps {
  running: boolean;
  onPlay: () => void;
  onClear: () => void;
  onRandomize: () => void;
}

const Controls = ({running, onPlay, onClear, onRandomize}: ControlProps) => {
  const {sm} = useBreakpoints();
  const buttonContent = useMemo(() => {
    return running ?
      <><PauseCircleOutlineRoundedIcon/><span>Pause</span></> :
      <><PlayCircleOutlineRoundedIcon/><span> Play</span></>;
  }, [running])
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <div className='w-full sm:w-[250px]'>
        <Button intent={'primary'} size={'fullWidth'} onClick={onPlay}>
          <div className="flex flex-row items-center justify-center gap-1">
            {buttonContent}
          </div>
        </Button>
      </div>
      <div className='grid grid-cols-2 w-full sm:px-0 gap-2'>
        <Button intent={'secondary'} size={sm ? 'fullWidth' : 'content'} onClick={onClear}>Clear</Button>
        <Button intent={'secondary'} size={sm ? 'fullWidth' : 'content'} onClick={onRandomize}>Randomize</Button>
      </div>
    </div>
  );
};

export default Controls;
