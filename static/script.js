/*
File: MultiChatBot js files
Author: David Sarkies
Initial: 21 January 2023
Update: 21 January 2023
Version: 0.1
*/

function getResponse() {
    input = document.getElementById('input');
    buttel = document.getElementById('buttEl');
    disp = document.getElementById('display')
    const para = document.createElement("p");
    para.innerText = input.value;
    input.remove();
    buttel.remove();
    disp.appendChild(para);
    getBotResponse(input.value);
}

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
        disp = document.getElementById('display')
        const resp_para = document.createElement("p");
        const newInput = document.createElement("input")
        const newButton = document.createElement("button");
        newInput.type = "text";
        newInput.id = "input";
        newButton.id = "buttEl";
        newButton.innerText = "Ask";
        newButton.addEventListener("click",getResponse);
        resp_para.innerText = data.response
        disp.appendChild(resp_para)
        disp.appendChild(newInput);
        disp.appendChild(newButton);
        newInput.focus()
        newInput.select()
    })
}

/*
21 January 2023 - Created file
                  Added js function
                  Added AJAX call to back end
*/