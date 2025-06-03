import {cx} from "class-variance-authority";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button className={cx("bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors cursor-pointer", {
      "opacity-50 cursor-not-allowed": props.disabled,
    })} {...props}>
      {children}
    </button>
  );
}