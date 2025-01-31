/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { expect, test } from 'vitest'

import { groupBy, intersperse, lowestBy, sortBy, sumBy } from './array'

test('sortBy', () => {
  expect(sortBy(['d', 'b', 'c', 'a'])).toEqual(['a', 'b', 'c', 'd'])

  expect(sortBy([{ x: 'd' }, { x: 'b' }, { x: 'c' }, { x: 'a' }], (o) => o.x)).toEqual([
    { x: 'a' },
    { x: 'b' },
    { x: 'c' },
    { x: 'd' },
  ])

  expect(
    sortBy(
      [{ x: [0, 0, 0, 0] }, { x: [0, 0, 0] }, { x: [0] }, { x: [0, 0] }],
      (o) => o.x.length
    )
  ).toEqual([{ x: [0] }, { x: [0, 0] }, { x: [0, 0, 0] }, { x: [0, 0, 0, 0] }])
})

test('lowestBy', () => {
  expect(lowestBy([{ x: 'd' }, { x: 'b' }, { x: 'c' }, { x: 'a' }], (o) => o.x)).toEqual({
    x: 'a',
  })

  expect(
    lowestBy(
      [{ x: [0, 0, 0, 0] }, { x: [0, 0, 0] }, { x: [0] }, { x: [0, 0] }],
      (o) => o.x.length
    )
  ).toEqual({ x: [0] })
})

test('groupBy', () => {
  expect(
    groupBy(
      [
        { x: 'a', y: 1 },
        { x: 'b', y: 2 },
        { x: 'a', y: 3 },
      ],
      (o) => o.x
    )
  ).toEqual([
    [
      'a',
      [
        { x: 'a', y: 1 },
        { x: 'a', y: 3 },
      ],
    ],
    ['b', [{ x: 'b', y: 2 }]],
  ])
})

test('sumBy', () => {
  expect(sumBy([], (x) => x)).toEqual(0)
  expect(sumBy([{ a: 1 }, { a: 2 }], (x) => x.a)).toEqual(3)
})

test('intersperse', () => {
  expect(intersperse([], 'x')).toEqual([])
  expect(intersperse(['a'], 'x')).toEqual(['a'])

  expect(intersperse(['a', 'b'], ',')).toEqual(['a', ',', 'b'])
  expect(intersperse(['a', 'b'], ',', 'or')).toEqual(['a', 'or', 'b'])

  expect(intersperse(['a', 'b', 'c'], ',')).toEqual(['a', ',', 'b', ',', 'c'])
  expect(intersperse(['a', 'b', 'c'], ',', 'or')).toEqual(['a', ',', 'b', ',', 'or', 'c'])
})
