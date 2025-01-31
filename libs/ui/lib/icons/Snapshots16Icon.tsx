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
const Snapshots16Icon = ({
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
    <g id="16/snapshots">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70456 1.12662L1.80425 3.65532C1.50121 3.7852 1.50121 4.21481 1.80425 4.34468L7.70456 6.87338C7.89322 6.95424 8.10678 6.95424 8.29544 6.87338L14.1957 4.34468C14.4988 4.2148 14.4988 3.78519 14.1957 3.65532L8.29544 1.12662C8.10678 1.04576 7.89322 1.04576 7.70456 1.12662ZM1 7.50545V7.1374C1 6.59897 1.55054 6.23595 2.04544 6.44805L7.70456 8.87338C7.89322 8.95424 8.10678 8.95424 8.29544 8.87338L13.9546 6.44805C14.4495 6.23594 15 6.59897 15 7.1374V7.50545C15 7.80547 14.8212 8.07663 14.5454 8.19481L8.29544 10.8734C8.10678 10.9542 7.89322 10.9542 7.70456 10.8734L1.45456 8.19481C1.1788 8.07663 1 7.80547 1 7.50545ZM1 11.1374V11.5055C1 11.8055 1.1788 12.0766 1.45456 12.1948L7.70456 14.8734C7.89322 14.9542 8.10678 14.9542 8.29544 14.8734L14.5454 12.1948C14.8212 12.0766 15 11.8055 15 11.5055V11.1374C15 10.599 14.4495 10.2359 13.9546 10.448L8.29544 12.8734C8.10678 12.9542 7.89322 12.9542 7.70456 12.8734L2.04544 10.448C1.55054 10.2359 1 10.599 1 11.1374Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Snapshots16Icon
