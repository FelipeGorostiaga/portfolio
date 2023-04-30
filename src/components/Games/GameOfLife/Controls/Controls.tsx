import Button from '@ui/Button/Button';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';

interface ControlProps {
  running: boolean;
  onPlay: () => void;
  onClear: () => void;
  onRandomize: () => void;
}

const Controls = ({ running, onPlay, onClear, onRandomize }: ControlProps ) => {
  return (
    <div className="flex flex-row gap-2 mb-4 items-center">
      <div className='w-[250px]'>
        <Button intent={'primary'} size={'fullWidth'} onClick={onPlay}>
          <div className="flex flex-row items-center justify-center gap-1">
            {!running ? (
              <>
                <PlayCircleOutlineRoundedIcon /><span> Play</span>
              </>
            ) : (
              <>
                <PauseCircleOutlineRoundedIcon /><span> Pause</span>
              </>
            )
            }
          </div>
        </Button>
      </div>

      <Button intent={'secondary'} size={'content'} onClick={onClear}>Clear</Button>
      <Button intent={'secondary'} size={'content'} onClick={onRandomize}>Randomize</Button>
    </div>
  );
};

export default Controls;
