export const store = {
    accountState: {},
    networkState: {},
    appKitState: {},
    themeState: { themeMode: 'light', themeVariables: {} },
    events: [],
    walletInfo: {},
    bip122Provider: null
  }
  
  export const updateStore = (key, value) => {
    store[key] = value
  }