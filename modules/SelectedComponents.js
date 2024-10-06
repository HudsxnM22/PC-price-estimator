export function compileUserSelectedComponents() {
    
    //this checks to see if their has been an input selected and if there has been it stores that into an object to be later processed by the webserver
    let compiledList = {
        "selectedComponents": [
            {partname: extractComponentSelected("CPUs", true), part: 'cpu'},
            {partname: extractComponentSelected("CPUcoolers", false), part: 'cpu-cooler'},
            {partname: extractComponentSelected("motherboards", false), part: 'mobo'},
            {partname: extractComponentSelected("memory", false), part: 'mem'} ,
            {partname: extractComponentSelected("storages", false), part: 'storage'},
            {partname: extractComponentSelected("GPUs", true), part: 'gpu'},
            {partname: extractComponentSelected("cases", false), part: 'case'},
            {partname: extractComponentSelected("power-supply", false), part: 'psu'}
        ] //since it just queries all items that are selected, knowing the specific types selected is irrelevant
    }

    return(compiledList);
    
}

//sends compiled to the backend and GETs the sell price for the compiled list and send thats data to the front end





//check if components selected for the part type
function extractComponentSelected(partToCheck, isItSelect2) { //part to check should be the id of the container holding the selectable components, select 2 is a boolean because those need a different approach
    let childrenHtmlCollection = [...document.getElementById(partToCheck).children];
    let childrenIds = []; //this ectracts the ids of the children in each component row
    
    childrenHtmlCollection.forEach(child => {
        childrenIds.push(child.id); //adds the ids to seperate array
    });

    if(!isItSelect2){
        let isThatPartSelected = true; //boolean flag variable
        //extracts the values or text content of the selected values
        childrenIds.forEach(elm => {
            if(document.getElementById(elm).value == ""){
                isThatPartSelected = false;
            }
        });

        if(isThatPartSelected){
            let partName = "";
            childrenIds.forEach(elm => {
                partName = partName + "+" + document.getElementById(elm).value;
            });
            return partName;
        }


    }else{
        //this is for select2 nodes

        let isThatPartSelected = true; //boolean flag variable
        
        if(document.getElementById(childrenIds[0]).value == ""){ //different approach here because only CPU and GPU are select 2 values. May make all select 2 nodes in the future
            isThatPartSelected = false;
        }

        let brandName = document.getElementById(childrenIds[0]).value; //this gets childrenIds @ pos 0 which is the brand name of the component

        if(isThatPartSelected){
            let select2Elm = $("#" + childrenIds[1]).select2('data');
            return  brandName + "+" + select2Elm[0].text.replaceAll(" ", "_"); //extaract the name of the selected component its an object in an array | it also returns the concatenated string of the brand + model name
        }
    }
}