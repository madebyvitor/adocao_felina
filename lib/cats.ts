export type CatStatus = "disponivel" | "em_processo" | "adotado";

export type Cat = {
  id: string;
  slug: string;
  name: string;
  age_description: string;
  sex: string;
  description: string;
  personality: string;
  health_info: string;
  photos: string[];
  status: CatStatus;
  created_at: string;
};

export type AgeGroup = "filhote" | "adulto" | "idoso";

export function ageGroup(ageDescription: string): AgeGroup {
  const text = ageDescription.toLocaleLowerCase("pt-BR");
  if (text.includes("filhote") || text.includes("mês") || text.includes("mes")) {
    return "filhote";
  }
  const years = text.match(/(\d+)\s*anos?/);
  if (text.includes("idos") || (years !== null && Number(years[1]) >= 8)) {
    return "idoso";
  }
  return "adulto";
}

export const statusLabel: Record<CatStatus, string> = {
  disponivel: "Disponível",
  em_processo: "Em andamento",
  adotado: "Adotado",
};

const statusOrder: Record<CatStatus, number> = {
  disponivel: 0,
  em_processo: 1,
  adotado: 2,
};

const cats: Cat[] = [
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d001",
    slug: "mingau",
    name: "Mingau",
    age_description: "Jovem - 1 ano",
    sex: "Macho",
    description:
      "O Mingau apareceu na porta de uma padaria, preto e branco, e ficou. Esperou todo mundo ir embora e só então aceitou comida na mão. Hoje ele acompanha a pessoa pela casa, senta do lado e observa a conversa como se fizesse parte. Com outros gatos, prefere um canto só dele no começo e vai se aproximando no tempo dele.",
    personality:
      "Curioso, falante e já dorme no colo de quem para por um minuto.",
    health_info:
      "Castrado, vacinado (V4 e antirrábica) e vermifugado. Teste FIV/FeLV negativo. Sem histórico de doença crônica.",
    photos: ["/gatos/mingau-1.jpg", "/gatos/mingau-2.jpg"],
    status: "disponivel",
    created_at: "2026-08-05T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d002",
    slug: "luna",
    name: "Luna",
    age_description: "Adulta - 2 anos",
    sex: "Fêmea",
    description:
      "A Luna veio de uma casa que não podia mais ficar com ela. É uma gata de pelo longo, laranja, que escolhe o sofá e passa a tarde ali, de barriga para cima. Não gosta de barulho alto nem de colo forçado: chega perto, encosta e decide. Com rotina calma, vira sombra da casa.",
    personality:
      "Calma de sofá, observa tudo e escolhe com calma em quem confiar.",
    health_info:
      "Castrada, vacinada (V4 e antirrábica) e vermifugada. Teste FIV/FeLV negativo. Pelagem longa pede escova uma vez por semana.",
    photos: ["/gatos/luna-1.jpg", "/gatos/luna-2.jpg"],
    status: "disponivel",
    created_at: "2026-08-20T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d003",
    slug: "amora",
    name: "Amora",
    age_description: "Adulta - 1 ano",
    sex: "Fêmea",
    description:
      "A Amora foi resgatada com a ninhada já desmanchada e cresceu em lar temporário. É laranja, de cauda anelada, e trata qualquer bolinha como assunto sério. À noite corre pelo corredor; de tarde pede colo e ronrona alto. Convive bem com outro gato adulto que respeite o espaço dela.",
    personality:
      "Brincalhona, persegue bolinha e pede colo no fim da tarde.",
    health_info:
      "Castrada, vacinada (V4 e antirrábica) e vermifugada. Teste FIV/FeLV negativo. Sem sequelas do resgate.",
    photos: ["/gatos/amora-1.jpg", "/gatos/amora-2.jpg"],
    status: "disponivel",
    created_at: "2026-09-02T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d004",
    slug: "thor",
    name: "Thor",
    age_description: "Adulto - 4 anos",
    sex: "Macho",
    description:
      "O Thor morou a vida inteira em apartamento e precisa de um novo lar porque a família se mudou para um lugar que não aceita animais. É grande de presença e pequeno de exigência: fica perto de quem trabalha, mia pouco e gosta de uma janela com tela. Já está em conversa com uma pessoa interessada.",
    personality:
      "Manso, companheiro de quem fica em casa e não pede festa o dia todo.",
    health_info:
      "Castrado, vacinado (V4 e antirrábica) e vermifugado. Teste FIV/FeLV negativo. Check-up recente sem alterações.",
    photos: ["/gatos/thor-1.jpg", "/gatos/thor-2.jpg"],
    status: "em_processo",
    created_at: "2026-09-28T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d005",
    slug: "pipoca",
    name: "Pipoca",
    age_description: "Adulta - 3 anos",
    sex: "Fêmea",
    description:
      "A Pipoca tem pelo longo, cinza e branco, e uma paciência rara com filhotes. Veio de uma colônia em que mediava briga e lavava orelha alheia. Em casa, segue a pessoa até a cozinha e volta para a cama assim que o movimento baixa. Aceita outro gato, desde que a apresentação seja devagar.",
    personality:
      "Esperta, afetuosa e vira amiga de outros gatos em poucos dias.",
    health_info:
      "Castrada, vacinada (V4 e antirrábica) e vermifugada. Teste FIV/FeLV negativo. Pelagem longa: escova duas vezes por semana evita nó.",
    photos: ["/gatos/pipoca-1.jpg", "/gatos/pipoca-2.jpg"],
    status: "disponivel",
    created_at: "2026-09-18T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d006",
    slug: "simba",
    name: "Simba",
    age_description: "5 meses",
    sex: "Macho",
    description:
      "O Simba chegou ainda pequeno, rajado, bocejando para quem passasse. Aprendeu a caixinha de areia rápido e hoje passa o dia entre a soneca e o ataque à ponta do cadarço. É um filhote sociável, que aguenta o colo e também precisa de tempo no chão para gastar energia. Casa com tela nas janelas é o ideal.",
    personality:
      "Filhote alegre, sobe em tudo e adormece no meio da brincadeira.",
    health_info:
      "Vermifugado e com as vacinas de filhote em dia (V3/V4). Teste FIV/FeLV negativo. Castração combinada para quando atingir o peso, por volta dos 6 meses. Antirrábica ainda não, pela idade.",
    photos: ["/gatos/simba-1.jpg", "/gatos/simba-2.jpg"],
    status: "disponivel",
    created_at: "2026-10-02T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d007",
    slug: "nuvem",
    name: "Nuvem",
    age_description: "Adulto - 2 anos",
    sex: "Macho",
    description:
      "O Nuvem passou meses espiando o portão antes de entrar. Rajado, desconfiado no primeiro dia e grudado no segundo. Foi adotado por uma casa com quintal telado e janela de manhã. O perfil fica aqui para lembrar que o tempo de espera termina.",
    personality:
      "Curioso de canto de porta, e hoje tem um lar que ele mesmo escolheu.",
    health_info:
      "Na adoção: castrado, vacinado (V4 e antirrábica), vermifugado e teste FIV/FeLV negativo.",
    photos: ["/gatos/nuvem-1.jpg", "/gatos/nuvem-2.jpg"],
    status: "adotado",
    created_at: "2026-07-12T12:00:00.000Z",
  },
  {
    id: "4c1a9e20-7b31-4f0a-9c2d-11a0b6e8d008",
    slug: "mel",
    name: "Mel",
    age_description: "Adulta - 3 anos",
    sex: "Fêmea",
    description:
      "A Mel olhava de frente, olhos claros, e ronronava antes mesmo de encostar. Passou por duas visitas e na terceira a família já sabia o nome da caixinha. Foi adotada e segue bem. O perfil permanece como um final feliz.",
    personality:
      "Dócil, ronrona alto e encontrou uma família em poucas visitas.",
    health_info:
      "Na adoção: castrada, vacinada (V4 e antirrábica), vermifugada e teste FIV/FeLV negativo.",
    photos: ["/gatos/mel-1.jpg", "/gatos/mel-2.jpg"],
    status: "adotado",
    created_at: "2026-06-01T12:00:00.000Z",
  },
];

export async function getCats(): Promise<Cat[]> {
  return [...cats].sort((a, b) => {
    const byStatus = statusOrder[a.status] - statusOrder[b.status];
    if (byStatus !== 0) return byStatus;
    return b.created_at.localeCompare(a.created_at);
  });
}

export async function getCatBySlug(slug: string): Promise<Cat | null> {
  return cats.find((cat) => cat.slug === slug) ?? null;
}
