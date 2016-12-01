def merge_tuples(a, b):
    return (a[0] + b[0], a[1] + b[1])

def format(position):
    return "{} ({})".format(str(position), abs(position[0]) + abs(position[1]))

UP = (0,1)
DOWN = (0,-1)
LEFT = (-1,0)
RIGHT = (1,0)

with open('misc/01.txt') as file_input:
    raw_input = file_input.read()

instructions = raw_input.split(', ')

current_position = (0, 0)
current_direction = UP
position_history = [current_position]
intersection_found = False

for instruction in instructions:
    if current_direction == UP:
        current_direction = LEFT if instruction[0] == 'L' else RIGHT
    elif current_direction == DOWN:
        current_direction = RIGHT if instruction[0] == 'L' else LEFT
    elif current_direction == RIGHT:
        current_direction = UP if instruction[0] == 'L' else DOWN
    elif current_direction == LEFT:
        current_direction = DOWN if instruction[0] == 'L' else UP

    for step in range(int(instruction[1:])):
        current_position = merge_tuples(current_position, current_direction)

        if not intersection_found:
            if current_position in position_history:
                print("The first place your visited twice is : {}".format(format(current_position)))
                intersection_found = True
            else:
                position_history.append(current_position)

print("The total distance is : {}".format(format(current_position)))
