import asyncio

import json

import ai_loader

import socketio

import time

sio = socketio.Client()

@sio.event
def connect():
    sio.emit('connectAI', "LUIS_NEUMEIER")
    print('connection established')

@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit('ConnectAI', "TEST")

@sio.event
def disconnect():
    print('disconnected from server')

def main():
    sio.connect('http://server:4000')
    sio.wait()

print("Setting up Connection...")
time.sleep(3)
asyncio.run(main())


class Connection:

    def __init__(self):
        asyncio.run(self.main())

    async def handler(self, websocket):
        login = {"connectAI":"LUIS_NEUMEIER"}
        await websocket.send(json.dumps(login))
        
        while True:
            message = await websocket.recv()
            print(message)

            # get request_id, strength, board, player_turn, must_move_xy
            move = ai_loader.get_move(board, player_turn, must_move_xy, strength)

            event = {
                "id": request_id,
                "strength": strength,
                "from_x": move[0],
                "from_y": move[1],
                "to_x": move[2],
                "to_x": move[3],
            }
            await websocket.send(json.dumps(event))


    async def main(self):
        await websockets.send()
        async with websockets.serve(self.handler, "localhost", 8001):
            await asyncio.Future()


#c1 = Connection()
    