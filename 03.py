def count_valid_for(triangles):
    valid_count = 0

    for sides in triangles:
        sides.sort()
        if sides[0] + sides[1] > sides[2] :
           valid_count += 1
    return valid_count


with open('misc/03.txt') as file_input:
    raw_input = file_input.read()

row_triangles = [
    [int(side) for side in row.split()]
    for row in raw_input.split('\n')
    if row
]

col_triangles = []
for i in range(0, len(row_triangles), 3):
    for j in range(3):
        col_triangles.append([row_triangles[i][j],row_triangles[i+1][j],row_triangles[i+2][j]])

print('Valid triangles (rows) : {}/{}'.format(count_valid_for(row_triangles), len(row_triangles)))
print('Valid triangles (cols) : {}/{}'.format(count_valid_for(col_triangles), len(col_triangles)))
