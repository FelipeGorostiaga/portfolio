interface SkillBarProp {
  percentage: number;
  color?: string;
}

const SkillBar = ({ percentage }: SkillBarProp) => {
  return (
    <span>
      {percentage}
    </span>
  );
};

export default SkillBar;
