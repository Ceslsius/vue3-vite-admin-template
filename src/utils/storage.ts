/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-10-20 10:22:22
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-04 15:32:56
 */

export class TakStorage {
  constructor(config?: { prefix: string }) {
    this.TakStoragePrefix = this.TakStoragePrefix + config?.prefix || ''
  }

  private TakStoragePrefix = '_TakTak_'

  getItem<T = any>(key: string): MayNull<T> {
    if (!key) {
      throw new Error('key is non-existent!')
    }
    const temp = localStorage.getItem(`${this.TakStoragePrefix}_${key}`)
    if (typeof temp !== 'string') {
      return null
    }
    const { data } = JSON.parse(temp)
    return data as T
  }

  setItem(key: string, data: string | number | object | boolean) {
    const temp = {
      type: typeof data,
      data
    }
    const tempStr = JSON.stringify(temp)
    localStorage.setItem(`${this.TakStoragePrefix}_${key}`, tempStr)
  }

  clear() {
    const keys = Object.keys(localStorage)
    const clearKeys = keys.filter(key => {
      return (
        key.slice(0, this.TakStoragePrefix.length) === this.TakStoragePrefix
      )
    })
    clearKeys.forEach(key => {
      localStorage.removeItem(key)
    })
  }

  delete(key: string) {
    if (!key) {
      throw new Error('key is non-existent!')
    }
    localStorage.removeItem(`${this.TakStoragePrefix}_${key}`)
  }
}
