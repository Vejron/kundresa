import axios from 'axios';

export async function infoMotala(pnr) {
  const coors = `https://ume-cors.herokuapp.com/`;
  return fetch(coors + "https://www.motalaenergi.se/zavann/get_address.php?ssn=" + pnr, {
    "headers": {
    },
    "referrer": "https://www.motalaenergi.se/privatperson/teckna-avtal",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
  });
}

/**
  address: {
    countryCode: "SE"
    postalAddress: "Rakvattnet"
    postalCode: "90000"
    streetName: "Storgatan"
    streetNumber: "1" 
  }
  bankCode: "ICA"
  customerId: "19000101-1234"
  customerType: "PRIVATE"
  email: "name@mail.com"
  firstName: "Test"
  lastname: "Testsson"
  mobile: "070-1000000"
  name: "TEst Testsson"
 */

export async function info(personalIdentityNumber) {
  return axios.get("https://hackaton.umeaenergi.se/api/customers", {
    params: {
      personalIdentityNumber
    }
  });
}