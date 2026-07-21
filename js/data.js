/* Dados fictícios — Prime Residence Imóveis */

const PROPERTIES = [
  {
    id: 1,
    title: "Apartamento Alto Padrão",
    price: 1280000,
    priceLabel: "R$ 1.280.000",
    city: "Belo Horizonte",
    neighborhood: "Lourdes",
    area: 148,
    rooms: 3,
    baths: 3,
    garage: 2,
    type: "Apartamento",
    purpose: "comprar",
    tags: ["Alto padrão", "Apartamento"],
    description: "Living integrado, varanda gourmet e acabamento em madeira clara com vista privilegiada para a cidade.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Casa Moderna",
    price: 890000,
    priceLabel: "R$ 890.000",
    city: "Contagem",
    neighborhood: "Eldorado",
    area: 210,
    rooms: 4,
    baths: 3,
    garage: 3,
    type: "Casa",
    purpose: "comprar",
    tags: ["Casa"],
    description: "Projeto contemporâneo com jardim, iluminação natural e cozinha americana — pronta para morar.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Cobertura Vista Mar",
    price: 2350000,
    priceLabel: "R$ 2.350.000",
    city: "Nova Lima",
    neighborhood: "Vila da Serra",
    area: 286,
    rooms: 4,
    baths: 5,
    garage: 4,
    type: "Cobertura",
    purpose: "comprar",
    tags: ["Cobertura", "Alto padrão", "Lançamento"],
    description: "Cobertura duplex com terraço, piscina privativa e panorama aberto — exclusividade rara na região.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    launch: true
  },
  {
    id: 4,
    title: "Casa em Condomínio",
    price: 1750000,
    priceLabel: "R$ 1.750.000",
    city: "Nova Lima",
    neighborhood: "Alphaville",
    area: 320,
    rooms: 4,
    baths: 4,
    garage: 4,
    type: "Condomínio",
    purpose: "comprar",
    tags: ["Condomínio", "Alto padrão"],
    description: "Segurança 24h, área de lazer completa e residência ampla com suíte master e home office.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Apartamento Compacto",
    price: 420000,
    priceLabel: "R$ 420.000",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    area: 52,
    rooms: 1,
    baths: 1,
    garage: 1,
    type: "Apartamento",
    purpose: "comprar",
    tags: ["Apartamento"],
    description: "Ideal para o primeiro imóvel ou investimento: bem localizado, mobiliado e com baixa manutenção.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Sobrado Familiar",
    price: 690000,
    priceLabel: "R$ 690.000",
    city: "Betim",
    neighborhood: "Centro",
    area: 185,
    rooms: 3,
    baths: 2,
    garage: 2,
    type: "Sobrado",
    purpose: "comprar",
    tags: ["Casa"],
    description: "Quintal generoso, três suítes e espaço para a família crescer sem abrir mão da praticidade.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "Studio Premium Centro",
    price: 2800,
    priceLabel: "R$ 2.800",
    priceSuffix: "/mês",
    city: "Belo Horizonte",
    neighborhood: "Funcionários",
    area: 38,
    rooms: 1,
    baths: 1,
    garage: 1,
    type: "Apartamento",
    purpose: "alugar",
    tags: ["Apartamento"],
    description: "Studio novo, mobiliado e a poucos passos do centro corporativo — perfeito para profissionais.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "Casa com Jardim",
    price: 4500,
    priceLabel: "R$ 4.500",
    priceSuffix: "/mês",
    city: "Belo Horizonte",
    neighborhood: "Buritis",
    area: 160,
    rooms: 3,
    baths: 2,
    garage: 2,
    type: "Casa",
    purpose: "alugar",
    tags: ["Casa"],
    description: "Ambientes claros, churrasqueira e rua tranquila — aluguel pensado para famílias.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    title: "Loft Industrial Savassi",
    price: 980000,
    priceLabel: "R$ 980.000",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    area: 92,
    rooms: 2,
    baths: 2,
    garage: 1,
    type: "Apartamento",
    purpose: "comprar",
    tags: ["Lançamento", "Apartamento"],
    description: "Pé-direito duplo, concreto aparente e cozinha gourmet — personalidade para quem valoriza design.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    launch: true
  }
];

const LAUNCHES = PROPERTIES.filter((p) => p.launch || p.tags.includes("Lançamento"));

