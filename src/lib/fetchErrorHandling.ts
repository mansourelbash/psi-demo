import { notFound } from "next/navigation"

export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options)


  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }

  return res.json().catch(() => {
    throw new Error(`Bad response`)
  })
}
