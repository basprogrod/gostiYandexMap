export default (t) => {
  let tid

  return (f, arg) => {
    clearTimeout(tid)
    tid = setTimeout(() => {
      f(arg)
      clearTimeout(tid)
    }, t)
  }
}
