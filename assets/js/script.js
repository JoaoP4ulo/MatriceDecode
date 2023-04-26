

const alfabeto = ['','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ',', '.', ' ']

const num_lista = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]

/* funções matrizes */

function criarChave(){
    let chave = [];
    let chave_l1 = [];
    let chave_l2 = [];

    let chave_1 = document.querySelector('#chave_1');
    chave_l1.push(Number(chave_1.value));
    let chave_2 = document.querySelector('#chave_2');
    chave_l1.push(Number(chave_2.value));
    let chave_3 = document.querySelector('#chave_3');
    chave_l2.push(Number(chave_3.value));
    let chave_4 = document.querySelector('#chave_4');
    chave_l2.push(Number(chave_4.value));
    
    chave.push(chave_l1);
    chave.push(chave_l2);

    return (chave);
}

function matriz_inversa(matriz) {
    let a11 = matriz[0][0];
    let a12 = matriz[0][1];
    let a21 = matriz[1][0];
    let a22 = matriz[1][1];
  
    let det = (a11 * a22) - (a12 * a21);
  
    if (det === 0) {
      return null; // a matriz não é invertível
    }
  
    let invDet = (1 / det);
  
    let a = (a22 * invDet);
    let b = (-a12 * invDet);
    let c = (-a21 * invDet);
    let d = (a11 * invDet);
    
    let inversa = [[a, b], [c, d]]
    
    return (inversa);
}




function letra_em_numero(string){

    let lista_string = String(string).split('');

    for (let i = 0; i < lista_string.length; i++){
        for (let x = 0; x < alfabeto.length; x++){
            if (lista_string[i] == alfabeto[x]){
                lista_string[i] = num_lista[x];
            }                
        } 
    }
    return lista_string;
}

function matriz_formar(matriz) {
    let matriz_int = [];
 
    for (let i = 0; i < 2; i++) {
       matriz_int.push(matriz[i]);
    }
    matriz.splice(0, 2);
    
    return [matriz_int, matriz];
}  


function transformar_matriz(lista_string){
    let matriz_int=[];
    let matriz_ext=[];

    let tam_frase = lista_string.length;

    while ((tam_frase%4) != 0){
        lista_string.push(0);
        tam_frase = lista_string.length;
    }
    let num_matriz=tam_frase/2;

    let splited = [];

    for (let i = 0; i < num_matriz; i++) {
        splited.push(lista_string.filter((_, j) => j % num_matriz === i)); /* Estudar */
    }

    while ((splited.length) != 0){
        let matriz_functions=matriz_formar(splited);
        matriz_int = matriz_functions[0];
        splited = matriz_functions[1];
        matriz_ext.push(matriz_int);
    }

    return matriz_ext;
}

function codificar(matriz_A, matriz_B) {

    let result = [[0, 0], [0, 0]];

    for (let i = 0; i < ((matriz_A || []).length); i++) {
        for (let j = 0; j < (matriz_B[0] || []).length; j++) {
            for (let k = 0; k < (matriz_B || []).length; k++) {
                result[i][j] += (matriz_A[i][k] * matriz_B[k][j]); /* Estudar Math */

            }
        }
    }
    return result;
}

function formar_frase(matriz){
    let lista=[];
    let lista_frase=[];

    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < 2; y++) {
            lista.push(matriz[x][y]);
        }
    }
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < lista.length; j++){
            lista_frase.push(lista[j][i]);
        }
    }
    return lista_frase;
}

function numero_em_letra(lista){
    for (let i = 0; i < alfabeto.length; i++){
        for (let x = 0; x < lista.length; x++){
            if (lista[x] == num_lista[i]){
                lista[x] = alfabeto[i];
            }
        }
    }
    return lista;
}

function imprimir_matriz(matriz){
    let matriz_string = "";
    let tam = (matriz.length);
    for (let j = 0; j < tam; j++){
        for (let i = 0; i < 2; i++) {
            matriz_string = matriz_string + `[${String(matriz[j][i])}]`;
      
        }
    }
    return matriz_string;
}


/* main */

const btn = document.querySelector("#send")


btn.addEventListener("click", function(e){

    document.getElementById("resultado").style.height="900px"

    e.preventDefault();

    const frase = document.querySelector('#frase');
    const chave = criarChave();
    const chave_inv = matriz_inversa(chave);
    const identidade = [[1,0],[0,1]];

    

    let codigo = [];
    let codigo_inv = [];

    let lista = letra_em_numero(frase.value);
    let matriz = transformar_matriz(lista);

    for (let i = 0; i < matriz.length; i++){
        let matriz_chave = codificar(chave,matriz[i]);
        codigo.push(matriz_chave);
    }
    for (let j = 0; j < matriz.length; j++){
        let matriz_chave = codificar(chave_inv,codigo[j]);
        codigo_inv.push(matriz_chave);
    }

    let frase_decod = formar_frase(codigo_inv);
    let frase_list = numero_em_letra(frase_decod);
    let nova_frase = frase_decod.join("");

    const n = matriz.length
    const group_frase = String(frase.value).split('')

    let chave_string = ""
    for (let i = 0; i < 2; i++) {  
        chave_string = chave_string + `[${String(chave[i])}]`;
    }

    document.getElementById("l6").innerHTML = "C = "+ chave_string


    let matriz_l7 = imprimir_matriz(matriz);
    document.getElementById("l7").innerHTML = "M = " + matriz_l7

    let matriz_l8 = imprimir_matriz(codigo);
    document.getElementById("l8").innerHTML = "M' = " + matriz_l8
    


    let matriz_l9 = imprimir_matriz(chave_inv);
    document.getElementById("l9").innerHTML = "(C^-1)' = " + matriz_l9
    
    document.getElementById("l1").innerHTML = (`Obs: dada uma frase com um numero de caracteres impar, o programa completa a frase com o agumento '' (espaço vazio) = 0, até o numero de carecteres total seja um divisível inteiro por 4, assim temos as ${n} matrizes a seguir:`)

    
    

});







