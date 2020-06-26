// event listener to submitting bagel

const $form = document.querySelector('form')

$form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const bagelData = {
    type: formData.get('type'),
    rating: formData.get('rating')
  }

  fetch('https://bagel-api-fis.herokuapp.com/bagels', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(bagelData)
  }).then (response => {
    if (!response.ok) {
      return response.json().then(parsedResponse => {
        throw new Error(parsedResponse.error)
      })
    }
    console.log(response)
    return response.json()
  }).then(parsedResponse => {
    // do something good 
    // addBagelToPage() pessimistic rendering
  }).catch(error => {
    const $error = document.querySelector('.error')
    $error.textContent = error.message
  })

  // optimistic rendering
  addBagelToPage()
}

function addBagelToPage() {

}

// if you put in multiple catches, they will handle the errors 
// that havent been handled by a different catch in the order JS runs
