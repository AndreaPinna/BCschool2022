var myAccounts =  ethereum.request(
    {
        method: 'eth_accounts'
    });

var abiPath = "solidity/NFTARTGalleria.abi.json";
var contractAddress  = '0x80341DeDFd89aA05BF9553B12bd5Ec7714Ecd592';

var numberOfArtworks = 0;
const basePrice = 1000;


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    startApp(provider); // initialize your app
}
else {
    console.log('Please install a provider');
}


async function startApp() {
    //quando il documento è pronto
    $(document).ready(function () {

        // quando clicco "start" prelevo il valore dell'elemento "cAddress"
        $("#buttonSub").click(async function () {
            contractAddress = document.getElementById("cAddress").value;
            console.log("hai cliccato Start");


            if (ethers.utils.isAddress(contractAddress)) {
                console.log("address verificato");
                // e carico e mostro le prime info del contratto
                await getMyArtworks(contractAddress,
                    showNumberOfArtworks);

                //showSelector(contractAddress);
                // Mostro i token


            } else {
                alert('There was an error fetching your accounts.');

            }


        });
    });
}


//////////
//// creazione dinamica della pagina
////////

//scrive il numero di token del msg.sender
var showNumberOfArtworks = function (noa) {
    var contentRow = $('#numberOfcontentRow');
    contentRow.find(".numberOfworks").text(noa);
}



//////
/// getters  da contratto
////

function getMyArtworks(address, callback) {

    $.getJSON(abiPath, async function (cABI) {
        const contract = new ethers.Contract(address, cABI, signer);// provider);
        const data = await contract.getArtWorksPerArtistList();
        numberOfArtworks = data;
        callback(data);
    });
}



function buyToken(address, callback) {

    $.getJSON(abiPath, async function (cABI) {

        const contract = new ethers.Contract(address, cABI, signer);
        const data = await contract.createToken();

    });

}