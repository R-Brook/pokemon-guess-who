import { FC } from "react"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  full_width?: boolean
}

export const Button: FC<ButtonProps> = ({ onClick, full_width, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-amber-400 px-4 py-1 rounded-full ${
        full_width ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  )
}
