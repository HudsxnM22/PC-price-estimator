import { compileUserSelectedComponents } from "./modules/SelectedComponents.js";

//populates the cpu and gpu dropdown menues based on brand chosen via j-query and Select2 then calls compiling module function to send to back end and recieve price.

let intelcpus = [], amdcpus = [], nvidiagpus = [], amdgpus = [], intelgpus = [];
//grabs cpu array list from back end database
const FetchComponents = async () => {
    try{    
        var response = await fetch('https://pcpricee.xyz/intel-cpus'); //fetches intel cpus and stores them into intel cpu array as strings
        intelcpus = await response.json();
        var response = await fetch('https://pcpricee.xyz/amd-cpus'); //fetches amd cpus
        amdcpus = await response.json();
        var response = await fetch('https://pcpricee.xyz/nvidia-gpus'); //[nvidia]fetches gpus and stores them into their respective arrays as strings
        nvidiagpus = await response.json();
        var response = await fetch('https://pcpricee.xyz/amd-gpus');//[amd]
        amdgpus = await response.json();
        var response = await fetch('https://pcpricee.xyz/intel-gpus');//[intel]
        intelgpus = await response.json();
    }
    catch(error){
        console.log('there was a problem with fetching Components', error);
    }
}

//organizes cpus into select2 objects so they can be used in the searchable dropdown menu
let select2Intelcpus = [], select2Amdcpus = [], select2Nvidiagpus = [], select2Amdgpus = [], select2Intelgpus = [];


//categorizes CPUs and GPUs into their select2 arrays as the select2 variants of themselves
const categorizeComponents = () => { //must store the elements as JSON objects in this format in order to populate the select2 dropdown menu.
    try{
        intelcpus.forEach(element => { //CPUS
            select2Intelcpus.push({ 
                id: select2Intelcpus.length + 1, //must follow this format
                text: element
            });
        });
        amdcpus.forEach(element => { 
            select2Amdcpus.push({ 
                id: select2Amdcpus.length + 1,
                text: element
            });
        });
        nvidiagpus.forEach(element => { //GPUS
            select2Nvidiagpus.push({ 
                id: select2Nvidiagpus.length + 1,
                text: element
            });
        });  
        amdgpus.forEach(element => { 
            select2Amdgpus.push({ 
                id: select2Amdgpus.length + 1,
                text: element
            });
        }); 
        intelgpus.forEach(element => { 
            select2Intelgpus.push({ 
                id: select2Intelgpus.length + 1,
                text: element
            });
        }); 
    }
    catch(error){
        console.log('error transfering arrays to select2 arrays')
    }
};

const initialize = async () => {
    await FetchComponents();
    await categorizeComponents();
}

$(document).ready( function(){ //waits for initialization and then renders the cpu and gpu dropdown as select2 drop downs.
    populateCPUDropDown();
    populateGPUDropDown();
});

//populate the dropdown menu for cpus via J-query
const populateCPUDropDown = (displayArray) => {
    $(document).ready( function(){
        const $cpuSelect = $("#cpu-select"); //stores jquery id of dropdown menu for cpus
        $cpuSelect.select2({
            data: displayArray,
            allowClear: true,
            placeholder: 'Select brand',
            width: '100%',
            theme: 'custom'
        }).trigger('change'); //turns it into a select2 select type so as to make the list searchable
    });
}

const populateGPUDropDown = (displayArray) => {
    $(document).ready( function(){
        const $gpuSelect = $("#gpu-select"); //stores jquery id of dropdown menu for gpus
        $gpuSelect.select2({
            data: displayArray,
            allowClear: true,
            placeholder: 'Select brand',
            width: '100%',
            theme: 'custom'
        }).trigger('change'); //turns it into a select2 select type so as to make the list searchable
    });
}


