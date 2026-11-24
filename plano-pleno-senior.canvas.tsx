import {
  Button,
  Callout,
  Checkbox,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  UsageBar,
  useCanvasAction,
  useCanvasState,
} from "cursor/canvas";
import type { Color } from "cursor/canvas";

type DayPlan = {
  id: string;
  title: string;
  outcome: string;
  study: string;
  exercise: string;
  close: string;
  iso: string;
  weekday: string;
  videoMin: number;
  theoryMin: number;
  exerciseMin: number;
  videoCourse: string;
  videoUrl: string;
  videoHint: string;
};

type WeekPlan = {
  n: number;
  block: string;
  color: Color;
  level: string;
  title: string;
  days: DayPlan[];
  checkpoint?: string;
};

type Parts = { video: boolean; theory: boolean; exercise: boolean };

const EMPTY: Parts = { video: false, theory: false, exercise: false };

const BLOCKS: { id: string; name: string; color: Color; days: number }[] = [
  {
    "id": "b1",
    "name": "Java e objetos",
    "color": "blue",
    "days": 36
  },
  {
    "id": "b2",
    "name": "API Spring",
    "color": "purple",
    "days": 48
  },
  {
    "id": "b3",
    "name": "Serviços e build",
    "color": "green",
    "days": 48
  },
  {
    "id": "b4",
    "name": "Docker e entrega",
    "color": "cyan",
    "days": 12
  },
  {
    "id": "b5",
    "name": "Mensageria",
    "color": "yellow",
    "days": 12
  },
  {
    "id": "b6",
    "name": "Kubernetes e nuvem",
    "color": "orange",
    "days": 18
  },
  {
    "id": "b7",
    "name": "Arquitetura",
    "color": "pink",
    "days": 18
  },
  {
    "id": "b8",
    "name": "Prova do sênior",
    "color": "red",
    "days": 12
  },
  {
    "id": "b9",
    "name": "Para o especialista",
    "color": "gray",
    "days": 12
  }
];

