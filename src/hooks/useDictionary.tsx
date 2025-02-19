"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/getDictionary";

type Dictionary = Record<string, string>;

const isLocale = (value: string): value is "en" | "ar" | "cn" | "de" | "fr" | "it" | "ru" | "tr" => {
  return ["en", "ar", "cn", "de", "fr", "it", "ru", "tr"].includes(value);
};

export const useDictionary = (locale: string) => {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        setIsLoading(true);

        if (isLocale(locale)) {
          const dict = await getDictionary(locale);
    
          const filteredDict = Object.fromEntries(
            Object.entries(dict).filter(([, value]) => typeof value === "string")
          ) as Dictionary; 
    
          setDictionary(filteredDict);
        } else {
          throw new Error("Invalid locale");
        }
      } catch (err) {
        console.error("Dictionary fetch error:", err);
        setError("Failed to load dictionary");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionary();
  }, [locale]);

  return { dictionary, isLoading, error };
};