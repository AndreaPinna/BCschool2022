//1. global variables

var abiPath = "solidity/NFTARTGallery.abi.json";
var contractAddress  = '0x11adb11509943Cf30c0B6209D2B037809AfEab2a'; 
var numberOfArtworks = 0;
const basePrice = 1000; // token price


//2. provider and singer
const provider = new ethers.providers.Web3Provider(window.ethereum);
var signer;

//3. starting the app
window.addEventListener('load', async () => {
		await provider.send("eth_requestAccounts", []);
		if (provider) {
		signer = provider.getSigner();
		 startApp(provider);
	 } else {
		 console.log('Please install MetaMask!');
	}
});




async function startApp() {
    //when the document is ready 
    $(document).ready(function () {

        // when I click "start" take the value of the "Address" element
        $("#buttonSub").click(async function () {
            contractAddress = document.getElementById("cAddress").value;
            console.log("Start");


            if (ethers.utils.isAddress(contractAddress)) {
                console.log("Address checked");
                // e carico e mostro le prime info del contratto
                await getMyArtworks(contractAddress,
                    showNumberOfArtworks);

                showSelector(contractAddress);


            } else {
                alert('There was an error fetching your accounts.');

            }


        });
    });
}


//////////
//// dynamic page creation
////////

// show the number of tokens owned by the msg.sender
var showNumberOfArtworks = function (noa) {
    var contentRow = $('#numberOfcontentRow');
    contentRow.find(".numberOfworks").text(noa);
}


////

var showNumberOfArtworks = function (noa) {

    var contentRow = $('#numberOfcontentRow');
    contentRow.find(".numberOfworks").text(noa.length);

}

// populate the vertical selector
var showSelector = function (address) {
    getMyArtworks(address,async function (theartworks) {
        selectorHtml = "";
        for (i = 0; i < theartworks.length; i++) {
            selectorHtml += "<option " + "id=comp value=" + theartworks[i] + ">" + 
		  "artwork ID: " + theartworks[i] + "</option>";
        }
        $("#sel1").html(selectorHtml);
    });
}



// Function to get data from the contract and run the callback
var showEditor =  async function (id,address,callback) {
    var row = $('#artworksRow');
    //svuoto la riga
    row.html("");
    await getArtworkData(id, address,  async function (data) {
        //console.log(data);
        var template = genHtmlEditor(data);
        row.append(template.html());
        callback(data);
    });
}



// Creation of the editor interface

var genHtmlEditor = function (anArtwork) {
    var template = $('#EditorArtworkTemplate');
    //console.log('artwork:', anArtwork);

    const ID = anArtwork.artworkID.toNumber();

    template.find(".form-control-uri").attr('value',anArtwork.artURI);
    template.find(".ID").text(ID);
    template.find(".form-control-name").attr('value',anArtwork.artistName);
    template.find(".form-control-price").attr('value',anArtwork.price.toNumber());
    template.find(".form-control-state").attr('value',anArtwork.state);
    template.find('.btn-save').attr('value', ID);

    //Check the state of the token. If it is 2, disactive the modify.
    if (anArtwork.state == 2 ) {
        template.find('.btn-save').toggleClass("active disabled");

    }

    template.find(".state").text(anArtwork.state);
    return template;
}





////

var spinnerghtml = '<div class="spinner-border" role="status"> <span class="sr-only">Loading...</span> </div>'

//Create New Button: executes the buyToken function
$(document).ready(function () {
    $("#buttonCreate").click(function () {
        $("#buttonCreate").prepend(spinnerghtml);
        buyToken(contractAddress, function(res) {
            console.log(res);
            $('#buttonCreate').find(".spinner-border").remove();
        });
    });
});


//Edit button: to read the selected element and to start the data upload.
$(document).ready(function () {
    $("#buttonEdit").click(function () {
        $("#buttonEdit").prepend(spinnerghtml);
        var selected = $("#sel1").val();  //val contiene l'ID
        showEditor(selected, contractAddress, function () {
            $('#buttonEdit').find(".spinner-border").remove();
        });
    });
});



//Edit button: to save the selected element with the form data
$(document).ready(function () {
    $("#artworksRow").on('click', '.btn-save', function () {
        $(".btn-save").prepend(spinnerghtml);
        var id = this.value;
        var form = $("#artworksRow");
        var uri =form.find(".form-control-uri").val();
        var artistName = form.find(".form-control-name").val();
        var price = form.find(".form-control-price").val();
        artWorkSet(
            contractAddress,
            id,
            artistName,
            uri,
            price,
            function(){
                $('.btn-save').find(".spinner-border").remove();

            }
        )
    });
});






/////////////////////////////////////////////////////
///// TO DO 



//////////
//// getting data from the contract
////////


// Note: my current address is
// ethereum.selectedAddress 



// loading the number of tokens owned by the caller.
function getMyArtworks(address, callback) {

// uses the method getJSON of Jquery and sends the result to the 
// anonimoys function that create a new instance of a contract wrapper
// and uses the the contract to execute the contract function.

// NOTE: to send transacton in MY name I have to use the signer and
// not the provider. So my address will be the msg.sender.

    $.getJSON(abiPath, async function (cABI) {
        const contract = new ethers.Contract(address, cABI, signer); 
        const data = await contract.getArtWorksPerArtistList();
        numberOfArtworks = data;
        callback(data);
    });
}




// Function 2.  Loading token data from the contract
async function getArtworkData(id, address, callback) {

    $.getJSON(abiPath, async function (cABI) {
		
		// uses getArtWorkData(id)

    });
}




//////////
//// Setter e writers to the contract
////////

// Write Methods (non-constant) need signer


// Function 1. buy a token
function buyToken(address, callback) {

    $.getJSON(abiPath, async function (cABI) {
			
			
		//	DIY
					
			
		// we set an "ovveriders" to set the parameter of the transaction
		// The basePrice is the price of the token
		
		// let overrides = {
		//	... 

        // Creating a writing contract instance by using the signer
		// ...
        
		// Creating a transaction and its esecution.
        try{
			
		// ...
           

        }
        catch (e) {

            console.log(e);
        }


    });
}

        // docs
        // https://github.com/ethers-io/ethers.js/issues/469
        // https://docs.ethers.io/v5/api/contract/contract/
        // https://docs.ethers.io/v5/migration/web3/


//

// Function 3. save token info
function artWorkSet(
    address,
    id,
    artistName,
    artURI,
    price,
    callback) {

    $.getJSON(abiPath, async function (cABI) {



        // let overrides = {
    
        

        // const contract_rw = 

           try{
			   //...
        }
        catch (e) {
            console.log(e);
        }

    });
}








