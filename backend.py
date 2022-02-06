from email.quoprimime import body_check
import requests
import base64
from flask import Flask, request
from urllib.parse import urlencode
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)

cors = CORS(app) 


base_url_accounts = "https://accounts.spotify.com/"
base_url = "https://api.spotify.com/v1/"
redirect_uri = "http://99.235.37.139:3000/callback"
client_id = "30a0e6ce238246da96657ace1b3b180f"
client_secret = "c946aae691d14adcb0ca553656bcb87b"



basic = client_id + ":" + client_secret
base64_byte = base64.urlsafe_b64encode(basic.encode("utf-8"))
basic_64 = str(base64_byte, "utf-8")


error_obj = {"error": True}
def refresh_access(refresh_token):
    url = base_url_accounts + "api/token"

    
    response = requests.post(url, headers={"Authorization": f"Basic {basic_64}"}, data={"grant_type": "refresh_token", "refresh_token": refresh_token})

    if (response.status_code != 200):
        return None
    
    return response.json()["access_token"] 


@app.route("/api/getAuthLink", methods=["GET"])
def getAuthLink():
    url = base_url_accounts + "authorize?"
    url += urlencode(
                {
               "response_type": 'code',
               "client_id": client_id,
               "scope": "user-read-playback-state user-modify-playback-state user-read-private user-read-email",
               "redirect_uri": redirect_uri,
               })
    return json.dumps({"url": url})

@app.route("/api/callback", methods=["POST"])
def callback():
    

    code = json.loads(request.data)
    code = code["code"]
    if (not code):
        return json.dumps(error_obj)

    url = base_url_accounts + "api/token"


    response = requests.post(url, data={"grant_type": "authorization_code", "code": code, "redirect_uri": redirect_uri}, headers={"Authorization": f"Basic {basic_64}"})

    if (response.status_code != 200):
        return json.dumps(error_obj)
    
    refresh_token = response.json()["refresh_token"]


    access_token = refresh_access(refresh_token)
    if (not access_token):
        return json.dumps(error_obj)

    return json.dumps({"access_token": access_token, "refresh_token": refresh_token})


@app.route("/api/get_user", methods=["POST"])
def get_user():
    print(request.data)
    refresh_token = json.loads(request.data)
    refresh_token = refresh_token["refresh_token"]
    access_token = refresh_access(refresh_token)

    if(not access_token):
        return json.dumps(error_obj)
    url = base_url + "me"
    response = requests.get(url, headers={"Authorization": f"Bearer {access_token}"})

    return json.dumps(response.json())
    

@app.route("/api/get_current_song", methods=["POST"])
def get_current_song():


    #print(request.data)
    refresh_token = json.loads(request.data)
    refresh_token = refresh_token["refresh_token"]
    access_token = refresh_access(refresh_token)
    if (not access_token):
        return json.dumps(error_obj)
    url = base_url + "me/player"
    response = requests.get(url, headers={"Authorization": f"Bearer {access_token}"})


    #print("THE RESPONSE: " + response.text)
    return json.dumps(response.json())

@app.route("/api/change_song", methods=["POST"])
def change_song():
    data = json.loads(request.data)
   # print(data)
    # if (not "track" in data or not "progress_ms" in data or not "refresh_token" in data):
    #    return json.dumps({"error": "1"})
    #     return json.dumps(error_obj)

    refresh_token = data["refresh_token"]
    access_token = refresh_access(refresh_token)
    if (not access_token):
        return json.dumps({"error": "2"})
        return json.dumps(error_obj)
    track = data["track"]
    progress_ms = data["progress_ms"]

    url = base_url + "me/player/play"



    data = {
        "uris": [track],
        "position_ms": progress_ms
    }

    data = json.dumps(data)
    response = requests.put(url, headers={"Authorization": f"Bearer {access_token}"}, data=data)


    data = {
  "position_ms": progress_ms
    }

    url = base_url + "me/player/seek"
    response = requests.put(url, headers={"Authorization": f"Bearer {access_token}"}, data=data)

    return json.dumps({"status": True})
if __name__ == "__main__":
    app.run(debug=True, port=8888, host="0.0.0.0")