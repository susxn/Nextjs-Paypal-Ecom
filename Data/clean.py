import json

# Leer el archivo JSON
with open('productos.json') as file:
    data = json.load(file)

# Iterar sobre los elementos y las URLs
for elemento in data['productsInfo']:
    lista_urls = elemento["Images"]
    for i in range(len(lista_urls)):
        url = lista_urls[i]
        lista_urls[i] = url.replace(" ", "%20")

# Guardar los cambios en el archivo JSON
with open('out.json', 'w') as file:
    json.dump(data, file)
