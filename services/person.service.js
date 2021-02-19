export async function info(pnr) {
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