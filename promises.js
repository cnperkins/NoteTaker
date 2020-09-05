/*
Callbacks
Promises - error by default
*/

//Callbacks
function is_callback(value, cb) {
    return cb(value * 43)
}

is_callback(20, returned_from_callback => {
    console.log(returned_from_callback)
})


// Promises
const promise_function = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve("Succeeded")
        }, 1000)
    } catch{
        reject("ERRORRROROROR")
    }
})
const promise_fail_function = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Succeeded")
    }, 1000)
    reject("ERRORRROROROR")
})

promise_function.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

promise_fail_function.then(res => {
    console.log(res)
}).catch(err => {
    console.log(`Got an error: ${err}`)
})

// Stacking promises is so jank. Calbback stacking is commonly referred to as callaback hell

// JS created async/await to make this Less daunting

const get_all_promises = async () => {
    const promise_one = await promise_function
    const promise_two = await promise_fail_function.catch(err => console.log(err))

    console.log(promise_one, promise_two)
}

get_all_promises()


