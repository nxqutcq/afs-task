import { SVGProps } from 'react';

export const Chevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_8740_2174)">
      <path
        d="M13 4L7 10L13 16"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8740_2174">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
