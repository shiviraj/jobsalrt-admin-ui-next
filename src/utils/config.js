let config = null

function setConfig(envConfig) {
  config = envConfig
}

function getConfig() {
  return config
}

export {setConfig, getConfig}
