import md5

door_id = 'ojvtpuvg'
index = 0
password_v1 = ''
password_v2 = [None] * len(door_id)

while len(password_v1) < len(door_id) or None in password_v2:
    hashed_index = md5.new(door_id + str(index)).hexdigest()

    if hashed_index.startswith('00000'):
        password_v1 += hashed_index[5] if len(password_v1) < len(door_id) else ''

        if hashed_index[5].isdigit():
            position = int(hashed_index[5])
            if position < len(password_v2) and password_v2[position] is None:
                password_v2[position] = hashed_index[6]

    index += 1

print('Password v1 : {}'.format(password_v1))
print('Password v2 : {}'.format(''.join(password_v2)))
