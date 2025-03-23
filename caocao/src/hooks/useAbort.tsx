
const controller = new AbortController()
const signal = controller.signal

const UseAbort = (api: any) => {
  const fn = (data: any) => {
    return api(data, signal)
  }
  return [fn, controller.abort]
}

export default UseAbort