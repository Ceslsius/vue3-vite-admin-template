/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-24 17:00:35
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-24 17:06:03
 */

import { computed } from 'vue'
import { PkAnchorRewarConfig } from '../intrface'

export function useAnchorRewarTableForm(config: PkAnchorRewarConfig) {
  const AnchorRewarTableForm = computed(() => {
    return [
      {
        label: '1',
        lebelKey: 'first',
        name: '头像框',
        count: '-',
        time: '3.2',
      },
      {
        label: '1',
        name: '直播封面标签',
        count: '-',
        time: config.first.avatar.time,
      },
      {
        label: '1',
        name: 'T钻',
        count: '234',
        time: '3.2',
      },
      {
        label: '2',
        name: '头像框',
        count: '234',
        time: '3.2',
      },
      {
        label: '2',
        name: '直播封面标签',
        count: '234',
        time: '3.2',
      },
      {
        label: '2',
        name: 'T钻',
        count: '234',
        time: '3.2',
      },
      {
        label: '3',
        name: '头像框',
        count: '234',
        time: '3.2',
      },
      {
        label: '3',
        name: '直播封面标签',
        count: '234',
        time: '3.2',
      },
      {
        label: '3',
        name: 'T钻',
        count: '234',
        time: '3.2',
      },
      {
        label: '4~10',
        name: '头像框',
        count: '234',
        time: '3.2',
      },
      {
        label: '4~10',
        name: 'T钻',
        count: '234',
        time: '3.2',
      },
    ]
  })
}
