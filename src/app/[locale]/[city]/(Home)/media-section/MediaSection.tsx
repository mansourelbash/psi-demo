import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { TextHighlight, TypographyH2 } from "@/components/ui/typography";
import Image from "next/image";

export const MediaSection = () => {
  return (
    <Container>
      <div className="bg-secondary-white rounded-[20px] pt-10 pb-16 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-10 pb-4">
          <div className="max-w-[996px] text-center space-y-3.5">
            <TypographyH2>
              <TextHighlight>Media</TextHighlight> Publications
            </TypographyH2>
            <p className="text-lg">
              {`Stay updated with the latest news, insights, and trends from the world of real estate.`}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 max-w-[1430px] w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="border rounded-lg overflow-hidden bg-background w-full sm:w-[48%] lg:w-[30%]"
                key={index}
              >
                <AspectRatio ratio={348 / 217} className="relative">
                  <Image src={"/images/media.jpg"} fill alt="" />
                </AspectRatio>
                <div className="pt-[18px] pb-3.5 px-5">
                  <h3 className="text-lg">
                    Cooperation between “ThinkProp” and “Property Shop
                    Investments (PSI)”
                  </h3>
                  <Separator className="my-3.5" />
                  <div className="flex gap-2.5 items-center">
                    <Image
                      className="size-[36px] rounded-full overflow-hidden object-cover"
                      alt=""
                      width={36}
                      height={36}
                      src={"/images/media.jpg"}
                    />
                    <div className="text-xs">
                      <p>Al Khaleej Newspaper</p>
                      <p className="font-medium">Published: March 7, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="max-w-[996px] text-center space-y-3.5 mx-auto">
            <TypographyH2>
              Our Customer <TextHighlight>Feedback</TextHighlight>
            </TypographyH2>
            <p className="text-lg">
              {`Don't take our word for it. Trust our customers`}
            </p>
          </div>
        </div>

        <div className="space-y-10 w-full">
          <div className="max-w-[996px] text-center space-y-3.5 mx-auto">
            <TypographyH2>
              Frequently Asked <TextHighlight>Questions</TextHighlight>
            </TypographyH2>
            <p className="text-lg">
              Everything you need to know about the product and billing.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-[95%] max-w-[1283px] mx-auto space-y-2.5"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="px-16 border rounded-lg"
              >
                <AccordionTrigger className="text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Container>
  );
};

const faqs = [
  {
    question: "Can non-residents buy property in the UAE?",
    answer:
      "Yes, non-residents can buy property in designated freehold areas in the UAE, such as Dubai Marina, Downtown Dubai, and Yas Island. The process involves selecting a property, signing a Memorandum of Understanding (MoU), paying a deposit, obtaining a No Objection Certificate (NOC) from the developer, and completing the transfer of ownership at the Land Department. ",
  },
  {
    question: "What documents are required to buy a property in the UAE?",
    answer:
      "Yes, non-residents can buy property in designated freehold areas in the UAE, such as Dubai Marina, Downtown Dubai, and Yas Island. The process involves selecting a property, signing a Memorandum of Understanding (MoU), paying a deposit, obtaining a No Objection Certificate (NOC) from the developer, and completing the transfer of ownership at the Land Department. ",
  },
  {
    question: "How do I finance a property purchase in the UAE?",
    answer:
      "Yes, non-residents can buy property in designated freehold areas in the UAE, such as Dubai Marina, Downtown Dubai, and Yas Island. The process involves selecting a property, signing a Memorandum of Understanding (MoU), paying a deposit, obtaining a No Objection Certificate (NOC) from the developer, and completing the transfer of ownership at the Land Department. ",
  },
  {
    question:
      "What are the typical maintenance fees for properties in the UAE?",
    answer:
      "Yes, non-residents can buy property in designated freehold areas in the UAE, such as Dubai Marina, Downtown Dubai, and Yas Island. The process involves selecting a property, signing a Memorandum of Understanding (MoU), paying a deposit, obtaining a No Objection Certificate (NOC) from the developer, and completing the transfer of ownership at the Land Department. ",
  },
  {
    question: "What are the best areas to invest in Abu Dhabi?",
    answer:
      "Yes, non-residents can buy property in designated freehold areas in the UAE, such as Dubai Marina, Downtown Dubai, and Yas Island. The process involves selecting a property, signing a Memorandum of Understanding (MoU), paying a deposit, obtaining a No Objection Certificate (NOC) from the developer, and completing the transfer of ownership at the Land Department. ",
  },
];
