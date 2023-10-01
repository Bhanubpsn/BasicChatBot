var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var ChatContainer = document.getElementById('ChatContainer');
var httpRequest = new XMLHttpRequest();

function chatbotSendMessage() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log(httpRequest.responseText);
        if (httpRequest.status === 200) {
            
            var responseText = httpRequest.responseText;

            // Check if the response is not empty and is valid JSON
            if (responseText.trim() !== "") {
                try {
                    var result = JSON.parse(responseText);

                    var messageElement = document.createElement('div');
                    messageElement.classList.add('w-50');
                    messageElement.classList.add('float-left');
                    messageElement.classList.add('shadow-sm');
                    messageElement.style.margin = "10px";
                    messageElement.style.padding = "5px";
                    messageElement.style.right = "0";

                    messageElement.innerHTML = "<span>Bot:</span>" +
                        "<span style='margin-top:10px; padding:10px'>" + result.response_message + "</span>";

                    messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 500 });
                    ChatContainer.appendChild(messageElement);
                    ChatContainer.scrollTop = ChatContainer.scrollHeight;
                } catch (error) {
                    console.error("Error parsing JSON: " + error);
                }
            } else {
                console.error("Empty or invalid JSON response.");
            }
        } else {
            alert("Error!");
        }
    }
}




function sendMessage(messageText){

    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float:right');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";
    messageElement.style.right = "0";
    messageElement.style.backgroundColor = "rgb(194, 255, 194)";
    // messageElement.style.position = "absolute";

    messageElement.innerHTML = "<span>You: </span>"+
    "<span style="+"margin-top:10px; padding:10px>"+messageText
    +"</span>";

    messageElement.animate([{easing: "ease-in",opacity:0.4},{opacity:1}],{duration:500});

    ChatContainer.appendChild(messageElement);
    makeRequest(messageText);
}


function makeRequest(messageText){
    
    httpRequest.open('GET','chatbot.php?message='+messageText,true);
    httpRequest.send();
    httpRequest.onreadystatechange = chatbotSendMessage;
}



sendBtn.addEventListener('click', function(e){
    
    if(textbox.value == ""){
        alert("Please enter message");
    }
    else{
        let messageText = textbox.value;
        sendMessage(messageText);
        textbox.value = "";
    }

});