import openai
import time

openai.api_key = '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' 

model_engine_01 = "text-davinci-002"
model_engine_02 = "text-davinci-003"
prompt = "How did Barrack Obama transform the United States. Please respond and ask a question"

def get_input():

    return input("Enter your query: ")

def get_response(prompt,model_engine):

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

def display_response(response):

    file = open("Character.txt","w")

    for completion in response:
        print(completion.text)
        file.write(completion.text)

    file.close()

response = get_response(prompt,model_engine_01)
display_response(response)

for x in range(10):

    time.sleep(5)

    response = "{}. Please respond and ask a question.".format(response)
    response = get_response(response,model_engine_02)
    display_response(response)

    time.sleep(5)

    response = "{}. Please respond and ask a question.".format(response)
    response = get_response(response,model_engine_02)
    display_response(response)
    
