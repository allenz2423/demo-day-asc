const proxy = "https://nextjs-cors-anywhere.vercel.app/api?endpoint=" // I'm not giving credit lol
const API_KEY = 'AIzaSyA08wrX3yT82GkulKn3tzGy_nQzFOWUR_4'
let maps = document.querySelector("#map")
let submit = document.querySelector("#submit")
let input = document.querySelector("#lookup")
let table = document.querySelector("#table")
let locationButton = document.querySelector("#location_access_request")
let results = []
const getData = async (query) => {
  console.log(typeof(query))
  console.log(query)
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${query}&query=electronics%20recycling%20center&key=${API_KEY}`
  console.log(url)
  await fetch(proxy + url)
  .then(response => response.json())
  .then(data => data["results"].forEach(function(i) {
    results.push(i)
  })
  )
}
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(function(e){
    getData(`${e.coords.latitude},${e.coords.longitude}`)
  });
}
function handlePermission() {
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    getLocation()
    let test = results
    loadTable(test)
    maps.src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${test[Math.floor(Math.random() * test.length)]["formatted_address"]}`
  });
}

const loadTable = (locationz) => {
  let html = ""
  locationz.forEach(function(e) {
    html += `
      <tr>
        <td>${e["name"]}</td>
        <td>${e["formatted_address"]}</td>
    `
  })
  table.innerHTML = `<tr>
            <th>Business Name</th>
            <th>Business Location</th>
         </tr>
         ${html}
                     `
}
let test
submit.onclick = (n) => {
  n.preventDefault();
  console.log(input.value)
  getData(input.value)
  test = results
  loadTable(test)
  console.log(results)
  maps.src=`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${test[Math.floor(Math.random() * test.length)]["formatted_address"]}`
  results=[]
}
locationButton.onclick = (n) => {
  console.log("what")
  n.preventDefault()
  handlePermission()
}
