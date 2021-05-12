/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-16 20:48:40
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-23 17:57:16
 */

import { isInt } from './validate'

interface NumberCheckRule {
  min: number
  max: number
  isInt?: boolean
  message?: string
  includeArr?: number[]
}

export function numberCheck(
  rule: NumberCheckRule,
  value: number,
  callback: (error?: Error) => void
) {
  if (rule.includeArr?.includes(value)) {
    console.log('value', value)

    return callback()
  }
  if (value < rule.min || value > rule.max) {
    return callback(
      new Error(rule.message || `请输入${rule.min}-${rule.max}的数`)
    )
  }

  if (rule.isInt && !isInt(value)) {
    return callback(new Error(rule.message || '请输入整数'))
  }
  return callback()
}
