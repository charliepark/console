/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}
const Hide24Icon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g id="24/hide">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.9849 17.5644L5.50032 19.155C5.22751 19.4473 4.76674 19.4553 4.48401 19.1725C4.21473 18.9033 4.20725 18.4691 4.46708 18.1907L5.71068 16.8582C3.08125 15.1894 1.57561 12.86 1.08765 12.0135C0.970785 11.8107 0.970785 11.5688 1.08765 11.3661C1.88129 9.98927 5.36695 4.68978 12.0012 4.68978C13.6224 4.68978 15.0556 5.00624 16.3074 5.50458L17.5021 4.2245C17.775 3.9322 18.2357 3.92426 18.5185 4.20698C18.7877 4.47626 18.7952 4.91048 18.5354 5.18887L17.6481 6.13956L15.0915 8.87882L9.40518 14.9713L6.9849 17.5644ZM8.46709 13.9049L13.9822 7.99589C13.3932 7.6731 12.7184 7.48977 12.0012 7.48977C9.7043 7.48977 7.84227 9.37017 7.84227 11.6898C7.84227 12.5028 8.07103 13.2619 8.46709 13.9049ZM18.8648 6.90731L15.8619 10.1248C16.0543 10.6084 16.1602 11.1366 16.1602 11.6898C16.1602 14.0094 14.2982 15.8898 12.0012 15.8898C11.5403 15.8898 11.0968 15.814 10.6824 15.6742L8.39309 18.1271C9.47216 18.4776 10.6737 18.6898 12.0012 18.6898C18.6355 18.6898 22.1212 13.3903 22.9148 12.0135C23.0317 11.8107 23.0317 11.5688 22.9148 11.3661C22.4635 10.5831 21.1415 8.53143 18.8648 6.90731Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Hide24Icon
