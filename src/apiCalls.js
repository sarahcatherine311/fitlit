const userDataFetch = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(data => data.json())
    .catch(err => console.log(`Error at: ${err}`))
}

// const userPost = (data) => {
//   return fetch('http://localhost:3001/api/v1/hydration', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(data => data.json())
//   .then(json => console.log(json))
//   .catch(err => console.log(`Error at: ${err}`))
// }

export { userDataFetch }

