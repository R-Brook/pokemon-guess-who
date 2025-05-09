import React, { ChangeEvent, FC } from "react"

export interface ISelect {
  required: boolean
  label: string
  name: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void
  id: string
  options: string[]
  value: string | number
}

export const Select: FC<ISelect> = ({
  required,
  label,
  id,
  options,
  value,
  onBlur = () => null,
  onChange = () => null,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}: </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        className=""
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
