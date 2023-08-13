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
]

// ---

const CadastrarAluno = () => {
  try {
    const codigo = document.getElementById("codigo").value.trim().toLowerCase()
    const nome = document.getElementById("nome").value.trim().toLowerCase()
    const sobrenome = document.getElementById("sobrenome").value.trim().toLowerCase()
    const email = document.getElementById("email").value.trim().toLowerCase()
    
    const nota1 = document.getElementById("nota1").value
    const nota2 = document.getElementById("nota2").value
    const nota3 = document.getElementById("nota3").value
    const nota4 = document.getElementById("nota4").value

    if (!codigo || !nome || !sobrenome || !email || !nota1 || !nota2 || !nota3 || !nota4) {
      throw new Error("Por favor preencha todas as informações!")
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
  
    Validacao(buscar, filtrar)

    Mostrar(filtrar)
    
  } catch (error) {
    alert(`Erro ao tentar buscar aluno: ${error}`)
  }
}

const RemoverAluno = () => {
  try {
    const buscar = document.getElementById("buscar-aluno").value
    const filtrar = DBalunos.filter(function(a) { return a.codigo !== buscar })
  
    Validacao(buscar, filtrar)

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
  
    Validacao(buscar, filtrar)

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

  Validacao(buscar, filtrar)

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
    
    Validacao(buscar, filtrar)

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

const Validacao = (buscar, filtrar) => {
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
  document.getElementById("visualizar").innerHTML = alunos.map((a) => (
    `
      <div class="aluno">
        <p>Codigo: ${a.codigo}</p>
        <p>Nome: ${a.nome} ${a.sobrenome}</p>
        <p>Email: ${a.email}</p>
        <p>Notas: ${a.notas[0]} ${a.notas[1]} ${a.notas[2]} ${a.notas[3]}</p>
        <p>Ativo: ${a.ativo}</p>
      </div>
    `
  )).join("")
}

AlunosCadastrados()