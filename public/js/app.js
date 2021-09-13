console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3001/weather?address=gandhinagar').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value.replace(/;/g, "")

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log('Testing')
    // console.log(location)

    fetch('http://localhost:3001/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            }else{
                // console.log(data.location)
                // console.log(data.forecast)

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})