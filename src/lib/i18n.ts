export type Language = 'pt' | 'en';

export const t = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre mim",
      stack: "Stack",
      projects: "Projetos",
      cv: "Download CV",
      contact: "Contato"
    },
    cv: {
      tag: "Currículo Oficial",
      title: "Documentação Profissional",
      desc: "Acesse o histórico completo das minhas experiências, competências acadêmicas e stacks tecnológicas em formato PDF.",
      btn: "[ Baixar Currículo.pdf ]"
    },
    hero: {
      boot1: "> Initializing core systems...",
      boot2: "> Establishing secure connection...",
      boot3: "> Loading modules: Software_Eng, Data_Eng, Ops",
      boot4: "> Booting pedro_portfolio.exe",
      boot5: "[ OK ] System Online.",
      title1: "Projetando sistemas.",
      title2: "Orquestrando dados.",
      title3: "Construindo infraestrutura.",
      desc: "Engenharia de Software, Dados, IA e DevOps para soluções corporativas robustas.",
      btnExplore: "Explorar Arquitetura",
      btnProjects: "Ver Projetos",
      scroll: "Scroll",
      visitor: "Visitante explorando o blueprint do portfólio."
    },
    about: {
      tag: "Sobre mim",
      title1: "Transformando ",
      title2: "complexidade",
      title3: " em solução.",
      p1: "Sou Pedro Henrique, estudante do 6º período de Redes de Computadores e apaixonado pela construção de sistemas distribuídos e resilientes.",
      p2: "Atuo na interseção entre engenharia de software e infraestrutura, projetando arquiteturas que são seguras e escaláveis desde a fundação da rede até a camada da aplicação.",
      p3: "Meu objetivo é aplicar o rigor das operações de TI no desenvolvimento de soluções conectadas e eficientes.",
      githubPrefix: "> Para saber mais sobre os projetos desenvolvidos, acesse o ",
      githubSuffix: "GitHub (@iphrick)",
      downloadCV: "Download Blueprint_CV.pdf"
    },
    stack: {
      tag: "Technical Blueprint",
      title: "Arquitetura de Habilidades",
      appTitle: "01 // Camada de Aplicação",
      appFront: "Frontend Avançado",
      appFrontDesc: "Next.js 15, React, TypeScript. Foco em Server Components e PWA.",
      appUi: "Interfaces Imersivas",
      appUiDesc: "TailwindCSS, Framer Motion e Three.js para design premium.",
      appMobile: "Mobile",
      appMobileDesc: "React Native e Expo para apps híbridos performáticos.",
      dataTitle: "02 // Camada de Dados e APIs",
      dataBackend: "Backend & Microsserviços",
      dataBackendDesc: "Node.js e Python para APIs resilientes e processamento pesado.",
      dataEtl: "Engenharia de Dados (ETL)",
      dataEtlDesc: "Apache Kafka, mensageria e construção de pipelines observáveis.",
      dataDb: "Banco de Dados",
      dataDbDesc: "PostgreSQL, Prisma ORM e modelagem relacional complexa.",
      infraTitle: "03 // Infraestrutura e Redes",
      infraCloud: "Cloud & Serverless",
      infraCloudDesc: "AWS (S3, EC2) e Cloudflare. Arquiteturas distribuídas.",
      infraDevops: "DevOps & Containers",
      infraDevopsDesc: "Docker, CI/CD, esteiras de automação e deploy contínuo.",
      infraNet: "Redes de Computadores",
      infraNetDesc: "TCP/IP, CDN, DNS, segurança de borda e load balancing."
    },
    projects: {
      tag: "Arquitetura de Projetos",
      title: "Produção e Escala",
      btnSimulate: "Iniciar Simulação",
      btnRepo: "[ Ver Repositório Aberto ]",
      btnPrivate: "[ Sistema Privado / Proprietário ]",
      back: "< Voltar para o Portfólio",
      simulation: "Simulação Interativa"
    },
    contact: {
      cmdNot: "Command not found",
      typeHelp: "Type 'help' for available commands.",
      availCmd: "Available commands",
      sudo: "Access Granted. Contacting Pedro Henrique for an interview... (Acesso concedido. Boa escolha!)"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      stack: "Stack",
      projects: "Projects",
      cv: "Download CV",
      contact: "Contact"
    },
    cv: {
      tag: "Official Resume",
      title: "Professional Documentation",
      desc: "Access the complete history of my experiences, academic background, and tech stacks in PDF format.",
      btn: "[ Download Resume.pdf ]"
    },
    hero: {
      boot1: "> Initializing core systems...",
      boot2: "> Establishing secure connection...",
      boot3: "> Loading modules: Software_Eng, Data_Eng, Ops",
      boot4: "> Booting pedro_portfolio.exe",
      boot5: "[ OK ] System Online.",
      title1: "Engineering systems.",
      title2: "Orchestrating data.",
      title3: "Building infrastructure.",
      desc: "Software Engineering, Data, AI, and DevOps for robust enterprise solutions.",
      btnExplore: "Explore Architecture",
      btnProjects: "View Projects",
      scroll: "Scroll",
      visitor: "Guest navigating the portfolio blueprint."
    },
    about: {
      tag: "About Me",
      title1: "Transforming ",
      title2: "complexity",
      title3: " into solutions.",
      p1: "I am Pedro Henrique, an undergraduate in Computer Networks (6th semester), passionate about building resilient distributed systems.",
      p2: "I work at the intersection of software engineering and infrastructure, designing secure and scalable architectures from the networking foundation up to the application layer.",
      p3: "My goal is to apply rigorous IT operations to develop connected and efficient solutions.",
      githubPrefix: "> To learn more about my developed projects, visit my ",
      githubSuffix: "GitHub (@iphrick)",
      downloadCV: "Download Blueprint_CV.pdf"
    },
    stack: {
      tag: "Technical Blueprint",
      title: "Skills Architecture",
      appTitle: "01 // Application Layer",
      appFront: "Advanced Frontend",
      appFrontDesc: "Next.js 15, React, TypeScript. Focused on Server Components and PWAs.",
      appUi: "Immersive Interfaces",
      appUiDesc: "TailwindCSS, Framer Motion, and Three.js for premium design.",
      appMobile: "Mobile",
      appMobileDesc: "React Native and Expo for performant hybrid apps.",
      dataTitle: "02 // Data Layer & APIs",
      dataBackend: "Backend & Microservices",
      dataBackendDesc: "Node.js and Python for resilient APIs and heavy processing.",
      dataEtl: "Data Engineering (ETL)",
      dataEtlDesc: "Apache Kafka, messaging, and observable pipeline construction.",
      dataDb: "Databases",
      dataDbDesc: "PostgreSQL, Prisma ORM, and complex relational modeling.",
      infraTitle: "03 // Infrastructure & Networks",
      infraCloud: "Cloud & Serverless",
      infraCloudDesc: "AWS (S3, EC2) and Cloudflare. Distributed architectures.",
      infraDevops: "DevOps & Containers",
      infraDevopsDesc: "Docker, CI/CD, automation pipelines, and continuous deployment.",
      infraNet: "Computer Networks",
      infraNetDesc: "TCP/IP, CDN, DNS, edge security, and load balancing."
    },
    projects: {
      tag: "Project Architecture",
      title: "Production & Scale",
      btnSimulate: "Start Simulation",
      btnRepo: "[ View Open Repository ]",
      btnPrivate: "[ Private / Proprietary System ]",
      back: "< Back to Portfolio",
      simulation: "Interactive Simulation"
    },
    contact: {
      cmdNot: "Command not found",
      typeHelp: "Type 'help' for available commands.",
      availCmd: "Available commands",
      sudo: "Access Granted. Contacting Pedro Henrique for an interview... (Great choice!)"
    }
  }
};

