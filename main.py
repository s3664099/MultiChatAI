"""
File: MultiChatBot main program
Author: David Sarkies
Initial: 18 January 2023
Update: 21 January 2023
Version: 0.3
"""

from flask import Flask, render_template, request, session, jsonify, make_response
import json
import openai
import os

app = Flask(__name__,
	static_folder = 'static')
openai.api_key = os.environ.get("OPENAI_API_KEY")
app.secretkey = os.environ.get("FLASK_API_KEY")
model_engine = "text-davinci-002"
discussion = []

#Sets up template
@app.route('/')
def main():

	previous_discussion = []

	for x in discussion:
		previous_discussion.append(x.replace("\n","<br>"))

	return render_template("index.html",discussion=previous_discussion,length=len(discussion))

#AJAX call to send a query to the AI and return a response
@app.route('/get_response', methods=['POST'])
def get_response():

	reply = ""
	data = request.data
	query = json.loads(data.decode('utf-8'))

	discussion.append(query)
	response = ai_response(query)

	for completion in response:
		reply += completion.text

	discussion.append(reply)

	return make_response(jsonify({"response":reply}),200)

@app.route('/get_update',methods=['POST'])
def get_update():
	data = request.data
	length = json.loads(data.decode('utf-8'))
	updated_discussion = []

	if (int(length)<len(discussion)):
		for x in range(length,len(discussion)):
			updated_discussion.append(discussion[x])

	return make_response(jsonify({"response":updated_discussion}),200)

def ai_response(prompt):

    num_completions = 3

    temperature = 0.7

    completions = openai.Completion.create(
        engine = model_engine,
        prompt = prompt,
        max_tokens = 1024,
        stop = None,
        temperature = temperature
    )

    return completions.choices


"""
18 Jan 2023 - Created File. Set up flask
21 Jan 2023 - Added route for AJAX Call. Removed api keys and used environment variables
"""