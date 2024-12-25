import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

type Props = {
  paginated?: boolean
  onSearch?: (search: string) => void
  searchDelay?: number
  data: Record<string, string | object>[]
  labelKey: string
  valueKey: string
  cachedSuggestions?: boolean
  onOpen?: () => void
  onClose?: () => void
  setOpen: (isOpen: boolean) => void
}
const useAutoComplete = ({
  paginated,
  onSearch,
  searchDelay,
  data,
  labelKey,
  valueKey,
  cachedSuggestions,
  onOpen,
  onClose,
  setOpen,
}: Props) => {
  const [searchValue, setSearchValue] = useState("")

  const handelSearchDebounce = useDebouncedCallback((search: string) => {
    if (paginated) {
      if (onSearch) {
        onSearch(search)
      }
    }
  }, searchDelay ?? 400)

  const handelFilter = (value: string, search: string) => {
    const item = data.find(
      (item) =>
        item[valueKey].toString().toLowerCase() == value &&
        ((item[labelKey] as string).toString().toLowerCase().includes(search) ||
          value.includes(search))
    )
    return item ? 1 : 0
  }

  const handelOpenChange = (open: boolean) => {
    if (open) {
      if (!(cachedSuggestions && data.length > 0)) {
        if (onOpen) {
          onOpen()
        }
      }
    } else {
      if (onClose) {
        onClose()
      }
    }
    setOpen(open)
  }

  return {
    searchValue,
    setSearchValue,
    handelSearchDebounce,
    handelFilter,
    handelOpenChange,
  }
}
export default useAutoComplete
