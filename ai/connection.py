import asyncio

import websockets
import json

import ai_loader

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
        async with websockets.serve(self.handler, "localhost", 4000):
            await asyncio.Future()  # run forever
