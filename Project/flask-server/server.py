from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)


# API Route
@app.route("/ping")
@cross_origin(origin="*")
def ping():
    return "hello"


@app.route("/upload")
@cross_origin(origin="*")
def upload():
    message = request.get_data().decode("utf-8")

    # do something with the message
    return "Message received"


if __name__ == "__main__":
    app.run(port=8000, debug=True)
