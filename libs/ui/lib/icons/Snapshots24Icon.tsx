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
const Snapshots24Icon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
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
    <g id="24/snapshots">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4855 1.30869L2.71458 6.57124C2.39091 6.76545 2.39091 7.23454 2.71458 7.42874L11.4855 12.6913C11.8022 12.8813 12.1978 12.8813 12.5145 12.6913L21.2854 7.42874C21.6091 7.23454 21.6091 6.76545 21.2854 6.57124L12.5145 1.30869C12.1978 1.11868 11.8022 1.11868 11.4855 1.30869ZM3.29867 10.7792L11.4855 15.6913C11.8022 15.8813 12.1978 15.8813 12.5145 15.6913L20.7013 10.7792C21.2729 10.4363 22 10.848 22 11.5145C22 11.8157 21.842 12.0948 21.5837 12.2498L12.5145 17.6913C12.1978 17.8813 11.8022 17.8813 11.4855 17.6913L2.41632 12.2498C2.15803 12.0948 2 11.8157 2 11.5145C2 10.848 2.72713 10.4363 3.29867 10.7792ZM11.4855 20.6913L3.29867 15.7792C2.72713 15.4363 2 15.848 2 16.5145C2 16.8157 2.15803 17.0948 2.41632 17.2498L11.4855 22.6913C11.8022 22.8813 12.1978 22.8813 12.5145 22.6913L21.5837 17.2498C21.842 17.0948 22 16.8157 22 16.5145C22 15.848 21.2729 15.4363 20.7013 15.7792L12.5145 20.6913C12.1978 20.8813 11.8022 20.8813 11.4855 20.6913Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Snapshots24Icon
