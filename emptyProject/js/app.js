// This application provides a blockchain connection via metamask.
// The provider uses the metamask variable window.ethereum.
// In this case, the signer is part of the metamask provider

var myAccounts = ethereum.request(
    {
        method: 'eth_requestAccounts'
    });
    
const provider = new ethers.providers.Web3Provider(window.ethereum);
		
const signer = provider.getSigner();



