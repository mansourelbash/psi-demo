import { Container } from "@/components/ui/container"
import { LanguageSelector } from "./LanguageSelector"

type Props = {
  locale: string
}
export const Header = async ({ locale }: Props) => {
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
