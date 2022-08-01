import tensorflow as tf
from tensorflow import keras
import numpy as np
import os

import moves

def board_to_input(player_turn, board_array):
    # transforms board into 1D Input tensor
    flatlist = [player_turn] + [item for sublist in board_array[1] for item in sublist]
    nparray = np.array(flatlist, dtype=float)
    indexes = [0]
    for i in range(8):
        increment = 1
        if i % 2 == 1:
            increment = 2
        indexes.append((i*8)+increment)
        indexes.append((i*8)+2+increment)
        indexes.append((i*8)+4+increment)
        indexes.append((i*8)+6+increment)

    return nparray[indexes]

class Loader:
    model = None

    def load_model(self):
        if os.path.exists("ai"):
            self.model = tf.keras.models.load_model("ai")
    
    def get_move(self, board, player_turn, must_move_xy):
        if self.model == None:
            self.load_model()

        move_finder = moves.MoveFinder(board, player_turn, must_move_xy)
        outcomes = move_finder.get_all_moves_to_end()
        possible_moves = outcomes[0]
        possible_boards = outcomes[1]
        print(possible_moves)
        
        ratings = player_turn * [self.model(np.expand_dims(board_to_input(-player_turn, board), axis=0)) for board in possible_boards]

        move = possible_moves[np.array(ratings).argmax()]
        move = move[move[6] == 0][0]

        print(move)

        return move

