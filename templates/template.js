var discussionLength = {{length}};
var discussion = ""

{% for chat in discussion %}
     discussion+="{{chat}}<br><hr><br>";
{% endfor %}

document.getElementById("previousConvo").innerHTML = discussion;