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
const Organization16Icon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g id="16/organization">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.46964 0.530339C7.76253 0.237446 8.23741 0.237446 8.5303 0.530339L10.803 2.80301C11.0959 3.09591 11.0959 3.57078 10.803 3.86367L8.5303 6.13635C8.23741 6.42924 7.76253 6.42924 7.46964 6.13635L5.19696 3.86367C4.90407 3.57078 4.90407 3.09591 5.19696 2.80301L7.46964 0.530339ZM15.4697 8.53033C15.7626 8.23744 15.7626 7.76256 15.4697 7.46967L13.197 5.197C12.9041 4.9041 12.4292 4.9041 12.1363 5.197L9.86365 7.46967C9.57076 7.76256 9.57076 8.23744 9.86365 8.53033L12.1363 10.803C12.4292 11.0959 12.9041 11.0959 13.197 10.803L15.4697 8.53033ZM10.803 13.197C11.0959 12.9041 11.0959 12.4293 10.803 12.1364L8.5303 9.86368C8.23741 9.57079 7.76253 9.57079 7.46964 9.86368L5.19696 12.1364C4.90407 12.4293 4.90407 12.9041 5.19696 13.197L7.46964 15.4697C7.76253 15.7626 8.23741 15.7626 8.5303 15.4697L10.803 13.197ZM6.13629 8.53033C6.42918 8.23744 6.42918 7.76256 6.13629 7.46967L3.86361 5.197C3.57072 4.9041 3.09585 4.9041 2.80295 5.197L0.530278 7.46967C0.237385 7.76256 0.237384 8.23744 0.530278 8.53033L2.80295 10.803C3.09585 11.0959 3.57072 11.0959 3.86361 10.803L6.13629 8.53033Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Organization16Icon
