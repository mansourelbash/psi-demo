import { Container } from "@/components/ui/container"
import { TextHighlight, TypographyH2 } from "@/components/ui/typography"

type Props = {}
export const AboutUsAwardsSection = (props: Props) => {
  return (
    <Container className="bg-secondary-white rounded-[20px] pt-10 pb-16 flex flex-col items-center">
      <div className="flex flex-col items-center gap-7">
        <div className="max-w-[996px] text-center space-y-3.5">
          <TypographyH2>
            Your Trusted Real Estate <TextHighlight>Partner</TextHighlight>
          </TypographyH2>
          <p className="text-lg">
            We have offices and teams all around the world.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {counters.map((counter, index) => (
            <div
              className="flex flex-col justify-center items-center min-w-[200px] border py-4 px-2 rounded-md"
              key={index}
            >
              <span className="text-primary text-2xl font-medium">
                {counter.value}
              </span>
              <h3 className="text-lg">{counter.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

const counters = [
  {
    name: "Customers",
    value: "150K",
    width: "200px",
  },
  {
    name: "Location Worldwide",
    value: "10",
    width: "230px",
  },
  {
    name: "Projects",
    value: "+120",
    width: "200px",
  },
  {
    name: "Years in Business",
    value: "+17",
    width: "200px",
  },
  {
    name: "Language",
    value: "15",
    width: "200px",
  },
  {
    name: "Expert Employees",
    value: "+700",
    width: "230px",
  },
  {
    name: "Branches",
    value: "12",
    width: "200px",
  },
]
