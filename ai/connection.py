import asyncio

import websockets
import json

import ai_loader

import socketio

sio = socketio.AsyncClient()

@sio.event
async def connect():
    print('connection established')

@sio.event
async def my_message(data):
    print('message received with ', data)
    await sio.emit('my response', {'response': 'my response'})

@sio.event
async def disconnect():
    print('disconnected from server')

async def main():
    await sio.connect('http://localhost:4000')
    await sio.wait()


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

print("Setting up Connection...")
#c1 = Connection()
    