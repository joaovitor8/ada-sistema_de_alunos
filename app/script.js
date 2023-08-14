let DBalunos = [
  {
    codigo: "1",
    nome: "Joao",
    sobrenome: "Vitor",
    email: "joao@gmail.com",
    notas: [7, 6, 9, 3],
    ativo: false
  },

  {
    codigo: "2",
    nome: "Gabriel",
    sobrenome: "Santos",
    email: "gabriel@gmail.com",
    notas: [8, 2, 6, 5],
    ativo: true
  },

  {
    codigo: "3",
    nome: "Eduarda",
    sobrenome: "Rocha",
    email: "eduarda@gmail.com",
    notas: [9, 4, 7, 8],
    ativo: true
  },

  {
    codigo: "4",
    nome: "Maria",
    sobrenome: "Silva",
    email: "maria@gmail.com",
    notas: [10, 5, 8, 6],
    ativo: false
  },
]

// ---

const CadastrarAluno = () => {
  try {
    const inputCodigo = document.getElementById("codigo")
    const inputNome = document.getElementById("nome")
    const inputSobrenome = document.getElementById("sobrenome")
    const inputEmail = document.getElementById("email")

    const codigo = inputCodigo.value.trim().toLowerCase()
    const nome = inputNome.value.trim().toLowerCase()
    const sobrenome = inputSobrenome.value.trim().toLowerCase()
    const email = inputEmail.value.trim().toLowerCase()

    const inputNota1 = document.getElementById("nota1")
    const inputNota2 = document.getElementById("nota2")
    const inputNota3 = document.getElementById("nota3")
    const inputNota4 = document.getElementById("nota4")

    const nota1 = inputNota1.value
    const nota2 = inputNota2.value
    const nota3 = inputNota3.value
    const nota4 = inputNota4.value

    if (!codigo || !nome || !sobrenome || !email || !nota1 || !nota2 || !nota3 || !nota4) {
      throw new Error("Por favor preencha todos os campos corretamente!")
    }

    const filtrar = DBalunos.filter(function(a) { return a.codigo === codigo || a.email === email })
    if (filtrar.length > 0) {
      throw new Error("Código ou Email já existe")
    }

    if (isNaN(nota1)) {
      throw new Error("Nota 1 não é um número válido")
    }
    if (isNaN(nota2)) {
      throw new Error("Nota 2 não é um número válido")
    }
    if (isNaN(nota3)) {
      throw new Error("Nota 3 não é um número válido")
    }
    if (isNaN(nota4)) {
      throw new Error("Nota 4 não é um número válido")
    }
    const listaNotas = [Number(nota1), Number(nota2), Number(nota3), Number(nota4)]

    const ativo = Boolean(document.getElementById("ativo").value)

    DBalunos.push({codigo, nome, sobrenome, email, notas: listaNotas, ativo})
    alert("Aluno cadastrado com sucesso!")

    inputCodigo.value = ""
    inputNome.value = ""
    inputSobrenome.value = ""
    inputEmail.value = ""
    inputNota1.value = ""
    inputNota2.value = ""
    inputNota3.value = ""
    inputNota4.value = ""

    inputCodigo.focus()

    console.log(DBalunos)
  } catch (error) {
    alert(`Erro ao tentar cadastrar: ${error}`)
  }
}

// ---

const BuscarAluno = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo === buscar })
  
    ValidacaoDados(buscar, filtrar)

    Mostrar(filtrar)
    
  } catch (error) {
    alert(`Erro ao tentar buscar aluno: ${error}`)
  }
}

const RemoverAluno = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo !== buscar })
  
    ValidacaoDados(buscar, filtrar)

    DBalunos = filtrar
    alert("Aluno removido com sucesso!")

  } catch (error) {
    alert(`Erro ao tentar remover aluno: ${error}`)
  }
}

const CalcularMedia = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo === buscar })
  
    ValidacaoDados(buscar, filtrar)

    const media = (filtrar[0].notas[0] + filtrar[0].notas[1] + filtrar[0].notas[2] + filtrar[0].notas[3]) / 4
    alert(`A media desse aluno é ${media}`)

  } catch (error) {
    alert(`Erro ao tentar calcular media: ${error}`)
  }
}

const AtivarAluno = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo === buscar })

    ValidacaoDados(buscar, filtrar)

    if (filtrar[0].ativo === true) {
      throw new Error("Aluno já ativo")
    }
    
    filtrar[0].ativo = true
    alert("Aluno ativado com sucesso!")

  } catch (error) {
    alert(`Erro ao tentar ativar aluno: ${error}`)
  }
}

const DesativarAluno = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo === buscar })
    
    ValidacaoDados(buscar, filtrar)

    if (filtrar[0].ativo === false) {
      throw new Error("Aluno já desativado")
    }

    filtrar[0].ativo = false
    alert("Aluno desativado com sucesso!")

  } catch (error) {
    alert(`Erro ao tentar desativar aluno: ${error}`)
  }
}

// ---

const AlunosCadastrados = () => {
  try {
    const msn = "alunos"

    NaoHaAlunos(DBalunos, msn)

    Mostrar(DBalunos)

  } catch (error) {
    alert(`Erro ao tentar ver alunos: ${error}`)
  }
}

const AlunosAtivos = () => {
  try {
    const filtrar = DBalunos.filter(function(a) { return a.ativo === true })

    const msn = "alunos ativos"

    NaoHaAlunos(filtrar, msn)
  
    Mostrar(filtrar)

  } catch (error) {
    alert(`Erro ao tentar ver alunos ativos: ${error}`)
  }
}

const AlunosInativos = () => {
  try {
    const filtrar = DBalunos.filter(function(a) { return a.ativo === false })

    const msn = "alunos desativados"

    NaoHaAlunos(filtrar, msn)
  
    Mostrar(filtrar)

  } catch (error) {
    alert(`Erro ao tentar ver alunos desativados: ${error}`)
  }
}

const AlunosAprovados = () => {
  try {
    const filtrar = DBalunos.filter(function(a) {
      const media = (a.notas[0] + a.notas[1] + a.notas[2] + a.notas[3]) / 4
      return media >= 6
    })

    const msn = "alunos aprovados"

    NaoHaAlunos(filtrar, msn)

    Mostrar(filtrar)

  } catch (error) {
    alert(`Erro ao tentar ver alunos aprovados: ${error}`)
  }
}

const AlunosReprovados = () => {
  try {
    const filtrar = DBalunos.filter(function(a) {
      const media = (a.notas[0] + a.notas[1] + a.notas[2] + a.notas[3]) / 4
      return media < 6
    })

    const msn = "alunos reprovados"

    NaoHaAlunos(filtrar, msn)

    Mostrar(filtrar)

  } catch (error) {
    alert(`Erro ao tentar ver alunos reprovados: ${error}`)
  }
}

// ---

const ValidacaoDados = (buscar, filtrar) => {
  if (!buscar || filtrar.length === 0) {
    throw new Error("Aluno não encontrado")
  }
}

const NaoHaAlunos = (alunos, msn) => {
  if (alunos.length === 0) {
    throw new Error(`Não há ${msn} no Banco de Dados`)
  }
}

const Mostrar = (alunos) => {
  document.getElementById("alunos").innerHTML = alunos.map((a) => (
    `
    <tr>
      <td>${a.codigo}</td>
      <td>${a.nome} ${a.sobrenome}</td>
      <td>${a.email}</td>
      <td>${a.notas[0]}, ${a.notas[1]}, ${a.notas[2]}, ${a.notas[3]}</td>
      <td>${a.ativo}</td>
    </tr>
    `
  )).join("")
}

AlunosCadastrados()

