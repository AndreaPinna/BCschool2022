//1. global variables
var myAccounts = ethereum.request(
    {
        method: 'eth_accounts'
    });
var abiPath = "solidity/NFTARTGallery.abi.json";
var contractAddress  = '0x11adb11509943Cf30c0B6209D2B037809AfEab2a';
//'0x80341DeDFd89aA05BF9553B12bd5Ec7714Ecd592';

//2. provider and singer
const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();

//3. starting the app
if (provider) {
     startApp(provider);
 } else {
     console.log('Please install MetaMask!');
}




async function startApp(){

    $(document).ready( function(){

            $("#buttonSub").click(
                async function () {

                    contractAddress = document.getElementById("cAddress").value;
                    if (ethers.utils.isAddress(contractAddress)){
                        console.log("The address is correct");
                        getNumberOfArtworks(contractAddress, showNumberOfArtworks);
                        showArtworks(contractAddress);

                    }

                }
            )
        });
}


//////////
//// dynamic page creation
////////


var showNumberOfArtworks = function (noa) {
    var contentRow = $('#numberOfcontentRow');
    contentRow.find(".numberOfworks").text(noa)

}


var showArtworks = function (address){
    var row = $('#artworksRow');
    // empty the line
    row.html("");
    // load the data and append them to the line according to the template
    loadArtworks(address,async function (theartworks) {
        console.log("length of artwork array", theartworks.length);
        for (i = 0; i < theartworks.length; i++) {
            var artwork = theartworks[i];
            var template = genHtmlArtwork(artwork);
            row.append(template.html());
        }

    });


}



// code needed to (pre) load images from URL
var preloadImage = function (url) {
    try {
        var _img = new Image();
        _img.src = url;
    } catch (e) { console.log("error in loading image");}
}



var genHtmlArtwork = function (anArtwork) {
    var template = $('#artworkTemplate');

    preloadImage(anArtwork.artURI);

    template.find(".uri").text(anArtwork.artURI);
    template.find(".ID").text(anArtwork.artworkID.toNumber());
    template.find(".artist").text(anArtwork.artistName);
    template.find(".price").text(anArtwork.price.toNumber());
    template.find(".buyer").text(anArtwork.buyer);
    template.find('img').attr('src', anArtwork.artURI);//artworks.artURI);
    //template.find('.btn-edit').attr('id', "bte" + i); ///3 chatacters+i


    // Check the status of the token. If it is = 2 I can activate the sale
    if (anArtwork.state == 2) {
        template.find('.btn-buy').val(anArtwork.id);

    }

    else {
        template.find('.btn-buy').toggleClass("active disabled");
    }

    template.find(".state").text(anArtwork.state);
    return template;

    // If I want to see them added I have to use the class row and use append
    // compositionRow.append(compositionTemplate.html());
}


// simultaneous loading of all tokens
var loadArtworks = async function(address,callback) {
    console.log("Tokens loading");
    var lartworks=[];
    await getNumberOfArtworks(address, async function (number) {
        for (var i = 1; i <= number; i++) {
            await getArtworkData(i, address,  async function (data) {
                    lartworks.push(data);
                    // AVOID ALL PARALLEL EXECUTIONS
                    if(number==lartworks.length){
                        console.log("a",lartworks.length);
                        callback(lartworks);
                    }

                }
            );
        }
    });
}




// TODO: write the code to perform the sales operations.


/////////
//// getter and setter to blockchain
///////

// we use the provider

function getNumberOfArtworks(address, callback) {
    $.getJSON(abiPath, async function (cABI){
       console.log("ABI JSON loaded");
       const contract = new ethers.Contract(address, cABI, provider);
       var data = await contract.getArtWorksNumber();
       console.log(data.toNumber());
       callback(data);

    });
}

async function getArtworkData(id, address, callback) {
    $.getJSON(abiPath, async function (cABI) {
        const contract = new ethers.Contract(address, cABI, provider);
        var data = await contract.getArtWorkData(id);
        console.log(data);
        callback(data);

    });

}


