// This application provides a blockchain connection via metamask.
// The provider uses the metamask variable window.ethereum.
// In this case, the signer is part of the metamask provider

//the provider uses the metamask  window.ethereum provider
provider = new ethers.providers.Web3Provider(window.ethereum);
var signer;

window.addEventListener('load', async () => {
	await provider.send("eth_requestAccounts", []);
	if (provider) {
		signer = provider.getSigner();
		console.log("provider ready");
	}
	else {
	    console.log('Please install MetaMask!');
	}
});


