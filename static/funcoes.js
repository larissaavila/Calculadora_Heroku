// Função que adiciona os números no Visor quando pressionado os botões
function calcNum(num) {
   if (typeof gvisor == 'undefined') {
      document.calcform.visor.value = '';
   }
   if (num == "."){
      if(typeof gponto == 'undefined' && typeof gvisor == 'undefined'){
         document.calcform.visor.value = document.calcform.visor.value + 0 + num;
         gvisor = 1;
		 gponto = 1;
      }
      else if(typeof gponto == 'undefined'){
             document.calcform.visor.value = document.calcform.visor.value + num;
             gvisor = 1;
			 gponto = 1;
      }
   }
   else{
        document.calcform.visor.value = document.calcform.visor.value + num;
        gvisor = 1;
   }
}

function maismenos(){
	if(atual == 'undefined'){
		menos = "-";
		copia = menos + document.calcform.visor.value;
		document.calcform.visor.value = copia;
		atual = 1;
	}
	else{
		copia = document.calcform.visor.value.replace("-", "");
		document.calcform.visor.value = copia;
		delete atual;
	}
}

// Função que limpa a calculadora e todas as variáveis existentes.
function calcLimpar() {
   document.calcform.visor.value = '';
   delete gvalor;
   delete goper;
   delete gvisor;
   delete gponto;
}

// Função que executa as operações básicas da calculadora
function calcOper(oper, valor1, valor2) {
   if (oper == "somar") {
      var valor = parseFloat(valor1) + parseFloat(valor2);
   } else {
      if (oper == "subtrair") {
         var valor = parseFloat(valor1) - parseFloat(valor2);
      } else {
         if (oper == "multiplicar") {
            var valor = parseFloat(valor1) * parseFloat(valor2);
         } else {
            var valor = parseFloat(valor1) / parseFloat(valor2);
         }
      }
   }

   return(valor);
}

function fat(valor1){
   var result = 1;
   if(parseFloat(valor1) >= 0){
      for(i=parseFloat(valor1); i>1; i--){
          result = result * i;
      }
   }
   else{
       result = -1;
   }
   return(result);
}

// Função do algoritmo de "passagem" das ações do usuário
function calcParse(oper) {
   var valor = document.calcform.visor.value;
   delete gvisor;
   delete gponto;
   
   if(oper=="fatorial"){
	   gvalor = fat(valor);
       if(gvalor!=-1){
		   document.calcform.visor.value = gvalor;
           delete oper;
           delete gvalor;
           return(0);
	   }
	   else{
		   calcLimpar();
	   }
   }	   

   if (typeof goper != 'undefined' && oper == 'resultado') {
      gvalor = calcOper(goper, gvalor, valor);
      document.calcform.visor.value = gvalor;
      delete oper;
      delete gvalor;
      return(0);
   }

   if (typeof gvalor != 'undefined') {
      gvalor = calcOper(goper, gvalor, valor);
      goper = oper;
      document.calcform.visor.value = gvalor;
   } else {
      gvalor = valor;
      goper = oper;
   }

}