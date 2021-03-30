/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 15:55:44
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-30 18:19:20
 */

import { getGiftList } from '@/api'
import { ref } from 'vue'

const giftList = ref<GiftInfo[]>([])

export function useGiftList(type: 0 | 1 = 0) {
  getGiftList(type).then(({ data }) => {
    giftList.value = data.list
  })
  return {
    giftList,
  }
}
