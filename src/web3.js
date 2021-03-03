
const Web3 = require("web3");

var web3;
if (typeof window.ethereum !== 'undefined') {
	 web3 = new Web3(window.ethereum);
	window.ethereum.request({ method: 'eth_requestAccounts' })
} else {
	console.log('MetaMask is installed!');
}

export default web3;

/**
 * So now any other file inside of our application can require or import this web 3. js file and it will
 * get this pre-built already configured a 100 percent setup version of web 3.
 * */

