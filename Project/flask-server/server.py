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
    system = {
        "role": "system",
        "content": """
            You are a world-class professional DM for D&D 5e and an award-winning fantasy author.
            You will help me create a character sheet / backstory for me for a new D&D character.
            I'll provide you my cover letter and I want you to create keywords that would describe my personality
            if I was a character D&D. We’ll be using the standard D&D 5th edition rules for character creation found
            in the Player’s Handbook as well as Mythic Odysseys of Theros and Xanathar’s Guide to Everything.
        """,
    }

    prompt = """
        Review the professional cover letter below and create a list of approximately 20 keywords that describe the 
        user who submitted the cover letter. These keywords will be used to help the user come up with a
        D&D character sheet, including class, abilities, proficiencies, and skills.
        
        As such, generate keywords that are fantasy related. Do not generate keywords that are technical (e.g., XGBoost)
        
        You must respond with just a list each keyword in one sentence seperated by commas, like the example below. Do not do anything else:
        Intelligent, Witty, Fast Thinker, ...
        
        The cover letter content is below:
        
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[system, {"role": "user", "content": prompt + message["data"]}],
        temperature=0.7,
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content


@app.route("/description", methods=["POST"])
@cross_origin(origin="*")
def description():
    system = {
        "role": "system",
        "content": """
            You are a world-class professional DM for D&D 5e and an award-winning fantasy author.
            You will help me create a character sheet / backstory for me for a new D&D character.
            I'll provide you my cover letter and several keywords I want you to emphasize in the character.
            We’ll be using the standard D&D 5th edition rules for character creation found in the Player’s Handbook
            as well as Mythic Odysseys of Theros and Xanathar’s Guide to Everything.
        """,
    }
    message = request.get_json()

    prompt = {
        "role": "user",
        "content": """
            Only provide me a character sheet. Do not give any explanation as to who you are.
            My cover letter is below:
            
        """
        + message["coverLetter"]
        + """
        
        and the keywords I want you to focus on when creating my character's personality are:
        
        """
        + message["keyWords"],
    }
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[system, prompt],
        temperature=0.7,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(port=8000, debug=True)
