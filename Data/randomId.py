import json
import random
import string

# Ruta del archivo JSON de entrada
input_file = "productos.json"

# Ruta del archivo JSON de salida
output_file = "productos_id.json"

# Generar una ID aleatoria
def generate_random_id():
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for _ in range(8))

# Leer el archivo JSON de entrada
with open(input_file, 'r') as file:
    data = json.load(file)

# Asignar una ID aleatoria a cada producto
for product in data['productsInfo']:
    product['_id'] = generate_random_id()

# Guardar los datos actualizados en el nuevo archivo JSON
with open(output_file, 'w') as file:
    json.dump(data, file, indent=4)

print("Se ha generado el nuevo archivo JSON con las IDs aleatorias.")
