export const case1 = () => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  })
  const p = new Promise((resolve, reject) => {
    console.log(3)
    resolve('成功')
  })
  p.then(() => {
    console.log(4)
  })
  console.log(5)
}

export const case2 = () => {
  setTimeout(() => console.log(1))
  Promise.resolve().then(() => {
    console.log(2)
    Promise.resolve().then(() => {
      console.log(3)
    })
  })
  Promise.resolve().then(() => {
    console.log(4)
  })
}