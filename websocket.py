import asyncio
from email.policy import default
import json
import websockets
import requests
import base64
import datetime



USERS = set() #no duplicates
USERNAMES = set()


switch_time = datetime.datetime.now()
default_track = ""

switch_progress_time = datetime.datetime.now()
progress_ms = ""


def track_change():
    return json.dumps({"type": "track_change", "track": default_track, "progress_ms": progress_ms})

def user_change():
    arr = [] 
    for i in USERNAMES:
        arr.append(i)
    return json.dumps({"type": "user_change", "usernames": arr})


async def connection(websocket):
     global USERS, default_track, progress_ms, switch_time, switch_progress_time, USERNAMES
     try:
        USERS.add(websocket) #no duplicates sets cannot contain duplicates
        websockets.broadcast(USERS, user_change())
        
        if default_track:
            await websocket.send(track_change()) #send new user the current default track

        async for message in websocket:
            event = json.loads(message)
            if (not (event["type"] or event["track"] or event["progress_ms"])):
                return
            #print(progress_ms)
            #print(event)
           # print(default_track)
           # print(progress_ms)
            if event["type"] == "track_change":
                USERNAMES.add(event["username"])
                websockets.broadcast(USERS, user_change())
                if (event["track"] != default_track):
                    default_track = event["track"]
                    progress_ms = event["progress_ms"]  
                    current_time = datetime.datetime.now()
                    diff = current_time - switch_time
                    #print("Switch time " + switch_time.strftime("%m/%d/%Y, %H:%M:%S"))
                    #print("Current time " + current_time.strftime("%m/%d/%Y, %H:%M:%S"))
                    if (diff > datetime.timedelta(seconds=3)):
                        websockets.broadcast(USERS, track_change())
                        switch_time = datetime.datetime.now()
                if (event["track"] == default_track and abs(int(event["progress_ms"]) - int(progress_ms)) > 20000):
                    current_time = datetime.datetime.now()
                    diff = current_time - switch_progress_time
                    if (diff > datetime.timedelta(seconds=3)):
                        progress_ms = event["progress_ms"]
                        websockets.broadcast(USERS, track_change())
                        switch_progress_time = datetime.datetime.now()
                elif (event["track"] == default_track and event["progress_ms"]) > progress_ms:
                    progress_ms = event["progress_ms"]
            elif event["type"] == "leave":
               USERNAMES.remove(event["username"])
               websockets.broadcast(USERS, user_change()) 
               USERS.remove(websocket)
               print(len(USERS))
               if (len(USERS) == 0):
                default_track = ""
                progress_ms = ""
                switch_progress_time = datetime.datetime.now()
                switch_time = datetime.datetime.now()
                
               await websocket.close(1000)
            else:
                print("error unsupported action")
     finally: #connection disconnected 
        USERS.remove(websocket)
        await websocket.close(1000)
        
async def main():
    async with websockets.serve(connection, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
