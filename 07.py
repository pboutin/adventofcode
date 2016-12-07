import re

def parse(ip):
    supernets = [re.sub(r'[\[\]]', '', seq) for seq in re.findall(r'([a-z]+\[|[a-z]+$)', ip)]
    hypernets = [re.sub(r'[\[\]]', '', seq) for seq in re.findall(r'\[[a-z]+\]', ip)]
    return (supernets, hypernets)

def is_abba(seq):
    for i in range(len(seq) - 3):
        if seq[i] == seq[i+3] and seq[i+1] == seq[i+2] and seq[i] != seq[i+1]:
            return True
    return False

def get_aba_list_for(seq):
    return [
        seq[i:i+3]
        for i in range(len(seq) - 2)
        if seq[i] == seq[i+2] and seq[i] != seq[i+1]
    ]

def ip_supports_tls(ip):
    supernets, hypernets = parse(ip)
    is_tls = False
    for seq in supernets:
        if is_abba(seq):
            is_tls = True
    for seq in hypernets:
        if is_abba(seq):
            is_tls = False
    return is_tls

def ip_supports_ssl(ip):
    supernets, hypernets = parse(ip)
    for supernet in supernets:
        for aba in get_aba_list_for(supernet):
            bab = aba[1] + aba[0] + aba[1]
            for hypernet in hypernets:
                if bab in hypernet:
                    return True
    return False

with open('misc/07.txt') as file_input:
    raw_input = file_input.read()

ips = [ip for ip in raw_input.split('\n') if ip]

tls_ips = [ip for ip in ips if ip_supports_tls(ip)]
ssl_ips = [ip for ip in ips if ip_supports_ssl(ip)]

print('{} ips supports TLS over {}'.format(len(tls_ips), len(ips)))
print('{} ips supports SSL over {}'.format(len(ssl_ips), len(ips)))
