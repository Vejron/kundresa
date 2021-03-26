import axios from 'axios';

export async function esign2({pnr, tosign}) {
  return fetch("http://10.201.16.177:8090/apx/values", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
   // body: JSON.stringify({pnr, tosign}),
    mode: "cors",
  });
}

export async function esign({pnr, tosign}) {
  const cors = `https://ume-cors.herokuapp.com/`;
  return axios.post("https://hackaton.umeaenergi.se/apx/sign", {
    pnr,
    tosign
  });
}
/*
https://app.bankid.com/?autostarttoken=[TOKEN]&redirect=[RETURNURL]

const xmlhttp = new XMLHttpRequest();  
const theUrl = "http://hackaton.umeaenergi.se/apx/sign";
xmlhttp.open("POST", theUrl);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({ pnr: "7911068513", tosign: "blabla" }));
*/