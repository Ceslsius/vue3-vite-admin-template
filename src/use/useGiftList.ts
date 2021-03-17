/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-16 15:55:44
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-16 16:18:49
 */

import { getGiftList } from '@/api'
import { ref } from 'vue'

const giftList = ref<GiftInfo[]>([])

export function useGiftList() {
  getGiftList().then(({ data }) => {
    giftList.value = data.list
  })
  return {
    giftList,
  }
}
