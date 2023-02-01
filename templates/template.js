/*
File: MultiChatBot Template JS
Author: David Sarkies
Initial: 21 January 2023
Update: 21 January 2023
Version: 0.1
*/

var discussionLength = {{length}};
var discussion = ""

{% for chat in discussion %}
     discussion+="{{chat}}<br><hr><br>";
{% endfor %}

document.getElementById("previousConvo").innerHTML = discussion;

/*
21 January 2023 - Added file to display contents of the chat.
*/