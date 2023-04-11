const userDataFetch = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(data => data.json())
    .catch(err => console.log(`Error at: ${err}`))
}

// const userPost = () => {
//   return fetch()
// }

export { userDataFetch };


