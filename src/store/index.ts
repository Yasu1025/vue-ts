import { Commit, createStore } from 'vuex'
import { User } from '../models/user';
import UserModule from './UserModule';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User: UserModule
  }
})
