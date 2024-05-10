import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
    const response = await axios.get("https://dog.ceo/api/breeds/image/random")
    const imageURL = response.data.message
    document.querySelector("#dog-image").innerHTML = `<img src=${imageURL}>`
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  const url = `/weather.txt?zipcode=${zipcode}`
  const response = await axios.get(url)
  document.querySelector('#weather-info').innerText = response.data
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault()
  // TODO: show the result message after your form
  const qty = document.querySelector('#qty-field').value
  const type = document.querySelector('#cookie-type-field').value
  const result = await axios.post('/order-cookies.json', {
    type: type,
    qty: qty
  })
  const orderStatus = document.querySelector('#order-status')
  orderStatus.innerText = result.data.message
  if (result.data.resultCode === "ERROR") {
    orderStatus.classList.add('order-error');
  }
  else {
    orderStatus.classList.remove('order-error');
  }
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
  const term = document.querySelector('#search-term').value
  const formData = {'term': term}
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  const response = await axios.get(url)
  console.log(response)
  let info = ""
  for (const item of response.data.results) {
    info += `<li>${item.artistName}: ${item.trackName}</li>`
  }
  document.querySelector('#itunes-results').innerHTML = info
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
