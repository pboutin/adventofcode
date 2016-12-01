with open('misc/01.txt') as file_input:
    raw_input = file_input.read()

directions = raw_input.split(', ')

x_pos = 0
y_pos = 0

for direction in directions:
    distance = int(direction[1:])

    x_pos += distance * (-1 if direction[0] == 'R' else 1)

    # Plan rotation
    old_y_pos = y_pos
    if direction[0] == 'R':
        y_pos = x_pos
        x_pos = -1 * old_y_pos
    else:
        y_pos = -1 * x_pos
        x_pos = old_y_pos

print("The distance is : {}".format(abs(x_pos) + abs(y_pos)))
