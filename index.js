// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })

/////////////////////////////     Selecting Html Elements     ///////////////////////////////////
let searchByPin = document.getElementById('search-by-pin');
let searchByDistrict = document.getElementById('search-by-district');



////////////////////////////      Add Event Listeners        //////////////////////////////////
searchByPin.addEventListener('click', () => {
  alert('You want to submit your pin')
})


searchByDistrict.addEventListener('click', () => {
  alert('You want to submit your District')
})





async function asyncCall() {
    let data_url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=832108&date=25-05-2021'
    let response = await fetch(data_url)
    let result = await response.json()
    console.log(result)
  return result
}
  
asyncCall();
