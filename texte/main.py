import string
import numpy as np
import funcao 


RED   = "\033[1;31m"  
BLUE  = "\033[1;34m"
CYAN  = "\033[1;36m"
GREEN = "\033[0;32m"
RESET = "\033[0;0m"
BOLD    = "\033[;1m"
REVERSE = "\033[;7m"


frase = 'eu sou lindo'
chave = [[1,2],[3,4]]
chave_inv = np.linalg.inv(chave)
codigo = []
codigo_inv = []
identidade = [[1,0],[0,1]]

lista = funcao.letra_em_numero(frase)
matriz = funcao.transformar_matriz(lista)
for i in range(len(matriz)):
    matriz_chave=funcao.codifiar(chave,matriz[i])
    codigo.append(matriz_chave)

for j in range(len(matriz)):
    matriz_chave=funcao.codifiar(chave_inv,codigo[j])
    codigo_inv.append(matriz_chave)

frase_decod = funcao.formar_frase(codigo_inv)
frase_list = funcao.numero_em_letra(frase_decod)

nova_frase = "".join(frase_list)


print(CYAN + '\nPASSO A PASSO' + RESET)

print(f"\nPrimeiramente, vamos distribuir a frase '{frase}' em uma lista: {list(frase)}\n")
print(f"Agora trocamos cada caractere por seu respectivo número, obtendo assim: {lista}  ")
print(RED + "Obs:" + RESET + " a lista de caractere está no read.me desse programa\n")
n = len(matriz)
print(f"Com todos os numeros em lista, agora vamos dividi-la em n = {n} matrizes 2x2:")
print(RED + "Obs:" + RESET + f" dada uma frase com um numero de caracteres impar, o programa completa a frase com o agumento '' (espaço vazio) = 0, até o numero de carecteres total seja um divisível inteiro por 4, assim temos as {n} matrizes a seguir:\n")

funcao.imprimir_matriz(matriz)
print(f"Para codificar iremos usar a formula: " + CYAN + "M' = C * M\n" + RESET)
print("Onde: \nM' = código\nC = chave\nM = matriz frase\n")
print(CYAN + "C = " + RESET)
for x in range(2):
    print(f"{chave[x]}")
print(CYAN + "\nM =" + RESET)
funcao.imprimir_matriz(matriz)
print("Logo,\n\nM' =")
funcao.imprimir_matriz(codigo)
if n == 1:
    print(f"Pronto, agora temos um numero n = {n} de matriz que representam a frase codificada.\n")
else:
    print(f"Pronto, agora temos um numero n = {n} de matrizes que representam a frase codificada.\n")
print(CYAN + "OPERAÇÃO REVERSA\n" + RESET)
print("Agora, para decifrarmos o código usaremos a fórmula: " + CYAN + "M = (C^-1) * M'\n" + RESET)
print("Onde: \nM = matriz frase\n(C^-1) = inversa da matriz chave\nM' = código\n")
print("Para obtermos a matriz inversa da matriz chave usaremos a fórmula: " + CYAN + "(C^-1) * C = I'\n" + RESET)
print("Onde: \nC = matriz chave\n(C^-1) = inversa da matriz chave\nI = matriz identidade\n")
print("Por se uma matriz 2x2, sabemos que a identidade é: ")
for x in range(2):
    print(f"{identidade[x]}")

print("\nLogo,\n\n" + CYAN + "(C^-1) = " + RESET)
for x in range(2):
     print(f"{chave_inv[x]}")
print("\nAplicando a fórmula: " + CYAN + "M = (C^-1) * M'" + RESET + " temos;\n")
funcao.imprimir_matriz(codigo_inv)
print(RED + "Obs: " + RESET + "se observarmos, obtemos o valor da matriz original " + CYAN + "M" + RESET + " que obtemos anteriomernte;\n")
funcao.imprimir_matriz(matriz)
print("Agora, tudo que nos resta é fazer o processo contrário do início. Vamos agrupar os termos das matrizes em uma lista unica e substiruir os numeros pelos respectivos caracteres.\n")
print(lista,"\n")
print("Trocando os numeros por letras:\n")
print(frase_list)
print("\nCom isso obtemos a frase decodificada:\n")
print(nova_frase,"\n")