const TESTIMONIALS = [
  {
    name: "Camila Ferreira",
    role: "Comprou em Lourdes",
    text: "Eu achava que comprar o primeiro apartamento ia ser um caos de papelada. A equipe da Prime explicou cada etapa sem pressa — e a gente fechou sem susto.",
    avatar: "https://i.pravatar.cc/120?img=5",
    rating: 5
  },
  {
    name: "Rafael Mendes",
    role: "Investidor",
    text: "Não queria só um anúncio bonito. Queria análise de valorização. Saí com números claros e comprei um studio que já está alugado.",
    avatar: "https://i.pravatar.cc/120?img=12",
    rating: 5
  },
  {
    name: "Juliana e Pedro Costa",
    role: "Família — Nova Lima",
    text: "Visitamos três casas no mesmo sábado. O consultor foi honesto sobre o que precisava de reforma. Isso fez toda a diferença.",
    avatar: "https://i.pravatar.cc/120?img=32",
    rating: 5
  },
  {
    name: "Ana Beatriz Lopes",
    role: "Aluguel em Funcionários",
    text: "Mudei de cidade por causa do trabalho. Em dois dias tinham opções reais, perto do escritório e dentro do orçamento que eu tinha falado.",
    avatar: "https://i.pravatar.cc/120?img=9",
    rating: 5
  },
  {
    name: "Marcos Vinícius",
    role: "Vendeu cobertura",
    text: "Avaliaram o imóvel com pé no chão, sem inflar expectativa. Em seis semanas estava vendido — e a documentação foi impecável.",
    avatar: "https://i.pravatar.cc/120?img=15",
    rating: 5
  },
  {
    name: "Larissa Nogueira",
    role: "Casal — primeiro imóvel",
    text: "A gente travava em financiamento. Eles sentaram, simularam e acharam um caminho que cabia. Hoje a chave está conosco.",
    avatar: "https://i.pravatar.cc/120?img=20",
    rating: 5
  },
  {
    name: "Eduardo Tanaka",
    role: "Empresário",
    text: "Precisava de agilidade e discrição. Atendimento direto, visitas organizadas e zero enrolação. Recomendo de olhos fechados.",
    avatar: "https://i.pravatar.cc/120?img=33",
    rating: 5
  },
  {
    name: "Patrícia Almeida",
    role: "Comprou sobrado em Betim",
    text: "Senti que estavam do nosso lado, não só fechando negócio. Isso é raro — e foi exatamente o que a gente precisava.",
    avatar: "https://i.pravatar.cc/120?img=47",
    rating: 5
  }
];

const BLOG_POSTS = [
  {
    title: "Como financiar seu primeiro imóvel sem se perder no processo",
    excerpt: "Do score à entrada: um passo a passo objetivo para quem está começando e não quer surpresas na assinatura.",
    category: "Financiamento",
    date: "12 jun 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Documentação necessária para comprar com segurança",
    excerpt: "O checklist que evita dor de cabeça — o que pedir, o que conferir e quando envolver um especialista.",
    category: "Guia prático",
    date: "28 mai 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Vale a pena investir em imóveis em 2026?",
    excerpt: "Cenário local, rentabilidade de aluguel e o que observar antes de colocar capital em tijolo.",
    category: "Investimento",
    date: "04 mai 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Casa ou apartamento? Como decidir de verdade",
    excerpt: "Rotina, manutenção, segurança e estilo de vida — critérios que importam mais do que tendência de mercado.",
    category: "Decisão",
    date: "18 abr 2026",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
  }
];

const FAQ_ITEMS = [
  {
    q: "A Prime Residence atende só imóveis de alto padrão?",
    a: "Não. Trabalhamos com alto padrão e também com imóveis acessíveis — do primeiro studio à cobertura. O que não muda é o cuidado no atendimento."
  },
  {
    q: "Vocês ajudam com financiamento bancário?",
    a: "Sim. Temos parcerias e orientamos a simulação, a documentação e o encaixe da parcela no seu planejamento, sem empurrar crédito inadequado."
  },
  {
    q: "Como funciona a avaliação gratuita do meu imóvel?",
    a: "Agendamos uma visita técnica, analisamos comparáveis da região e entregamos uma estimativa realista — útil para vender ou para decidir o momento certo."
  },
  {
    q: "Posso agendar visitas nos finais de semana?",
    a: "Sim. Atendemos aos sábados pela manhã e, sob combinado, organizamos visitas em horários que cabem na sua rotina."
  },
  {
    q: "A documentação fica por conta de vocês?",
    a: "Acompanhamos toda a análise jurídica e o fluxo até a assinatura. Você não fica sozinho com contratos e exigências cartorárias."
  },
  {
    q: "Atendem compra, venda e locação?",
    a: "Sim — além de consultoria para quem investe. Contamos a história do imóvel e do cliente com o mesmo nível de atenção."
  }
];