//displays the CPU based on brand
$(document).ready( function(){
    const $cpuBrandSelect = $("#cpu-select-brand"); //stores jquery id of dropdown menu for cpu BRAND
    const $cpuSelect = $("#cpu-select");
    const $gpuBrandSelect = $("#gpu-select-brand"); //stores jquery id of dropdown menu for gpu BRAND
    const $gpuSelect = $("#gpu-select");
    $cpuBrandSelect.on('change', function(){
        if($cpuBrandSelect.val() == 'intel'){ //gets the value of the select brand dropdown menu and sends the array that goes with the brand select amd cpus and intel cpus
            $cpuSelect.empty(); 
            populateCPUDropDown(select2Intelcpus);
        }
        if($cpuBrandSelect.val() == 'amd'){
            $cpuSelect.empty(); 
            populateCPUDropDown(select2Amdcpus);
        }
        if($cpuBrandSelect.val() == ''){
            $cpuSelect.empty(); 
        }
    });
    $gpuBrandSelect.on('change', function(){ //when  the user changes the brand it
        if($gpuBrandSelect.val() == 'nvidia'){ //gets the value of the select brand dropdown menu and sends the array that goes with the brand select amd GPUS and intel GPUS and nnvidia GPUS
            $gpuSelect.empty(); 
            populateGPUDropDown(select2Nvidiagpus);
        }
        if($gpuBrandSelect.val() == 'amd'){
            $gpuSelect.empty(); 
            populateGPUDropDown(select2Amdgpus);
        }
        if($gpuBrandSelect.val() == 'intel'){
            $gpuSelect.empty(); 
            populateGPUDropDown(select2Intelgpus);
        }
        if($gpuBrandSelect.val() == ''){
            $gpuSelect.empty(); 
        }
    });
});

$(document).ready( function(){ //not select2 nodes
    const $selectElements = [
        $("#cpu-select-brand"),
        $("#cpu-cooler-select"),
        $("#motherboard-select-type"),
        $("#motherboard-select-socket"),
        $("#memory-size-select"),
        $("#memory-speed-select"),
        $("#memory-type-select"),
        $("#storage-select-type"),
        $("#storage-select-size"),
        $("#gpu-select-brand"),
        $("#case-select"),
        $("#power-supply-select-rating"),
        $("#power-supply-select-wattage")
    ];
    
    function handleSelectChange() {
        if ($(this).val() != "") {
            $(this).css('color', 'black');
        } else {
            $(this).css('color', 'gray');
        }
    }
    
    $selectElements.forEach($select => {
        $select.on('change', handleSelectChange);
    });
});

initialize(); //initializes the arrays

//compile user inputted parts and then display loader and then the final fetched price in 2 formats
document.getElementById("pc-builder-submit-button").addEventListener("click", async () => {
    let selectedComponents = await compileUserSelectedComponents();

    document.getElementById("recS-estimate").innerHTML = ` 
        <l-tailspin
        size="20"
        stroke="5"
        speed="0.9"
        color="white" 
        ></l-tailspin>`;// sell ldr

    document.getElementById("recB-estimate").innerHTML = `
        <l-tailspin
        size="20"
        stroke="5"
        speed="0.9"
        color="white" 
        ></l-tailspin>`; //buy ldr

    try{
        let priceData = await fetchPrice(selectedComponents);
        let price = priceData.price
        if (price == -1){
            document.getElementById("price-estimate").textContent = `You've exceeded your estimate amount. try again later`;
            document.getElementById("price-estimate").style.fontSize = '14px'
        }

        document.getElementById("price-estimate").textContent = `Your PC's Estimate`;
        document.getElementById("recS-estimate").textContent = `$${parseInt(price * .80)}`; //20% markdown for seel your PC. this is the usual case for accurate pricing
        document.getElementById("recB-estimate").textContent = `$${parseInt(price * 1.15)}`; //this is less accurate but still gives a fairl good estimate for the cheapest you can buy a pc with these parts
    }catch(error){
        document.getElementById("recS-title").textContent = "Error fetching price try again later.";
        document.getElementById("recB-title").textContent = "Error fetching price try again later.";
        console.error(error)
    }
});

const fetchPrice = async function(selectedComponents){ //calls back end for back end processing and returns price estimate
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(selectedComponents)
    }

    const response = await fetch('https://pcpricee.xyz/get-price', options);
    if(response.ok){
        let data = await response.json();
        return data;
    } else {
        throw new Error("Ebay fetch error")
    }
}
