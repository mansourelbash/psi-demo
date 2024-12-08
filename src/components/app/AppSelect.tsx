"use client"

import useClear from "@/hooks/useClear"
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import useAutoComplete from "@/hooks/useAutoComplete"
// import { Wrapper } from "../ui/wrapper"
import { VariantProps, cva } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { CommandLoading } from "cmdk"
import { Separator } from "@/components/ui/separator"
import { useAtomValue } from "jotai"
import { dictionaryAtom } from "@/atoms/dictionaryAtoms"

export const selectVariants = cva(
  "w-full justify-between text-input-foreground flex border h-11 truncate font-normal text-base px-3 gap-2 shadow-none hover:text-foreground aria-[invalid=true]:border-destructive aria-[expanded=true]:ring-1 ring-ring focus-visible:ring-1 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border !bg-input/0",
        card: "!bg-card dark:border-card border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Props = {
  value?: string
  onChange?: (value: string, item: any | null) => void
  cleanable?: boolean
  data: Record<string, any>[]
  labelKey?: string
  valueKey?: string
  onOpen?: () => void
  onClose?: () => void
  onSearch?: (search: string) => void
  searchDelay?: number
  loading?: boolean
  placeholder?: string
  triggerButton?: ButtonProps
  initText?: string
  cachedSuggestions?: boolean
  paginated?: boolean
  searchable?: boolean
  formField?: boolean
  renderValue?: (
    value: string | undefined,
    label: string | null
  ) => React.ReactNode
  renderOption?: (item: Record<string, any>, label: string) => React.ReactNode
  beforeIcon?: React.ReactNode
  popoverContentClassName?: string
  icon?: React.ReactNode
  disabled?: boolean
  onPlusClick?: () => void
  defaultData?: Record<string, any>
} & VariantProps<typeof selectVariants>
export const AppSelect = forwardRef<HTMLButtonElement, Props>(
  (
    {
      value,
      onChange,
      data,
      defaultData,
      cleanable = true,
      labelKey,
      valueKey,
      onOpen,
      onClose,
      onSearch,
      loading,
      searchDelay,
      placeholder,
      triggerButton,
      initText,
      cachedSuggestions,
      paginated,
      searchable = true,
      formField = false,
      variant,
      renderValue,
      renderOption,
      popoverContentClassName,
      icon,
      disabled,
      onPlusClick,
      beforeIcon,
    }: Props,
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(value ?? "")
    const [open, setOpen] = useState(false)
    const commandRef = useRef<HTMLDivElement>(null)
    const [_defaultData, setDefaultData] = useState(defaultData)
    const dictionary = useAtomValue(dictionaryAtom)

    const _valueKey = valueKey ?? "value"
    const _labelKey = labelKey ?? "label"

    const {
      handelFilter,
      handelSearchDebounce,
      searchValue,
      setSearchValue,
      handelOpenChange,
    } = useAutoComplete({
      data,
      labelKey: _labelKey,
      valueKey: _valueKey,
      onSearch,
      paginated,
      searchDelay,
      setOpen,
      cachedSuggestions,
      onClose,
      onOpen,
    })

    const selectedLabel = useMemo(() => {
      // debugger
      const selectedItem = data.find(
        (item) => item[_valueKey].toString() == selectedValue
      )

      return selectedItem
        ? selectedItem[_labelKey]
        : _defaultData
        ? _defaultData[_labelKey]
        : null
    }, [selectedValue, _defaultData])

    const handelSelectChange = (value: string, item: any = null) => {
      setSelectedValue(value)
      onChange && onChange(value, item)
      setOpen(false)
    }

    const { Clean } = useClear(
      selectedValue,
      cleanable,
      (value) => handelSelectChange(value),
      ""
    )

    useEffect(() => {
      // debugger
      setSelectedValue(value?.toString() ?? "")
    }, [value])

    useEffect(() => {
      if (open) {
        setTimeout(() => {
          commandRef.current?.focus()
        }, 100)
      }
    }, [open])

    return (
      <Popover open={open} onOpenChange={handelOpenChange}>
        <PopoverTrigger asChild>
          <Button
            {...triggerButton}
            ref={ref}
            role="combobox"
            aria-expanded={open}
            className={cn(
              selectVariants({
                variant,
                className: cn("font-medium", triggerButton?.className),
              }),
              {
                "text-muted-foreground": !selectedValue,
              }
            )}
            disabled={disabled}
          >
            {beforeIcon}
            <div className="flex gap-1 items-center overflow-hidden text-sm">
              {icon && icon}
              <div className="truncate">
                {renderValue
                  ? (renderValue(value, selectedLabel) || selectedLabel) ??
                    initText ??
                    (value || placeholder) ??
                    dictionary!.SELECT_PLACEHOLDER
                  : selectedLabel ??
                    initText ??
                    (value || placeholder) ??
                    dictionary!.SELECT_PLACEHOLDER}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {onPlusClick && (
                <>
                  <PlusIcon
                    className="size-5 opacity-50"
                    onClick={(event) => {
                      event.stopPropagation()
                      onPlusClick()
                    }}
                  />
                  <Separator orientation="vertical" className="h-4" />
                </>
              )}
              {selectedValue && cleanable ? (
                <Clean className="relative" />
              ) : (
                <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-[var(--radix-popper-anchor-width)] min-w-[200px] p-0",
            popoverContentClassName
          )}
          forceMount
          align="start"
          avoidCollisions
        >
          <Command
            shouldFilter={!paginated}
            filter={handelFilter}
            className="flex-1 h-auto"
            ref={commandRef}
          >
            {searchable ? (
              <CommandInput
                value={searchValue}
                placeholder={dictionary!.SELECT_SEARCH_PLACEHOLDER}
                onValueChange={(search) => {
                  setSearchValue(search)
                  handelSearchDebounce(search)
                }}
              />
            ) : null}
            <>
              {!loading && <CommandEmpty>No item found.</CommandEmpty>}
              <CommandList className="py-2 max-h-[250px] select-scrollbar">
                {loading ? (
                  <CommandLoading className="py-1 px-2">
                    <Loader2Icon className="text-xl animate-spin" />
                  </CommandLoading>
                ) : (
                  <>
                    {data.map((item) => {
                      const active =
                        selectedValue === item[_valueKey].toString()

                      return (
                        <CommandItem
                          key={item[_valueKey].toString()}
                          value={item[_valueKey].toString()}
                          onSelect={(value) => handelSelectChange(value, item)}
                          className={cn("rounded-none", {
                            "!bg-primary/5 !text-primary flex gap-2": active,
                          })}
                        >
                          {active ? (
                            <CheckIcon className={cn("h-4 w-4")} />
                          ) : null}
                          {renderOption
                            ? renderOption(item, item[_labelKey])
                            : item[_labelKey]}
                        </CommandItem>
                      )
                    })}
                  </>
                )}
              </CommandList>
            </>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

AppSelect.displayName = "AppSelect"
