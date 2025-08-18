import { store, updateStore } from './appKitStore.js'


export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    console.log("state", state)
    updateStore('eip155', state['eip155'])
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)
  })

  modal.subscribeState(state => {
    store.appKitState = state
  })
}