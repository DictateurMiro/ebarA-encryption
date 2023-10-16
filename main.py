import random
import string

# Fonction pour générer une clé aléatoire
def generate_key():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

# Fonction pour créer un dictionnaire de chiffrement à partir d'une clé
def create_cipher_dict(key):
    random.seed(key)e
    all_chars = string.ascii_letters + string.digits + string.punctuation + ' '
    char_to_num = {}
    for char in all_chars:
        char_to_num[char] = random.randint(0, 999999)
    return char_to_num

# Fonction pour chiffrer le texte
def encrypt_text(text, cipher_dict):
    text = text.lower().replace(' ', 'X')
    encrypted_text = ' '.join(str(cipher_dict[char]) for char in text)
    return encrypted_text

# Fonction pour déchiffrer le texte
def decrypt_text(encrypted_text, cipher_dict):
    num_to_char = {v: k for k, v in cipher_dict.items()}
    decrypted_text = ''.join(num_to_char[int(num)] for num in encrypted_text.split())
    decrypted_text = decrypted_text.replace('X', ' ')
    return decrypted_text

# Interface utilisateur
while True:
    action = input('Voulez-vous encoder ou décoder du texte? (encoder/décoder/quit): ')
    if action == 'quit':
        break
    key = input('Entrez une clé ou laissez vide pour en générer une aléatoire: ')
    if not key:
        key = generate_key()
        print(f'Clé générée: {key}')
    cipher_dict = create_cipher_dict(key)
    if action == 'encoder':
        text_to_encrypt = input('Entrez le texte à encoder: ')
        encrypted_text = encrypt_text(text_to_encrypt, cipher_dict)
        print(f'Texte chiffré: {encrypted_text}')
    elif action == 'décoder':
        encrypted_text = input('Entrez le texte chiffré à décoder: ')
        decrypted_text = decrypt_text(encrypted_text, cipher_dict)
        print(f'Texte déchiffré: {decrypted_text}')

# Program made with my brain for prompt and ChatGpt 
