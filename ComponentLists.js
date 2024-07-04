//populates the cpu and gpu dropdown menues based on brand chosen via j-query and Select2

intelcpus = [], amdcpus = [], nvidiagpus = [], amdgpus = [], intelgpus = [];
//grabs cpu array list from back end database
const FetchComponents = async () => {
    try{    
        var response = await fetch('https://pcpricee.xyz:3566/intel-cpus'); //fetches intel cpus and stores them into intel cpu array as strings
        intelcpus = await response.json();
        var response = await fetch('https://pcpricee.xyz:3566/amd-cpus'); //fetches amd cpus
        amdcpus = await response.json();
        var response = await fetch('https://pcpricee.xyz:3566/nvidia-gpus'); //[nvidia]fetches gpus and stores them into their respective arrays as strings
        nvidiagpus = await response.json();
        var response = await fetch('https://pcpricee.xyz:3566/amd-gpus');//[amd]
        amdgpus = await response.json();
        var response = await fetch('https://pcpricee.xyz:3566/intel-gpus');//[intel]
        intelgpus = await response.json();
    }
    catch(error){
        console.log('there was a problem with fetching Components', error);
    }
}

//organizes cpus into select2 objects so they can be used in the searchable dropdown menu
const select2Intelcpus = [], select2Amdcpus = [], select2Nvidiagpus = [], select2Amdgpus = [], select2Intelgpus = [];


//categorizes CPUs and GPUs into their select2 arrays as the select2 variants of themselves
const categorizeComponents = async (intelcpus, amdcpus, nvidiagpus, amdgpus, intelgpus) => { //must store the elements as JSON objects in this format in order to populate the select2 dropdown menu.
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
    await categorizeComponents(intelcpus, amdcpus, nvidiagpus, amdgpus, intelgpus);

    //filter tests
    //console.log(intelcpus);
    //console.log(amdcpus);
    //console.log(nvidiagpus);
    //console.log(amdgpus);
    //console.log(intelgpus);

    populateCPUDropDown();
    populateGPUDropDown();
}

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
    //$('.component-select').select2({
    //    width: '100%', //sets all select components to be select 2
    //    theme: 'custom'
    //});
    //$("#motherboard-select-socket").select2({
    //    allowClear: true,
    //    width: '100%',
    //    theme: 'custom'
    //})
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

initialize(); //initializes the arrays



