import asyncio
import json
import ai_loader
import socketio

import numpy as np

import time

sio = socketio.Client()
loader = ai_loader.Loader()

@sio.event
def connect():
    print('connection established')

@sio.on('request')
def request(data):
    print('I received a message!')
    print('message received with ', data)
    game_id = data["id"]
    print(type(data["board"]))
    board = np.asarray(data["board"])
    next_turn_player = int(data["nextTurnPlayer"]["tile"])
    next_possible_turns = data["nextPossibleTurns"]

    

    from_tile = None
    for next_possible_turn in next_possible_turns:
        if from_tile == None:
            from_tile = next_possible_turn["from"]
            must_move_xy = next_possible_turn["from"].values()
        elif from_tile != next_possible_turn["from"]:
            must_move_xy = None

    print(board)
    print(next_turn_player)
    print(must_move_xy)

    move = loader.get_move(board, next_turn_player, must_move_xy)
    event = {
        "id": game_id,
        "from": {"x":move[0], "y":move[1]},
        "to": {"x":move[2], "y":move[3]}
    }
    sio.emit('return', json.dumps(event))

@sio.event
def disconnect():
    print('disconnected from server')

@sio.event
def connect_error(data):
    print("The connection failed!")

def main():
    sio.connect('http://server:4000')
    sio.emit("connectAI","LUIS_NEUMEIER")
    sio.wait()

print("Setting up Connection...")
time.sleep(1)
main()