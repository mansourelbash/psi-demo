"use server"

import { cookies } from "next/headers"

export const getLang = async () => {
  const cookieStore = await cookies()
  const lang = cookieStore.get("lang")?.value
  return lang
}
