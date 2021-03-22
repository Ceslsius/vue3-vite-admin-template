/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 20:48:40
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-19 15:44:11
 */

import { isInt } from './validate'

interface NumberCheckRule {
  min: number
  max: number
  isInt?: boolean
  message?: string
}

export function numberCheck(
  rule: NumberCheckRule,
  value: number,
  callback: (error?: Error) => void
) {
  if (value < rule.min || value > rule.max) {
    return callback(
      new Error(rule.message || `请输入${rule.min}-${rule.max}的数`)
    )
  }
  console.log(typeof value)

  if (rule.isInt && !isInt(value)) {
    return callback(new Error(rule.message || '请输入整数'))
  }
  return callback()
}
