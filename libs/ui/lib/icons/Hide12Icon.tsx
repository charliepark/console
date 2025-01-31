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
const Hide12Icon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g id="12/hide">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5385 1.38462L1.38462 11.5385C1.12971 11.7934 0.716439 11.7934 0.461538 11.5385C0.206638 11.2836 0.206638 10.8703 0.461538 10.6154L2.29824 8.77869C1.11663 7.92027 0.391796 6.83506 0.0862919 6.31113C-0.0273093 6.1163 -0.0273093 5.8837 0.0862919 5.68887C0.63462 4.74851 2.53378 2 6.00031 2C6.96551 2 7.8092 2.21308 8.53605 2.54088L10.6154 0.46154C10.8703 0.20664 11.2836 0.206639 11.5385 0.46154C11.7934 0.716441 11.7934 1.12972 11.5385 1.38462ZM6.86656 4.21037L4.18307 6.89385C4.04846 6.62485 3.9727 6.32127 3.9727 6C3.9727 4.89543 4.86813 4 5.9727 4C6.29398 4 6.59756 4.07575 6.86656 4.21037ZM7.96592 5.83413L10.1908 3.60929C11.0867 4.3846 11.6534 5.24143 11.9143 5.68887C12.0279 5.8837 12.0279 6.1163 11.9143 6.31113C11.366 7.2515 9.46684 10 6.00031 10C5.30291 10 4.66896 9.88876 4.09667 9.70338L5.80683 7.99322C5.86153 7.99771 5.91685 8 5.9727 8C7.07727 8 7.9727 7.10457 7.9727 6C7.9727 5.94414 7.97041 5.88882 7.96592 5.83413Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Hide12Icon
