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
const FreebsdDistroIcon = ({
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
    <g id="distro/freebsd">
      <path
        id="Icon"
        d="M14.8396 1.23874C15.5822 1.99236 13.5248 5.30425 13.1771 5.65737C12.8288 6.01048 11.9456 5.6858 11.2036 4.93218C10.4616 4.17857 10.1419 3.28098 10.4896 2.92786C10.8373 2.57475 14.0982 0.485118 14.8396 1.23933V1.23874ZM4.43277 2.0362C3.29992 1.3833 1.68814 0.656934 1.1748 1.17771C0.655625 1.70501 1.39647 3.37992 2.04631 4.53286C2.62382 3.51204 3.44634 2.65237 4.43277 2.0362ZM13.7079 5.39786C13.8123 5.7569 13.7937 6.05373 13.6245 6.22554C13.229 6.62724 12.1615 6.19947 11.1995 5.2693C11.1313 5.20743 11.0648 5.14362 11 5.07793C10.6518 4.72423 10.3817 4.34801 10.2079 4.00142C9.87069 3.38762 9.78669 2.84492 10.0416 2.5866C10.1804 2.4456 10.4021 2.40708 10.6734 2.45626C10.8501 2.3431 11.0584 2.21631 11.2871 2.08715C10.3271 1.57903 9.26031 1.31456 8.17783 1.31635C4.45727 1.31635 1.44139 4.37941 1.44139 8.15817C1.44139 11.9363 4.45727 15 8.17783 15C11.8984 15 14.9149 11.9369 14.9149 8.15817C14.9149 6.93769 14.5999 5.79363 14.0486 4.80125C13.9402 5.0031 13.8266 5.20204 13.7079 5.39786Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default FreebsdDistroIcon
