import pandas as pd
import moves
from copy import deepcopy as copy

def get_starting_board():
    board = [
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0]*8,
        [0]*8,
        [0,-1,0,-1,0,-1,0,-1],
        [-1,0,-1,0,-1,0,-1,0],
        [0,-1,0,-1,0,-1,0,-1]
    ]

    board_df = pd.DataFrame(board, dtype=int)
    return board

def get_active_board():
    board = [
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,0,0,0,0,1,0],
        [0,0,0,1,0,1,0,0],
        [0,0,-1,0,-1,0,0,0],
        [0,0,0,-1,0,0,0,-1],
        [-1,0,-1,0,-1,0,-1,0],
        [0,-1,0,-1,0,-1,0,-1]
    ]

    board_df = pd.DataFrame(board, dtype=int)
    return board

def get_fighting_board():
    board = [
        [0,0,1,0,1,0,0,0],
        [0,1,0,1,0,1,0,1],
        [1,0,0,0,0,0,1,0],
        [0,0,0,1,0,1,0,0],
        [0,0,-1,0,-1,0,0,0],
        [0,0,0,-1,0,0,0,-1],
        [-1,0,-1,0,-1,0,-1,0],
        [0,-1,0,-1,0,-1,0,-1]
    ]

    board_df = pd.DataFrame(board, dtype=int)
    return board

def b88():
    board = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,-1,0,-1,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]

    board_df = pd.DataFrame(board, dtype=int)
    return board

def b1():
    board = [
        [1,0,1,0,1,0,0,0],
        [0,1,0,0,0,1,0,0],
        [0,0,0,0,1,0,1,0],
        [0,1,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,-1],
        [-1,0,-1,0,-1,0,-1,0],
        [0,-1,0,-1,0,-1,0,-1]
    ]

    board_df = pd.DataFrame(board, dtype=int)
    return board

class Board:
    board = None
    player_turn = None
    must_move_xy = None

    def __init__(self, board_setup=get_starting_board):
        self.board = board_setup()
        self.player_turn = -1

    def set_board(self, board_setup=get_starting_board):
        self.board = board_setup()
        self.player_turn = -1

    def print_board(self):
        pass
        #print(pd.DataFrame(self.board))

    def make_move(self, move):
        if (self.board[move.from_y][move.from_x] == 0 or self.board[move.to_y][move.to_x] != 0 or (move.capture and self.board[(move.to_y + move.from_y)//2][(move.to_x + move.from_x)//2] == 0)):
            print_board()
            print(move)
            print("MESSED UP")
            input()
        self.board[move.to_y][move.to_x] = self.board[move.from_y][move.from_x]
        self.board[move.from_y][move.from_x] = 0
        self.must_move_xy = None
        
        
        if self.player_turn == -1 and move.to_y == 0 and abs(self.board[move.to_y][move.to_x]) == 1:
            self.board[move.to_y][move.to_x] = 2 * self.player_turn
        if self.player_turn == 1 and move.to_y == 7 and abs(self.board[move.to_y][move.to_x]) == 1:
            self.board[move.to_y][move.to_x] = 2 * self.player_turn
            
        if move.capture:
            # remove captured piece
            self.board[(move.to_y + move.from_y)//2][(move.to_x + move.from_x)//2] = 0
            self.player_turn = -self.player_turn # set player_turn
            self.must_move_xy = [move.to_x, move.to_y]
        self.player_turn = -self.player_turn
    
    def get_board(self):
        return copy(self.board)
    
    def is_won(self):
        if len(moves.get_all_moves(self.get_board(), self.player_turn, None)) == 0:
            #print(moves.get_all_moves(self.get_board(), self.player_turn, None))
            return -self.player_turn
        return 0
    
def simulate_move(board, move):
    player_turn = abs(board[move.from_y][move.from_x])
    if player_turn == 0:
        print("Player Turn cannot be 0")
        print(pd.DataFrame(board), move)
        return ""
    if board[move.to_y][move.to_x] != 0:
        print("move to jump to must be 0")
        print(pd.DataFrame(board), move) 
        return "" 
    board[move.to_y][move.to_x] = board[move.from_y][move.from_x]
    board[move.from_y][move.from_x] = 0
    
    
    if player_turn == -1 and move.to_y == 0 and abs(board[move.to_y][move.to_x]) == 1:
        board[move.to_y][move.to_x] = 2 * player_turn
    if player_turn == 1 and move.to_y == 7 and abs(board[move.to_y][move.to_x]) == 1:
        board[move.to_y][move.to_x] = 2 * player_turn
        
    if move.capture:
        if board[(move.to_y + move.from_y)//2][(move.to_x + move.from_x)//2] == 0:
            print("tile to jump over cannot be 0")
            print(pd.DataFrame(board), move)  
            return ""
        board[(move.to_y + move.from_y)//2][(move.to_x + move.from_x)//2] = 0
    return board