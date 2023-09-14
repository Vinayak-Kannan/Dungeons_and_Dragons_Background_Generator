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
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message["data"]}],
        temperature=0.7,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(port=8000, debug=True)
