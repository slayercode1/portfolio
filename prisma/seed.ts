import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined")
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// ============================================
// PROJECTS DATA
// ============================================
const projectsData = [
  {
    title: "SEIGOS",
    subtitle: "Yuakan Innovate",
    description:
      "Seigos est une plateforme SaaS polyvalente qui optimise la gestion de votre entreprise. Elle offre des solutions en gestion de projet, gestion financière et commerce, conçues pour augmenter l'efficacité de vos équipes. Avec Seigos, vous pouvez réduire les dépenses, gagner du temps et simplifier vos processus d'affaires.",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/27/10/42/271042e5-61b7-0534-c6c2-e9dc9e7c2326/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    technologies: ["NestJS", "Angular 13", "MySQL", "MariaDB"],
    category: "web" as const,
    websiteUrl: "https://seigos.fr/",
    hasLiveUrl: true,
  },
  {
    title: "StepPost",
    subtitle: "Step",
    description:
      "C'est une plateforme de distribution de courrier & colis. Une solution complète pour gérer les livraisons et le suivi des envois.",
    image: "/images/projects/steppost.png",
    technologies: ["Symfony", "MySQL", "PHP"],
    category: "web" as const,
    hasLiveUrl: false,
  },
  {
    title: "TaskFlow",
    subtitle: "Projet personnel",
    description:
      "Futur S.A.A.S destiné aux développeurs, pour la gestion de projets et autres, basé sur la méthode Agile. Une application moderne pour organiser et suivre vos projets.",
    image: "/images/projects/taskflow.png",
    technologies: ["React", "AdonisJS", "MySQL", "TypeScript"],
    category: "web" as const,
    hasLiveUrl: false,
  },
  {
    title: "Projet IOT",
    subtitle: "Projet formation",
    description:
      "Ce projet a été réalisé dans le cadre d'une formation, avec pour objectif de développer une application de bureau capable de récupérer des données depuis un ESP82. Une solution IoT complète.",
    image: "/images/projects/home.png",
    technologies: ["React", "Express", "MySQL", "TypeScript", "Arduino", "ESP82", "Electron"],
    category: "desktop" as const,
    hasLiveUrl: false,
  },
  {
    title: "Application Mobile Blog",
    subtitle: "Projet personnel",
    description:
      "L'objectif principal de ce projet est d'explorer en profondeur les technologies React Native et Expo. Ces outils, combinés à l'utilisation du langage de programmation JavaScript, nous permettent de concevoir et de construire une application mobile robuste, performante et multiplateforme.",
    image: "/images/projects/mobile.png",
    technologies: ["React Native", "TypeScript", "Expo", "React Navigation"],
    category: "mobile" as const,
    hasLiveUrl: false,
  },
]

// ============================================
// TECH STACK DATA
// ============================================
const techStack = [
  { name: "React", icon: "/images/tech/react.svg" },
  { name: "TypeScript", icon: "/images/tech/typescript-icon.svg" },
  { name: "JavaScript", icon: "/images/tech/javascript.svg" },
  { name: "Node.js", icon: "/images/tech/nodejs-icon.svg" },
  { name: "NestJS", icon: "/images/tech/nestjs.svg" },
  { name: "Express", icon: "/images/tech/express.svg" },
  { name: "AdonisJS", icon: "/images/tech/adonisjs-icon.svg" },
  { name: "Symfony", icon: "/images/tech/symfony.svg" },
  { name: "Angular", icon: "/images/tech/angular-icon.svg" },
  { name: "React Native", icon: "/images/tech/react.svg" },
  { name: "Expo", icon: "/images/tech/expo.svg" },
  { name: "MySQL", icon: "/images/tech/mysql-icon.svg" },
  { name: "MariaDB", icon: "/images/tech/mariadb-icon.svg" },
  { name: "Electron", icon: "/images/tech/electron.svg" },
  { name: "Vite", icon: "/images/tech/vitejs.svg" },
  { name: "Figma", icon: "/images/tech/figma.svg" },
]

// ============================================
// SCROLL LOGOS DATA
// ============================================
const scrollLogos = [
  { src: "/images/tech/react.svg", alt: "React" },
  { src: "/images/tech/expo.svg", alt: "Expo" },
  { src: "/images/tech/vitejs.svg", alt: "Vite.js" },
  { src: "/images/tech/angular-icon.svg", alt: "Angular" },
  { src: "/images/tech/electron.svg", alt: "Electron" },
  { src: "/images/tech/figma.svg", alt: "Figma" },
  { src: "/images/tech/visual-studio-code.svg", alt: "VS Code" },
  { src: "/images/tech/typescript-icon.svg", alt: "TypeScript" },
  { src: "/images/tech/javascript.svg", alt: "JavaScript" },
  { src: "/images/tech/mysql-icon.svg", alt: "MySQL" },
  { src: "/images/tech/npm-icon.svg", alt: "npm" },
  { src: "/images/tech/phpstorm.svg", alt: "PHPStorm" },
  { src: "/images/tech/notion-icon.svg", alt: "Notion" },
  { src: "/images/tech/slack-icon.svg", alt: "Slack" },
  { src: "/images/tech/discord-icon.svg", alt: "Discord" },
  { src: "/images/tech/typeorm.svg", alt: "TypeORM" },
  { src: "/images/tech/nodejs-icon.svg", alt: "Node.js" },
  { src: "/images/tech/express.svg", alt: "Express" },
]

