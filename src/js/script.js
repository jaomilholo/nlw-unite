// array
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 0)
  },
  {
    nome: "Myke Brito",
    email: "myk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 18, 15),
    dataCheckIn: new Date(2024, 2, 23, 9, 30)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 17, 45),
    dataCheckIn: new Date(2024, 2, 24, 14, 20)
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 14, 10),
    dataCheckIn: new Date(2024, 2, 26, 18, 45)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 12, 30),
    dataCheckIn: new Date(2024, 2, 28, 10, 0)
  },
  {
    nome: "Maria Sousa",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 10, 20),
    dataCheckIn: null
  },
  {
    nome: "João Lima",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 8, 45),
    dataCheckIn: new Date(2024, 2, 29, 12, 30)
  },
  {
    nome: "Renata Costa",
    email: "renata@gmail.com",
    dataInscricao: new Date(2024, 2, 16, 7, 0),
    dataCheckIn: null
  },
  {
    nome: "Gabriel Santos",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 5, 30),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar check-in</button>
    `
  }

  return `   
  <tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
      <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
// estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

// pegar informação do HTML

// subistituir informação do HTMl
document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }


  participantes = [participante, ...participantes]
  atualizarLista(participantes) 

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn= (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}

