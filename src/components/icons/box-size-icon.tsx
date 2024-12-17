import * as React from "react"
import { SVGProps } from "react"
export const BoxSizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 19"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.467}
        d="M15.764 3.828H1.194v14.57h14.57V3.828ZM2.11 2.297l-.915-.915.915-.916M14.868 2.297l.896-.915-.896-.916M1.382 1.382h14.214M17.296 4.725l.915-.896.915.896M17.296 17.483l.915.915.915-.915M18.211 3.997V18.21"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.467}
        d="M13.579 6.014H3.38v10.199H13.58v-10.2ZM3.51 6.126l1.27 1.27m1.738 1.737 6.949 6.949M13.466 6.126l-9.955 9.956"
      />
      <circle cx={5.846} cy={8.573} r={0.233} fill="currentColor" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.821.093h18.68v18.679H.82z" />
      </clipPath>
    </defs>
  </svg>
)