// ============================================
// SOCIAL LINKS DATA
// ============================================
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yann-clain-185a91235/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/slayercode1",
    icon: "github",
  },
  {
    name: "X (Twitter)",
    url: "https://twitter.com/YannLeDev",
    icon: "twitter",
  },
]

// ============================================
// SERVICES DATA
// ============================================
const servicesFR = [
  {
    key: "web",
    title: "Développement Web",
    description: "Création de sites web et applications web modernes, responsives et performants avec les dernières technologies.",
    badgeText: "Web",
  },
  {
    key: "mobile",
    title: "Développement Mobile",
    description: "Applications mobiles cross-platform avec React Native et Expo pour iOS et Android.",
    badgeText: "Mobile",
  },
  {
    key: "backend",
    title: "Backend & API",
    description: "Architecture et développement d'APIs robustes avec Node.js, NestJS, AdonisJS ou Symfony.",
    badgeText: "Backend",
  },
  {
    key: "design",
    title: "UI/UX Design",
    description: "Conception d'interfaces utilisateur intuitives et esthétiques avec Figma.",
    badgeText: "Design",
  },
]

const servicesEN = [
  {
    key: "web",
    title: "Web Development",
    description: "Creating modern, responsive and high-performance websites and web applications with the latest technologies.",
    badgeText: "Web",
  },
  {
    key: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile applications with React Native and Expo for iOS and Android.",
    badgeText: "Mobile",
  },
  {
    key: "backend",
    title: "Backend & API",
    description: "Architecture and development of robust APIs with Node.js, NestJS, AdonisJS or Symfony.",
    badgeText: "Backend",
  },
  {
    key: "design",
    title: "UI/UX Design",
    description: "Design of intuitive and aesthetic user interfaces with Figma.",
    badgeText: "Design",
  },
]

// ============================================
// CONTACT BENEFITS DATA
// ============================================
const benefitsFR = [
  "Développement d'applications web modernes et performantes",
  "Solutions mobiles cross-platform avec React Native",
  "APIs robustes et architectures scalables",
  "Accompagnement de la conception à la mise en production",
  "Communication transparente et suivi régulier",
]

const benefitsEN = [
  "Modern and performant web application development",
  "Cross-platform mobile solutions with React Native",
  "Robust APIs and scalable architectures",
  "Support from design to production",
  "Transparent communication and regular follow-up",
]

// ============================================
// CONTACT STATS DATA
// ============================================
const statsFR = [
  { value: "5+", label: "Projets réalisés" },
  { value: "100%", label: "Satisfaction client" },
  { value: "3+", label: "Années d'expérience" },
  { value: "15+", label: "Technologies maîtrisées" },
]

const statsEN = [
  { value: "5+", label: "Completed projects" },
  { value: "100%", label: "Client satisfaction" },
  { value: "3+", label: "Years of experience" },
  { value: "15+", label: "Technologies mastered" },
]

