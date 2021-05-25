const express = require('express');
const fetch = require('node-fetch');
const nodemon = require('nodemon');
var bodyParser = require('body-parser')

const app = express();
const port = 8080;

// parse application/json
// app.use(bodyParser.json())



app.get('/', async(req,res) => {
    const data_url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+req.query.district+"&date="+req.query.date

    const response = await fetch(data_url, {
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    });
    let result = await response.json()
    let output = []
      for (const item of result.centers) {
        for (let i = 0; i < item.sessions.length; i++) {
          let dosecondition = ''
          if(!req.query.dose) dosecondition = item.sessions[i].available_capacity_dose1 || item.sessions[i].available_capacity_dose2
          else if(req.query.dose==1) dosecondition = item.sessions[i].available_capacity_dose1
          else if(req.query.dose==2) dosecondition = item.sessions[i].available_capacity_dose2
  
          let agecondition = ''
          if(req.query.age==18) agecondition = item.sessions[i].min_age_limit == 18
          else if(req.query.age==45) agecondition = item.sessions[i].min_age_limit == 45
          else agecondition = true
  
          if(dosecondition && agecondition) {
            output.push([
            item.name + ' ' + item.address + ' ' + item.district_name + ' ' + item.pincode,
            item.sessions[i].available_capacity_dose1, 
            item.sessions[i].available_capacity_dose2
            ])
          }    
        }
      }
    res.status(200).json(output)
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})


// http://172.172.17.42:3000/AUTH/TEST?district=294&date=26-05-2021&dose=1&age=45





// const data_url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+req.query.district+"&date="+req.query.date
//   const response = await fetch(data_url, {
//     method: 'GET',
//     headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
//   });
//   let result = await response.json()
//   let output = []
//     for (const item of result.centers) {
//       for (let i = 0; i < item.sessions.length; i++) {
//         let dosecondition = ''
//         if(!req.query.dose) dosecondition = item.sessions[i].available_capacity_dose1 || item.sessions[i].available_capacity_dose2
//         else if(req.query.dose==1) dosecondition = item.sessions[i].available_capacity_dose1
//         else if(req.query.dose==2) dosecondition = item.sessions[i].available_capacity_dose2

//         let agecondition = ''
//         if(req.query.age==18) agecondition = item.sessions[i].min_age_limit == 18
//         else if(req.query.age==45) agecondition = item.sessions[i].min_age_limit == 45
//         else agecondition = true

//         if(dosecondition && agecondition) {
//           output.push([
//           item.name + ' ' + item.address + ' ' + item.district_name + ' ' + item.pincode,
//           item.sessions[i].available_capacity_dose1, 
//           item.sessions[i].available_capacity_dose2
//           ])
//         }    
//       }
//     }
//   return res.json(output)