// Detalhes dos Projetos (Podemos deixar a descrição de cada um bilíngue também)
export const getProjectsDetails = (lang: Language) => {
  const isEn = lang === 'en';
  return {
    motosys: {
      title: "Motosys (SaaS Offline-First)",
      desc: isEn ? "Motosys is a management system designed for motorcycle repair shops with intermittent connectivity. The architecture implements an Offline-First pattern using IndexedDB and Service Workers to ensure the checkout and service queues never stop. When the network is restored, synchronization happens silently in the background." 
                 : "O Motosys é um sistema de gestão desenhado para oficinas mecânicas com conectividade intermitente. A arquitetura implementa o padrão Offline-First usando IndexedDB e Service Workers para garantir que o caixa e a fila de serviços nunca parem. Quando a rede é restabelecida, a sincronização acontece em background silenciosamente.",
      tags: ["React", "IndexedDB", "PWA", "Sync"],
      isPrivate: true
    },
    conecta: {
      title: "Conecta Ensino (EAD Platform)",
      desc: isEn ? "A distance learning platform built for high availability. The serverless backend transcodes video into multiple resolutions, distributing content via CDN using the HLS protocol. Includes DRM protection against piracy and a deep observability dashboard for content producers."
                 : "Uma plataforma de educação a distância projetada para alta disponibilidade. O backend serverless realiza a transcodificação de vídeo em múltiplas resoluções, distribuindo o conteúdo via CDN usando o protocolo HLS. Inclui proteção DRM contra pirataria e um painel de observabilidade profundo para produtores de conteúdo.",
      tags: ["Next.js", "Serverless", "HLS Streaming", "AWS"],
      isPrivate: true
    },
    juriquest: {
      title: "JuriQuest (Gamification)",
      desc: isEn ? "A mobile app that revolutionizes studying for legal exams. The core of the system is a recommendation engine that analyzes the user's error history to build adaptive mock exams under pressure. Includes a league system and weekly rankings to drive engagement."
                 : "Aplicativo móvel que revoluciona o estudo para concursos de direito. O core do sistema é um motor de recomendação que analisa o histórico de erros do usuário para montar simulados adaptativos sob pressão. Inclui um sistema de ligas e ranqueamento semanal para impulsionar o engajamento.",
      tags: ["React Native", "Gamification", "Algorithms"],
      repoLink: "https://github.com/iphrick"
    },
    dataguard: {
      title: "DataGuard ETL (Data Pipeline)",
      desc: isEn ? "An enterprise data engineering pipeline built to be fault-tolerant. The architecture is event-driven using Apache Kafka, automatically handling inconsistencies via dead-letter queues. Includes a real-time dashboard to monitor the health and latency of millions of records in transit."
                 : "Pipeline de engenharia de dados corporativo construído para ser à prova de falhas. A arquitetura é orientada a eventos usando Apache Kafka, lidando com inconsistências automaticamente através de dead-letter queues. Inclui um dashboard em tempo real para monitorar a saúde e a latência de milhões de registros em trânsito.",
      tags: ["Apache Kafka", "Python", "Data Engineering", "Observability"],
      repoLink: "https://github.com/iphrick"
    }
  };
};
