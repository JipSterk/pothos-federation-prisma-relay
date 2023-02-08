import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonStyles = cva(
  "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ",
  {
    variants: {
      intent: {
        primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
        secondary: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

/**
 * Button's props
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type">,
    VariantProps<typeof buttonStyles> {}

/**
 * Button component
 * @param props Button's props
 * @returns {JSX.Element}
 */
export function Button({
  intent,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button className={buttonStyles({ intent })} type="button" {...props}>
      {children}
    </button>
  );
}
