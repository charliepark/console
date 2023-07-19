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
const Transmit24Icon = ({
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
    <g id="24/transmit">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3629 13.8399C18.0274 14.279 18.0273 14.9093 18.4218 15.2964C18.8157 15.683 19.4528 15.6801 19.7987 15.25C21.1759 13.5378 22 11.3624 22 8.99474C22 6.6285 21.1769 4.45435 19.8012 2.74258C19.4555 2.31237 18.8184 2.30925 18.4243 2.69566C18.0297 3.08255 18.0295 3.71289 18.3649 4.15214C19.3908 5.49611 20 7.17456 20 8.99474C20 10.8161 19.3901 12.4955 18.3629 13.8399ZM5.63707 13.8399C5.97257 14.279 5.97267 14.9093 5.57824 15.2964C5.1843 15.683 4.5472 15.6801 4.20128 15.25C2.82409 13.5378 2 11.3624 2 8.99474C2 6.6285 2.82309 4.45435 4.19879 2.74258C4.54454 2.31237 5.18164 2.30925 5.57573 2.69566C5.97031 3.08255 5.97046 3.71289 5.63514 4.15214C4.60917 5.49611 4 7.17456 4 8.99474C4 10.8161 4.60993 12.4955 5.63707 13.8399ZM7.08082 12.4285C7.39741 12.8805 8.0382 12.8824 8.43211 12.4959C8.82656 12.1088 8.81858 11.479 8.54039 11.0015C8.19676 10.4117 8 9.72605 8 8.99479C8 8.26409 8.19647 7.57895 8.53962 6.9894C8.81763 6.51178 8.82536 5.88197 8.43076 5.49505C8.0367 5.10868 7.39592 5.11084 7.0795 5.563C6.39914 6.53522 6 7.71843 6 8.99479C6 10.272 6.39966 11.4559 7.08082 12.4285ZM15.5679 12.4959C15.9618 12.8824 16.6026 12.8805 16.9192 12.4285C17.6003 11.4559 18 10.272 18 8.99479C18 7.71843 17.6009 6.53522 16.9205 5.563C16.6041 5.11084 15.9633 5.10868 15.5692 5.49505C15.1746 5.88197 15.1824 6.51178 15.4604 6.9894C15.8035 7.57895 16 8.26409 16 8.99479C16 9.72605 15.8032 10.4117 15.4596 11.0015C15.1814 11.479 15.1734 12.1088 15.5679 12.4959ZM14 9.00005C14 9.89987 13.4058 10.6609 12.5883 10.9121L15.6018 20.706C15.7997 21.349 15.3188 22.0001 14.646 22.0001H9.35396C8.68115 22.0001 8.20032 21.349 8.39818 20.706L11.4117 10.9121C10.5942 10.6609 10 9.89987 10 9.00005C10 7.89548 10.8954 7.00005 12 7.00005C13.1046 7.00005 14 7.89548 14 9.00005Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
export default Transmit24Icon