const WEEKS: WeekPlan[] = [
  {
    "n": 1,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "O projeto e o primeiro tipo",
    "days": [
      {
        "id": "w1d1",
        "title": "JDK, Maven e o repositório",
        "outcome": "Ter o projeto agenda-clinica compilando na sua máquina, fora do repositório do trabalho.",
        "study": "Java 21 é a linha que você usa daqui pra frente. O requisito da vaga pede Java 8 ou mais: streams, Optional e java.time entram nas próximas semanas. O projeto já nasce na versão atual. Maven baixa dependência e roda teste. O repositório é pessoal, para não misturar com o pep.",
        "exercise": "Instale JDK 21, Maven e Git. Crie a pasta agenda-clinica fora do pep. git init, pacote com.estudo.agenda, uma classe Main que imprime a versão do Java. Commit: inicia o projeto da agenda.",
        "close": "Qual comando compila e qual comando roda?",
        "iso": "2026-11-23",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 02: Instalando o Java no Windows",
        "videoUrl": "https://www.youtube.com/watch?v=ddhH97IPrFY",
        "videoHint": "O link abre este vídeo, no minuto zero. Dura cerca de 28 min. Assista 25 min: download do JDK e o comando java -version. Maven fica no exercício."
      },
      {
        "id": "w1d2",
        "title": "Classe Paciente",
        "outcome": "Criar um paciente com nome, CPF e data de nascimento, todos obrigatórios no construtor.",
        "study": "Classe é o molde. Objeto é um paciente concreto. Nome em branco não constrói objeto. Os três dados entram pelo construtor.",
        "exercise": "Crie a classe Paciente. No Main, instancie três pacientes e imprima nome e CPF. Recuse nome vazio no construtor.",
        "close": "O que acontece se eu precisar de um paciente sem CPF?",
        "iso": "2026-11-24",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 24: Classes e atributos",
        "videoUrl": "https://www.youtube.com/watch?v=Gq1BS63pkRA",
        "videoHint": "O link abre o vídeo da aula 24, no minuto zero. Dura cerca de 17 min. Assista inteiro. O tempo que sobrar dos 25 min fica na teoria, antes de criar a classe Paciente."
      },
      {
        "id": "w1d3",
        "title": "Encapsulamento",
        "outcome": "Impedir que o restante do código altere o CPF depois de criado.",
        "study": "Campo private só a própria classe mexe. Getter expõe leitura. Setter só existe quando a mudança é uma regra, com nome de negócio. CPF não muda: não há setCpf.",
        "exercise": "Feche os campos. Ofereça leitura. Troca de nome passa por alterarNome, que recusa vazio. Atribuição direta fora da classe deixa de compilar.",
        "close": "Qual dado deste paciente é identidade e qual dado pode mudar?",
        "iso": "2026-11-25",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 32: Encapsulamento, getters e setters",
        "videoUrl": "https://www.youtube.com/watch?v=vKif9IxYTLY",
        "videoHint": "O link abre o vídeo da aula 32, no minuto zero. Dura cerca de 10 min. Assista inteiro. O restante do tempo de vídeo fica na teoria de campo private."
      },
      {
        "id": "w1d4",
        "title": "Lista em memória",
        "outcome": "Cadastrar, listar e buscar paciente por CPF numa lista.",
        "study": "ArrayList guarda a ordem de cadastro. Busca por CPF varre a lista. Dois CPFs iguais fazem o cadastro mentir.",
        "exercise": "Crie CadastroPacientes com adicionar, listar e buscarPorCpf. Recuse CPF repetido. Cadastre três, busque um que existe e um que não existe.",
        "close": "O que o buscar devolve quando ninguém tem aquele CPF?",
        "iso": "2026-11-26",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 19: Vetores",
        "videoUrl": "https://www.youtube.com/watch?v=HxRb5KLofcI",
        "videoHint": "O link abre o vídeo da aula 19, no minuto zero. Dura cerca de 19 min. Assista inteiro. O ArrayList do exercício parte dessa ideia de guardar vários itens."
      },
      {
        "id": "w1d5",
        "title": "Exceção de domínio",
        "outcome": "Falhar com uma exceção sua, com mensagem que diz qual regra quebrou.",
        "study": "Exceção unchecked estende RuntimeException e serve para regra violada. O nome da classe é a regra: PacienteInvalidoException, CpfDuplicadoException. A mensagem carrega o CPF.",
        "exercise": "Lance essas duas exceções nos pontos de ontem. No Main, capture e imprima a mensagem. O programa explica o erro em vez de estourar em outro ponto.",
        "close": "Quem deve capturar essa exceção: o cadastro ou quem chamou o cadastro?",
        "iso": "2026-11-27",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 07: Entendendo os erros",
        "videoUrl": "https://www.youtube.com/watch?v=NoEoOaTSFMo",
        "videoHint": "O link abre o vídeo da aula 07, no minuto zero. Assista 25 min. A exceção com o seu nome (PacienteInvalidoException) é o exercício, em seguida."
      },
      {
        "id": "w1d6",
        "title": "Reescrever o cadastro",
        "outcome": "Refazer o cadastro sem olhar o código antigo e comparar os dois.",
        "study": "Reescrever mostra o que ficou na memória e o que só parecia claro com o arquivo aberto.",
        "exercise": "Mova o pacote atual para um branch de backup. Na linha principal, reescreva Paciente e CadastroPacientes. Rode os quatro casos: criar, nome vazio, CPF duplicado, buscar ausente. Anote no README a diferença entre as duas versões.",
        "close": "Qual versão você explicaria para outra pessoa?",
        "iso": "2026-11-28",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Loiane Groner, aula 25: Classes e métodos simples",
        "videoUrl": "https://www.youtube.com/watch?v=-t_c6F_Uoeg",
        "videoHint": "O link abre o vídeo da aula 25, no minuto zero. Dura cerca de 8 min. Assista inteiro e use o resto do tempo para reescrever o cadastro sem olhar o código antigo."
      }
    ],
    "checkpoint": "Quatro casos rodam e você explica, sem abrir o código, onde o CPF é validado."
  },
  {
    "n": 2,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "Objetos que se compõem",
    "days": [
      {
        "id": "w2d1",
        "title": "Consulta composta",
        "outcome": "Modelar consulta como paciente, profissional, início e fim.",
        "study": "Composição é ter outro objeto dentro. Herança fica para quando o filho é de fato do tipo do pai. Profissional e paciente podem ter nome sem precisar herdar de uma Pessoa agora.",
        "exercise": "Crie Profissional (nome, especialidade, conselho) e Consulta com paciente, profissional, início e fim. A consulta não nasce sem os dois.",
        "close": "O que a consulta tem, e o que ela não é?",
        "iso": "2026-11-30",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      },
      {
        "id": "w2d2",
        "title": "Status com regra",
        "outcome": "Impedir pulo de status: marcada vai para cancelada ou realizada, e para por aí.",
        "study": "Enum é um conjunto fechado. A regra de transição mora num método só. Texto solto espalha erro de digitação.",
        "exercise": "Crie StatusConsulta: MARCADA, CANCELADA, REALIZADA. Método podeIrPara. cancelar e realizar respeitam a regra e lançam StatusInvalidoException quando ela recusa.",
        "close": "Qual transição o sistema recusa?",
        "iso": "2026-12-01",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      },
      {
        "id": "w2d3",
        "title": "Notificador",
        "outcome": "Avisar a marcação por dois canais sem a consulta saber se é e-mail ou SMS.",
        "study": "Interface é o contrato notificar(Consulta). E-mail e SMS, por enquanto, só imprimem. Quem monta o objeto escolhe a implementação.",
        "exercise": "Crie a interface e as duas classes. Ao marcar, chame o notificador recebido no construtor. Troque a implementação no Main e veja a mensagem mudar sem mexer na consulta.",
        "close": "Quem escolhe o canal: a consulta ou quem monta o objeto?",
        "iso": "2026-12-02",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      },
      {
        "id": "w2d4",
        "title": "Uma responsabilidade por classe",
        "outcome": "Separar validação, cadastro de paciente e marcação de consulta.",
        "study": "Classe com mais de um motivo para mudar mistura regra. Validador olha CPF e intervalo. Cadastro guarda paciente. Agenda marca usando os dois.",
        "exercise": "Quebre o que estiver junto. Cada classe cabe numa frase. O Main só liga as peças.",
        "close": "Qual classe mudaria se a regra do CPF mudasse?",
        "iso": "2026-12-03",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      },
      {
        "id": "w2d5",
        "title": "Record para o resumo",
        "outcome": "Devolver um resumo imutável da consulta, separado do objeto que ainda muda de status.",
        "study": "Record é um tipo imutável: o compilador gera construtor, igualdade e leitura. Serve para carregar dado pronto. A consulta continua classe, porque o status muda.",
        "exercise": "Crie ConsultaResumo como record. A agenda devolve resumo. O objeto interno fica escondido.",
        "close": "Por que o resumo pode ser record e a consulta, não?",
        "iso": "2026-12-04",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      },
      {
        "id": "w2d6",
        "title": "Oito regras no README",
        "outcome": "Escrever as regras de negócio da semana e apontar a classe de cada uma.",
        "study": "Regra escrita é a regra que vira teste. O README da agenda começa por essas frases.",
        "exercise": "Liste oito regras. Ao lado, a classe responsável. Desenhe em texto: Agenda usa Cadastro, Validador e Notificador.",
        "close": "Tem regra no Main que deveria estar numa classe?",
        "iso": "2026-12-05",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Loiane Groner, aulas 36, 44 e 31 (tem-um, interface, encapsulamento)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Uma aula por vez. Se acabar antes do tempo, pare e anote a regra no README."
      }
    ]
  },
  {
    "n": 3,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "Java moderno na agenda",
    "days": [
      {
        "id": "w3d1",
        "title": "Lambda",
        "outcome": "Filtrar pacientes por um critério passado de fora.",
        "study": "Lambda é uma função curta entregue a outro método. O cadastro não precisa conhecer cada filtro. Method reference cabe quando a lambda só chama um método.",
        "exercise": "Adicione filtrar no cadastro, recebendo um critério. Filtre por inicial do nome. Escreva uma versão com lambda.",
        "close": "O filtro é dado de quem chama ou regra fixa do cadastro?",
        "iso": "2026-12-07",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      },
      {
        "id": "w3d2",
        "title": "Stream",
        "outcome": "Produzir a agenda do dia agrupada por especialidade, sem laço manual.",
        "study": "filter escolhe, map transforma, collect junta. groupingBy agrupa. A lista original permanece.",
        "exercise": "Com cinco consultas fictícias, produza: só as de amanhã, os nomes dos profissionais, e um mapa de especialidade para consultas. Imprima os três.",
        "close": "A stream alterou a lista de origem?",
        "iso": "2026-12-08",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      },
      {
        "id": "w3d3",
        "title": "Optional",
        "outcome": "Buscar paciente sem devolver null.",
        "study": "Optional deixa a ausência explícita no retorno da busca. orElseThrow usa a sua exceção. Optional não vira campo de classe.",
        "exercise": "buscarPorCpf devolve Optional. O caso ausente vira exceção na borda, com o CPF na mensagem.",
        "close": "Onde o Optional acaba e a exceção começa?",
        "iso": "2026-12-09",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      },
      {
        "id": "w3d4",
        "title": "java.time e conflito",
        "outcome": "Recusar consulta cujo intervalo cruza outra do mesmo profissional.",
        "study": "LocalDateTime basta para um consultório se você documentar o fuso. Intervalos cruzam quando um começa antes do fim do outro e termina depois do início do outro. Encostar no limite, sem sobrepor, pode ser aceito.",
        "exercise": "Implemente a checagem de cruzamento. Casos: encosta no limite (aceito), sobrepõe cinco minutos (recusado), fim antes do início (recusado).",
        "close": "Dois profissionais no mesmo horário: a agenda aceita?",
        "iso": "2026-12-10",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      },
      {
        "id": "w3d5",
        "title": "Ordem do dia",
        "outcome": "Listar as consultas de um profissional em ordem de início.",
        "study": "Comparator define a ordem. A lista que a recepção lê sai ordenada. Empate de horário não deve existir; se existir, o id desempata.",
        "exercise": "agendaDoDia devolve a lista ordenada. Insira três horários fora de ordem e confira a saída.",
        "close": "A ordenação é responsabilidade de quem devolve o dia?",
        "iso": "2026-12-11",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      },
      {
        "id": "w3d6",
        "title": "Dia integrado",
        "outcome": "Marcar um dia inteiro com stream, Optional e conflito funcionando juntos.",
        "study": "O que só funciona no exemplo isolado aparece quando o roteiro junta tudo.",
        "exercise": "Roteiro no Main: cadastra pacientes e um profissional, marca quatro horários, o quinto conflita, um CPF não existe, a listagem sai ordenada. Copie a saída no README.",
        "close": "Qual regra falhou quando você juntou tudo?",
        "iso": "2026-12-12",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Loiane Groner, aulas de coleções e o restante você pratica no projeto",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Procure a aula de ArrayList ou foreach. O tempo que sobrar fica na teoria de stream e Optional, que é do seu código."
      }
    ]
  },
  {
    "n": 4,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "Domínio fechado",
    "days": [
      {
        "id": "w4d1",
        "title": "Lista que não vaza",
        "outcome": "Devolver a agenda do dia sem deixar o chamador alterar a lista interna.",
        "study": "Quem recebe a lista interna pode esvaziar a agenda. List.copyOf corta esse caminho.",
        "exercise": "agendaDoDia devolve cópia imutável. Tente alterar a lista devolvida e confirme a falha. A agenda interna segue intacta.",
        "close": "O chamador precisa de uma lista mutável em algum ponto?",
        "iso": "2026-12-14",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      },
      {
        "id": "w4d2",
        "title": "Factory da consulta",
        "outcome": "Criar consulta só por Consulta.marcar, com as regras de data já aplicadas.",
        "study": "Construtor público demais deixa nascer consulta inválida. O método estático com nome de negócio concentra a criação. O construtor fica restrito.",
        "exercise": "Consulta.marcar valida fim depois do início. Status nasce MARCADA.",
        "close": "Qual objeto inválido ficou impossível de construir?",
        "iso": "2026-12-15",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      },
      {
        "id": "w4d3",
        "title": "Relógio injetado",
        "outcome": "Testar consulta no passado sem depender da hora real da máquina.",
        "study": "Clock é a hora atual recebida de fora. Em produção, o relógio do sistema. No exercício, um relógio fixo. Regra que chama now direto não volta no tempo.",
        "exercise": "A agenda recebe Clock no construtor. Com o relógio fixo em 2026-11-17T15:00, recuse início anterior e aceite início posterior.",
        "close": "Onde a hora é decidida: dentro da regra ou fora?",
        "iso": "2026-12-16",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      },
      {
        "id": "w4d4",
        "title": "Pacotes",
        "outcome": "Separar domínio e o programa que liga as peças.",
        "study": "O pacote dominio não importa o programa de linha de comando. O pacote app tem o Main.",
        "exercise": "Mova as classes. Nenhum import do app aparece dentro do domínio.",
        "close": "Qual classe ficou no lugar errado?",
        "iso": "2026-12-17",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      },
      {
        "id": "w4d5",
        "title": "Igualdade",
        "outcome": "Duas consultas com o mesmo id são a mesma consulta, mesmo que o status mude.",
        "study": "equals e hashCode andam juntos e usam o id. Sem isso, um conjunto não reconhece a consulta que você considera a mesma.",
        "exercise": "Implemente os dois por id. Coloque duas instâncias de mesmo id num conjunto e veja o tamanho 1.",
        "close": "Status entra na igualdade?",
        "iso": "2026-12-18",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      },
      {
        "id": "w4d6",
        "title": "Domínio sem Main gordo",
        "outcome": "O Main só monta objetos e chama a agenda. Toda regra está no domínio.",
        "study": "Se ainda há if de negócio no Main, a semana não fechou.",
        "exercise": "Esvazie o Main até caber numa tela. Rode de novo o roteiro da semana anterior. Atualize as regras do README.",
        "close": "Abra o Main: tem alguma regra de negócio ali?",
        "iso": "2026-12-19",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Loiane Groner, aula 29 (construtores) e aula 43 (equals, classe Object)",
        "videoUrl": "https://www.youtube.com/@loianegroner/videos",
        "videoHint": "Assista o trecho do dia e volte para o Clock e os pacotes na teoria."
      }
    ],
    "checkpoint": "O domínio marca, recusa conflito e devolve o dia ordenado, com a hora vindo de um Clock."
  },
  {
    "n": 5,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "JUnit 5",
    "days": [
      {
        "id": "w5d1",
        "title": "O primeiro teste",
        "outcome": "Rodar mvn test com um teste que recusa nome vazio.",
        "study": "JUnit 5 marca o método com @Test. O nome do método diz a regra e o resultado. O Surefire executa a suíte.",
        "exercise": "Adicione junit-jupiter no pom, escopo test. Escreva teste de nome vazio e de CPF com tamanho errado. mvn test verde.",
        "close": "O teste chama o Main ou chama a classe direto?",
        "iso": "2026-12-21",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      },
      {
        "id": "w5d2",
        "title": "Transição de status",
        "outcome": "Cobrir as transições permitidas e uma proibida.",
        "study": "Cada teste prepara, age e confere. assertThrows espera a exceção da transição ilegal.",
        "exercise": "Quatro testes: cancelar marcada, realizar marcada, realizar de novo, cancelar a já realizada. Os dois últimos esperam a exceção.",
        "close": "Qual transição ainda está sem teste?",
        "iso": "2026-12-22",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      },
      {
        "id": "w5d3",
        "title": "Teste parametrizado",
        "outcome": "Um método de teste, vários intervalos inválidos.",
        "study": "ParameterizedTest evita copiar o mesmo teste. A entrada que falhou aparece no relatório.",
        "exercise": "Parametrize fim antes do início, duração zero e início no passado, com Clock fixo.",
        "close": "Se um caso falhar, você sabe qual entrada foi?",
        "iso": "2026-12-23",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      },
      {
        "id": "w5d4",
        "title": "BeforeEach",
        "outcome": "Montar profissional, paciente e agenda antes de cada teste, sem copiar.",
        "study": "BeforeEach cria objetos novos. O teste seguinte não vê alteração do anterior.",
        "exercise": "Crie AgendaTest com dois profissionais e três pacientes preparados. Cada teste parte desse zero.",
        "close": "Um teste altera a agenda: o próximo vê essa alteração?",
        "iso": "2026-12-24",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      },
      {
        "id": "w5d5",
        "title": "Cobrir a agenda",
        "outcome": "Testar marcar, conflito, cancelar e listar o dia.",
        "study": "Cada regra do README vira pelo menos um teste, com o caso que aceita e o caso que recusa.",
        "exercise": "Escreva esses testes. Se um falhar, conserte o domínio quando o teste estiver dizendo a regra certa.",
        "close": "Qual regra do README ainda não tem teste?",
        "iso": "2026-12-25",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      },
      {
        "id": "w5d6",
        "title": "Quebrar de propósito",
        "outcome": "Ver um teste falhar por um defeito real e voltar ao verde.",
        "study": "Teste que nunca ficou vermelho pode estar afirmando o óbvio. O defeito introduzido mostra que a suíte enxerga a regra.",
        "exercise": "Comente a checagem de conflito, rode mvn test, leia a falha, restaure. Anote o nome do teste que pegou o defeito. Meta: 15 testes ou mais, verdes no fim.",
        "close": "Se eu apagar essa checagem de novo daqui a um mês, qual teste grita?",
        "iso": "2026-12-26",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Um crash course de JUnit 5",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Escolha um vídeo de até 30 min em inglês ou português. Anote o título no README. Não assista playlist inteira hoje."
      }
    ],
    "checkpoint": "mvn test verde, com conflito, status e CPF cobertos."
  },
  {
    "n": 6,
    "block": "Java e objetos",
    "color": "blue",
    "level": "Pleno",
    "title": "Mockito",
    "days": [
      {
        "id": "w6d1",
        "title": "Repositório e implementação em memória",
        "outcome": "A agenda depender de uma interface, com uma implementação em memória.",
        "study": "RepositorioConsulta tem salvar e listar por profissional e dia. A agenda deixa de guardar a lista ela mesma. Essa interface é o que o mock substitui amanhã e o que o banco substitui mais adiante.",
        "exercise": "Extraia a interface e a classe em memória. Os testes da semana anterior continuam verdes, ainda sem mock.",
        "close": "A agenda conhece a lista ou conhece a interface?",
        "iso": "2026-12-28",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      },
      {
        "id": "w6d2",
        "title": "Mock",
        "outcome": "Substituir o repositório por um dublê que devolve o que você mandar.",
        "study": "when/thenReturn define a resposta. A agenda é real. Você não cria mock da classe que está testando.",
        "exercise": "Adicione o Mockito. Um teste: o repositório devolve uma consulta já marcada e a agenda recusa o horário que cruza.",
        "close": "O que é real neste teste e o que é dublê?",
        "iso": "2026-12-29",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      },
      {
        "id": "w6d3",
        "title": "Verify",
        "outcome": "Conferir que salvar foi chamado uma vez ao marcar, e nenhuma vez no conflito.",
        "study": "verify confirma a interação que importa. Confirmar cada chamada interna amarra o teste em detalhe.",
        "exercise": "No caso feliz, uma chamada a salvar. No conflito, nenhuma.",
        "close": "Se a regra recusou, o repositório pode ter gravado?",
        "iso": "2026-12-30",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      },
      {
        "id": "w6d4",
        "title": "Mock do Clock",
        "outcome": "Fixar o horário com Clock fixo e, ao lado, com mock, e ficar com o mais legível.",
        "study": "Clock fixo já resolve este problema com um objeto simples. O mock mostra a alternativa. Fique com o que você ainda lê daqui a três meses.",
        "exercise": "Escreva as duas versões do teste de consulta no passado. Apague a mais difícil. Registre o motivo no README.",
        "close": "Qual versão você manteve?",
        "iso": "2026-12-31",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      },
      {
        "id": "w6d5",
        "title": "Fake e mock",
        "outcome": "Usar a memória num teste e o mock em outro, com o motivo escrito.",
        "study": "Fake é implementação simples de verdade, como o repositório em memória. Mock é um roteiro de respostas. Fake cabe quando a regra usa várias chamadas. Mock cabe quando você quer forçar uma falha.",
        "exercise": "Um teste de listar o dia usa o fake. Um teste em que listar lança exceção usa o mock.",
        "close": "Este teste precisa forçar uma falha ou precisa de comportamento real?",
        "iso": "2027-01-01",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      },
      {
        "id": "w6d6",
        "title": "Suíte única",
        "outcome": "mvn test verde, com fake e mock convivendo, e um registro curto no README.",
        "study": "Você consegue dizer, para cada teste, por que ele existe.",
        "exercise": "Rode a suíte. No README, três linhas: teste de domínio puro, teste com fake, teste com mock, e quando usar cada um.",
        "close": "Tem teste com mock no lugar de um objeto real?",
        "iso": "2027-01-02",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "O mesmo estilo de aula, agora com Mockito: when, thenReturn e verify",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Troque a busca para Mockito JUnit tutorial. Um vídeo curto. O resto é código."
      }
    ],
    "checkpoint": "Você explica fake e mock com um teste de cada no projeto."
  },
  {
    "n": 7,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Spring Boot sobe",
    "days": [
      {
        "id": "w7d1",
        "title": "Projeto Spring",
        "outcome": "Subir uma aplicação Spring Boot na porta 8080 com o domínio dentro dela.",
        "study": "O Spring Boot sobe o servidor e cria os objetos que você marca. Gere o esqueleto com Web e Validation, Java 21, Maven, sem banco ainda. O domínio entra no pacote dominio, sem anotação de framework.",
        "exercise": "Gere o projeto, copie o domínio, suba a aplicação. O processo fica no ar e você encerra.",
        "close": "O domínio ganhou algum import de Spring?",
        "iso": "2027-01-04",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      },
      {
        "id": "w7d2",
        "title": "Saúde da API",
        "outcome": "Responder GET /saude com 200 e um JSON pequeno.",
        "study": "RestController devolve JSON. Este caminho existe para saber que o processo subiu. Sem regra de negócio aqui.",
        "exercise": "Crie o controller. Chame com o navegador ou com curl.",
        "close": "Este endpoint lê banco ou só responde que está vivo?",
        "iso": "2027-01-05",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      },
      {
        "id": "w7d3",
        "title": "Camadas",
        "outcome": "Controller chama serviço, serviço chama domínio. O controller fica sem if de regra.",
        "study": "Controller traduz HTTP. Serviço orquestra. Domínio continua com a regra de horário. Se o if de conflito aparecer no controller, a camada errou.",
        "exercise": "Crie AgendaService usando a agenda do domínio. O controller só encaminha.",
        "close": "Onde mora o if de horário cruzado?",
        "iso": "2027-01-06",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      },
      {
        "id": "w7d4",
        "title": "DTO",
        "outcome": "Entrar e sair com tipos da API, sem devolver a entidade de domínio.",
        "study": "Request é o JSON que o cliente manda. Response é o que você aceita mostrar. A entidade pode ter campo que o cliente não vê.",
        "exercise": "Crie ConsultaRequest e ConsultaResponse. O serviço converte os dois lados.",
        "close": "Qual campo existe na entidade e não sai no JSON?",
        "iso": "2027-01-07",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      },
      {
        "id": "w7d5",
        "title": "Validação de entrada",
        "outcome": "Recusar corpo inválido na borda, antes do domínio.",
        "study": "NotBlank, NotNull e Future checam formato. Valid no parâmetro dispara a checagem. Conflito de horário continua no domínio, porque precisa das outras consultas.",
        "exercise": "Anote o request. Mande um JSON sem profissional e veja 400.",
        "close": "Esta validação substitui a regra do domínio?",
        "iso": "2027-01-08",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      },
      {
        "id": "w7d6",
        "title": "POST que marca",
        "outcome": "Criar uma consulta em memória e receber 201 com o corpo criado.",
        "study": "201 significa criado. A agenda de memória entra como bean. A terceira marcação no mesmo horário e profissional falha.",
        "exercise": "Implemente POST /consultas. Anote três comandos curl no README: duas marcas válidas e um conflito.",
        "close": "O que você precisa reiniciar para a consulta continuar existindo?",
        "iso": "2027-01-09",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024)",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Comece do primeiro vídeo. Pare quando o relógio do dia acabar. Anote o último minuto."
      }
    ]
  },
  {
    "n": 8,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Contrato HTTP",
    "days": [
      {
        "id": "w8d1",
        "title": "Status certos",
        "outcome": "Cada resultado da agenda tem um status HTTP estável.",
        "study": "200 devolve, 201 cria, 204 conclui sem corpo, 400 é pedido malformado, 404 é id ausente, 409 é conflito de regra. 500 fica para defeito inesperado.",
        "exercise": "Tabela no README: ação, status feliz, status de erro. Horário ocupado nasce 409.",
        "close": "CPF duplicado é 400 ou 409?",
        "iso": "2027-01-11",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      },
      {
        "id": "w8d2",
        "title": "Erro padronizado",
        "outcome": "Toda falha sai no mesmo formato, com tipo, título e detalhe.",
        "study": "ProblemDetail é o formato pronto do Spring. ControllerAdvice traduz exceção de domínio e erro de validação.",
        "exercise": "Trate status inválido, conflito de horário, paciente ausente e corpo inválido. Guarde as quatro respostas.",
        "close": "O cliente consegue distinguir horário ocupado de JSON quebrado?",
        "iso": "2027-01-12",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      },
      {
        "id": "w8d3",
        "title": "Conflito repetido",
        "outcome": "Mandar a mesma marcação duas vezes e receber 409 na segunda, com a primeira intacta.",
        "study": "Repetir o POST não cria duas consultas. O 409 torna isso visível.",
        "exercise": "Faça os dois POSTs. A listagem tem uma consulta.",
        "close": "O segundo POST criou alguma coisa?",
        "iso": "2027-01-13",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      },
      {
        "id": "w8d4",
        "title": "Listagem paginada",
        "outcome": "GET da agenda devolve página com tamanho limitado.",
        "study": "page e size na query. Resposta com conteúdo, página, tamanho e total. Tamanho padrão 20.",
        "exercise": "Implemente a listagem em memória. Peça size 1 e veja a segunda página.",
        "close": "O total é o total do dia ou o total da página?",
        "iso": "2027-01-14",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      },
      {
        "id": "w8d5",
        "title": "OpenAPI",
        "outcome": "Publicar a documentação gerada a partir do código.",
        "study": "springdoc sobe o Swagger UI a partir das rotas. A descrição mora junto do controller.",
        "exercise": "Adicione a dependência, abra o Swagger, confira POST e GET. Escreva a descrição do 409.",
        "close": "O Swagger mostra o formato de erro que você padronizou?",
        "iso": "2027-01-15",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      },
      {
        "id": "w8d6",
        "title": "Arquivo de chamadas",
        "outcome": "Ter um arquivo de chamadas que exercita os cinco casos.",
        "study": "O contrato existe quando outra pessoa consegue repetir. Cada chamada comenta o status esperado.",
        "exercise": "Cubra saúde, criar válido, criar inválido, conflito e listar página. Rode todos. Atualize o README.",
        "close": "Alguém sem a IDE consegue repetir essas chamadas?",
        "iso": "2027-01-16",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), continuação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue do minuto que você anotou. Sem recomeçar a playlist."
      }
    ]
  },
  {
    "n": 9,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Recursos da agenda",
    "days": [
      {
        "id": "w9d1",
        "title": "CRUD de paciente",
        "outcome": "Cadastrar, buscar, listar e atualizar o nome do paciente pela API.",
        "study": "O recurso é /pacientes. POST cria, GET por id busca, GET lista, PATCH altera nome. CPF não entra no PATCH. O id é gerado pelo cadastro.",
        "exercise": "Implemente os quatro. 404 quando o id não existe. 409 quando o CPF repete.",
        "close": "Qual campo o PATCH aceita?",
        "iso": "2027-01-18",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      },
      {
        "id": "w9d2",
        "title": "CRUD de profissional",
        "outcome": "O mesmo conjunto para profissional, com especialidade obrigatória.",
        "study": "O conselho é único, no mesmo papel do CPF. A regra fica no serviço e no domínio, não copiada dentro do controller.",
        "exercise": "Implemente /profissionais e os status.",
        "close": "O que é único neste recurso?",
        "iso": "2027-01-19",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      },
      {
        "id": "w9d3",
        "title": "Consulta aponta para id",
        "outcome": "Marcar consulta mandando ids, não o paciente inteiro.",
        "study": "O cliente envia pacienteId e profissionalId. O serviço busca. 404 se algum não existe, antes de falar de horário.",
        "exercise": "Ajuste o POST. Ordem: existe paciente, existe profissional, horário livre, aí salva.",
        "close": "Qual 404 vem primeiro se os dois ids forem falsos?",
        "iso": "2027-01-20",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      },
      {
        "id": "w9d4",
        "title": "Agenda do dia",
        "outcome": "Listar o dia de um profissional em ordem de início.",
        "study": "Data ausente é 400. Profissional ausente é 404. Lista vazia é 200 com conteúdo vazio.",
        "exercise": "Implemente o GET da agenda. Confira a ordem com três consultas inseridas fora de sequência.",
        "close": "Dia sem consulta é erro?",
        "iso": "2027-01-21",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      },
      {
        "id": "w9d5",
        "title": "Cancelar não apaga",
        "outcome": "Cancelar muda status e a consulta continua consultável.",
        "study": "Apagar a linha perde histórico. Cancelamento é a transição que o domínio já tem. Cancelar de novo devolve conflito de status. Decida se o horário cancelado libera para outra consulta e escreva a decisão.",
        "exercise": "Implemente POST de cancelamento. O GET seguinte mostra CANCELADA. Teste a regra do horário liberado.",
        "close": "O horário cancelado pode ser remarcado?",
        "iso": "2027-01-22",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      },
      {
        "id": "w9d6",
        "title": "Roteiro da recepção",
        "outcome": "Executar um dia de recepção só com chamadas HTTP.",
        "study": "O roteiro é a demo: pessoas, profissional, marcações, conflito, cancelamento, listagem.",
        "exercise": "Escreva o roteiro no arquivo de chamadas e rode do zero, reiniciando a API para limpar a memória. Cole no README o que cada chamada devolveu.",
        "close": "Se a API reiniciar no meio do expediente, o que se perde?",
        "iso": "2027-01-23",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, curso de Spring Boot (2024), recursos REST",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Continue a playlist. Se ela mudar de assunto, pause e use o tempo na teoria do dia."
      }
    ],
    "checkpoint": "O roteiro da recepção roda do zero só com HTTP, com a agenda ainda em memória."
  },
  {
    "n": 10,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "PostgreSQL e JPA",
    "days": [
      {
        "id": "w10d1",
        "title": "Postgres no Docker",
        "outcome": "Subir o banco com um comando e conectar nele.",
        "study": "O Compose sobe o Postgres com usuário, senha e nome do banco. A senha de laboratório fica fora do git, num arquivo de exemplo sem segredo real.",
        "exercise": "Escreva o compose com Postgres 16. Suba. Conecte e rode SELECT 1.",
        "close": "Onde está a senha: no git ou só na sua máquina?",
        "iso": "2027-01-25",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      },
      {
        "id": "w10d2",
        "title": "Paciente vira tabela",
        "outcome": "Gravar e ler paciente pelo Spring Data JPA.",
        "study": "Entity, id gerado e repositório Spring Data mapeiam a tabela. Isso é adaptador. Se a classe de domínio ganhar anotação JPA agora, registre o acoplamento e a meta de separar na semana de arquitetura hexagonal.",
        "exercise": "Mapeie paciente. POST cria linha. Confira com SELECT.",
        "close": "A classe de domínio e a tabela são o mesmo tipo hoje?",
        "iso": "2027-01-26",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      },
      {
        "id": "w10d3",
        "title": "Consulta e chaves",
        "outcome": "Tabela consulta com chave para paciente e profissional.",
        "study": "ManyToOne guarda o id. Cascade de remoção na consulta pode apagar paciente: não use.",
        "exercise": "Mapeie profissional e consulta. Marque pela API. Confira os três ids no SQL.",
        "close": "Apagar a consulta apaga o paciente?",
        "iso": "2027-01-27",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      },
      {
        "id": "w10d4",
        "title": "Transação",
        "outcome": "O método que marca grava tudo ou não grava nada.",
        "study": "Transactional no serviço abre a transação. Exceção unchecked desfaz. A regra de conflito acontece antes do commit, dentro desse método.",
        "exercise": "Garanta uma transação só. Escreva quais escritas entram juntas. Force uma exceção depois do save só no laboratório, confira o rollback, e tire esse código antes de commitar.",
        "close": "Quais tabelas esta marcação altera?",
        "iso": "2027-01-28",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      },
      {
        "id": "w10d5",
        "title": "Flyway",
        "outcome": "A tabela nasce de um script versionado.",
        "study": "V1 cria as tabelas. Script já aplicado não se edita: mudança nova é V2. O JPA deixa de inventar coluna sozinho.",
        "exercise": "Escreva o V1. Apague o schema antigo, suba, veja o histórico do Flyway. A API marca uma consulta.",
        "close": "Dá para alterar o V1 depois que ele já rodou em algum lugar?",
        "iso": "2027-01-29",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      },
      {
        "id": "w10d6",
        "title": "Memória sai da API",
        "outcome": "A API usa só o Postgres. Os testes de domínio continuam sem banco.",
        "study": "A implementação em memória pode permanecer para o teste do domínio. A aplicação Spring deixa de usá-la.",
        "exercise": "Suba do zero com compose e Flyway. Rode o roteiro. Reinicie a API e confira que os dados continuam. mvn test do domínio segue verde.",
        "close": "Reiniciar a API agora perde a consulta?",
        "iso": "2027-01-30",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, aula longa de API com JPA, só o trecho de banco",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "Avance até a parte de persistência. Assista só o tempo do dia."
      }
    ],
    "checkpoint": "O roteiro da recepção sobrevive a um restart, porque os dados estão no Postgres."
  },
  {
    "n": 11,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "SQL de verdade",
    "days": [
      {
        "id": "w11d1",
        "title": "JOIN",
        "outcome": "Escrever a consulta do dia com JOIN, lendo o SQL você mesmo.",
        "study": "A listagem junta consulta, profissional e paciente, filtra profissional e data, ordena por início.",
        "exercise": "Rode o SELECT no banco com os dados do roteiro. Cole a query no README. Compare com o SQL que o Spring loga em dev.",
        "close": "Quantas tabelas essa listagem toca?",
        "iso": "2027-02-01",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      },
      {
        "id": "w11d2",
        "title": "Índice",
        "outcome": "Índice para achar paciente por CPF e a agenda por profissional e início.",
        "study": "CPF único pede índice único. A agenda do dia filtra profissional e intervalo de início: índice composto com profissional primeiro.",
        "exercise": "V2 do Flyway cria os índices. Rode EXPLAIN. Anote o plano com a tabela pequena e o que você espera quando ela crescer.",
        "close": "Qual coluna vem primeiro no índice da agenda, e por quê?",
        "iso": "2027-02-02",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      },
      {
        "id": "w11d3",
        "title": "Unicidade do horário",
        "outcome": "O banco recusa duas consultas ativas do mesmo profissional no mesmo início.",
        "study": "A regra também mora no domínio. O banco segura duas requisições ao mesmo tempo. Índice único parcial, ignorando canceladas, é o encaixe no Postgres. Se o índice parcial apertar o tempo, faça a checagem no serviço e escreva o limite.",
        "exercise": "Tente inserir o duplicado pelo SQL. A API traduz a violação para 409.",
        "close": "O que protege a corrida: só o Java ou também o banco?",
        "iso": "2027-02-03",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      },
      {
        "id": "w11d4",
        "title": "Duas marcações juntas",
        "outcome": "Descrever o que duas requisições simultâneas fazem na mesma vaga.",
        "study": "No isolamento read committed, as duas podem ler livre antes de gravar. A restrição única fecha essa fresta.",
        "exercise": "Escreva os passos das duas requisições. Se o índice existir, dispare duas chamadas rápidas e registre quem ganhou e qual status o outro recebeu.",
        "close": "Sem a restrição do banco, as duas poderiam gravar?",
        "iso": "2027-02-04",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      },
      {
        "id": "w11d5",
        "title": "N+1",
        "outcome": "A listagem do dia faz um número estável de queries, sem uma busca extra por linha.",
        "study": "O log mostra a query da lista e, se houver N+1, uma query a mais por consulta para achar o nome. Join fetch ou entity graph traz o que a tela precisa junto.",
        "exercise": "Ligue o log, conte as queries com três consultas, corrija, conte de novo.",
        "close": "Quantas queries a listagem faz com três consultas?",
        "iso": "2027-02-05",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      },
      {
        "id": "w11d6",
        "title": "Modelo revisto",
        "outcome": "Ajustar o que o SQL mostrou e registrar a decisão.",
        "study": "Tipo da coluna de data, nulidade, índice e status gravado como o nome do enum entram nessa revisão.",
        "exercise": "Aplique um V3 se precisar. Rode o roteiro e os testes. Uma página: tabelas, índices e o que cada um garante.",
        "close": "Qual garantia está no banco e qual está só no Java?",
        "iso": "2027-02-06",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Sem vídeo novo de SQL: revise o trecho de JPA da Michelli em velocidade normal",
        "videoUrl": "https://www.youtube.com/watch?v=LXRU-Z36GEU",
        "videoHint": "O tempo de vídeo é revisão. A teoria e o exercício são o SQL no seu Postgres."
      }
    ]
  },
  {
    "n": 12,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Teste de API e de banco",
    "days": [
      {
        "id": "w12d1",
        "title": "Teste de controller",
        "outcome": "Testar o HTTP do POST sem subir banco nem domínio real.",
        "study": "WebMvcTest sobe a camada web. O serviço é mock. Você confere status e JSON. A regra de horário em si fica nos testes de domínio.",
        "exercise": "Três testes: 201, 400 de corpo inválido, 409 quando o serviço sinaliza conflito.",
        "close": "Este teste prova a regra de horário ou a tradução HTTP?",
        "iso": "2027-02-08",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      },
      {
        "id": "w12d2",
        "title": "Teste de repositório",
        "outcome": "Gravar um paciente num banco de teste e buscar por CPF.",
        "study": "DataJpaTest foca no JPA. O teste desfaz a transação no fim. H2 em modo compatível serve hoje; o Postgres de teste fica para o sábado.",
        "exercise": "Salve um paciente, busque por CPF e espere falha ao repetir o CPF.",
        "close": "O teste deixa lixo no banco que você usa para desenvolver?",
        "iso": "2027-02-09",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      },
      {
        "id": "w12d3",
        "title": "Serviço com repositório dublê",
        "outcome": "Testar a orquestração do serviço sem HTTP e sem banco.",
        "study": "O serviço aplica a regra e traduz para DTO. O repositório devolve o que o teste manda.",
        "exercise": "Caso feliz e conflito, no serviço, com Mockito.",
        "close": "Que bug este teste pega que o teste de domínio não pega?",
        "iso": "2027-02-10",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      },
      {
        "id": "w12d4",
        "title": "400 e 404 no MockMvc",
        "outcome": "Cobrir paciente ausente e JSON sem campo.",
        "study": "A mensagem padronizada faz parte do contrato. O teste olha o título ou o tipo do problema, com cuidado para não quebrar à toa se só o texto miúdo mudar.",
        "exercise": "Acrescente os dois testes no controller.",
        "close": "O teste quebra se você mudar só o texto da mensagem?",
        "iso": "2027-02-11",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      },
      {
        "id": "w12d5",
        "title": "Integração de um fluxo",
        "outcome": "Subir a aplicação e marcar uma consulta de ponta a ponta.",
        "study": "SpringBootTest no fluxo que paga o custo: marcar. É mais lento, então são poucos.",
        "exercise": "POST paciente, POST profissional, POST consulta, GET da agenda contém o id. Se o contexto não subir, leia a causa na sua classe.",
        "close": "Quantos testes de ponta a ponta você aceita manter?",
        "iso": "2027-02-12",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      },
      {
        "id": "w12d6",
        "title": "Postgres de teste no Docker",
        "outcome": "A suíte de integração roda contra Postgres, igual ao de desenvolvimento.",
        "study": "Testcontainers sobe o banco na hora do teste e derruba depois. O Docker precisa estar rodando. H2 não reproduz todo índice e todo tipo.",
        "exercise": "Troque o banco desse teste para Testcontainers. mvn test verde. Anote no README o comando que prova a API.",
        "close": "O teste depende de um Postgres que você subiu na mão?",
        "iso": "2027-02-13",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, trecho de teste se a playlist tiver; senão revise o crash course de JUnit",
        "videoUrl": "https://www.youtube.com/results?search_query=JUnit+5+crash+course+Java",
        "videoHint": "Um vídeo curto de @WebMvcTest ou MockMvc. Anote o título."
      }
    ],
    "checkpoint": "mvn test cobre domínio, HTTP, repositório e um fluxo de ponta a ponta."
  },
  {
    "n": 13,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Segurança básica",
    "days": [
      {
        "id": "w13d1",
        "title": "Trancar a API",
        "outcome": "Tudo autenticado, exceto /saude.",
        "study": "O filtro de segurança fica antes do controller. A cadeia escrita por você deixa explícito o que está aberto. A documentação pode ficar aberta só no perfil local.",
        "exercise": "Adicione Spring Security. /saude responde sem senha. /consultas sem senha devolve 401.",
        "close": "Qual caminho precisa funcionar sem login?",
        "iso": "2027-02-15",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      },
      {
        "id": "w13d2",
        "title": "Dois usuários",
        "outcome": "Recepcionista e médico existem em memória, com senhas diferentes.",
        "study": "Papéis: recepção e médico. O experimento de hoje pode usar senha simples; o dia do BCrypt troca o armazenamento.",
        "exercise": "Configure os dois. curl com usuário e senha chama o POST. Sem senha, 401.",
        "close": "A senha está no código que vai para o git?",
        "iso": "2027-02-16",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      },
      {
        "id": "w13d3",
        "title": "Autorização",
        "outcome": "Recepção marca e cancela. Médico lê a agenda.",
        "study": "403 é usuário autenticado sem permissão. 401 é sem login. Escreva a regra no README, simples e estável.",
        "exercise": "POST /consultas só recepção. GET da agenda, os dois papéis. Confirme 403 com o usuário errado.",
        "close": "Médico recebe 401 ou 403 ao tentar marcar?",
        "iso": "2027-02-17",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      },
      {
        "id": "w13d4",
        "title": "BCrypt e segredo fora do git",
        "outcome": "A senha guardada é hash, e o valor em claro não está no commit.",
        "study": "PasswordEncoder BCrypt. O yml local com segredo fica no gitignore. O yml versionado não leva senha.",
        "exercise": "Gere o hash, entre com a senha em claro no curl e confirme que o arquivo secreto não aparece no git status.",
        "close": "O que o git guarda no lugar da senha?",
        "iso": "2027-02-18",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      },
      {
        "id": "w13d5",
        "title": "Teste de 401 e 403",
        "outcome": "A suíte prova acesso sem login, papel errado e papel certo.",
        "study": "spring-security-test e WithMockUser cobrem o papel. O POST de consultas é o alvo.",
        "exercise": "Escreva os três testes. mvn test verde.",
        "close": "O teste do 403 autentica alguém?",
        "iso": "2027-02-19",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      },
      {
        "id": "w13d6",
        "title": "Como chamar",
        "outcome": "O README ensina a subir e chamar com os dois usuários.",
        "study": "O texto tem: subir o compose, subir a API, usuário de cada papel, um curl de cada.",
        "exercise": "Siga o README num terminal limpo, como se não lembrasse de nada. Corrija o que faltar.",
        "close": "O README basta para entrar na API?",
        "iso": "2027-02-20",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Spring Security, um vídeo curto de configuração no Boot 3",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Security+6+Spring+Boot+3+tutorial",
        "videoHint": "Um vídeo. Pare no tempo. A regra de papéis é a do exercício, não a do vídeo."
      }
    ]
  },
  {
    "n": 14,
    "block": "API Spring",
    "color": "purple",
    "level": "Pleno",
    "title": "Consolidar a API",
    "days": [
      {
        "id": "w14d1",
        "title": "Explicar as camadas",
        "outcome": "Escrever, de memória, o caminho de um POST até o commit.",
        "study": "Caixas: filtro de segurança, controller, validação, serviço, domínio, repositório, banco.",
        "exercise": "Escreva a página. Confira no código e marque o que errou. Corrija o texto.",
        "close": "Em qual caixa o 409 nasce?",
        "iso": "2027-02-22",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      },
      {
        "id": "w14d2",
        "title": "Um endpoint refeito",
        "outcome": "Reimplementar o cancelamento numa branch, com o teste primeiro.",
        "study": "O caminho curto repete o padrão: serviço, domínio, status, teste.",
        "exercise": "Apague o método de cancelar na branch e escreva de novo a partir do teste. Fique com a versão mais clara.",
        "close": "O teste nasceu antes do código?",
        "iso": "2027-02-23",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      },
      {
        "id": "w14d3",
        "title": "Cheiro de código",
        "outcome": "Achar três métodos longos ou três nomes genéricos e corrigir o pior.",
        "study": "Método com várias etapas, nome processar, controller com regra. O alvo é o seu projeto.",
        "exercise": "Liste três. Corrija o pior, com a suíte verde antes e depois.",
        "close": "O nome novo dispensa abrir o método?",
        "iso": "2027-02-24",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      },
      {
        "id": "w14d4",
        "title": "Volume pequeno",
        "outcome": "Inserir umas duzentas consultas e olhar a listagem do dia.",
        "study": "A paginação precisa segurar. Duzentas linhas já mostram resposta grande demais.",
        "exercise": "Popule um profissional. Chame a agenda com size 20. Confira o total e o SQL.",
        "close": "A resposta trouxe 20 ou trouxe as 200?",
        "iso": "2027-02-25",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      },
      {
        "id": "w14d5",
        "title": "Stack trace",
        "outcome": "Ler uma falha de propósito até achar a sua classe.",
        "study": "A causa útil está na sua linha, no meio da pilha, não no filtro do servidor.",
        "exercise": "Quebre uma query ou um teste, ache a sua linha, volte ao verde. Anote exceção, classe e correção.",
        "close": "Qual linha é sua e qual linha é do framework?",
        "iso": "2027-02-26",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      },
      {
        "id": "w14d6",
        "title": "Decisão registrada",
        "outcome": "Uma página com o que esta API decide e o que ela ainda não faz.",
        "study": "Exemplos: cancelar libera horário; médico não marca; banco garante CPF único; o domínio pode ainda estar anotado com JPA.",
        "exercise": "Escreva seis decisões com o motivo. Tag git api-em-pe se os testes estiverem verdes.",
        "close": "Qual decisão você tomaria diferente se começasse hoje?",
        "iso": "2027-02-27",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Sem aula nova. Reveja  o trecho da semana que ficou confuso",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Escolha um ponto da playlist e reassista só o tempo do dia."
      }
    ]
  },
  {
    "n": 15,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "Maven com mais de um módulo",
    "days": [
      {
        "id": "w15d1",
        "title": "Parent",
        "outcome": "Um pom pai e o módulo da aplicação, ainda subindo igual.",
        "study": "O pai guarda versão de Java, Boot e dependências comuns. A raiz não vira jar de aplicação.",
        "exercise": "Transforme o projeto em pai mais módulo agenda-api. mvn test na raiz roda o módulo. A API sobe.",
        "close": "Em qual pom está a dependência do JPA?",
        "iso": "2027-03-01",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      },
      {
        "id": "w15d2",
        "title": "Módulo de domínio",
        "outcome": "O domínio puro compila sem Spring no classpath.",
        "study": "Se o módulo não declara Spring, um import acidental não resolve. Essa é a fronteira barata.",
        "exercise": "Mova as regras puras para o módulo dominio. A API depende dele. Se a entidade JPA ainda for o domínio inteiro, extraia pelo menos conflito e status, e registre o resto para a semana hexagonal.",
        "close": "O pom do domínio menciona Spring?",
        "iso": "2027-03-02",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      },
      {
        "id": "w15d3",
        "title": "O que fica em cada módulo",
        "outcome": "Registrar a árvore real, não a desejada.",
        "study": "Regra de conflito e status ficam no domínio. HTTP, transação e entidade JPA ficam na API.",
        "exercise": "Escreva a decisão e a árvore de módulos como elas estão hoje.",
        "close": "O que o módulo dominio não pode importar?",
        "iso": "2027-03-03",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      },
      {
        "id": "w15d4",
        "title": "Versão num lugar só",
        "outcome": "A versão de uma biblioteca comum mora no pai.",
        "study": "Número repetido em todo pom desvia. O pai, ou o parent do Boot, centraliza.",
        "exercise": "Confira repetição de versão e corrija uma, se achar.",
        "close": "Onde eu olho para saber a versão do Boot?",
        "iso": "2027-03-04",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      },
      {
        "id": "w15d5",
        "title": "Build da raiz",
        "outcome": "Um comando na raiz testa tudo e gera o jar da API.",
        "study": "O jar fica no módulo da API.",
        "exercise": "Rode teste e package. Anote o caminho do artefato.",
        "close": "Quantos jars de aplicação nascem?",
        "iso": "2027-03-05",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      },
      {
        "id": "w15d6",
        "title": "Ciclo",
        "outcome": "Garantir que o domínio não depende da API.",
        "study": "A seta permitida é API para domínio. O inverso, ou os dois lados, quebra a fronteira.",
        "exercise": "Olhe os poms. Num branch, tente inverter a dependência, veja o erro e desfaça. Desenhe a seta no README.",
        "close": "Qual seta é proibida?",
        "iso": "2027-03-06",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Maven multi-módulo, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Maven+multi+module+project+tutorial",
        "videoHint": "Um vídeo. O pom que vale é o seu, no exercício."
      }
    ]
  },
  {
    "n": 16,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "O segundo serviço",
    "days": [
      {
        "id": "w16d1",
        "title": "pacientes-api nasce",
        "outcome": "Um segundo processo, dono do cadastro de paciente, na porta 8081.",
        "study": "Microsserviço aqui é um processo com dado próprio. A agenda guarda o id e pergunta o resto. Comece pelo esqueleto, ainda sem apagar o código antigo.",
        "exercise": "Crie o módulo ou a pasta pacientes-api. GET /saude na 8081. Decida se os dois databases cabem no mesmo Postgres e anote.",
        "close": "Quantos processos Java sobem no fim desta etapa?",
        "iso": "2027-03-08",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      },
      {
        "id": "w16d2",
        "title": "Banco do paciente",
        "outcome": "A tabela paciente mora só no banco deste serviço.",
        "study": "A agenda não faz SELECT na tabela de paciente.",
        "exercise": "Flyway do pacientes-api cria a tabela. POST e GET funcionam na 8081.",
        "close": "A agenda já pode ler essa tabela direto?",
        "iso": "2027-03-09",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      },
      {
        "id": "w16d3",
        "title": "Contrato mínimo",
        "outcome": "A agenda só precisa de id, nome e se o paciente está ativo.",
        "study": "Contrato pequeno sobrevive. Mandar o cadastro inteiro acopla os dois. Paciente inativo não recebe consulta nova.",
        "exercise": "Modele o JSON do GET por id com esses campos. Documente nos dois lados.",
        "close": "Qual campo a agenda não recebe?",
        "iso": "2027-03-10",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      },
      {
        "id": "w16d4",
        "title": "RestClient",
        "outcome": "A agenda busca o paciente por HTTP antes de marcar.",
        "study": "URL em configuração. Id ausente vira 404 na agenda. Timeout fica para a semana que vem.",
        "exercise": "Marque consulta com paciente criado na outra API. Quando o caminho estiver estável, retire o cadastro de paciente da agenda.",
        "close": "De qual porta vem o nome do paciente?",
        "iso": "2027-03-11",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      },
      {
        "id": "w16d5",
        "title": "Teste sem o outro processo",
        "outcome": "O teste da agenda depende de uma interface ClientePacientes, com fake.",
        "study": "O fake responde paciente ativo. O teste de conflito continua verde sem rede.",
        "exercise": "Refatore o serviço para a interface. Rode a suíte.",
        "close": "O teste de domínio abre socket?",
        "iso": "2027-03-12",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      },
      {
        "id": "w16d6",
        "title": "Roteiro dos dois processos",
        "outcome": "Subir os dois e marcar uma consulta de verdade.",
        "study": "Ordem: bancos, pacientes-api, agenda-api, criar paciente, criar profissional, marcar, listar.",
        "exercise": "Escreva e execute. Reinicie só a agenda e mostre que o paciente continua no outro serviço.",
        "close": "Qual processo eu reinicio sem perder o paciente?",
        "iso": "2027-03-13",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Michelli Brito, trecho em que dois projetos ou duas APIs aparecem",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Se a aula for de um serviço só, assista o tempo e aplique a ideia no segundo processo."
      }
    ],
    "checkpoint": "Marcar consulta exige os dois processos, e a agenda não lê a tabela de paciente."
  },
  {
    "n": 17,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "Quando o outro serviço falha",
    "days": [
      {
        "id": "w17d1",
        "title": "Timeout",
        "outcome": "A agenda não espera para sempre se a pacientes-api travar.",
        "study": "Timeout de resposta curto no laboratório, por exemplo um segundo, vindo da configuração. Sem isso, a thread da agenda fica presa.",
        "exercise": "Configure o RestClient. Simule lentidão ou derrube o processo. A agenda devolve erro em tempo limitado.",
        "close": "Quanto tempo a recepção espera no pior caso?",
        "iso": "2027-03-15",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      },
      {
        "id": "w17d2",
        "title": "Paciente inativo",
        "outcome": "Recusar consulta de paciente inativo com 409 e mensagem específica.",
        "study": "404 é não existe. 409 é existe e a regra não deixa marcar.",
        "exercise": "Campo ativo no pacientes-api. Dois curls, duas respostas distintas.",
        "close": "Inativo é 404 ou 409?",
        "iso": "2027-03-16",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      },
      {
        "id": "w17d3",
        "title": "Serviço fora",
        "outcome": "Derrubar a pacientes-api e receber um erro claro.",
        "study": "Conexão recusada vira 503, com texto de cadastro indisponível. 500 fica para defeito inesperado.",
        "exercise": "Pare o processo, chame o POST, guarde o JSON. Suba de novo e marque com sucesso.",
        "close": "Qual status você escolheu para o outro estar fora?",
        "iso": "2027-03-17",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      },
      {
        "id": "w17d4",
        "title": "Id de correlação",
        "outcome": "O mesmo identificador aparece no log dos dois serviços.",
        "study": "O header entra na agenda, segue na chamada de saída e aparece nos dois logs.",
        "exercise": "Gere um id se o cliente não mandou. Faça uma chamada e ache as duas linhas.",
        "close": "Quem gera o id se o cliente não mandou?",
        "iso": "2027-03-18",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      },
      {
        "id": "w17d5",
        "title": "Servidor falso",
        "outcome": "Testar 200, 404 e atraso do vizinho sem subir o vizinho.",
        "study": "WireMock, ou o servidor falso que você configurar, responde o que o teste manda.",
        "exercise": "Três testes do cliente: ativo, ausente, timeout. A suíte verde sem o processo 8081.",
        "close": "Este teste sobe a pacientes-api?",
        "iso": "2027-03-19",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      },
      {
        "id": "w17d6",
        "title": "Página de falhas",
        "outcome": "Cada falha do vizinho, o status da agenda e o teste que prova.",
        "study": "O catálogo evita que, no susto, tudo vire 500.",
        "exercise": "Escreva a tabela e rode os testes. Acrescente o caso que faltar.",
        "close": "Qual falha ainda vira 500?",
        "iso": "2027-03-20",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Um vídeo curto de timeout e erro entre APIs",
        "videoUrl": "https://www.youtube.com/results?search_query=REST+timeout+resilience+Spring+Boot",
        "videoHint": "Um vídeo. A tabela de falhas é sua, no exercício."
      }
    ]
  },
  {
    "n": 18,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "MongoDB na auditoria",
    "days": [
      {
        "id": "w18d1",
        "title": "Mongo no compose",
        "outcome": "Subir o Mongo e inserir um documento na mão.",
        "study": "Documento é JSON, com campo a mais no futuro. A agenda de horário continua no Postgres, onde unicidade e transação mandam.",
        "exercise": "Serviço mongo no compose. Insira um documento na coleção auditoria e ache de volta.",
        "close": "Por que a consulta marcada não vai para o Mongo?",
        "iso": "2027-03-22",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      },
      {
        "id": "w18d2",
        "title": "Documento de auditoria",
        "outcome": "Definir consultaId, tipo, quando e o que mudou.",
        "study": "Os campos respondem quem fez o quê e quando. tipo é MARCADA ou CANCELADA. Sem copiar cadastro clínico.",
        "exercise": "Escreva dois documentos de exemplo no README e insira os dois pela shell.",
        "close": "Qual campo liga o documento à linha do Postgres?",
        "iso": "2027-03-23",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      },
      {
        "id": "w18d3",
        "title": "Gravar ao marcar",
        "outcome": "Cada marcação bem sucedida grava um documento.",
        "study": "A gravação acontece depois do commit no Postgres. Se o Mongo falhar, a decisão de hoje é: consulta confirmada e falha de auditoria no log. A outbox, no sênior, melhora esse buraco.",
        "exercise": "Implemente. Marque pela API. Mostre o documento.",
        "close": "Se o Mongo estiver fora, a consulta fica marcada?",
        "iso": "2027-03-24",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      },
      {
        "id": "w18d4",
        "title": "Gravar ao cancelar",
        "outcome": "Cancelamento gera outro documento, sem apagar o da marcação.",
        "study": "Auditoria só acrescenta. A história se lê em ordem de data.",
        "exercise": "Cancele e mostre os dois documentos da mesma consulta.",
        "close": "Quantos documentos uma consulta cancelada tem?",
        "iso": "2027-03-25",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      },
      {
        "id": "w18d5",
        "title": "Consulta da história",
        "outcome": "Devolver a história de uma consulta em ordem.",
        "study": "Índice em consultaId. A busca devolve a lista ordenada pela data.",
        "exercise": "Implemente a leitura e o índice. Confira com a consulta que você marcou e cancelou.",
        "close": "A ordem sai do banco ou você ordena na memória?",
        "iso": "2027-03-26",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      },
      {
        "id": "w18d6",
        "title": "Quando é relacional",
        "outcome": "Uma página: o que ficou no Postgres, o que ficou no Mongo, e o motivo.",
        "study": "A resposta madura é a decisão no seu sistema, com exemplo real.",
        "exercise": "Escreva a página. Rode o roteiro com Postgres, Mongo e as duas APIs.",
        "close": "Se eu precisar de unicidade forte, qual banco eu escolho?",
        "iso": "2027-03-27",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "MongoDB, um vídeo curto de documento e coleção",
        "videoUrl": "https://www.youtube.com/results?search_query=MongoDB+tutorial+for+beginners+documents",
        "videoHint": "Um vídeo introdutório. A auditoria é o exercício, não o demo do vídeo."
      }
    ]
  },
  {
    "n": 19,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "Gradle",
    "days": [
      {
        "id": "w19d1",
        "title": "Os dois builds lado a lado",
        "outcome": "Nomear, num pom e num build Gradle, dependência, plugin, teste e jar.",
        "study": "Você já constrói com Maven. No Gradle, dependência fica em dependencies, plugin em plugins, e o resultado continua sendo um jar.",
        "exercise": "Tabela no README com a coluna Maven preenchida e a coluna Gradle ainda vazia.",
        "close": "Qual comando Maven o teste usa hoje?",
        "iso": "2027-03-29",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      },
      {
        "id": "w19d2",
        "title": "pacientes-api em Gradle",
        "outcome": "O segundo serviço passa a ser construído com Gradle, com o mesmo comportamento.",
        "study": "O wrapper entra no git, para a outra máquina buildar sem instalar Gradle. O plugin do Boot sobe a aplicação.",
        "exercise": "Crie o build e o wrapper. O teste e o bootRun passam. /saude na 8081. O Maven desse serviço sai.",
        "close": "O que o git precisa conter para buildar sem instalar Gradle?",
        "iso": "2027-03-30",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      },
      {
        "id": "w19d3",
        "title": "De onde vem a versão",
        "outcome": "Achar a versão que o plugin do Boot escolheu para uma dependência.",
        "study": "Você declara o nome, e o plugin gerencia o número, no mesmo espírito do parent Maven.",
        "exercise": "Acrescente uma dependência que o serviço já usa e anote a versão resolvida.",
        "close": "Quem escolheu o número da versão?",
        "iso": "2027-03-31",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      },
      {
        "id": "w19d4",
        "title": "Testar os dois",
        "outcome": "Um texto só com o comando Maven e o comando Gradle.",
        "study": "Dois comandos diferentes são normais. Os dois precisam estar escritos.",
        "exercise": "README ou script com os dois, na ordem. Rode. Os dois verdes.",
        "close": "Qual serviço usa qual ferramenta?",
        "iso": "2027-04-01",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      },
      {
        "id": "w19d5",
        "title": "Erro de build",
        "outcome": "Ler a mensagem de artefato ausente nas duas ferramentas.",
        "study": "A frase que aponta o artefato economiza hora.",
        "exercise": "Force um nome errado em cada build, leia, desfaça, volte ao verde.",
        "close": "A mensagem diz o que faltou?",
        "iso": "2027-04-02",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      },
      {
        "id": "w19d6",
        "title": "Script de subida",
        "outcome": "Um passo a passo para subir bancos e os dois serviços.",
        "study": "Compose, depois os dois processos. O sábado junta Maven, Gradle e Docker.",
        "exercise": "Siga o passo a passo numa ordem limpa. Corrija o que falhar. Commit.",
        "close": "Quantos terminais ficam abertos?",
        "iso": "2027-04-03",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Gradle e Spring Boot, um vídeo curto",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+Boot+Gradle+tutorial",
        "videoHint": "Um vídeo. O pacientes-api é quem muda de build."
      }
    ]
  },
  {
    "n": 20,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "Programação reativa",
    "days": [
      {
        "id": "w20d1",
        "title": "Mono",
        "outcome": "Criar um Mono, transformar o valor e tratar o erro, num teste.",
        "study": "Mono é zero ou um valor, mais tarde. map transforma se houver valor. block no teste, no fim, serve para afirmar. Ainda sem Spring.",
        "exercise": "Teste com Mono.just e map para o nome. Outro com erro e um fallback. Afirme os dois.",
        "close": "Onde o block apareceu?",
        "iso": "2027-04-05",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      },
      {
        "id": "w20d2",
        "title": "Flux",
        "outcome": "Filtrar uma sequência e contar quantas ficaram.",
        "study": "Flux é vários valores. filter e map lembram a stream, e o fluxo ainda pode falhar no meio.",
        "exercise": "Dez consultas fictícias, filtre um profissional, conte. O teste espera o número.",
        "close": "A filtragem aconteceu ao montar o Flux ou ao assinar?",
        "iso": "2027-04-06",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      },
      {
        "id": "w20d3",
        "title": "flatMap",
        "outcome": "Encadear uma busca que também devolve Mono.",
        "study": "map sobre função que devolve Mono produz Mono aninhado. flatMap achata. É o caso de achar o paciente e então a agenda.",
        "exercise": "Ligue as duas funções com flatMap num teste. Tente map e leia o tipo que o compilador aponta.",
        "close": "Qual dos dois o compilador aceita para o tipo final?",
        "iso": "2027-04-07",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      },
      {
        "id": "w20d4",
        "title": "Erro no meio",
        "outcome": "Decidir o que o teste espera quando o fluxo falha.",
        "study": "onErrorMap troca a exceção. Esconder erro sem registro some com incidente. StepVerifier, do reactor-test, afirma valor e erro sem block no meio.",
        "exercise": "Dois testes: erro traduzido e erro propagado.",
        "close": "O teste espera o erro ou esconde o erro?",
        "iso": "2027-04-08",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      },
      {
        "id": "w20d5",
        "title": "Sem block no meio",
        "outcome": "Tirar o block que espera dentro da transformação.",
        "study": "block no meio segura a thread. No fim do teste, afirmar o resultado é aceitável. Dentro do map, atrapalha o modelo.",
        "exercise": "Escreva um método com block interno, refatore para flatMap e StepVerifier, fique só com o bom.",
        "close": "Em que ponto esperar o resultado é legítimo?",
        "iso": "2027-04-09",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      },
      {
        "id": "w20d6",
        "title": "Pipeline da agenda",
        "outcome": "Processar cem consultas fictícias num teste: filtrar canceladas e contar por profissional.",
        "study": "Volume pequeno para o olho, grande o bastante para não ser um exemplo de uma linha. Ainda sem WebFlux.",
        "exercise": "O teste monta as cem, tira as canceladas, conta por profissional. Verde.",
        "close": "Este pipeline roda dentro do servidor?",
        "iso": "2027-04-10",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Project Reactor, Mono e Flux",
        "videoUrl": "https://www.youtube.com/results?search_query=Project+Reactor+Mono+Flux+tutorial",
        "videoHint": "Um vídeo de Mono e Flux. Sem WebFlux ainda."
      }
    ],
    "checkpoint": "Um teste Reactor lê uma sequência, transforma e afirma o erro, sem Spring."
  },
  {
    "n": 21,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "WebFlux no pacientes-api",
    "days": [
      {
        "id": "w21d1",
        "title": "Um endpoint Mono",
        "outcome": "GET de um paciente devolvendo Mono.",
        "study": "No WebFlux o retorno é Mono ou Flux. O pacientes-api é o menor. Um recurso basta. Se migrar o serviço inteiro estourar o dia, deixe um módulo mínimo com este GET e escreva o que ficou para depois.",
        "exercise": "O GET por id devolve Mono. Vazio vira 404. A agenda continua MVC.",
        "close": "Quem assina esse Mono: você ou o framework?",
        "iso": "2027-04-12",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      },
      {
        "id": "w21d2",
        "title": "Um endpoint Flux",
        "outcome": "Listar pacientes com um limite.",
        "study": "A lista finita vira JSON. take limita a quantidade.",
        "exercise": "GET da coleção devolve até size registros. Teste manual com três pacientes.",
        "close": "A resposta começa antes de ter o último paciente?",
        "iso": "2027-04-13",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      },
      {
        "id": "w21d3",
        "title": "Erro vira HTTP",
        "outcome": "A falha reativa sai com 404 ou 400, num corpo que a agenda reconhece.",
        "study": "O status precisa combinar com o catálogo de falhas que você já escreveu.",
        "exercise": "Teste id ausente e pedido inválido. Anote o JSON.",
        "close": "O status bate com o da semana de falhas?",
        "iso": "2027-04-14",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      },
      {
        "id": "w21d4",
        "title": "WebTestClient",
        "outcome": "Testar o endpoint reativo sem subir a porta.",
        "study": "O cliente de teste assina o resultado e afirma status e corpo.",
        "exercise": "Dois testes: achou e não achou.",
        "close": "O teste abre a porta 8081?",
        "iso": "2027-04-15",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      },
      {
        "id": "w21d5",
        "title": "Agenda continua MVC",
        "outcome": "A agenda chama o serviço reativo por HTTP e JSON, com o timeout que já existe.",
        "study": "Dois estilos no mesmo sistema são normais. O contrato é o JSON, não o tipo Mono.",
        "exercise": "Marque uma consulta de ponta a ponta. O teste da agenda com fake continua verde.",
        "close": "A agenda enxerga Mono ou enxerga JSON?",
        "iso": "2027-04-16",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      },
      {
        "id": "w21d6",
        "title": "Quando escolher",
        "outcome": "Uma página: onde o reativo entrou, onde ficou de fora, e o motivo.",
        "study": "A vaga pede prática com o modelo, e também julgamento de onde ele ajuda. Depurar custa mais, e o ganho é pequeno se o banco bloqueia.",
        "exercise": "Escreva com o seu sistema. Rode a suíte dos dois serviços.",
        "close": "Qual pedaço você manteria reativo se o prazo apertasse?",
        "iso": "2027-04-17",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Spring WebFlux, um vídeo curto de Mono no controller",
        "videoUrl": "https://www.youtube.com/results?search_query=Spring+WebFlux+tutorial+Mono+Flux",
        "videoHint": "Um vídeo. A agenda continua MVC."
      }
    ]
  },
  {
    "n": 22,
    "block": "Serviços e build",
    "color": "green",
    "level": "Pleno",
    "title": "Processo e prova do pleno",
    "days": [
      {
        "id": "w22d1",
        "title": "Histórias",
        "outcome": "Escrever as próximas entregas com critério de pronto.",
        "study": "História curta: quem, o que, para quê. Pronto é observável. Use Trello, GitHub Projects ou Jira, o que estiver ao seu alcance. O hábito pesa mais do que a marca.",
        "exercise": "Quadro com A fazer, Fazendo e Feito. Três histórias, cada uma com três critérios.",
        "close": "Como eu provo que a história terminou?",
        "iso": "2027-04-19",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      },
      {
        "id": "w22d2",
        "title": "Um dia no quadro",
        "outcome": "Mover cartão só quando o teste daquele cartão estiver verde.",
        "study": "Um cartão em Fazendo. O comentário leva o comando que você rodou.",
        "exercise": "Escolha um cartão pequeno, faça, mova, deixe a evidência.",
        "close": "O cartão andou antes do teste?",
        "iso": "2027-04-20",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      },
      {
        "id": "w22d3",
        "title": "Daily em cinco linhas",
        "outcome": "Escrever o que fechou, o que está aberto e o que trava.",
        "study": "Se nada trava, escreva que não há impedimento. Se trava, o próximo passo cabe na mesma nota.",
        "exercise": "Escreva a daily de hoje no cartão ou no README.",
        "close": "O impedimento tem próximo passo?",
        "iso": "2027-04-21",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      },
      {
        "id": "w22d4",
        "title": "Checklist da vaga",
        "outcome": "Para cada requisito de pleno, apontar o arquivo que prova.",
        "study": "Java e Spring Boot, APIs e microsserviços, reativo, JUnit e Mockito, Postgres e Mongo, Maven e Gradle, orientação a objetos, Scrum e um quadro. MySQL: anote o que mudaria a partir do Postgres. Se der tempo, suba um MySQL e rode um SELECT igual.",
        "exercise": "Monte a tabela. Onde estiver vazio, abra um cartão. Sem preencher no chute.",
        "close": "Qual requisito está só no README e não no código?",
        "iso": "2027-04-22",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      },
      {
        "id": "w22d5",
        "title": "Buraco de um dia",
        "outcome": "Fechar o buraco mais sério da tabela, com teste ou com demo.",
        "study": "Um buraco fechado vale mais do que vários quase.",
        "exercise": "Implemente o mínimo que torna a linha verdadeira. Atualize a tabela.",
        "close": "A linha da tabela agora aponta para o quê?",
        "iso": "2027-04-23",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      },
      {
        "id": "w22d6",
        "title": "Explicar o pleno",
        "outcome": "Escrever, sem olhar, o caminho de uma marcação pelos dois serviços, e corrigir depois.",
        "study": "Uma página: HTTP, segurança, domínio, Postgres, chamada ao outro serviço, Mongo, e o que acontece se o outro cai.",
        "exercise": "Escreva de memória. Abra o código. Corrija o texto marcando o que esqueceu. Tag pleno-base se a tabela estiver honesta e os testes verdes.",
        "close": "O que você esqueceu na primeira versão?",
        "iso": "2027-04-24",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Sem vídeo de ferramenta. Use o tempo para reler, em voz alta, o caminho de uma marcação",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Reassista um trecho que explique controller, serviço e banco. O quadro Scrum é o exercício."
      }
    ],
    "checkpoint": "A tabela da vaga aponta para código, e você explica uma marcação de ponta a ponta."
  },
  {
    "n": 23,
    "block": "Docker e entrega",
    "color": "cyan",
    "level": "Sênior",
    "title": "Imagem da API",
    "days": [
      {
        "id": "w23d1",
        "title": "Dockerfile da agenda",
        "outcome": "A agenda roda num container, com o jar empacotado na imagem.",
        "study": "Build em dois estágios: um compila, o outro só tem o JRE e o jar. A imagem final não leva código-fonte nem Maven.",
        "exercise": "docker build e docker run. /saude responde. O Postgres pode continuar no compose.",
        "close": "A imagem final contém o compilador?",
        "iso": "2027-04-26",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 0 ao 25. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      },
      {
        "id": "w23d2",
        "title": "Contexto e usuário",
        "outcome": "A imagem não leva target, segredo ou git, e o processo não é root.",
        "study": "dockerignore corta o contexto. Usuário não-root é o padrão. A porta continua a mesma.",
        "exercise": "Ajuste, reconstrua e confira o usuário do processo dentro do container.",
        "close": "Qual arquivo pesado deixou de ir no contexto?",
        "iso": "2027-04-27",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 25 ao 50. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      },
      {
        "id": "w23d3",
        "title": "Configuração por ambiente",
        "outcome": "URL do banco e senha entram por variável, não assadas na imagem.",
        "study": "O yml lê a variável. A mesma imagem serve no notebook e num servidor.",
        "exercise": "Tire o host fixo. Passe a variável no docker run. A API conecta no Postgres do compose.",
        "close": "Trocar de máquina exige rebuild?",
        "iso": "2027-04-28",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 50 ao 75. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      },
      {
        "id": "w23d4",
        "title": "Healthcheck",
        "outcome": "O Docker consulta /saude e mostra o estado.",
        "study": "Intervalo curto no laboratório. Se /saude não olha o banco, o container pode ficar healthy com o banco fora: anote essa limitação.",
        "exercise": "Adicione o check. Veja healthy. Pare o banco e descreva o que o health faz.",
        "close": "O health de hoje prova que o banco está ok?",
        "iso": "2027-04-29",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 75 ao 115. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      },
      {
        "id": "w23d5",
        "title": "Imagem do pacientes-api",
        "outcome": "O segundo serviço vira imagem, com Gradle no estágio de build.",
        "study": "O estágio final se parece com o da agenda: JRE, usuário, jar.",
        "exercise": "Dockerfile, sobe na 8081, health ok.",
        "close": "O estágio final dos dois serviços se parece em quê?",
        "iso": "2027-04-30",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 115 ao 140. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      },
      {
        "id": "w23d6",
        "title": "Compose com as duas imagens",
        "outcome": "Um compose sobe bancos e as duas APIs.",
        "study": "O nome do serviço na rede do compose é o host: a agenda chama pacientes-api, não localhost. depends_on não espera a API ficar pronta; o healthcheck ajuda se você usar a condição.",
        "exercise": "Suba tudo. Rode o roteiro de marcar, sem IDE.",
        "close": "A agenda acha o pacientes pelo localhost ou pelo nome do serviço?",
        "iso": "2027-05-01",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Docker Tutorial for Beginners, TechWorld with Nana (cerca de 3 horas)",
        "videoUrl": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "videoHint": "Assista do minuto 140 ao 165. Siga a ordem do vídeo. Não pule para o Dockerfile no primeiro dia."
      }
    ],
    "checkpoint": "compose up deixa o roteiro da recepção possível, sem abrir a IDE."
  },
  {
    "n": 24,
    "block": "Docker e entrega",
    "color": "cyan",
    "level": "Sênior",
    "title": "Pipeline",
    "days": [
      {
        "id": "w24d1",
        "title": "Estágios no papel",
        "outcome": "Desenhar testar, empacotar e construir imagem, e o que interrompe a linha.",
        "study": "Teste vermelho não gera imagem. O desenho vale para GitLab CI e para Jenkins.",
        "exercise": "Desenhe os estágios dos dois serviços e a regra de parada.",
        "close": "Qual estágio é o primeiro a poder falhar?",
        "iso": "2027-05-03",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      },
      {
        "id": "w24d2",
        "title": "GitLab CI do teste",
        "outcome": "Um gitlab-ci.yml que roda o teste da agenda.",
        "study": "O arquivo é o estudo, e a execução depende de você ter um runner. Se tiver conta, deixe verde de verdade. Se não tiver, anote que está escrito e ainda não executado. Sem verde inventado.",
        "exercise": "Escreva o job de teste com Java 21. Dispare se houver runner.",
        "close": "Este job constrói imagem?",
        "iso": "2027-05-04",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      },
      {
        "id": "w24d3",
        "title": "Job da imagem",
        "outcome": "O yaml só chega na imagem se o teste passou.",
        "study": "A tag é o hash curto do commit. latest não identifica o que está rodando.",
        "exercise": "Acrescente o estágio. Documente a tag e se ele executou.",
        "close": "Qual tag identifica o que está rodando?",
        "iso": "2027-05-05",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      },
      {
        "id": "w24d4",
        "title": "Jenkinsfile",
        "outcome": "O mesmo fluxo em pipeline declarativo: Test e Image.",
        "study": "agent, stages e post. post always publica o resultado do teste mesmo quando falha. Escreva o arquivo. Se subir Jenkins no Docker, rode uma vez.",
        "exercise": "Jenkinsfile da agenda com os dois stages. Anote se executou.",
        "close": "O que o post always faz se o teste falhar?",
        "iso": "2027-05-06",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      },
      {
        "id": "w24d5",
        "title": "Segredo no log",
        "outcome": "A senha do banco não aparece no yaml nem num echo do pipeline.",
        "study": "O arquivo referencia o nome da variável. O valor mora na ferramenta de CI, mascarado.",
        "exercise": "Procure senha em claro nos arquivos de CI e troque por referência. Escreva a regra no README.",
        "close": "O valor da senha está em algum arquivo commitado?",
        "iso": "2027-05-07",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      },
      {
        "id": "w24d6",
        "title": "Os dois serviços",
        "outcome": "Cada serviço tem job de teste, e a falha de um permanece visível.",
        "study": "O pacientes-api usa Gradle no CI. Pode ser o mesmo yaml ou outro arquivo.",
        "exercise": "Complete o que falta. README: como disparar, o que cada estágio faz, o que você executou e o que está só escrito.",
        "close": "Os dois testes rodam em que ordem?",
        "iso": "2027-05-08",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "O final do mesmo curso de Docker, se ainda houver; senão um vídeo curto de CI",
        "videoUrl": "https://www.youtube.com/results?search_query=GitLab+CI+tutorial+for+beginners",
        "videoHint": "Pipeline é o exercício. O vídeo só mostra o formato de um yaml."
      }
    ],
    "checkpoint": "Existe pipeline escrito para os dois serviços, com teste antes da imagem."
  },
  {
    "n": 25,
    "block": "Mensageria",
    "color": "yellow",
    "level": "Sênior",
    "title": "Kafka na marcação",
    "days": [
      {
        "id": "w25d1",
        "title": "Broker no compose",
        "outcome": "Subir um Kafka e criar o tópico consulta.eventos.",
        "study": "Um broker no laboratório basta. Comece com três partições. Anote a porta do cliente.",
        "exercise": "Compose com uma imagem single-node que você consiga subir. Crie o tópico e liste.",
        "close": "Quantas partições o tópico tem?",
        "iso": "2027-05-10",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      },
      {
        "id": "w25d2",
        "title": "Producer",
        "outcome": "Ao marcar com sucesso, publicar um evento com id e tipo.",
        "study": "Campos: consultaId, tipo MARCADA, horário, pacienteId. Key é o profissionalId, para os eventos daquele profissional seguirem na mesma partição. Sem texto clínico a mais.",
        "exercise": "Publique depois do commit. Consuma pelo console e mostre a mensagem.",
        "close": "A key é qual campo?",
        "iso": "2027-05-11",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      },
      {
        "id": "w25d3",
        "title": "Consumer",
        "outcome": "Um consumidor grava a auditoria no Mongo a partir do evento.",
        "study": "Escolha um caminho: ou o serviço grava direto, ou o consumidor grava. Os dois juntos duplicam. Grupo de consumo com nome estável.",
        "exercise": "Implemente. Marque e veja o documento. Pare o consumidor, marque de novo, suba: a mensagem que ficou no tópico é lida.",
        "close": "Com o consumidor parado, a marcação ainda responde 201?",
        "iso": "2027-05-12",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      },
      {
        "id": "w25d4",
        "title": "Grupo e partição",
        "outcome": "Dois membros do mesmo grupo dividem partições. Outro grupo receberia a própria cópia.",
        "study": "Auditoria é um grupo. Um relatório futuro seria outro grupo, lendo os mesmos eventos.",
        "exercise": "Suba dois membros, ou dois consumers de console, e descreva o que cada um recebeu.",
        "close": "Os dois membros do mesmo grupo receberam a mesma mensagem?",
        "iso": "2027-05-13",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      },
      {
        "id": "w25d5",
        "title": "Pelo menos uma vez",
        "outcome": "Processar a mesma mensagem duas vezes não duplica a auditoria.",
        "study": "O broker pode reentregar. O consumidor usa o id do evento, ou o par consultaId e tipo, e a segunda gravação não cria outro documento.",
        "exercise": "Reprocesse o mesmo id. Conte os documentos: um.",
        "close": "Qual campo torna a gravação idempotente?",
        "iso": "2027-05-14",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      },
      {
        "id": "w25d6",
        "title": "Desenho do fluxo",
        "outcome": "Uma página: API, banco, tópico, consumidor, Mongo.",
        "study": "Marque o que a recepção espera e o que a auditoria alcança depois. Inclua o consumidor parado, com a mensagem ainda no tópico.",
        "exercise": "Escreva e confronte com um teste manual. O desenho descreve o seu sistema.",
        "close": "A recepção espera a auditoria?",
        "iso": "2027-05-15",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Apache Kafka, tutorial de início",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Um vídeo de tópico, producer e consumer. O broker do exercício é o seu compose."
      }
    ],
    "checkpoint": "Marcar publica evento, e a auditoria idempotente cai no Mongo."
  },
  {
    "n": 26,
    "block": "Mensageria",
    "color": "yellow",
    "level": "Sênior",
    "title": "Evento e Event Hub",
    "days": [
      {
        "id": "w26d1",
        "title": "Contrato versionado",
        "outcome": "Campo novo e opcional não quebra quem já lê o evento.",
        "study": "A versão vai no payload. Remover campo que o consumidor usa quebra. Ignorar campo desconhecido mantém o leitor antigo.",
        "exercise": "Acrescente um campo opcional. Leia o JSON antigo e o novo com um leitor tolerante. Teste os dois.",
        "close": "Apagar um campo que o consumidor já usa é compatível?",
        "iso": "2027-05-17",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      },
      {
        "id": "w26d2",
        "title": "Cancelamento também é evento",
        "outcome": "Publicar o tipo de cancelamento e a auditoria registrar.",
        "study": "O mesmo tópico, com tipo diferente, basta aqui. A key continua o profissional se a ordem por profissional importa.",
        "exercise": "Publique no cancelamento. A história da consulta mostra os dois tipos.",
        "close": "A ordem entre marcar e cancelar da mesma consulta se mantém por quê?",
        "iso": "2027-05-18",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      },
      {
        "id": "w26d3",
        "title": "Falha no consumidor",
        "outcome": "Se a gravação falhar, o offset não anda.",
        "study": "Processar, gravar, então confirmar. Confirmar antes perde o evento quando o processo cai no meio.",
        "exercise": "Force uma falha, veja a nova tentativa, corrija e confira a gravação única.",
        "close": "O offset anda se a gravação falhou?",
        "iso": "2027-05-19",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      },
      {
        "id": "w26d4",
        "title": "Event Hub",
        "outcome": "Mapear tópico, partição, grupo e offset para os nomes do Azure Event Hub.",
        "study": "Namespace, hub, partition e consumer group. A entrega com reprocessamento e o grupo continuam. Sem assinatura Azure, o mapa escrito já é o estudo. Com conta, publique uma mensagem e anote.",
        "exercise": "Tabela de equivalência no README e uma frase sobre quando o time escolheria o serviço gerenciado. Inclua o que você não colocaria no evento.",
        "close": "Qual conceito do Kafka você não achou do outro lado?",
        "iso": "2027-05-20",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      },
      {
        "id": "w26d5",
        "title": "Teste com broker",
        "outcome": "A suíte sobe um Kafka temporário, ou você registra por que ainda não.",
        "study": "Testcontainers Kafka prova producer e consumidor sem o compose manual. Se a imagem estourar o dia, deixe o teste de lado com o motivo escrito e um cartão para voltar.",
        "exercise": "Um teste: marcar publica e o consumidor grava. Verde, ou honestamente adiado.",
        "close": "O teste usa o Kafka do compose?",
        "iso": "2027-05-21",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      },
      {
        "id": "w26d6",
        "title": "O que não vai na mensagem",
        "outcome": "Rever o payload e tirar campo que a auditoria não usa.",
        "study": "Mensagem é contrato entre partes. Senha, token e texto clínico livre ficam de fora.",
        "exercise": "Corte o excesso, atualize o teste e escreva a lista do que nunca enviar.",
        "close": "Qual campo você removeu?",
        "iso": "2027-05-22",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "O mesmo tema, agora grupo de consumo e reentrega",
        "videoUrl": "https://www.youtube.com/results?search_query=Apache+Kafka+getting+started+tutorial",
        "videoHint": "Procure consumer group ou at least once. Um vídeo."
      }
    ]
  },
  {
    "n": 27,
    "block": "Kubernetes e nuvem",
    "color": "orange",
    "level": "Sênior",
    "title": "A agenda no cluster",
    "days": [
      {
        "id": "w27d1",
        "title": "Cluster local",
        "outcome": "Ter um cluster pequeno na máquina, com kind ou k3d.",
        "study": "kubectl fala com o cluster. Um nó basta. O vocabulário da semana é Pod, Deployment e Service.",
        "exercise": "Instale as ferramentas, suba o cluster e mostre o nó pronto.",
        "close": "O cluster está na nuvem ou na sua máquina?",
        "iso": "2027-05-24",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 0 ao 25, a partir de visão geral. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      },
      {
        "id": "w27d2",
        "title": "Deployment da agenda",
        "outcome": "Um Deployment roda a imagem da agenda.",
        "study": "A tag é o hash que você já usa, carregada no kind ou vinda de um registry. Sem latest.",
        "exercise": "Escreva o yaml, aplique e veja o pod Running. Se cair, leia o log antes de mudar várias coisas.",
        "close": "Quantas réplicas você pediu?",
        "iso": "2027-05-25",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 25 ao 50, a partir de arquitetura. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      },
      {
        "id": "w27d3",
        "title": "Service",
        "outcome": "Um Service com nome estável na frente do pod.",
        "study": "O IP do pod muda. Para chamar do notebook, port-forward. Dentro do cluster, o nome do Service.",
        "exercise": "Crie o Service, faça o forward e chame /saude.",
        "close": "Você chama o IP do pod ou o Service?",
        "iso": "2027-05-26",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 50 ao 75, a partir de comandos kubectl. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      },
      {
        "id": "w27d4",
        "title": "Reinício",
        "outcome": "Apagar o pod e ver outro nascer, com a API de volta.",
        "study": "O Deployment mantém a contagem. Existe uma janela curta sem resposta.",
        "exercise": "Apague o pod, observe o novo e chame /saude. Anote os dois nomes.",
        "close": "Quem criou o pod substituto?",
        "iso": "2027-05-27",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 75 ao 115, a partir de YAML. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      },
      {
        "id": "w27d5",
        "title": "Variável e banco",
        "outcome": "A agenda no cluster alcança o Postgres.",
        "study": "O banco pode ficar no compose, com o pod apontando para o host, ou ir para o cluster. A senha fica num Secret, sem valor real commitado. Valor de laboratório óbvio fica marcado como laboratório e fora do git, se possível.",
        "exercise": "Faça a API conectar e gravar. Documente o caminho escolhido.",
        "close": "Onde a senha do banco está no manifesto?",
        "iso": "2027-05-28",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 115 ao 140, a partir de namespaces. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      },
      {
        "id": "w27d6",
        "title": "Logs",
        "outcome": "Achar o log de uma chamada com kubectl logs.",
        "study": "Operar é ler o log do pod. O id de correlação ajuda.",
        "exercise": "Faça uma chamada e ache a linha. Escreva no README os comandos de pods, logs e port-forward.",
        "close": "Qual comando mostra a falha se o pod não ficar Ready?",
        "iso": "2027-05-29",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Kubernetes Tutorial for Beginners, TechWorld with Nana (3 h 37 min)",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 140 ao 165, a partir de Ingress. Siga os capítulos na ordem. O cluster do exercício é o seu, com a agenda."
      }
    ]
  },
  {
    "n": 28,
    "block": "Kubernetes e nuvem",
    "color": "orange",
    "level": "Sênior",
    "title": "Probe, config e o segundo serviço",
    "days": [
      {
        "id": "w28d1",
        "title": "Liveness e readiness",
        "outcome": "Readiness tira o pod do Service quando ele não pode receber tráfego. Liveness reinicia quando o processo não se recupera.",
        "study": "As duas podem chamar /saude. Se /saude não vê o banco, anote o limite. Se der, /saude falha quando o banco não responde, e a probe passa a significar isso.",
        "exercise": "Adicione as probes. Derrube o banco, observe o Ready, traga o banco de volta.",
        "close": "Com o banco fora, o Service ainda manda tráfego?",
        "iso": "2027-05-31",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 165 ao 190, a partir de volumes. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      },
      {
        "id": "w28d2",
        "title": "ConfigMap",
        "outcome": "A URL do pacientes-api vem de ConfigMap.",
        "study": "Mudou a URL, muda o mapa e o pod reinicia. A imagem permanece.",
        "exercise": "Monte a variável pelo ConfigMap e mostre o valor no pod.",
        "close": "Para mudar a URL eu reconstruo a imagem?",
        "iso": "2027-06-01",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 190 ao 215, a partir de StatefulSet. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      },
      {
        "id": "w28d3",
        "title": "pacientes no cluster",
        "outcome": "Deployment e Service do segundo processo.",
        "study": "A agenda usa o nome do Service no DNS do cluster. localhost dentro do pod é o próprio pod.",
        "exercise": "Suba o pacientes, ajuste a URL e marque uma consulta atravessando os dois Services.",
        "close": "Qual host a agenda usa para achar o pacientes?",
        "iso": "2027-06-02",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "Assista do minuto 215 ao 217, a partir de Services. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      },
      {
        "id": "w28d4",
        "title": "Onde o Kafka fica",
        "outcome": "Decidir se o broker entra no cluster ou fica no compose, e escrever a escolha.",
        "study": "Kafka no cluster local consome memória. Apontar o pod para o broker no compose é válido no laboratório e diferente de produção. O texto separa os dois.",
        "exercise": "Uma marcação a partir do pod publica no tópico, no arranjo escolhido. Cinco linhas de decisão.",
        "close": "Esse arranjo é o que você levaria para produção?",
        "iso": "2027-06-03",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "O curso de 3 h 37 min acabou. Reveja o capítulo que ficou frouxo, só pelo tempo deste dia. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      },
      {
        "id": "w28d5",
        "title": "Rollback",
        "outcome": "Publicar uma imagem que não sobe e voltar para a anterior.",
        "study": "rollout undo precisa de duas tags. A tag anterior tem que existir.",
        "exercise": "Suba a tag que falha, veja o pod, desfaça, confirme /saude na tag antiga. Anote os comandos.",
        "close": "A tag anterior ainda existe?",
        "iso": "2027-06-04",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "O curso de 3 h 37 min acabou. Reveja o capítulo que ficou frouxo, só pelo tempo deste dia. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      },
      {
        "id": "w28d6",
        "title": "Runbook curto",
        "outcome": "Uma página: subir cluster, aplicar, ver log, desfazer.",
        "study": "Comandos copiáveis, na ordem em que você realmente usa.",
        "exercise": "Siga do cluster vazio até uma marcação. Corrija o texto onde tropeçar.",
        "close": "O runbook assume algum passo que só está na sua cabeça?",
        "iso": "2027-06-05",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Continuação do mesmo curso de Kubernetes",
        "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "videoHint": "O curso de 3 h 37 min acabou. Reveja o capítulo que ficou frouxo, só pelo tempo deste dia. Continue do minuto em que parou. Probe e ConfigMap são o exercício, mesmo que o vídeo ainda esteja no demo."
      }
    ]
  },
  {
    "n": 29,
    "block": "Kubernetes e nuvem",
    "color": "orange",
    "level": "Sênior",
    "title": "Nuvem no desenho",
    "days": [
      {
        "id": "w29d1",
        "title": "Conta e acesso",
        "outcome": "Descrever um acesso de deploy que não administra a conta inteira.",
        "study": "Uma identidade publica imagem. Outra, a da API, lê o segredo do banco. Nenhuma das duas cria usuário. Se tiver conta, crie a política mínima. Se não tiver, o texto fica marcado como estudo ainda não aplicado.",
        "exercise": "Escreva as duas identidades e a lista do que cada uma pode.",
        "close": "A API precisa de permissão para criar usuário?",
        "iso": "2027-06-07",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      },
      {
        "id": "w29d2",
        "title": "Rede em uma página",
        "outcome": "Desenhar o que é público e o que fica fechado.",
        "study": "A entrada HTTP é o que a internet alcança. O banco não tem rota pública. A regra de rede libera a porta do banco só para a API.",
        "exercise": "Desenhe com os nomes do seu sistema.",
        "close": "O Postgres tem endereço público?",
        "iso": "2027-06-08",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      },
      {
        "id": "w29d3",
        "title": "Banco gerenciado e registry",
        "outcome": "Nomear o que substitui o Postgres do compose e o lugar da imagem.",
        "study": "Na AWS: RDS e ECR. No Azure: banco PostgreSQL gerenciado, Container Registry e, na linha do Kafka, Event Hub.",
        "exercise": "Tabela com as caixas do seu compose nas duas colunas.",
        "close": "Qual caixa do compose o banco gerenciado substitui?",
        "iso": "2027-06-09",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      },
      {
        "id": "w29d4",
        "title": "Fila pronta da nuvem",
        "outcome": "Dizer quando uma fila gerenciada substitui o Kafka neste sistema.",
        "study": "Um consumidor de auditoria cabe em fila. Vários times lendo o mesmo evento, com partição e retenção, puxam para Kafka ou Event Hub.",
        "exercise": "Escreva a escolha para a auditoria e para um relatório imaginário. Sem migrar o código hoje.",
        "close": "Quantos consumidores o desenho atual tem?",
        "iso": "2027-06-10",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      },
      {
        "id": "w29d5",
        "title": "Custo",
        "outcome": "Listar o que custa dinheiro mesmo parado.",
        "study": "Cluster, banco e broker custam parados. O cluster local custa RAM da sua máquina e não custa nuvem.",
        "exercise": "Cada caixa com sim ou não, e o que você desligaria no fim do expediente.",
        "close": "O que você desligaria no fim do expediente?",
        "iso": "2027-06-11",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      },
      {
        "id": "w29d6",
        "title": "Desenho alvo",
        "outcome": "Seis caixas do sistema numa nuvem, sem recurso inventado à toa.",
        "study": "Entrada, agenda, pacientes, Postgres, broker e o armazenamento da auditoria. Setas com o protocolo. O que só existe no desenho fica marcado.",
        "exercise": "Compare com o que roda na máquina. A diferença fica explícita.",
        "close": "Qual caixa você operou de verdade e qual está só desenhada?",
        "iso": "2027-06-12",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Visão de nuvem para desenvolvedor: VPC, banco gerenciado e registry",
        "videoUrl": "https://www.youtube.com/results?search_query=AWS+overview+for+developers+VPC+RDS+ECR",
        "videoHint": "Um vídeo de panorama. O desenho do exercício é o seu sistema, não a conta da aula."
      }
    ],
    "checkpoint": "O desenho separa o que roda na máquina do que seria a mesma arquitetura numa nuvem."
  },
  {
    "n": 30,
    "block": "Arquitetura",
    "color": "pink",
    "level": "Sênior",
    "title": "Arquitetura hexagonal",
    "days": [
      {
        "id": "w30d1",
        "title": "Domínio sem framework",
        "outcome": "O pacote de regra não importa Spring, JPA nem Kafka.",
        "study": "A regra fica no centro. Se a entidade ainda tem anotação de banco, extraia o modelo puro da consulta e deixe a entidade no adaptador.",
        "exercise": "Mova a regra de conflito. Uma busca por import mostra o que ainda vazou.",
        "close": "Qual import você tirou?",
        "iso": "2027-06-14",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      },
      {
        "id": "w30d2",
        "title": "Porta de entrada",
        "outcome": "O caso de uso AgendarConsulta é o que o REST chama.",
        "study": "O controller não chama repositório. O caso de uso recebe um comando, não o JSON.",
        "exercise": "Introduza o caso de uso. Teste com repositório fake, sem Spring.",
        "close": "O controller conhece o repositório?",
        "iso": "2027-06-15",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      },
      {
        "id": "w30d3",
        "title": "Porta de saída",
        "outcome": "Repositório e cliente de pacientes são interfaces, implementadas fora.",
        "study": "A implementação JPA traduz entidade e domínio. A implementação HTTP fica no adaptador.",
        "exercise": "Mova uma implementação para o pacote adaptador. O teste de conflito usa fake. O de integração usa JPA.",
        "close": "Onde fica a anotação de entidade?",
        "iso": "2027-06-16",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      },
      {
        "id": "w30d4",
        "title": "Adaptador do evento",
        "outcome": "Publicar é uma porta PublicadorEventos. O Kafka é um adaptador.",
        "study": "O caso de uso não monta o registro do cliente Kafka. O teste usa publicador em memória.",
        "exercise": "Extraia a porta. O teste afirma o evento sem broker. O adaptador real continua no teste manual.",
        "close": "O caso de uso menciona o nome Kafka?",
        "iso": "2027-06-17",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      },
      {
        "id": "w30d5",
        "title": "Trocar adaptador",
        "outcome": "Trocar o publicador não muda a regra de conflito.",
        "study": "O ganho prático é esse: a regra fica, o encaixe sai.",
        "exercise": "Dois testes, dois publicadores fake. A regra de horário ocupado é a mesma classe.",
        "close": "Qual classe você não precisou editar?",
        "iso": "2027-06-18",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      },
      {
        "id": "w30d6",
        "title": "Página da arquitetura",
        "outcome": "Desenhar portas e adaptadores do sistema real.",
        "study": "Se der tempo, ArchUnit falha o build quando o domínio importa Spring. Se não der, a página e a busca de imports fecham o dia, com um cartão para o ArchUnit.",
        "exercise": "Escreva a página, rode os testes e corrija um vazamento se achar.",
        "close": "Qual adaptador eu poderia substituir sem mexer na regra?",
        "iso": "2027-06-19",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Arquitetura hexagonal em Java, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "Um vídeo. As portas do exercício têm o nome das suas classes."
      }
    ],
    "checkpoint": "O caso de uso de agendar é testável sem Spring, com fakes."
  },
  {
    "n": 31,
    "block": "Arquitetura",
    "color": "pink",
    "level": "Sênior",
    "title": "Resiliência",
    "days": [
      {
        "id": "w31d1",
        "title": "Timeout em toda saída",
        "outcome": "Cada chamada que sai do processo tem limite de espera.",
        "study": "HTTP e o producer entram na lista. O número fica na configuração.",
        "exercise": "Liste as saídas. Acrescente o timeout que faltar.",
        "close": "Qual saída ainda espera sem limite?",
        "iso": "2027-06-21",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      },
      {
        "id": "w31d2",
        "title": "Retry só no seguro",
        "outcome": "Repetir a leitura do paciente. Não repetir o POST de marcar.",
        "study": "Se o primeiro POST passou e a resposta se perdeu, repetir cria outra consulta. Leitura pode repetir. Sem chave de idempotência no POST, ele não repete.",
        "exercise": "Uma falha seguida de sucesso no GET, com WireMock ou equivalente. O POST de marcar sem retry.",
        "close": "Qual chamada você se recusou a repetir?",
        "iso": "2027-06-22",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      },
      {
        "id": "w31d3",
        "title": "Circuit breaker",
        "outcome": "Depois de várias falhas, a agenda para de chamar o pacientes por um intervalo e falha rápido.",
        "study": "Resilience4j abre o circuito, espera e experimenta de novo. O usuário recebe o erro de serviço indisponível. Os números são de laboratório e ficam anotados.",
        "exercise": "No teste, falhe o bastante para abrir. A chamada seguinte não espera o timeout inteiro.",
        "close": "Com o circuito aberto, quantas vezes o pacientes é chamado?",
        "iso": "2027-06-23",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      },
      {
        "id": "w31d4",
        "title": "O que a recepção vê",
        "outcome": "A mensagem diz para tentar mais tarde, sem stack trace no JSON.",
        "study": "503 com texto estável. O detalhe fica no log.",
        "exercise": "Um teste afirma o status e que o corpo não contém a palavra Exception.",
        "close": "O cliente vê nome de classe Java?",
        "iso": "2027-06-24",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      },
      {
        "id": "w31d5",
        "title": "Carga pequena",
        "outcome": "Cinquenta marcações seguidas, e o primeiro sintoma anotado.",
        "study": "É observação, não teste de produção. Loop de chamadas contra o compose. Sem otimizar ainda, a menos que algo esteja claramente quebrado.",
        "exercise": "Anote quantas passaram, quantas falharam e o primeiro sintoma.",
        "close": "O primeiro sintoma foi timeout, erro de negócio ou banco?",
        "iso": "2027-06-25",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      },
      {
        "id": "w31d6",
        "title": "Derrubar o vizinho",
        "outcome": "Com a pacientes-api fora, descrever o comportamento no tempo.",
        "study": "O que a recepção recebe, o que o log mostra, o que volta ao normal quando o processo sobe. Inclua o circuito, se abriu.",
        "exercise": "Escreva o ensaio com os horários do seu teste.",
        "close": "O que você olharia primeiro se isso fosse produção?",
        "iso": "2027-06-26",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Timeout, retry e circuit breaker",
        "videoUrl": "https://www.youtube.com/results?search_query=Resilience4j+circuit+breaker+Spring+Boot",
        "videoHint": "Um vídeo. Os números do exercício são os do seu laboratório."
      }
    ]
  },
  {
    "n": 32,
    "block": "Arquitetura",
    "color": "pink",
    "level": "Sênior",
    "title": "Outbox",
    "days": [
      {
        "id": "w32d1",
        "title": "O buraco",
        "outcome": "Escrever o instante em que a consulta gravou e o evento ainda não saiu.",
        "study": "Dois sistemas: Postgres e Kafka. Se o processo morre no meio, um lado fica sem o fato. A outbox guarda o evento na mesma transação. Um publicador lê a tabela e envia.",
        "exercise": "Aponte, no código atual, a linha entre o save e o envio.",
        "close": "Em qual instante os dois lados podem divergir?",
        "iso": "2027-06-28",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      },
      {
        "id": "w32d2",
        "title": "Tabela outbox",
        "outcome": "Linha com id do evento, tipo, payload e quando foi publicado.",
        "study": "Nasce junto da consulta. Publicado vazio significa que ainda não foi para o broker. Script novo do Flyway.",
        "exercise": "Crie a tabela. Na marcação, insira a linha na mesma transação.",
        "close": "A linha nasce na mesma transação da consulta?",
        "iso": "2027-06-29",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      },
      {
        "id": "w32d3",
        "title": "Publicador",
        "outcome": "Um agendador lê linhas pendentes e envia.",
        "study": "Depois de confirmar o envio, preenche a data. Se falhar, deixa pendente. O consumidor continua idempotente, porque a tentativa pode repetir.",
        "exercise": "Pare o broker, marque, veja a linha pendente, suba o broker, veja a publicação e a auditoria.",
        "close": "Com o broker parado, a API ainda retorna 201?",
        "iso": "2027-06-30",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      },
      {
        "id": "w32d4",
        "title": "Um caminho só",
        "outcome": "Sobra um jeito de publicar: a outbox.",
        "study": "A publicação direta, se ainda existir, manda o evento duas vezes.",
        "exercise": "Apague o caminho velho. Uma marcação, um evento.",
        "close": "Quantas vezes o evento nasce por marcação?",
        "iso": "2027-07-01",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      },
      {
        "id": "w32d5",
        "title": "Teste da outbox",
        "outcome": "Horário ocupado não deixa linha. O caso feliz deixa.",
        "study": "Se a transação falha, consulta e outbox somem juntas.",
        "exercise": "Dois testes de integração ou de serviço, verdes.",
        "close": "Horário ocupado deixa rastro no outbox?",
        "iso": "2027-07-02",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      },
      {
        "id": "w32d6",
        "title": "Limite do que você fez",
        "outcome": "Escrever o que esta outbox ainda não é.",
        "study": "Ainda falta limite de tentativa, alerta, limpeza das linhas velhas e ordem global. Ela resolve o buraco da transação. Dizer o limite faz parte do trabalho.",
        "exercise": "Uma página curta. Rode marcar e cancelar e mostre as linhas.",
        "close": "O que falta para você confiar nisso num plantão?",
        "iso": "2027-07-03",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Outbox pattern, um vídeo",
        "videoUrl": "https://www.youtube.com/results?search_query=transactional+outbox+pattern+kafka",
        "videoHint": "Um vídeo. A tabela é a sua, no Postgres da agenda."
      }
    ],
    "checkpoint": "A consulta e o evento nascem na mesma transação, e o broker recebe depois."
  },
  {
    "n": 33,
    "block": "Prova do sênior",
    "color": "red",
    "level": "Sênior",
    "title": "Lista de espera",
    "days": [
      {
        "id": "w33d1",
        "title": "Critério de pronto",
        "outcome": "Definir a lista de espera antes de codar.",
        "study": "Se o horário está ocupado, a recepção coloca o paciente numa lista. Quando aquela consulta é cancelada, a primeira da lista é avisada por evento. Fora de escopo: e-mail de verdade, tela e prioridade clínica.",
        "exercise": "Escreva os critérios e o fora de escopo. Cartão no quadro. Sem código ainda.",
        "close": "Como eu provo que a primeira da lista foi avisada?",
        "iso": "2027-07-05",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      },
      {
        "id": "w33d2",
        "title": "Domínio e teste",
        "outcome": "A regra da fila nasce no caso de uso, com teste e fake.",
        "study": "A ordem é a de chegada. Cancelar escolhe o próximo. O segundo não é avisado nesse cancelamento.",
        "exercise": "Testes: entra na lista, não avisa sem cancelamento, avisa o primeiro quando cancela. Verde, sem Spring.",
        "close": "O segundo da lista é avisado neste cancelamento?",
        "iso": "2027-07-06",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      },
      {
        "id": "w33d3",
        "title": "Persistência",
        "outcome": "Tabela da lista, script novo, adaptador.",
        "study": "Um paciente não entra duas vezes na mesma vaga.",
        "exercise": "Migração e teste de integração do caso de uso.",
        "close": "O que impede o paciente duplicado na mesma vaga?",
        "iso": "2027-07-07",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      },
      {
        "id": "w33d4",
        "title": "HTTP",
        "outcome": "POST para entrar na lista e GET para ver a ordem.",
        "study": "Papel da recepção. 409 se já está na lista. 404 se a consulta não existe.",
        "exercise": "Endpoints, teste de controller e uma chamada manual.",
        "close": "Qual papel pode colocar alguém na lista?",
        "iso": "2027-07-08",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      },
      {
        "id": "w33d5",
        "title": "Evento",
        "outcome": "Cancelar publica o aviso do próximo pela outbox.",
        "study": "O evento leva o paciente avisado e a consulta. Um caminho só de publicação.",
        "exercise": "Demonstre: ocupa, entra na lista, cancela, o evento aparece.",
        "close": "O aviso sai na mesma transação do cancelamento?",
        "iso": "2027-07-09",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      },
      {
        "id": "w33d6",
        "title": "Empacotar",
        "outcome": "A feature roda na imagem, com o teste no pipeline e a demo no README.",
        "study": "Use o compose ou o cluster que já estiver estável. Atualize a tabela de requisitos.",
        "exercise": "Siga o runbook. Execute a demo. Corrija o que quebrar. Tag senior-lista-de-espera se estiver verde.",
        "close": "A demo usa algum passo que não está no runbook?",
        "iso": "2027-07-10",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Sem aula nova. Reveja o trecho de outbox ou de hexagonal que você menos lembra",
        "videoUrl": "https://www.youtube.com/results?search_query=hexagonal+architecture+java+ports+adapters",
        "videoHint": "No máximo o tempo do dia. A lista de espera é código seu."
      }
    ],
    "checkpoint": "A lista de espera atravessa domínio, banco, HTTP, outbox e evento, fora da IDE."
  },
  {
    "n": 34,
    "block": "Prova do sênior",
    "color": "red",
    "level": "Sênior",
    "title": "Explicar como sênior",
    "days": [
      {
        "id": "w34d1",
        "title": "Desenho de memória",
        "outcome": "Desenhar a arquitetura sem olhar e corrigir em seguida.",
        "study": "Dois serviços, bancos, broker, outbox, cluster. Seta síncrona e seta de evento.",
        "exercise": "Desenhe. Compare com o README. Fique com uma versão só.",
        "close": "Qual seta é HTTP e qual seta é evento?",
        "iso": "2027-07-12",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      },
      {
        "id": "w34d2",
        "title": "Hexagonal em linguagem simples",
        "outcome": "Explicar a separação para quem está no pleno.",
        "study": "A regra de horário não importa Spring, e o teste dela não sobe o servidor. REST e Kafka são encaixes.",
        "exercise": "Meia página com os nomes reais das suas classes.",
        "close": "Qual classe é regra e qual classe é encaixe?",
        "iso": "2027-07-13",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      },
      {
        "id": "w34d3",
        "title": "Consistência",
        "outcome": "Explicar o que grava junto e o que alcança depois.",
        "study": "Consulta e outbox juntas. A auditoria no Mongo chega depois. O nome do paciente mora no outro serviço: a agenda guarda o id.",
        "exercise": "Três frases, uma por fronteira, incluindo o que a recepção percebe se o consumidor atrasar.",
        "close": "O que a recepção vê na hora e o que ela vê depois?",
        "iso": "2027-07-14",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      },
      {
        "id": "w34d4",
        "title": "Pipeline e volta atrás",
        "outcome": "Explicar como a imagem nasce e como você volta.",
        "study": "Teste, tag do commit, deploy, undo. Diga o que você executou e o que está só no arquivo.",
        "exercise": "Meia página com os comandos do seu runbook.",
        "close": "Qual tag volta quando a nova quebra?",
        "iso": "2027-07-15",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      },
      {
        "id": "w34d5",
        "title": "Broker lento",
        "outcome": "Explicar o POST com o broker parado, do jeito que o seu código faz.",
        "study": "Com outbox, o POST segue e a tabela cresce. O publicador tenta de novo. Descreva o seu sistema, e confronte com o ensaio em que você parou o broker.",
        "exercise": "Escreva o parágrafo.",
        "close": "O POST falha se o Kafka falhar?",
        "iso": "2027-07-16",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      },
      {
        "id": "w34d6",
        "title": "Simulado",
        "outcome": "Oito respostas de uma sentada, sem abrir o código, e a correção depois.",
        "study": "409 e 400, fake e mock, timeout, breaker, key do Kafka, por que o POST não repete, o que a probe prova, o que a outbox não resolve.",
        "exercise": "Escreva, abra o projeto, marque o que errou.",
        "close": "Qual resposta errou um fato do seu próprio sistema?",
        "iso": "2027-07-17",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Sem aula nova. O tempo de vídeo é você se explicando, gravando áudio no celular",
        "videoUrl": "https://www.youtube.com/playlist?list=PL6_-QWg-BIvHepz75F1AkDrE7bVsOexUo",
        "videoHint": "Grave e ouça. Conte como vídeo feito. Sem playlist hoje."
      }
    ],
    "checkpoint": "Você explica o sistema que construiu, incluindo o limite do que ele não faz."
  },
  {
    "n": 35,
    "block": "Para o especialista",
    "color": "gray",
    "level": "Tech lead",
    "title": "Padrões e desenho",
    "days": [
      {
        "id": "w35d1",
        "title": "Padrões que já estão aí",
        "outcome": "Nomear, no seu código, estratégia, fábrica, adaptador e repositório.",
        "study": "Notificador, factory da consulta, adaptador da hexagonal e repositório. O nome acompanha o código que já existe.",
        "exercise": "Tabela: padrão, classe sua, problema que resolveu. Se o nome não couber, não force.",
        "close": "Qual padrão você usaria só para ter o nome no README?",
        "iso": "2027-07-19",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      },
      {
        "id": "w35d2",
        "title": "Onde não usar",
        "outcome": "Apontar um canto que ficaria pior com mais um padrão.",
        "study": "Padrão introduz tipo. O health, por exemplo, pode permanecer uma resposta simples.",
        "exercise": "Escolha um canto e escreva por que ele fica simples.",
        "close": "O que ficaria mais difícil de ler?",
        "iso": "2027-07-20",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      },
      {
        "id": "w35d3",
        "title": "Contexto",
        "outcome": "Um desenho de quem usa o sistema e quais sistemas existem em volta.",
        "study": "Recepção, médico, agenda, cadastro de pacientes. Sem classe e sem porta. E-mail, se aparecer, fica como sistema que você não construiu.",
        "exercise": "Desenhe em texto.",
        "close": "Quem é pessoa e quem é sistema?",
        "iso": "2027-07-21",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      },
      {
        "id": "w35d4",
        "title": "Processos e bancos",
        "outcome": "Uma página só com os processos e os bancos, igual ao desenho de nuvem.",
        "study": "Duas páginas que divergem viram duas verdades. Una.",
        "exercise": "Atualize uma página e apague a duplicata.",
        "close": "As duas páginas diziam a mesma quantidade de bancos?",
        "iso": "2027-07-22",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      },
      {
        "id": "w35d5",
        "title": "Quatro decisões",
        "outcome": "Três que você tomaria de novo e uma que trocaria.",
        "study": "Outbox, Mongo na auditoria, WebFlux só no pacientes, Kafka no compose. Cada uma com o custo.",
        "exercise": "Quatro parágrafos curtos.",
        "close": "Qual decisão você trocaria com mais um mês?",
        "iso": "2027-07-23",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      },
      {
        "id": "w35d6",
        "title": "Cinco riscos",
        "outcome": "Cada risco com cenário, consequência e uma mitigação.",
        "study": "Consumidor parado por dias, outbox sem limpeza, saúde que mente, segredo de laboratório, um único broker. A mitigação pode ser ainda não fiz.",
        "exercise": "Liste os cinco. Cartão para a mitigação que cabe num dia.",
        "close": "Qual risco doeria nesta semana se fosse real?",
        "iso": "2027-07-24",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Um vídeo curto de C4 model ou de design patterns em Java",
        "videoUrl": "https://www.youtube.com/results?search_query=C4+model+software+architecture",
        "videoHint": "Um vídeo. A tabela de padrões usa as suas classes."
      }
    ]
  },
  {
    "n": 36,
    "block": "Para o especialista",
    "color": "gray",
    "level": "Tech lead",
    "title": "Grafana, incidente e fechamento",
    "days": [
      {
        "id": "w36d1",
        "title": "Métrica",
        "outcome": "A agenda expõe contagem e latência para o Prometheus.",
        "study": "Micrometer pelo Actuator, no endpoint de métricas, separado da saúde. Procure a métrica das rotas HTTP.",
        "exercise": "Ligue o endpoint, chame a API e ache a rota de consultas no texto, antes do gráfico.",
        "close": "Qual rota apareceu na métrica?",
        "iso": "2027-07-26",
        "weekday": "segunda",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      },
      {
        "id": "w36d2",
        "title": "Prometheus e Grafana",
        "outcome": "Um painel com quantidade de pedidos e latência da agenda.",
        "study": "Os dois sobem no compose de laboratório. O título do painel diz a métrica.",
        "exercise": "Suba, monte os dois painéis, faça chamadas e veja o número mudar.",
        "close": "O painel mexe quando você chama a saúde?",
        "iso": "2027-07-27",
        "weekday": "terça",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      },
      {
        "id": "w36d3",
        "title": "Log e métrica",
        "outcome": "Usar cada um para uma pergunta diferente.",
        "study": "Métrica diz quanto e quão lento. Log diz qual id. Os dois entram no runbook.",
        "exercise": "Provoque um 503. Ache a métrica de erro e a linha de log com o id da chamada.",
        "close": "O Grafana mostra o id da consulta?",
        "iso": "2027-07-28",
        "weekday": "quarta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      },
      {
        "id": "w36d4",
        "title": "Alarme",
        "outcome": "Definir latência do pacientes acima de um segundo, sustentada, como motivo para agir.",
        "study": "A regra escrita basta se o alerta do Grafana não ficar pronto hoje. Falso positivo: um teste de carga seu.",
        "exercise": "Escreva a regra, a ação e o falso positivo. Configure o alerta se der tempo.",
        "close": "Quem age quando o alarme toca?",
        "iso": "2027-07-29",
        "weekday": "quinta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      },
      {
        "id": "w36d5",
        "title": "Ensaio",
        "outcome": "O consumidor para, a outbox cresce, você percebe e recupera.",
        "study": "Pare o consumidor, marque três consultas, anote o sinal que mostrou o problema, religue e confirme auditoria única.",
        "exercise": "Escreva o ensaio minuto a minuto.",
        "close": "Em que minuto você percebeu, e por qual sinal?",
        "iso": "2027-07-30",
        "weekday": "sexta",
        "videoMin": 25,
        "theoryMin": 25,
        "exerciseMin": 70,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      },
      {
        "id": "w36d6",
        "title": "Fechamento",
        "outcome": "Tabela final da vaga, tag e os próximos 30 dias.",
        "study": "Pleno, sênior e o pedaço de especialista: padrões, Grafana introdutório e um ensaio. O que estiver fraco fica escrito, para a entrevista combinar com o que você construiu.",
        "exercise": "Atualize a tabela requisito para evidência. Tag vaga-agenda-1.0 no commit verde. Cinco itens no máximo, vindos dos riscos, para os próximos 30 dias.",
        "close": "Qual requisito você sustentaria numa entrevista amanhã?",
        "iso": "2027-07-31",
        "weekday": "sábado",
        "videoMin": 40,
        "theoryMin": 30,
        "exerciseMin": 110,
        "videoCourse": "Grafana e Prometheus, um vídeo curto de overview",
        "videoUrl": "https://www.youtube.com/results?search_query=Prometheus+Grafana+Spring+Boot+Micrometer+tutorial",
        "videoHint": "Um vídeo. O painel do exercício é o da agenda."
      }
    ],
    "checkpoint": "A tag existe, a tabela da vaga aponta para evidência, e os limites estão escritos."
  }
];
function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function labelDate(iso: string, weekday: string): string {
  const [year, month, day] = iso.split("-");
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${weekday}, ${day} ${months[Number(month) - 1]} ${year}`;
}

const TOTAL_DAYS = WEEKS.reduce((total, week) => total + week.days.length, 0);

export default function PlanoPlenoSenior() {
  const dispatch = useCanvasAction();
  const [parts, setParts] = useCanvasState<Record<string, Parts>>("parts", {});
  const [finished, setFinished] = useCanvasState<Record<string, boolean>>("finished", {});
  const [selectedId, setSelectedId] = useCanvasState("selected", WEEKS[0].days[0].id);
  const today = todayIso();

  const flat = WEEKS.flatMap((week) => week.days.map((day) => ({ week, day })));
  const selected = flat.find((item) => item.day.id === selectedId) ?? flat[0];
  const doneCount = flat.filter((item) => finished[item.day.id]).length;
  const firstOpen = flat.find((item) => !finished[item.day.id]) ?? flat[flat.length - 1];
  const weekDone = selected.week.days.filter((day) => finished[day.id]).length;
  const dayNumber = flat.findIndex((item) => item.day.id === selected.day.id) + 1;
  const current = parts[selected.day.id] ?? EMPTY;
  const ready = current.video && current.theory && current.exercise;
  const isDone = !!finished[selected.day.id];
  const todayLesson = flat.find((item) => item.day.iso === today);

  function setPart(key: keyof Parts, checked: boolean) {
    const id = selected.day.id;
    setParts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? EMPTY), [key]: checked },
    }));
    if (!checked) {
      setFinished((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <Stack gap={20}>
      <Row gap={8} align="center" wrap>
        <Button
          variant="primary"
          onClick={() => todayLesson && setSelectedId(todayLesson.day.id)}
          disabled={!todayLesson}
        >
          {todayLesson
            ? `Aula de hoje: ${todayLesson.day.title}`
            : "Hoje não tem aula"}
        </Button>
        <Button variant="secondary" onClick={() => setSelectedId(firstOpen.day.id)}>
          {`Aula em aberto: ${firstOpen.day.title}`}
        </Button>
      </Row>

      <Stack gap={6}>
        <H1>{selected.day.title}</H1>
        <Text tone="secondary">
          {`${labelDate(selected.day.iso, selected.day.weekday)} · semana ${selected.week.n} · aula ${dayNumber} de ${TOTAL_DAYS} · ${selected.day.videoMin + selected.day.theoryMin + selected.day.exerciseMin} min. Marque cada coluna quando terminar.`}
        </Text>
      </Stack>

      <Callout tone="info" title="Você sai da aula sabendo">
        {selected.day.outcome}
      </Callout>

      <Grid columns={3} gap={16}>
        <Stack gap={6}>
          <H2>{`Vídeo · ${selected.day.videoMin} min`}</H2>
          <Text>{selected.day.videoHint}</Text>
          <Link href={selected.day.videoUrl}>{`Abrir o vídeo: ${selected.day.videoCourse}`}</Link>
          <Text size="small" tone="tertiary">{selected.day.videoUrl}</Text>
          <Checkbox
            checked={current.video}
            label="Marcar: vi o vídeo"
            onChange={(checked) => setPart("video", checked)}
          />
        </Stack>
        <Stack gap={6}>
          <H2>{`Teoria · ${selected.day.theoryMin} min`}</H2>
          <Text>{selected.day.study}</Text>
          <Checkbox
            checked={current.theory}
            label="Marcar: fiz a teoria"
            onChange={(checked) => setPart("theory", checked)}
          />
        </Stack>
        <Stack gap={6}>
          <H2>{`Exercício · ${selected.day.exerciseMin} min`}</H2>
          <Text>{selected.day.exercise}</Text>
          <Text>{`No fim, responda no README: ${selected.day.close}`}</Text>
          <Checkbox
            checked={current.exercise}
            label="Marcar: fiz o exercício"
            onChange={(checked) => setPart("exercise", checked)}
          />
        </Stack>
      </Grid>

      <Row gap={8} align="center">
        <Button
          variant="primary"
          disabled={!ready || isDone}
          onClick={() => setFinished((prev) => ({ ...prev, [selected.day.id]: true }))}
        >
          {isDone ? "Aula concluída" : "Finalizar a aula"}
        </Button>
        <Text tone="secondary" size="small">
          {isDone
            ? "Concluída. Desmarque uma parte se precisar refazer."
            : ready
              ? "As três partes estão feitas. Agora pode finalizar."
              : "Finalizar só libera depois de marcar vídeo, teoria e exercício."}
        </Text>
      </Row>

      <Row gap={24} align="end">
        <Stat value="36" label="Semanas" />
        <Stat value={String(TOTAL_DAYS)} label="Aulas" />
        <Stat
          value={`${doneCount}/${TOTAL_DAYS}`}
          label="Aulas concluídas"
          tone={doneCount === TOTAL_DAYS ? "success" : undefined}
        />
        <Stat value={labelDate(firstOpen.day.iso, firstOpen.day.weekday)} label="Próxima aula em aberto" />
      </Row>

      <UsageBar
        total={TOTAL_DAYS}
        topLeftLabel="216 aulas em 8 blocos"
        topRightLabel="2 h por dia útil e 3 h no sábado"
        segments={BLOCKS.map((block) => ({
          id: block.id,
          value: block.days,
          color: block.color,
        }))}
      />
      <Row gap={14} wrap>
        {BLOCKS.map((block) => (
          <span key={block.id}>
            <Row gap={6} align="center">
              <Swatch color={block.color} />
              <Text size="small" tone="secondary">
                {block.name} · {block.days} aulas
              </Text>
            </Row>
          </span>
        ))}
      </Row>

      <Callout tone="info" title={today < "2026-11-23" ? "Amanhã" : "Próxima aula em aberto"}>
        {`${labelDate(firstOpen.day.iso, firstOpen.day.weekday)} · semana ${firstOpen.week.n} · ${firstOpen.day.title}. Vídeo ${firstOpen.day.videoMin} min, teoria ${firstOpen.day.theoryMin} min, exercício ${firstOpen.day.exerciseMin} min.`}
      </Callout>
      <Row gap={8}>
        <Button variant="primary" onClick={() => setSelectedId(firstOpen.day.id)}>
          Abrir a aula em aberto
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            dispatch({
              type: "newComposerChat",
              userPrompt: `Travei no curso pleno/sênior, ${selected.day.id}, semana ${selected.week.n} (${selected.week.title}), aula ${selected.day.title}, em ${selected.day.iso}. O exercício era: ${selected.day.exercise} Me ajude a destravar sem pular a aula.`,
            })
          }
        >
          Travei nesta aula
        </Button>
      </Row>

      <Divider />

      <Stack gap={8}>
        <H2>{`Semana ${selected.week.n} · ${selected.week.title}`}</H2>
        <Row gap={8} align="center">
          <Swatch color={selected.week.color} />
          <Text weight="medium">{selected.week.level}</Text>
          <Text tone="secondary" size="small">
            {`${selected.week.block} · ${weekDone}/6 aulas concluídas`}
          </Text>
        </Row>
        <Row gap={6} wrap>
          {WEEKS.map((week) => (
            <span key={week.n}>
              <Pill active={week.n === selected.week.n} onClick={() => setSelectedId(week.days[0].id)}>
                {`S${week.n}`}
              </Pill>
            </span>
          ))}
        </Row>
      </Stack>

      <Row gap={6} wrap>
        {selected.week.days.map((day, index) => (
          <span key={day.id}>
            <Pill active={day.id === selected.day.id} onClick={() => setSelectedId(day.id)}>
              {`${finished[day.id] ? "Feito · " : ""}D${index + 1} ${day.title}`}
            </Pill>
          </span>
        ))}
      </Row>

      {selected.week.checkpoint ? (
        <Callout tone="warning" title={`Prova da semana ${selected.week.n}`}>
          {selected.week.checkpoint}
        </Callout>
      ) : null}

      <Divider />

      <Stack gap={8}>
        <H2>Mapa das 36 semanas</H2>
        <Table
          headers={["Semana", "Nível", "Bloco", "Foco"]}
          columnAlign={["left", "left", "left", "left"]}
          rows={WEEKS.map((week) => [String(week.n), week.level, week.block, week.title])}
          rowTone={WEEKS.map((week) => (week.n === selected.week.n ? "info" : undefined))}
          striped
        />
        <Text size="small" tone="tertiary">
          Projeto agenda-clinica, fora do repositório do trabalho. Pleno na semana 22, sênior na semana 34, especialista nas semanas 35 e 36. Início em 23 nov 2026. Se não faltar nenhum dia, a última aula cai em 31/07/2027.
        </Text>
      </Stack>
    </Stack>
  );
}
