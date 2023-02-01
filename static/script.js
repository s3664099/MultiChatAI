/*
File: MultiChatBot js files
Author: David Sarkies
Initial: 21 January 2023
Update: 1 February 2023
Version: 0.2
*/

//Main function to get a response from a query, and redraws the page
function getResponse() {
    input = document.getElementById('input');
    addLines(input.value);
    removeButton();
    getBotResponse(input.value);
}

//Places the input/response in a paragraph
function addLines(input,disp) {

    discussionLength++;
    const lineBreak = document.createElement("br");
    const lineAcross = document.createElement("hr");
    disp = document.getElementById('display')
    const para = document.createElement("p");
    para.innerText = input;
    disp.appendChild(para);
    disp.appendChild(lineBreak);
    disp.appendChild(lineAcross);
    disp.appendChild(lineBreak);

}

//Gets the response from a query
function getBotResponse(input) {
    fetch ('/get_response', {
        method: "POST",
        body: JSON.stringify(input),
    }).then (function(response){

        //An error has occured
        if (response.status !== 200) {
              console.log('looks like there is a problem. Status code :'+response.status);
              return "Unable to get Response";
        } 

        //Converts the response into JSON
        return response.json();
    }).then(function(data) {

        //Redraws the html page and adds the queries and responses above
        disp = document.getElementById('display')
        addLines(data.response,disp);
        addButton(disp);

    })
}

//Executes a javascript function every 5 seconds
//Retrives updates from the backend, to see if somebody has updated it.
function getUpdates() {
    
    
    fetch('/get_update', {
        method:"POST",
        body: JSON.stringify(discussionLength)
    }).then(function(response){
        if (response.status !== 200) {
              console.log('looks like there is a problem. Status code :'+response.status);
              return "Unable to get Response";
        }

        return response.json();
    }).then(function(data) {

        disp = document.getElementById('display')

        //Checks if any further conversations have been sent.
        if (data.response.length>0) {

            //Updates the screen
            removeButton();
            for (var x=0;x<data.response.length;x++) {
                addLines(data.response[x],disp);
            }
            addButton(disp);
        }

        data.response = [];

    });

    //Calls the function five seconds later
    setTimeout(getUpdates,5000);
}

//Removes the button and the input
function removeButton() {

    input = document.getElementById('input');
    buttel = document.getElementById('buttEl');
    input.remove();
    buttel.remove();

}

//Adds a new button and input
function addButton(disp) {

    const newInput = document.createElement("input")
    const newButton = document.createElement("button");
    newInput.type = "text";
    newInput.id = "input";
    newButton.id = "buttEl";
    newButton.innerText = "Ask";
    newButton.addEventListener("click",getResponse);
    disp.appendChild(newInput);
    disp.appendChild(newButton);
    newInput.focus();
    newInput.select();    
}

getUpdates();

/*
21 January 2023 - Created file
                  Added js function
                  Added AJAX call to back end
1 February 2023 - Added second AJAX call to see if there have been any updates
*/