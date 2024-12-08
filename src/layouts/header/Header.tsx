import { Container } from "@/components/ui/container"
import { LanguageSelector } from "./LanguageSelector"
import { getLang } from "@/actions"
import { getDictionary } from "@/lib/getDictionary"

type Props = {
  locale: string
}
export const Header = async ({ locale }: Props) => {
  const dictionary = await getDictionary(locale)

  console.log(dictionary)

  return (
    <Container className="!py-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <LanguageSelector />
        </div>
      </div>
    </Container>
  )
}
