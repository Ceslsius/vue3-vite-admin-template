/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-11 11:11:50
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-11 11:12:11
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'

export interface IRootState {
  app: IAppState
  user: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
