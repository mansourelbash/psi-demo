"use client"

import { useEffect, useState } from "react"
import { getDictionary } from "@/lib/getDictionary"

type Dictionary = Record<string, string>

export const useDictionary = (locale: string) => {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        setIsLoading(true)
        const dict = await getDictionary(locale)
        setDictionary(dict)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load dictionary")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDictionary()
  }, [locale])

  return { dictionary, isLoading, error }
}
