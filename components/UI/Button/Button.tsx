interface ButtonProps {
  children: any;
  variant: string;
}

const Button = ({ children, variant }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
