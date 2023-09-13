import openai
from dotenv import dotenv_values
from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)
config = dotenv_values(".env")
openai.api_key = config.get('SECRET_KEY')


# API Route
@app.route("/ping")
@cross_origin(origin="*")
def ping():
    return f'API_KEY = { "SECRET_KEY" }'


@app.route("/upload")
@cross_origin(origin="*")
def upload():
    message = request.get_data().decode("utf-8")
    response = openai.Completion.create(
        engine="davinci",
        prompt=message,
        temperature=0.7,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(port=8000, debug=True)