// ============================================
// MAIN SEED FUNCTION
// ============================================
async function main() {
  console.log("🌱 Starting seed...")

  // ========== PROJECTS ==========
  for (let i = 0; i < projectsData.length; i++) {
    await prisma.project.upsert({
      where: { id: `project-${i + 1}` },
      update: projectsData[i],
      create: {
        id: `project-${i + 1}`,
        ...projectsData[i],
        order: i,
        isPublished: true,
      },
    })
  }
  console.log(`✅ ${projectsData.length} projects seeded`)

  // ========== TECHNOLOGIES ==========
  for (let i = 0; i < techStack.length; i++) {
    await prisma.technology.upsert({
      where: { name: techStack[i].name },
      update: { icon: techStack[i].icon, order: i },
      create: {
        name: techStack[i].name,
        icon: techStack[i].icon,
        order: i,
        isActive: true,
      },
    })
  }
  console.log(`✅ ${techStack.length} technologies seeded`)

  // ========== SCROLL LOGOS ==========
  for (let i = 0; i < scrollLogos.length; i++) {
    await prisma.scrollLogo.upsert({
      where: { id: `logo-${i + 1}` },
      update: { src: scrollLogos[i].src, alt: scrollLogos[i].alt },
      create: {
        id: `logo-${i + 1}`,
        src: scrollLogos[i].src,
        alt: scrollLogos[i].alt,
        order: i,
        isActive: true,
      },
    })
  }
  console.log(`✅ ${scrollLogos.length} scroll logos seeded`)

  // ========== SOCIAL LINKS ==========
  for (let i = 0; i < socialLinks.length; i++) {
    await prisma.socialLink.upsert({
      where: { id: `social-${i + 1}` },
      update: socialLinks[i],
      create: {
        id: `social-${i + 1}`,
        ...socialLinks[i],
        order: i,
        isActive: true,
      },
    })
  }
  console.log(`✅ ${socialLinks.length} social links seeded`)

  // ========== HERO SECTIONS ==========
  await prisma.heroSection.upsert({
    where: { locale: "fr" },
    update: {},
    create: {
      locale: "fr",
      greeting: "Bonjour, je suis",
      name: "Yann Clain",
      title: "Développeur web & web mobile | Concepteur D'application",
      description:
        "Passionné par la création et l'innovation, je mets mes compétences au service de vos projets. Actuellement à la recherche d'une entreprise pour une alternance en tant que Expert en informatique et systèmes d'information.",
      cvUrl: "",
      heroImage: "/images/Saly-43.png",
      projectsCount: 5,
      experienceYears: 3,
      technologiesCount: 15,
      ctaProjects: "Voir mes projets",
      ctaCv: "Télécharger CV",
      statsProjects: "Projets",
      statsExperience: "Années d'expérience",
      statsTechnologies: "Technologies",
    },
  })

  await prisma.heroSection.upsert({
    where: { locale: "en" },
    update: {},
    create: {
      locale: "en",
      greeting: "Hello, I'm",
      name: "Yann Clain",
      title: "Web & Mobile Web Developer | Application Designer",
      description:
        "Passionate about creation and innovation, I put my skills at the service of your projects. Currently looking for a company for an apprenticeship as an IT and Information Systems Expert.",
      cvUrl: "",
      heroImage: "/images/Saly-43.png",
      projectsCount: 5,
      experienceYears: 3,
      technologiesCount: 15,
      ctaProjects: "View my projects",
      ctaCv: "Download CV",
      statsProjects: "Projects",
      statsExperience: "Years of experience",
      statsTechnologies: "Technologies",
    },
  })
  console.log("✅ Hero sections seeded (FR/EN)")

  // ========== ABOUT SECTIONS ==========
  // Delete existing certifications first
  await prisma.certification.deleteMany({})

  const aboutFR = await prisma.aboutSection.upsert({
    where: { locale: "fr" },
    update: {},
    create: {
      locale: "fr",
      badge: "À propos de moi",
      title: "Qui suis-je ?",
      description:
        "Je suis un développeur passionné avec une expertise dans le développement web et mobile.",
      bio: "Fort de plusieurs années d'expérience dans le développement d'applications, je me spécialise dans la création de solutions numériques innovantes et performantes.",
      profileImage: "/images/Saly-43.png",
      certificationsTitle: "Certifications",
      stackTitle: "Mon stack technique",
    },
  })

  const aboutEN = await prisma.aboutSection.upsert({
    where: { locale: "en" },
    update: {},
    create: {
      locale: "en",
      badge: "About me",
      title: "Who am I?",
      description:
        "I'm a passionate developer with expertise in web and mobile development.",
      bio: "With several years of experience in application development, I specialize in creating innovative and high-performance digital solutions.",
      profileImage: "/images/Saly-43.png",
      certificationsTitle: "Certifications",
      stackTitle: "My tech stack",
    },
  })

  // ========== CERTIFICATIONS ==========
  const certificationsFR = [
    { key: "dev_web", title: "Développeur Web et Web Mobile (Bac+2)" },
    { key: "cda", title: "Concepteur Développeur d'Applications (Bac+3/4)" },
  ]

  const certificationsEN = [
    { key: "dev_web", title: "Web and Mobile Web Developer (Bac+2)" },
    { key: "cda", title: "Application Designer Developer (Bac+3/4)" },
  ]

  for (const cert of certificationsFR) {
    await prisma.certification.create({
      data: {
        key: cert.key,
        title: cert.title,
        locale: "fr",
        aboutSectionId: aboutFR.id,
      },
    })
  }

  for (const cert of certificationsEN) {
    await prisma.certification.create({
      data: {
        key: cert.key,
        title: cert.title,
        locale: "en",
        aboutSectionId: aboutEN.id,
      },
    })
  }
  console.log("✅ About sections with certifications seeded (FR/EN)")

  // ========== SERVICES ==========
  // Delete existing services first
  await prisma.service.deleteMany({})

  for (let i = 0; i < servicesFR.length; i++) {
    await prisma.service.create({
      data: {
        id: `service-${servicesFR[i].key}-fr`,
        ...servicesFR[i],
        locale: "fr",
        order: i,
        isActive: true,
      },
    })
    await prisma.service.create({
      data: {
        id: `service-${servicesEN[i].key}-en`,
        ...servicesEN[i],
        locale: "en",
        order: i,
        isActive: true,
      },
    })
  }
  console.log("✅ Services seeded (FR/EN)")

  // ========== CONTACT SECTIONS WITH BENEFITS, STATS & TECH LOGOS ==========
  // Delete existing contact data
  await prisma.contactTechLogo.deleteMany({})
  await prisma.contactBenefit.deleteMany({})
  await prisma.contactStat.deleteMany({})
  await prisma.contactSection.deleteMany({})

  // Tech logos for contact section
  const contactTechLogos = [
    { src: "/images/tech/react.svg", alt: "React" },
    { src: "/images/tech/typescript-icon.svg", alt: "TypeScript" },
    { src: "/images/tech/nodejs-icon.svg", alt: "Node.js" },
    { src: "/images/tech/nestjs.svg", alt: "NestJS" },
    { src: "/images/tech/mysql-icon.svg", alt: "MySQL" },
    { src: "/images/tech/figma.svg", alt: "Figma" },
  ]

  // Create FR contact section
  const contactFR = await prisma.contactSection.create({
    data: {
      locale: "fr",
      badge: "Contact",
      title: "Me Contacter",
      description:
        "Pour m'aider à comprendre au mieux votre projet, veuillez me fournir le maximum de détails possible. Plus j'ai d'informations, mieux je peux répondre à vos besoins.",
      socialsTitle: "Retrouvez-moi sur",
      techLogosTitle: "Technologies que j'utilise au quotidien",
      isFormEnabled: true,
    },
  })

  // Create FR benefits
  for (let i = 0; i < benefitsFR.length; i++) {
    await prisma.contactBenefit.create({
      data: {
        text: benefitsFR[i],
        order: i,
        contactSectionId: contactFR.id,
      },
    })
  }

  // Create FR stats
  for (let i = 0; i < statsFR.length; i++) {
    await prisma.contactStat.create({
      data: {
        value: statsFR[i].value,
        label: statsFR[i].label,
        order: i,
        contactSectionId: contactFR.id,
      },
    })
  }

  // Create FR tech logos
  for (let i = 0; i < contactTechLogos.length; i++) {
    await prisma.contactTechLogo.create({
      data: {
        src: contactTechLogos[i].src,
        alt: contactTechLogos[i].alt,
        order: i,
        contactSectionId: contactFR.id,
      },
    })
  }

  // Create EN contact section
  const contactEN = await prisma.contactSection.create({
    data: {
      locale: "en",
      badge: "Contact",
      title: "Contact Me",
      description:
        "To help me better understand your project, please provide as many details as possible. The more information I have, the better I can meet your needs.",
      socialsTitle: "Find me on",
      techLogosTitle: "Technologies I use daily",
      isFormEnabled: true,
    },
  })

  // Create EN benefits
  for (let i = 0; i < benefitsEN.length; i++) {
    await prisma.contactBenefit.create({
      data: {
        text: benefitsEN[i],
        order: i,
        contactSectionId: contactEN.id,
      },
    })
  }

  // Create EN stats
  for (let i = 0; i < statsEN.length; i++) {
    await prisma.contactStat.create({
      data: {
        value: statsEN[i].value,
        label: statsEN[i].label,
        order: i,
        contactSectionId: contactEN.id,
      },
    })
  }

  // Create EN tech logos
  for (let i = 0; i < contactTechLogos.length; i++) {
    await prisma.contactTechLogo.create({
      data: {
        src: contactTechLogos[i].src,
        alt: contactTechLogos[i].alt,
        order: i,
        contactSectionId: contactEN.id,
      },
    })
  }
  console.log("✅ Contact sections with benefits, stats & tech logos seeded (FR/EN)")

  // ========== SITE SETTINGS ==========
  await prisma.siteSettings.upsert({
    where: { id: "default-settings" },
    update: {},
    create: {
      id: "default-settings",
      siteName: "Yann Clain Portfolio",
      siteUrl: "https://portfolio.yannclain.com",
      logoUrl: "/images/logo.png",
      faviconUrl: "/favicon.png",
      metaTitle: "Yann Clain - Développeur Web & Mobile",
      metaDescription:
        "Portfolio de Yann Clain, développeur full stack spécialisé dans le développement web et mobile.",
    },
  })
  console.log("✅ Site settings seeded")

  console.log("🎉 Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
