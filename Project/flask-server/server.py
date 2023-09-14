import openai
from dotenv import dotenv_values
from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)
config = dotenv_values(".env")
openai.api_key = config.get("SECRET_KEY")


# API Route
@app.route("/ping")
@cross_origin(origin="*")
def ping():
    return f'API_KEY = { "SECRET_KEY" }'


@app.route("/upload", methods=["POST"])
@cross_origin(origin="*")
def upload():
    message = request.get_json()
    prompt = """
        Review the professional cover letter below and create a list of approximately 20 keywords that describe the 
        user who submitted the cover letter. These keywords will be used to help the user come up with a
        D&D character sheet, including class, abilities, proficiencies, and skills.
        
        As such, generate keywords that are fantasy related. Do not generate keywords that are technical (e.g., XGBoost)
        
        List each keyword in one sentence seperated by commas,like the example below:
        Intelligent, Witty, Fast Thinker, ...
        
        The cover letter content is below:
        
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt + message["data"]}],
        temperature=0.7,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(port=8000, debug=True)
