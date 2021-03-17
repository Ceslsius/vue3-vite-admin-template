/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 20:48:40
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 20:53:26
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
  if (value < 1 || value > 1000) {
    return callback(
      new Error(rule.message || `请输入${rule.min}-${rule.max}的数`)
    )
  }
  if (rule.isInt && !isInt(value)) {
    return callback(new Error(rule.message || '请输入整数'))
  }
  return callback()
}
