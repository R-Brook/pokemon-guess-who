import { FC } from "react"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  full_width?: boolean
}

export const Button: FC<ButtonProps> = ({ onClick, full_width, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-amber-300 hover:bg-amber-200 px-4 py-1 my-2 rounded-full ${
        full_width ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  )
}
