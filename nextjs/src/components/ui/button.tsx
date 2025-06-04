import { cx } from "class-variance-authority";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className={cx(
        "bg-gray-950 text-white p-2 py-1 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer font-light text-sm",
        {
          "opacity-50 cursor-not-allowed": props.disabled,
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
}
