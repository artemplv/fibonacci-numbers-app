/* jshint esversion: 8 */
const fib = {};

//fetching fibonacci number from server
fib.search = async function search(num) {
  const uri = `http://localhost:4001/number/${num}`;
  try {
    const response = await fetch(uri);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }

    //if invalid data were provided by client
    else if (response.status === 400 || response.status === 404) {
      alert('You should input valid sequence number');
    }

    //if database connection is lost
    else if (response.status === 500) {
      let jsonResponse = await response.json();
      alert('This request will not be written to database due to connection issues');
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

//fetching request history from server
fib.history = async function history() {
  const url = 'http://localhost:4001/history';
  try {
    const response = await fetch(url);
    let jsonResponse = await response.json();

    //if database connection is lost
    if (response.status === 500) {
      alert('No database connection');
    }
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
}




export default fib;
