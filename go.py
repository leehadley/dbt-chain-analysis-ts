class GoBoard:
    def __init__(self, size=9):
        self.size = size
        self.board = [[' ' for _ in range(size)] for _ in range(size)]
        self.current_player = 'B'  # Black starts

    def print_board(self):
        print(' ' + ' '.join(str(i) for i in range(self.size)))
        for i in range(self.size):
            row = [str(i)] + [self.board[i][j] for j in range(self.size)]
            print(' '.join(row))

    def make_move(self, x, y):
        if self.board[x][y] != ' ':
            raise ValueError("Invalid move: Position already occupied")
        self.board[x][y] = self.current_player
        self.current_player = 'W' if self.current_player == 'B' else 'B'

    def is_game_over(self):
        # Simple check for a win condition (4 in a row)
        directions = [(0, 1), (1, 0), (1, 1), (1, -1)]
        for x in range(self.size):
            for y in range(self.size):
                if self.board[x][y] != ' ':
                    for dx, dy in directions:
                        count = 1
                        nx, ny = x + dx, y + dy
                        while 0 <= nx < self.size and 0 <= ny < self.size and self.board[nx][ny] == self.board[x][y]:
                            count += 1
                            nx, ny = nx + dx, ny + dy
                        if count >= 4:
                            return True
        return False

def main():
    board = GoBoard()
    print("Welcome to Go!")
    board.print_board()

    while not board.is_game_over():
        try:
            x, y = map(int, input(f"Player {board.current_player}, enter your move (x y): ").split())
            board.make_move(x, y)
            board.print_board()
        except ValueError as e:
            print(e)
            continue

    print(f"Player {board.current_player} wins!")

if __name__ == "__main__":
    main()