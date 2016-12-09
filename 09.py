import re

def decrypt(input, is_recursive):
    decompressed_length = 0
    marker_regex = r'\(\d+x\d+\)'

    while input:
        if input[0] == '(':
            marker = re.findall(marker_regex, input)[0]
            sequence, times = [int(digit) for digit in re.findall(r'\d+', marker)]
            marker_length = len(marker)
            data_sequence = input[marker_length:marker_length + sequence]

            sub_markers = re.findall(marker_regex, data_sequence)
            if sub_markers and is_recursive:
                decompressed_length += decrypt(data_sequence, is_recursive) * times
            else:
                decompressed_length += len(data_sequence) * times
            input = input[marker_length + sequence:]
        else:
            decompressed_length += 1
            input = input[1:]
    return decompressed_length

with open('misc/09.txt') as file_input:
    input = file_input.readline().rstrip()

print('Length of decompressed input v1 : {}'.format(decrypt(input, False)))
print('Length of decompressed input v2 : {}'.format(decrypt(input, True)))
