async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = '';
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("CEP INVÁLIDO");
    }
    var endereco = document.getElementById('endereco');
    var cidade = document.getElementById('cidade');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = consultaCEPConvertida.localidade;
    endereco.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP Inválido. tente novamente!</p>`;
  }
}

// para fazer várias consultas de ceps diferentes
// let ceps = ['60545045', '01001000', '01001001', '60546000'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));


// todas essas linhas foram simplificadas na função acima
// .then(resposta => resposta.json())
// .then(r => {
//   if (r.erro) {
//     throw Error('Esse cep não existe!')
//   } else {
//     console.log(r)
//   }
// })
// .catch(erro => console.log(erro))
// .finally(mensagem => console.log('Processamento concluído!'));

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));