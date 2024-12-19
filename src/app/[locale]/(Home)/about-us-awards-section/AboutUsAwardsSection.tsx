import { Container } from "@/components/ui/container"
import { TextHighlight, TypographyH2 } from "@/components/ui/typography"
import Image from "next/image"

type Props = {}
export const AboutUsAwardsSection = (props: Props) => {
  return (
    <Container className="bg-secondary-white rounded-[20px] pt-10 pb-16 flex flex-col items-center">
      <div className="flex flex-col items-center gap-7 pb-4">
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
      <div className="space-y-10">
        <div className="max-w-[996px] text-center space-y-3.5 mx-auto">
          <TypographyH2>
            <TextHighlight>Awards</TextHighlight> - Driven Excellence
          </TypographyH2>
          <p className="text-lg">
            Explore our journey of accolades that inspire us to reach new
            pinnacles of success.
          </p>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          {awards.map((award, index) => (
            <div
              className="w-[242px] p-5 bg-background border rounded-lg space-y-6"
              key={index}
            >
              <Image
                src={award.image}
                alt={award.desc}
                width={200}
                height={112}
              />
              <div className="text-center">
                <h3 className="text-lg font-medium">{award.name}</h3>
                <p className="text-sm">{award.desc}</p>
              </div>
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

const awards = [
  {
    name: "EMMAR",
    image: "/images/awards/emmar.jpg",
    desc: "Annual Broker Awards - 2018",
  },
  {
    name: "Aldar",
    image: "/images/awards/aldar-01.jpg",
    desc: "Top Performing Agency 1st Place - 2020",
  },
  {
    name: "Aldar",
    image: "/images/awards/aldar-02.jpg",
    desc: "Ambassador - 2021",
  },
  {
    name: "Aldar",
    image: "/images/awards/aldar-03.jpg",
    desc: "Top Performing Agency 1st Place - 2016",
  },
  {
    name: "Aldar",
    image: "/images/awards/aldar-04.jpg",
    desc: "Top Performing Agency 1st Place - 2022",
  },
  {
    name: "IMKAN",
    image: "/images/awards/imkan.jpg",
    desc: "Top Performing Agency 1st Place - 2021",
  },
]
