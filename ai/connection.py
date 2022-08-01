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
    # get board data
    game_id = data["id"]
    board = np.asarray(data["board"])
    next_turn_player = int(data["nextTurnPlayer"]["tile"])
    next_possible_turns = data["nextPossibleTurns"]


    from_tile = None
    for next_possible_turn in next_possible_turns:
        if from_tile == None:
            from_tile = next_possible_turn["from"]
            must_move_xy = list(next_possible_turn["from"].values())
        elif from_tile != next_possible_turn["from"]:
            must_move_xy = None

    # get move from ai
    move = loader.get_move(board, next_turn_player, must_move_xy)
    event = {
        "id": game_id,
        "from": {"x":int(move[0]), "y":int(move[1])},
        "to": {"x":int(move[2]), "y":int(move[3])}
    }
    # return data
    sio.emit('return', json.dumps(event))

@sio.event
def disconnect():
    print('disconnected from server')

@sio.event
def connect_error(data):
    print("The connection failed!")

def main():
    sio.connect('http://server:4000')
    sio.emit("connectAI","LUIS_NEUMEIER") # login with auth
    sio.wait()

print("Setting up Connection...")
time.sleep(1)
main()