import { TextHighlight, TypographyH2 } from '@/components/ui/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'

export interface FAQ {
  question: string
  answer: string
}

export interface FAQSectionProps {
  title?: string
  faqs?: FAQ[]
}

type UnknownFAQ = Partial<FAQ> & {
  [key: string]: unknown
}

const defaultFaqs: FAQ[] = [
  {
    question: 'Where is Bloom Living located?',
    answer: 'Bloom Living is located in Madinat Zayed, Abu Dhabi.',
  },
  {
    question: 'Who is the developer of Bloom Living?',
    answer: 'Bloom Living is developed by Bloom Holding, a prominent real estate developer in the UAE.',
  },
  {
    question: 'What are the property types for Bloom Living?',
    answer: 'Bloom Living offers a variety of property types including villas, townhouses, and apartments.',
  },
  {
    question: 'What are the available bedrooms in Bloom Living?',
    answer: 'Bloom Living offers properties with 1 to 6 bedrooms, catering to different family sizes and preferences.',
  },
]

const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Bloom Living FAQs',
  faqs = defaultFaqs,
}) => {

  const isFAQCompatible = (faq: unknown): faq is UnknownFAQ => {
    return typeof faq === 'object' && faq !== null
  }

  const safeFaqs: FAQ[] = faqs.map((faq) => {
    if (isFAQCompatible(faq)) {
      return {
        question: typeof faq.question === 'string'
          ? faq.question
          : typeof faq["Question"] === 'string'
          ? faq["Question"]
          : '',
        answer: typeof faq.answer === 'string'
          ? faq.answer
          : typeof faq["Answer"] === 'string'
          ? faq["Answer"]
          : '',
      }
    }
    return { question: '', answer: '' }
  })

  return (
    <div className="space-y-[25px] w-full">
      <div className="text-center space-y-3.5 mt-[70px]">
        <TypographyH2 className="text-left font-medium">
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <TextHighlight>{title.split(' ').slice(-1)}</TextHighlight>
        </TypographyH2>
      </div>
      <Accordion type="single" collapsible className="mx-auto">
        {safeFaqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="lg:px-[70px] px-[30px] rounded-lg mb-[10px] bg-[#F9F9F9] border-b-0"
          >
            <AccordionTrigger className="text-lg [&>svg]:text-black font-semibold">
              {index+1 + '.'} {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection
