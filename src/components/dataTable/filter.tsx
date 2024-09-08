import { Checkbox } from '../ui/checkbox'
import type { filter } from '.'

export const FilterItem = ({
  id,
  label,
  onChangeCheckbox,
  checked,
}: filter) => {
  return (
    <div className="flex items-center space-x-2 p-2">
      <Checkbox
        id={id}
        onCheckedChange={onChangeCheckbox}
        checked={checked}
        className="peer"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
      >
        {label}
      </label>
    </div>
  )
}
