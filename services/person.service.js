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
  "lastName": "MEDELINKOMSTTAGAREB",
  "registrationAddress": {
    "streetName": "SKÅNEGATAN 7130",
    "zipCode": "14731",
    "city": "TUMBA"
  },
  "firstName": "BÄRTA",
  "customerType": "PRIVATE",
  "name": "BÄRTA MEDELINKOMSTTAGAREB"

191703038883

191603019918

198001053464

191602059980

191703058881

191703058998

191703048882

191703068997

191603019876
 */

export async function info(personalIdentityNumber, mock) {
  if(mock) {
    const res = {
      data: {
        firstName: "John",
        lastName: "Doe",
        customerType: "PRIVATE",
        region: "SE2", // SE1, SE2, SE3, SE4
        registrationAddress: {
          streetName: "Ballefjonggatan 7",
          city: "Umeå",
          zipCode: "903 66"
        }
      }
    }
    return new Promise((resolve) =>
        setTimeout(() => {
          resolve(res);
        }, 500)
      )
  }
  return axios.get("https://hackaton1.umeaenergi.se/api/customers", {
    params: {
      personalIdentityNumber
    }
  });
}