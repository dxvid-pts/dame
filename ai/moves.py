# handles possible moves on a board

import pandas as pd
import numpy as np

from copy import deepcopy as copy

tile_indexes = np.array([
    [0,0],[0,2],[0,4],[0,6],
    [1,1],[1,3],[1,5],[1,7],
    [2,0],[2,2],[2,4],[2,6],
    [3,1],[3,3],[3,5],[3,7],
    [4,0],[4,2],[4,4],[4,6],
    [5,1],[5,3],[5,5],[5,7],
    [6,0],[6,2],[6,4],[6,6],
    [7,1],[7,3],[7,5],[7,7],
    ])

class MoveFinder:

    def __init__(self, board, player_index, must_move_xy):
        self.board = board # initial board state
        self.player_index = player_index # player turn
        self.must_move_xy = must_move_xy
        self.moves_list = [] # possible moves

        self.moves = np.array([])
        # [fromx, fromy, tox, toy, capture]
        # [0    , 1    , 2  , 3  , 4      ]

        self.moves_lines = np.array([])
        # [fromx, fromy, tox, toy, capture, line, movenr, checkbool]
        # [0    , 1    , 2  , 3  , 4      , 5   , 6     , 7      ]

        
    def get_all_moves(self):
        if self.must_move_xy == None: # every piece can move
            for idx in tile_indexes:
                if self.board[idx[1],idx[0]] * self.player_index > 0:
                    self.get_possible_moves_from_tile(idx[0], idx[1])
        else: # piece that captured something has to move
            if self.board[self.must_move_xy[1],self.must_move_xy[0]] * self.player_index > 0:
                self.get_possible_moves_from_tile(self.must_move_xy[0], self.must_move_xy[1])
        
        self.moves = np.array(self.moves_list)

        if len(self.moves) == 0:
            pass
        elif np.any(self.moves[:,4]): # if the player can capture, he has to do so
            self.moves = self.moves[self.moves[:,4] == 1]
        
        return self.moves


    def get_all_moves_to_end(self):
        self.get_all_moves()

        if len(self.moves) == 0:
            return None

        
        self.moves_lines = np.hstack((self.moves, list(zip(np.arange(len(self.moves)),[0]*len(self.moves),[1]*len(self.moves))))) 
        # in order to assess moves properly, all lines have to be simulated until the end (chained moves)
        
        endboards = np.array(list(zip(np.arange(len(self.moves)),[simulate_move(copy(self.board), move) for move in self.moves])), dtype=object) # boards that will come out after the (chained) moves

        if np.any(self.moves_lines[:,4]): # any captures need to be checked for consecutive moves. If there are captures, chained moves are possible
            while len(self.moves_lines[self.moves_lines[:,7] == 1]) > 0: # more moves to be checked
                for line_idx in np.where(self.moves_lines[:,7] == 1)[0]:
                    move_to_check = self.moves_lines[line_idx,:]
                    self.moves_lines[line_idx,7] = 0 # no longer needs to be checked

                    copy_board = copy(self.board) # board on which the simulations take place
                    if move_to_check[6] != 0: # have to simulate premoves
                        for pre_move in moves_line[moves_line[:,5] == move_to_check[5]]: # all moves in same line
                            copy_board = simulate_move(copy_board, pre_move)
                    
                    more_moves_finder = MoveFinder(copy_board, self.player_index, (move_to_check[2], move_to_check[3]))
                    more_moves_finder.get_all_moves()
                    more_moves = more_moves_finder.moves # get all moves that can be done now

                    if len(more_moves) > 0: # move can be continued
                        for more_move in more_moves: # possible consecutive lines
                            new_line_index = max(self.moves_lines[:,5])+1
                            for pre_move in self.moves_lines[:, move_to_check[5]]: # append premoves of line
                                self.moves_lines.append(pre_move + [new_line_index, max([i[:,6] for i in self.moves_lines[self.moves_lines[:,5] == new_line_index]])+1, 0]) # add premoves
                            self.moves_lines.append(more_move, [new_line_index, len(self.moves_lines[self.moves_lines[:,5] == new_line_index]), 1]) # add move
                            endboards.append([new_line_index, simulate_move(copy(copy_board), more_move)]) # add board
                    
                        self.moves_lines = self.moves_lines[self.moves_lines[:,5] != move_to_check[5]] # drop old line
                        endboards = endboards[endboards[:,0] != move_to_check[5]]
                    
        return (self.moves_lines[self.moves_lines[:,6] == 0], endboards)

    def get_possible_moves_from_tile(self, x, y):
        if abs(self.board[y,x]) == 2: # dame can move in 4 directions
            self.is_move_possible(x, y, x+1, y+self.player_index)
            self.is_move_possible(x, y, x-1, y+self.player_index)
            self.is_move_possible(x, y, x+1, y-self.player_index)
            self.is_move_possible(x, y, x-1, y-self.player_index)
        else: # pawn can move in two directions
            self.is_move_possible(x, y, x+1, y+self.player_index)
            self.is_move_possible(x, y, x-1, y+self.player_index)

    def is_move_possible(self, startx, starty, finx, finy):
        if is_move_in_bounds(finx, finy):
            if self.board[finy,finx] == 0 and self.must_move_xy == None:
                self.moves_list.append([startx, starty, finx, finy, 0]) # standard move
            
            elif self.board[finy,finx] * self.player_index < 0: # enemy on tile
                finx += finx-startx
                finy += finy-starty
                if is_move_in_bounds(finx, finy):
                    if self.board[finy,finx] == 0: # next tile is free
                        self.moves_list.append([startx, starty, finx, finy, 1]) # capture move

def is_move_in_bounds(x, y):
    return (x >= 0 and x <= 7 and y >= 0 and y <= 7) # checks if tile is in bounds

def simulate_move(board, move): # static simulation function
    player_turn = board[move[1], move[0]] # piece to move
    if abs(player_turn) == 2:
        player_turn = player_turn // 2
    
    if player_turn == 0:
        # Check for Errors
        print("Player Turn cannot be 0")
        print(pd.DataFrame(board), move)
        return ""
    if board[move[3],move[2]] != 0:
        # Check for Errors
        print("move to jump to must be 0")
        print(pd.DataFrame(board), move) 
        return "" 

    board[move[3],move[2]] = board[move[1],move[0]] # move piece
    board[move[1],move[0]] = 0 # delete old piece
    
    
    if player_turn == -1 and move[3] == 0 and abs(board[move[3]][move[2]]) == 1:
        board[move[3]][move[2]] = 2 * player_turn # dame
    if player_turn == 1 and move[3] == 7 and abs(board[move[3]][move[2]]) == 1:
        board[move[3]][move[2]] = 2 * player_turn # dame
        
    if move[4]:
        if board[(move[3] + move[1])//2][(move[2] + move[0])//2] == 0:
            # Check for Errors
            print("tile to jump over cannot be 0")
            print(pd.DataFrame(board), move)  
            return ""
        board[(move[3] + move[1])//2][(move[2] + move[0])//2] = 0 # remove captures piece
    return board