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
];

const getElementValue = (elementId) => {
  const element = document.getElementById(elementId);
  return element.value.trim().toLowerCase();
};

const validateNumber = (value) => {
  if (isNaN(value)) {
    throw new Error(`"${value}" não é um número válido`);
  }
};

const CadastrarAluno = () => {
  try {
    const codigo = getElementValue("codigo");
    const nome = getElementValue("nome");
    const sobrenome = getElementValue("sobrenome");
    const email = getElementValue("email");

    const notas = [];
    for (let i = 1; i <= 4; i++) {
      const nota = document.getElementById(`nota${i}`).value;
      validateNumber(nota);
      notas.push(Number(nota));
    }

    const ativo = Boolean(document.getElementById("ativo").value);

    const existingAluno = DBalunos.find((aluno) => aluno.codigo === codigo || aluno.email === email);
    if (existingAluno) {
      throw new Error("Código ou Email já existe");
    }

    DBalunos.push({ codigo, nome, sobrenome, email, notas, ativo });
    alert("Aluno cadastrado com sucesso!");

    const inputIds = ["codigo", "nome", "sobrenome", "email", "nota1", "nota2", "nota3", "nota4"];
    inputIds.forEach((inputId) => {
      document.getElementById(inputId).value = "";
    });

    document.getElementById("codigo").focus();

    console.log(DBalunos);
  } catch (error) {
    alert(`Erro ao tentar cadastrar: ${error}`);
  }
};

// ---

const buscarAluno = (filtro) => {
  return DBalunos.filter((aluno) => aluno.codigo === filtro);
};

const ValidacaoDados = (buscar, filtrar) => {
  if (!buscar) {
    throw new Error("Por favor, insira um código de aluno válido!");
  }
  if (filtrar.length === 0) {
    throw new Error("Nenhum aluno encontrado com o código fornecido.");
  }
};

const BuscarAluno = () => {
  try {
    const buscar = getElementValue("buscar-aluno");
    const filtrar = buscarAluno(buscar);
    ValidacaoDados(buscar, filtrar);
    Mostrar(filtrar);
  } catch (error) {
    alert(`Erro ao tentar buscar aluno: ${error}`);
  }
};

const RemoverAluno = () => {
  try {
    const buscar = getElementValue("buscar-aluno");
    const filtrar = buscarAluno(buscar);
    ValidacaoDados(buscar, filtrar);
    DBalunos = DBalunos.filter((aluno) => aluno.codigo !== buscar);
    alert("Aluno removido com sucesso!");
  } catch (error) {
    alert(`Erro ao tentar remover aluno: ${error}`);
  }
};

const CalcularMedia = () => {
  try {
    const buscar = getElementValue("buscar-aluno");
    const filtrar = buscarAluno(buscar);
    ValidacaoDados(buscar, filtrar);
    const notas = filtrar[0].notas;
    const media = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
    alert(`A média desse aluno é ${media.toFixed(2)}`);
  } catch (error) {
    alert(`Erro ao tentar calcular média: ${error}`);
  }
};

const AlterarStatusAluno = (ativar) => {
  try {
    const buscar = getElementValue("buscar-aluno");
    const filtrar = buscarAluno(buscar);
    ValidacaoDados(buscar, filtrar);

    if (filtrar[0].ativo === ativar) {
      const status = ativar ? "ativo" : "desativado";
      throw new Error(`Aluno já está ${status}`);
    }

    filtrar[0].ativo = ativar;
    const acao = ativar ? "ativado" : "desativado";
    alert(`Aluno ${acao} com sucesso!`);
  } catch (error) {
    alert(`Erro ao tentar ${ativar ? "ativar" : "desativar"} aluno: ${error}`);
  }
};

const AtivarAluno = () => {
  AlterarStatusAluno(true);
};

const DesativarAluno = () => {
  AlterarStatusAluno(false);
};

// ---

const filtrarAlunos = (filtroFunction, mensagem) => {
  try {
    const filtrar = DBalunos.filter(filtroFunction);

    NaoHaAlunos(filtrar, mensagem);

    Mostrar(filtrar);
  } catch (error) {
    alert(`Erro ao tentar ver alunos: ${error}`);
  }
};

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

const AlunosCadastrados = () => {
  const msn = "alunos";
  filtrarAlunos(() => true, msn);
};

const AlunosAtivos = () => {
  const msn = "alunos ativos";
  filtrarAlunos((aluno) => aluno.ativo === true, msn);
};

const AlunosInativos = () => {
  const msn = "alunos desativados";
  filtrarAlunos((aluno) => aluno.ativo === false, msn);
};

const AlunosAprovados = () => {
  const msn = "alunos aprovados";
  filtrarAlunos((aluno) => {
    const media = aluno.notas.reduce((sum, nota) => sum + nota, 0) / aluno.notas.length;
    return media >= 6;
  }, msn);
};

const AlunosReprovados = () => {
  const msn = "alunos reprovados";
  filtrarAlunos((aluno) => {
    const media = aluno.notas.reduce((sum, nota) => sum + nota, 0) / aluno.notas.length;
    return media < 6;
  }, msn);
};

// 260 linhas - meu codigo
// 190 linhas - gpt
//  70 linhas
