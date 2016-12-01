def multiply_tuple(original_tuple, factor):
    return (original_tuple[0] * factor, original_tuple[1] * factor)

def merge_tuples(a, b):
    return (a[0] + b[0], a[1] + b[1])

UP = (0,1)
DOWN = (0,-1)
LEFT = (-1,0)
RIGHT = (1,0)

with open('misc/01.txt') as file_input:
    raw_input = file_input.read()

instructions = raw_input.split(', ')

current_position = (0, 0)
current_direction = UP

for instruction in instructions:
    distance = int(instruction[1:])

    if current_direction == UP:
        new_direction = LEFT if instruction[0] == 'L' else RIGHT
    elif current_direction == DOWN:
        new_direction = RIGHT if instruction[0] == 'L' else LEFT
    elif current_direction == RIGHT:
        new_direction = UP if instruction[0] == 'L' else DOWN
    elif current_direction == LEFT:
        new_direction = DOWN if instruction[0] == 'L' else UP

    current_position = merge_tuples(current_position, multiply_tuple(new_direction, distance))

    current_direction = new_direction

print("The distance is : {}".format(abs(current_position[0]) + abs(current_position[1])))
