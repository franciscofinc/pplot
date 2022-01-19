var total = 0
var tabela = []
var ação
onmessage = function(e) {
    tabela = e.data.tabela
    ação = e.data.ação
    //console.log(tabela)
    total = tabela.length * tabela[0].length
    //console.log(total)
    var contador = 0
    var LDs = {}
//    aguarde_processando(true)
    setTimeout(function(){
        if (ação == "virgula") {
    var y = 0
    for (y = 0; y < tabela.length; y++) {
            var linha = tabela[y];
            var i;
            for (i = 0; i < linha.length; i++) {
                    contador++
                    //progresso(contador)
                    if (isNaN(linha[i])) {
                        //console.log("Checando linha " + y + " e coluna " + i);
                        tabela[y][i] = linha[i].replace(",",".")
                        //console.log(linha[i] + " -> separador corrigido");
                    }
            }
    }
} else if (ação == "LD"){
        var y;
        var cabeçalhos = e.data.cabeçalhos
        for (y = 0; y < tabela.length; y++) {
            var linha = tabela[y];
            var i;
            for (i = 0; i < linha.length; i++) {
                contador++
                //progresso(contador)
                if (isNaN(linha[i])) {
                    if (linha[i].indexOf("&lt;") !== -1) {
                        //console.log(linha[i] + " tem < LD");
                        var elem = cabeçalhos[i]
                        !LDs[elem] && (LDs[elem] = {})
                        LDs[elem].valor = linha[i]
                        LDs[elem].n = (LDs[elem].n || 0) + 1 
                        tabela[y][i] = linha[i].replace("&lt;","").replace(",",".")/2
                        //console.log(linha[i] + " -> LD/2");

                    }
                }
            }
        }
}
    postMessage({
        progresso: contador/total*100,
        status: "finalizado",
        tabela: tabela,
        LDs: LDs
                })
    
 //   aguarde_processando(false)  
        
    },20)
}

function progresso(n) {
     if ((n % 50) == 0) {
            console.log(n/total)
            postMessage({progresso: n/total*100})
        }   
}
    

