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

@app.route('/')
def main():
	return render_template("index.html")

@app.route('/get_response', methods=['POST'])
def get_response():

	data = request.data
	response = ai_response(json.loads(data.decode('utf-8')))

	reply = ""

	for completion in response:
		reply += completion.text


	return make_response(jsonify({"response":reply}),200)

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