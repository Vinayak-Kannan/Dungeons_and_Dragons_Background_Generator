from dotenv import dotenv_values
from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)
config = dotenv_values(".env")
SECRET_KEY = config.get('SECRET_KEY')


# API Route
@app.route("/ping")
@cross_origin(origin="*")
def ping():
    return f'API_KEY = { SECRET_KEY }'


@app.route("/upload")
@cross_origin(origin="*")
def upload():
    message = request.get_data().decode("utf-8")

    # do something with the message
    return "Message received"


if __name__ == "__main__":
    app.run(port=8000, debug=True)
