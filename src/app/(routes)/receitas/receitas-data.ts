export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  time: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  image: string; // Principal (pode ser 4:3)
  imageGallery: string[]; // [4:3, 1:1, 1920x1080]
  products: {
    name: string;
    quantity: string;
    image: string; // Caminho da imagem do produto (usando as 4:3)
    productId?: string;
    link?: string;
  }[];
  author: string;
  authorBio?: string;
  authorImage?: string;
  featured: boolean;
  servings: number;
  calories?: number;
  ingredients: string[];
  steps: {
    step: number;
    description: string;
    tip?: string;
  }[];
  tips?: string[];
  history?: string;
  relatedRecipes?: string[];
  createdAt: string;
}

export const RECIPES: Recipe[] = [
  {
    id: "rec_01",
    slug: "costela-defumada-com-polenta",
    title: "Costela Defumada com Polenta Cremosa",
    description:
      "Costela defumada por 12h no fumeiro artesanal, servida sobre uma polenta cremosa feita com queijo minas curado. O sabor da roça em cada garfada.",
    category: "Jantar",
    time: "180 min",
    difficulty: "Médio",
    image: "/roceria/Costela Defumada - Fumeiro 12h 1.png",
    imageGallery: [
      "/roceria/Costela Defumada - Fumeiro 12h 1.png",
      "/roceria/Costela Defumada - Fumeiro 12h 2.png",
      "/roceria/Costela Defumada - Fumeiro 12h 3.png",
    ],
    products: [
      {
        name: "Costela Defumada - Fumeiro 12h",
        quantity: "1,5kg",
        image: "/roceria/Costela Defumada - Fumeiro 12h 1.png",
        productId: "costela-001",
        link: "/shop/costela-defumada",
      },
      {
        name: "Queijo Minas Curado",
        quantity: "200g",
        image: "/roceria/Queijo Minas Curado 1.png",
        productId: "queijo-001",
        link: "/shop/queijo-minas-curado",
      },
      {
        name: "Banha de Porco",
        quantity: "2 colheres",
        image: "/roceria/Banha de Porco 1.png",
        productId: "banha-001",
        link: "/shop/banha-porco",
      },
    ],
    author: "Zaca da Roça",
    authorBio:
      "Zaca é mestre no fumeiro, terceira geração de uma família de produtores de embutidos do Vale do Paraíba. Seu segredo é o tempo e a paciência.",
    featured: true,
    servings: 6,
    calories: 890,
    ingredients: [
      "1,5kg de Costela Defumada ROCERIA",
      "500g de fubá mimoso",
      "2 litros de água",
      "200g de Queijo Minas Curado ROCERIA ralado",
      "2 colheres de Banha de Porco ROCERIA",
      "1 cebola grande picada",
      "4 dentes de alho picados",
      "Sal e pimenta do reino a gosto",
      "Cheiro verde picado",
    ],
    steps: [
      {
        step: 1,
        description:
          "Em uma panela grande, aqueça 1 colher de banha de porco e doure a costela defumada em pedaços. Retire e reserve.",
        tip: "A costela já vem defumada, então não precisa cozinhar muito, apenas aquecer e dourar.",
      },
      {
        step: 2,
        description:
          "Na mesma panela, adicione mais banha e refogue a cebola e o alho até murcharem.",
      },
      {
        step: 3,
        description:
          "Acrescente a água e deixe ferver. Quando ferver, adicione o fubá em chuva, mexendo sem parar para não empelotar.",
        tip: "Use um fouet para garantir que não forme grumos.",
      },
      {
        step: 4,
        description:
          "Cozinhe em fogo baixo por 40 minutos, mexendo de vez em quando, até a polenta desgrudar do fundo da panela.",
      },
      {
        step: 5,
        description:
          "Desligue o fogo e misture o queijo minas curado ralado. Mexa até derreter.",
      },
      {
        step: 6,
        description:
          "Sirva a polenta cremosa com os pedaços de costela defumada por cima. Finalize com cheiro verde.",
      },
    ],
    tips: [
      "Acompanha muito bem um vinho tinto encorpado ou uma cerveja artesanal escura.",
      "Se preferir a polenta mais firme, deixe cozinhar por mais tempo ou use menos água.",
      "A costela pode ser desfiada e misturada à polenta para uma versão ainda mais rústica.",
    ],
    history:
      "Essa receita é inspirada nos almoços de domingo na casa do Zaca, onde a família inteira se reúne em volta do fogão à lenha para saborear a costela que passou a noite inteira no fumeiro.",
    createdAt: "2024-01-15",
  },
  {
    id: "rec_02",
    slug: "tropeirismo-mineiro",
    title: "Feijão Tropeiro Autêntico",
    description:
      "O verdadeiro feijão tropeiro mineiro, feito com a mistura pronta da ROCERIA e finalizado com torresmo pururuca crocante.",
    category: "Almoço",
    time: "45 min",
    difficulty: "Fácil",
    image: "/roceria/Feijão Tropeiro - Mistura Pronta 1.png",
    imageGallery: [
      "/roceria/Feijão Tropeiro - Mistura Pronta 1.png",
      "/roceria/Feijão Tropeiro - Mistura Pronta 2.png",
      "/roceria/Feijão Tropeiro - Mistura Pronta 3.png",
    ],
    products: [
      {
        name: "Feijão Tropeiro - Mistura Pronta",
        quantity: "500g",
        image: "/roceria/Feijão Tropeiro - Mistura Pronta 1.png",
        productId: "tropeiro-001",
        link: "/shop/feijao-tropeiro",
      },
      {
        name: "Torresmo Pururuca",
        quantity: "200g",
        image: "/roceria/Torresmo Pururuca 1.png",
        productId: "torresmo-001",
        link: "/shop/torresmo-pururuca",
      },
      {
        name: "Banha de Porco",
        quantity: "2 colheres",
        image: "/roceria/Banha de Porco 1.png",
        productId: "banha-001",
        link: "/shop/banha-porco",
      },
    ],
    author: "Tia Maria",
    authorBio:
      "Tia Maria aprendeu a cozinhar com sua avó, que era cozinheira de tropa no interior de Minas. Hoje ela mantém viva a tradição da culinária tropeira.",
    featured: true,
    servings: 8,
    calories: 550,
    ingredients: [
      "500g de Feijão Tropeiro - Mistura Pronta ROCERIA",
      "200g de Torresmo Pururuca ROCERIA",
      "2 colheres de Banha de Porco ROCERIA",
      "2 ovos caipiras",
      "Couve picada a gosto",
      "Cheiro verde picado",
    ],
    steps: [
      {
        step: 1,
        description:
          "Em uma panela, aqueça a banha de porco e adicione a mistura pronta de feijão tropeiro.",
        tip: "A mistura já contém feijão, farinha e temperos, então é só aquecer.",
      },
      {
        step: 2,
        description:
          "Misture bem e deixe fritar levemente por 5 minutos para incorporar os sabores.",
      },
      {
        step: 3,
        description:
          "Em uma frigideira à parte, frite os ovos na banha de porco, com a gema mole.",
      },
      {
        step: 4,
        description:
          "Sirva o feijão tropeiro com os ovos fritos por cima, finalize com torresmo pururuca, couve picada e cheiro verde.",
      },
    ],
    tips: [
      "O feijão tropeiro fica ainda melhor no dia seguinte, quando os sabores se intensificam.",
      "Acompanha bem com uma linguiça toscana grelhada.",
    ],
    createdAt: "2024-01-20",
  },
  {
    id: "rec_03",
    slug: "tábua-de-queijos-premium",
    title: "Tábua de Queijos Artesanais com Geleia de Pimenta",
    description:
      "Uma seleção dos melhores queijos artesanais ROCERIA servidos com geleia de pimenta doce e picante. Perfeito para receber.",
    category: "Petiscos",
    time: "15 min",
    difficulty: "Fácil",
    image: "/roceria/Kit Queijos Artesanais - 4 Tipos 1.png",
    imageGallery: [
      "/roceria/Kit Queijos Artesanais - 4 Tipos 1.png",
      "/roceria/Kit Queijos Artesanais - 4 Tipos 2.png",
      "/roceria/Kit Queijos Artesanais - 4 Tipos 3.png",
    ],
    products: [
      {
        name: "Kit Queijos Artesanais - 4 Tipos",
        quantity: "1 kit",
        image: "/roceria/Kit Queijos Artesanais - 4 Tipos 1.png",
        productId: "kit-queijos-001",
        link: "/shop/kit-queijos",
      },
      {
        name: "Geleia de Pimenta - Doce e Picante",
        quantity: "1 pote",
        image: "/roceria/Geleia de Pimenta - Doce e Picante 1.png",
        productId: "geleia-001",
        link: "/shop/geleia-pimenta",
      },
    ],
    author: "Chef Rodrigo",
    authorBio:
      "Chef Rodrigo é especialista em harmonizações e consultor gastronômico da ROCERIA, sempre buscando valorizar os produtos artesanais brasileiros.",
    featured: false,
    servings: 4,
    calories: 450,
    ingredients: [
      "Kit Queijos Artesanais ROCERIA (Canastra, Minas Curado, Coalho, Frescal)",
      "Geleia de Pimenta ROCERIA",
      "Pão de fermentação natural",
      "Nozes e castanhas",
      "Mel de engenho para acompanhar",
    ],
    steps: [
      {
        step: 1,
        description:
          "Retire os queijos da geladeira 30 minutos antes de servir para que fiquem em temperatura ambiente.",
        tip: "Queijos em temperatura ambiente liberam melhor seus aromas e sabores.",
      },
      {
        step: 2,
        description:
          "Disponha os queijos em uma tábua de madeira, intercalando texturas e sabores.",
      },
      {
        step: 3,
        description:
          "Coloque a geleia de pimenta em uma tigela pequena ao centro da tábua.",
      },
      {
        step: 4,
        description:
          "Adicione as nozes, castanhas e fatias de pão nos espaços vazios.",
      },
      {
        step: 5,
        description:
          "Sirva com uma taça de vinho tinto seco ou uma cerveja artesanal.",
      },
    ],
    tips: [
      "Experimente combinar o queijo canastra com a geleia de pimenta - é uma combinação surpreendente!",
      "O queijo coalho pode ser levemente aquecido na frigideira para ficar derretido.",
    ],
    createdAt: "2024-02-01",
  },
  {
    id: "rec_04",
    slug: "linguica-calabresa-ao-vinho",
    title: "Linguiça Calabresa ao Vinho Tinto",
    description:
      "Linguiça calabresa artesanal ROCERIA cozida lentamente no vinho tinto, servida com cebolas caramelizadas.",
    category: "Jantar",
    time: "40 min",
    difficulty: "Fácil",
    image: "/roceria/Linguiça Calabresa 1.png",
    imageGallery: [
      "/roceria/Linguiça Calabresa 1.png",
      "/roceria/Linguiça Calabresa 2.png",
      "/roceria/Linguiça Calabresa 3.png",
    ],
    products: [
      {
        name: "Linguiça Calabresa",
        quantity: "500g",
        image: "/roceria/Linguiça Calabresa 1.png",
        productId: "linguica-001",
        link: "/shop/linguica-calabresa",
      },
      {
        name: "Vinagrete Artesanal - Vinho Tinto",
        quantity: "100ml",
        image: "/roceria/inagrete Artesanal - Vinho Tinto 1.png",
        productId: "vinagrete-001",
        link: "/shop/vinagrete-vinho",
      },
    ],
    author: "Zaca da Roça",
    featured: false,
    servings: 4,
    calories: 580,
    ingredients: [
      "500g de Linguiça Calabresa ROCERIA",
      "100ml de Vinagrete Artesanal - Vinho Tinto ROCERIA",
      "1 taça de vinho tinto seco",
      "2 cebolas grandes cortadas em rodelas",
      "2 colheres de Banha de Porco ROCERIA",
      "Salsinha picada",
    ],
    steps: [
      {
        step: 1,
        description: "Corte a linguiça calabresa em pedaços médios.",
      },
      {
        step: 2,
        description:
          "Em uma panela, aqueça a banha de porco e doure as rodelas de cebola. Reserve.",
      },
      {
        step: 3,
        description:
          "Na mesma panela, coloque a linguiça e deixe dourar levemente.",
      },
      {
        step: 4,
        description:
          "Adicione o vinho tinto e o vinagrete, deixe cozinhar em fogo médio até reduzir o líquido pela metade.",
        tip: "O álcool do vinho evapora e deixa apenas o sabor intenso da uva.",
      },
      {
        step: 5,
        description:
          "Volte as cebolas caramelizadas para a panela, misture bem e finalize com salsinha.",
      },
    ],
    tips: [
      "Sirva com pão italiano e um bom queijo minas frescal.",
      "O molho reduzido fica delicioso para mergulhar o pão.",
    ],
    createdAt: "2024-02-10",
  },
  {
    id: "rec_05",
    slug: "doce-de-leite-com-queijo-canastra",
    title: "Sobremesa Caipira: Doce de Leite com Queijo Canastra",
    description:
      "A combinação perfeita entre o doce de leite de panelão de cobre e o queijo canastra maturado. Uma sobremesa simples e sofisticada.",
    category: "Sobremesas",
    time: "10 min",
    difficulty: "Fácil",
    image: "/roceria/Doce de Leite - Panelão de Cobre 1.png",
    imageGallery: [
      "/roceria/Doce de Leite - Panelão de Cobre 1.png",
      "/roceria/Doce de Leite - Panelão de Cobre 2.png",
      "/roceria/Doce de Leite - Panelão de Cobre 3.png",
    ],
    products: [
      {
        name: "Doce de Leite - Panelão de Cobre",
        quantity: "200g",
        image: "/roceria/Doce de Leite - Panelão de Cobre 1.png",
        productId: "doce-001",
        link: "/shop/doce-leite",
      },
      {
        name: "Queijo Canastra",
        quantity: "150g",
        image: "/roceria/Queijo Canastra 1.png",
        productId: "queijo-002",
        link: "/shop/queijo-canastra",
      },
    ],
    author: "Dona Dirce",
    featured: true,
    servings: 4,
    calories: 380,
    ingredients: [
      "200g de Doce de Leite ROCERIA",
      "150g de Queijo Canastra ROCERIA em fatias",
      "Canela em pó a gosto",
    ],
    steps: [
      {
        step: 1,
        description:
          "Corte o queijo canastra em fatias médias e disponha em um prato.",
      },
      {
        step: 2,
        description: "Coloque o doce de leite em uma tigela ao lado do queijo.",
      },
      {
        step: 3,
        description: "Polvilhe canela a gosto sobre o doce de leite.",
      },
      {
        step: 4,
        description: "Sirva à temperatura ambiente, com pão ou torradas.",
        tip: "Experimente passar uma fatia de queijo no doce de leite - é uma explosão de sabores!",
      },
    ],
    tips: [
      "Se preferir, aqueça levemente o doce de leite para ficar mais cremoso.",
      "Um café coado na hora é o acompanhamento perfeito.",
    ],
    createdAt: "2024-02-15",
  },
  {
    id: "rec_06",
    slug: "torresmo-pururuca-com-limao",
    title: "Torresmo Pururuca Crocante com Limão",
    description:
      "O torresmo pururuca ROCERIA preparado de forma simples para manter a crocância, servido com limão e cheiro verde.",
    category: "Petiscos",
    time: "20 min",
    difficulty: "Fácil",
    image: "/roceria/Torresmo Pururuca 1.png",
    imageGallery: [
      "/roceria/Torresmo Pururuca 1.png",
      "/roceria/Torresmo Pururuca 2.png",
      "/roceria/Torresmo Pururuca 3.png",
    ],
    products: [
      {
        name: "Torresmo Pururuca",
        quantity: "300g",
        image: "/roceria/Torresmo Pururuca 1.png",
        productId: "torresmo-001",
        link: "/shop/torresmo-pururuca",
      },
    ],
    author: "Zaca da Roça",
    featured: false,
    servings: 4,
    calories: 680,
    ingredients: [
      "300g de Torresmo Pururuca ROCERIA",
      "1 limão taiti",
      "Cheiro verde picado",
      "Sal a gosto",
    ],
    steps: [
      {
        step: 1,
        description: "Aqueça o forno a 180°C.",
        tip: "Não use micro-ondas, pois o torresmo perde a crocância.",
      },
      {
        step: 2,
        description:
          "Espalhe os torresmos em uma assadeira e leve ao forno por 5-7 minutos para ficarem crocantes.",
      },
      {
        step: 3,
        description:
          "Retire do forno, esprema o limão por cima e salpique cheiro verde.",
      },
      {
        step: 4,
        description:
          "Sirva imediatamente, acompanhado de uma cerveja bem gelada.",
      },
    ],
    tips: [
      "O limão ajuda a cortar a gordura e realça o sabor do porco.",
      "Experimente com pimenta caseira ROCERIA para um toque picante.",
    ],
    createdAt: "2024-02-20",
  },
  {
    id: "rec_07",
    slug: "molho-de-pimenta-caseiro",
    title: "Molho de Pimenta Caseiro com Ervas",
    description:
      "Aprenda a fazer um molho de pimenta caseiro usando a Pimenta Caseira ROCERIA como base, perfeito para acompanhar carnes e queijos.",
    category: "Molhos",
    time: "15 min",
    difficulty: "Fácil",
    image: "/roceria/Molho de Pimenta Dedo-de-Moça 1.png",
    imageGallery: [
      "/roceria/Molho de Pimenta Dedo-de-Moça 1.png",
      "/roceria/Molho de Pimenta Dedo-de-Moça 2.png",
      "/roceria/Molho de Pimenta Dedo-de-Moça 3.png",
    ],
    products: [
      {
        name: "Pimenta Caseira - Malagueta Selecionada",
        quantity: "200ml",
        image: "/roceria/Pimenta Caseira - Malagueta Selecionada 1.png",
        productId: "pimenta-001",
        link: "/shop/pimenta-caseira",
      },
      {
        name: "Vinagrete Artesanal - Vinho Tinto",
        quantity: "50ml",
        image: "/roceria/inagrete Artesanal - Vinho Tinto 1.png",
        productId: "vinagrete-001",
        link: "/shop/vinagrete-vinho",
      },
    ],
    author: "Tia Maria",
    featured: false,
    servings: 10,
    calories: 120,
    ingredients: [
      "200ml de Pimenta Caseira ROCERIA",
      "50ml de Vinagrete Artesanal ROCERIA",
      "2 dentes de alho picados",
      "Cebolinha picada",
      "Salsinha picada",
      "Azeite a gosto",
    ],
    steps: [
      {
        step: 1,
        description:
          "Em uma tigela, misture a pimenta caseira com o vinagrete.",
      },
      {
        step: 2,
        description: "Adicione o alho picado, a cebolinha e a salsinha.",
      },
      {
        step: 3,
        description: "Regue com um fio de azeite e misture bem.",
      },
      {
        step: 4,
        description:
          "Deixe descansar por 30 minutos antes de servir para incorporar os sabores.",
      },
    ],
    tips: [
      "Esse molho dura até 2 semanas na geladeira em pote fechado.",
      "Fica delicioso em carnes, queijos, ovos e até no feijão.",
    ],
    createdAt: "2024-03-01",
  },
  {
    id: "rec_08",
    slug: "conserva-de-palmito-e-pepino",
    title: "Salada de Conserva de Palmito e Pepino",
    description:
      "Uma salada refrescante usando as conservas ROCERIA, perfeita para acompanhar carnes ou como entrada.",
    category: "Saladas",
    time: "15 min",
    difficulty: "Fácil",
    image: "/roceria/Palmito Pupunha 1.png",
    imageGallery: [
      "/roceria/Palmito Pupunha 1.png",
      "/roceria/Palmito Pupunha 2.png",
      "/roceria/Palmito Pupunha 3.png",
    ],
    products: [
      {
        name: "Palmito Pupunha",
        quantity: "1 vidro",
        image: "/roceria/Palmito Pupunha 1.png",
        productId: "palmito-001",
        link: "/shop/palmito-pupunha",
      },
      {
        name: "Pepino em Conserva",
        quantity: "1 vidro",
        image: "/roceria/Pepino em Conserva 1.png",
        productId: "pepino-001",
        link: "/shop/pepino-conserva",
      },
    ],
    author: "Chef Rodrigo",
    featured: false,
    servings: 6,
    calories: 180,
    ingredients: [
      "1 vidro de Palmito Pupunha ROCERIA",
      "1 vidro de Pepino em Conserva ROCERIA",
      "Cebola roxa em rodelas finas",
      "Azeite",
      "Suco de limão",
      "Salsinha picada",
    ],
    steps: [
      {
        step: 1,
        description: "Escorra as conservas e corte o palmito em rodelas.",
      },
      {
        step: 2,
        description:
          "Em uma tigela, misture o palmito, o pepino e a cebola roxa.",
      },
      {
        step: 3,
        description: "Tempere com azeite, suco de limão e salsinha.",
      },
      {
        step: 4,
        description: "Sirva fria como entrada ou acompanhamento.",
      },
    ],
    tips: [
      "Essa salada combina perfeitamente com carnes grelhadas.",
      "Pode ser preparada com até um dia de antecedência.",
    ],
    createdAt: "2024-03-05",
  },
  {
    id: "rec_09",
    slug: "cesta-familiar-churrasco",
    title: "Churrasco com Cesta Familiar ROCERIA",
    description:
      "Um churrasco completo usando os produtos da Cesta Familiar ROCERIA: embutidos defumados, queijos e pimentas.",
    category: "Almoço",
    time: "60 min",
    difficulty: "Fácil",
    image: "/roceria/Cesta Familiar - Sabores da Roça 1.png",
    imageGallery: [
      "/roceria/Cesta Familiar - Sabores da Roça 1.png",
      "/roceria/Cesta Familiar - Sabores da Roça 2.png",
      "/roceria/Cesta Familiar - Sabores da Roça 3.png",
    ],
    products: [
      {
        name: "Cesta Familiar - Sabores da Roça",
        quantity: "1 cesta",
        image: "/roceria/Cesta Familiar - Sabores da Roça 1.png",
        productId: "cesta-001",
        link: "/shop/cesta-familiar",
      },
    ],
    author: "Zaca da Roça",
    featured: false,
    servings: 8,
    calories: 950,
    ingredients: [
      "1 Cesta Familiar ROCERIA (linguiças, paio, queijos, pimentas)",
      "Pão de alho",
      "Vinagrete",
      "Farofa de mandioca",
    ],
    steps: [
      {
        step: 1,
        description: "Prepare a churrasqueira com carvão de boa qualidade.",
      },
      {
        step: 2,
        description:
          "Grelhe as linguiças calabresa, toscana e o paio lentamente.",
      },
      {
        step: 3,
        description: "Enquanto isso, prepare o vinagrete e a farofa.",
      },
      {
        step: 4,
        description:
          "Sirva as carnes com os queijos, pimentas e acompanhamentos.",
      },
    ],
    tips: [
      "As pimentas ROCERIA são perfeitas para acompanhar carnes grelhadas.",
      "O queijo coalho pode ser grelhado na churrasqueira.",
    ],
    createdAt: "2024-03-10",
  },
  {
    id: "rec_10",
    slug: "bacon-crocante-com-ovos",
    title: "Café da Manhã da Roça: Bacon Crocante com Ovos",
    description:
      "Um café da manhã reforçado com bacon de fumeiro ROCERIA, ovos caipiras e queijo coalho grelhado.",
    category: "Café da Manhã",
    time: "20 min",
    difficulty: "Fácil",
    image: "/roceria/Bacon de Fumeiro 1.png",
    imageGallery: [
      "/roceria/Bacon de Fumeiro 1.png",
      "/roceria/Bacon de Fumeiro 2.png",
      "/roceria/Bacon de Fumeiro 3.png",
    ],
    products: [
      {
        name: "Bacon de Fumeiro",
        quantity: "200g",
        image: "/roceria/Bacon de Fumeiro 1.png",
        productId: "bacon-001",
        link: "/shop/bacon-fumeiro",
      },
      {
        name: "Queijo Coalho",
        quantity: "150g",
        image: "/roceria/Queijo Coalho 1.png",
        productId: "queijo-004",
        link: "/shop/queijo-coalho",
      },
    ],
    author: "Dona Dirce",
    featured: false,
    servings: 4,
    calories: 520,
    ingredients: [
      "200g de Bacon de Fumeiro ROCERIA",
      "150g de Queijo Coalho ROCERIA",
      "4 ovos caipiras",
      "Pão francês ou de fermentação natural",
      "Café coado na hora",
    ],
    steps: [
      {
        step: 1,
        description:
          "Frite o bacon em uma frigideira até ficar crocante. Reserve.",
      },
      {
        step: 2,
        description: "Na mesma frigideira, frite os ovos com a gema mole.",
      },
      {
        step: 3,
        description:
          "Grelhe as fatias de queijo coalho na frigideira ou chapa.",
      },
      {
        step: 4,
        description: "Sirva com pão quente e café coado na hora.",
      },
    ],
    tips: [
      "O bacon de fumeiro tem sabor mais intenso que o bacon comum.",
      "O queijo coalho grelhado fica macio por dentro e crocante por fora.",
    ],
    createdAt: "2024-03-15",
  },
];
