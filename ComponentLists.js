//populates the cpu and gpu dropdown menues based on brand chosen via j-query and Select2

//grabs cpu array list from back end database
const FetchCPUs = async () => {
    try{    
        const response = await fetch('http://71.176.233.55:3566/cpus');
        const cpus = await response.json();
        return cpus;
    }
    catch(error){
        console.log('there was a problem with fetching CPUS', error);
    }
}

//grabs gpu array list from back end database
const FetchGPUs = async () => {
    try{    
        const response = await fetch('http://71.176.233.55:3566/gpus');
        const gpus = await response.json();
        return gpus;
    }
    catch(error){
        console.log('there was a problem with fetching GPUS', error);
    }
}

//organize cpus based on brand Intel, AMD, Nvidia
const gencpus = [], intelcpus = [], amdcpus = [], gengpus = [], nvidiagpus = [], amdgpus = [], intelgpus = [];

//categorizes CPUs
const categorizeCPUs = (cpus) => {

    cpus.forEach(element => {
        gencpus.push({
            id: gencpus.length + 1,  //must store the elements as JSON objects in this format in order to populate the select2 dropdown menu.
            text: element
        });

        // Intel CPUs
        if (element.charAt(0) === 'i' || 
            (element.charAt(0) === 'P' && element.charAt(1) === 'e') || 
            element.charAt(0) === 'X' || 
            element.charAt(0) === 'C') {
            intelcpus.push({
                "id": intelcpus.length + 1,
                "text": element
            });
        }
        // AMD CPUs
        if (element.charAt(0) === 'R' || 
            (element.charAt(0) === 'P' && element.charAt(1) === 'h') || 
            element.charAt(0) === 'A' || 
            element.charAt(0) === 'F') {
            amdcpus.push({
                "id": amdcpus.length + 1,
                "text": element
            });
        }
    });
};

//categroizes GPUS
const categorizeGPUs = (gpus) => {
    gpus.forEach(element => {
        gengpus.push(element);
        // Nvidia GPUs
        if ((element.charAt(0) === 'R' && element.charAt(1) === 'T') || 
            (element.charAt(0) === 'G' && element.charAt(1) === 'T') || 
            (element.charAt(0) === 'T' && element.charAt(1) === 'i') || 
            (element.charAt(0) === 'Q' && element.charAt(1) === 'u')) {
            nvidiagpus.push(element);
        }
        // AMD GPUs
        if ((element.charAt(0) === 'R' && element.charAt(1) !== 'T') || 
            element.charAt(0) === 'V' ||  
            (element.charAt(0) === 'F' && element.charAt(1) === 'i')) {
            amdgpus.push(element);
        }
        // Intel GPUs
        if (element.charAt(0) === 'A' || 
            (element.charAt(0) === 'I' && element.charAt(1) === 'r') ||
            (element.charAt(0) === 'H' && element.charAt(1) === 'D') || 
            (element.charAt(0) === 'U' && element.charAt(1) === 'H')) {
            intelgpus.push(element);
        }
    });
};

FetchCPUs().then(cpus => {
    categorizeCPUs(cpus);
}).then({


    
});

FetchGPUs().then(gpus => {
    categorizeGPUs(gpus);
});

//filter tests
//console.log(intelcpus);
//console.log(amdcpus);
//console.log(gencpus);
//console.log(nvidiagpus);
//console.log(amdgpus);
//console.log(intelgpus);

//populate the dropdown menu for cpus via J-query
$(document).ready(async function(){
    const $cpuSelect = await $("#cpu-select"); //stores jquery id of dropdown menu for cpus
    $cpuSelect.select2({
        data: gencpus,
        allowClear: true, //add this into an async / await function
        dropdownCssClass: 'component-select',
        selectionCssClass: 'component-select', //fix this -----------------------------><><<><><><><><><><<><><><><><<>>
    }); //turns it into a select2 select type so as to make the list searchable
});
