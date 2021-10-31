/* tslint:disable */
/* eslint-disable */
/**
 * Oxide Region API
 * API for interacting with the Oxide control plane
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: api@oxide.computer
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
import { Disk, DiskFromJSON, DiskFromJSONTyped, DiskToJSON } from './'

/**
 * A single page of results
 * @export
 * @interface DiskResultsPage
 */
export interface DiskResultsPage {
  /**
   * list of items on this page of results
   * @type {Array<Disk>}
   * @memberof DiskResultsPage
   */
  items: Array<Disk>
  /**
   * token used to fetch the next page of results (if any)
   * @type {string}
   * @memberof DiskResultsPage
   */
  nextPage?: string | null
}

export function DiskResultsPageFromJSON(json: any): DiskResultsPage {
  return DiskResultsPageFromJSONTyped(json, false)
}

export function DiskResultsPageFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DiskResultsPage {
  if (json === undefined || json === null) {
    return json
  }
  return {
    items: (json['items'] as Array<any>).map(DiskFromJSON),
    nextPage: !exists(json, 'next_page') ? undefined : json['next_page'],
  }
}

export function DiskResultsPageToJSON(value?: DiskResultsPage | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    items: (value.items as Array<any>).map(DiskToJSON),
    next_page: value.nextPage,
  }
}
