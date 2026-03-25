const { Pool } = require("pg");
const crypto = require("crypto");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function cuid() {
  return crypto.randomUUID();
}

async function query(sql, params = []) {
  return pool.query(sql, params);
}

async function upsert(table, where, create) {
  const whereKeys = Object.keys(where);
  const whereCond = whereKeys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ");
  const existing = await query(`SELECT id FROM "${table}" WHERE ${whereCond}`, Object.values(where));
  if (existing.rows.length > 0) return existing.rows[0];

  const keys = Object.keys(create);
  const vals = Object.values(create).map(v => Array.isArray(v) ? `{${v.map(s => `"${s}"`).join(",")}}` : v);
  const cols = keys.map(k => `"${k}"`).join(", ");
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  const result = await query(`INSERT INTO "${table}" (${cols}) VALUES (${placeholders}) RETURNING id`, vals);
  return result.rows[0];
}

async function main() {
  console.log("Starting seed...");
  const now = new Date();

  // PROJECTS
  const projects = [
    { title: "SEIGOS", subtitle: "Yuakan Innovate", description: "Seigos est une plateforme SaaS polyvalente qui optimise la gestion de votre entreprise. Elle offre des solutions en gestion de projet, gestion financière et commerce, conçues pour augmenter l'efficacité de vos équipes.", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/27/10/42/271042e5-61b7-0534-c6c2-e9dc9e7c2326/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg", technologies: ["NestJS", "Angular 13", "MySQL", "MariaDB"], category: "web", websiteUrl: "https://seigos.fr/", hasLiveUrl: true },
    { title: "StepPost", subtitle: "Step", description: "C'est une plateforme de distribution de courrier & colis. Une solution complète pour gérer les livraisons et le suivi des envois.", image: "/images/projects/steppost.png", technologies: ["Symfony", "MySQL", "PHP"], category: "web", hasLiveUrl: false },
    { title: "TaskFlow", subtitle: "Projet personnel", description: "Futur S.A.A.S destiné aux développeurs, pour la gestion de projets et autres, basé sur la méthode Agile.", image: "/images/projects/taskflow.png", technologies: ["React", "AdonisJS", "MySQL", "TypeScript"], category: "web", hasLiveUrl: false },
    { title: "Projet IOT", subtitle: "Projet formation", description: "Ce projet a été réalisé dans le cadre d'une formation, avec pour objectif de développer une application de bureau capable de récupérer des données depuis un ESP82.", image: "/images/projects/home.png", technologies: ["React", "Express", "MySQL", "TypeScript", "Arduino", "ESP82", "Electron"], category: "desktop", hasLiveUrl: false },
    { title: "Application Mobile Blog", subtitle: "Projet personnel", description: "L'objectif principal de ce projet est d'explorer en profondeur les technologies React Native et Expo.", image: "/images/projects/mobile.png", technologies: ["React Native", "TypeScript", "Expo", "React Navigation"], category: "mobile", hasLiveUrl: false },
  ];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await upsert("Project", { id: `project-${i + 1}` }, {
      id: `project-${i + 1}`, title: p.title, subtitle: p.subtitle, description: p.description,
      image: p.image, technologies: p.technologies, category: p.category,
      websiteUrl: p.websiteUrl || null, hasLiveUrl: p.hasLiveUrl, order: i, isPublished: true,
      createdAt: now, updatedAt: now,
    });
  }
  console.log(`${projects.length} projects seeded`);

  // TECHNOLOGIES
  const techStack = [
    { name: "React", icon: "/images/tech/react.svg" }, { name: "TypeScript", icon: "/images/tech/typescript-icon.svg" },
    { name: "JavaScript", icon: "/images/tech/javascript.svg" }, { name: "Node.js", icon: "/images/tech/nodejs-icon.svg" },
    { name: "NestJS", icon: "/images/tech/nestjs.svg" }, { name: "Express", icon: "/images/tech/express.svg" },
    { name: "AdonisJS", icon: "/images/tech/adonisjs-icon.svg" }, { name: "Symfony", icon: "/images/tech/symfony.svg" },
    { name: "Angular", icon: "/images/tech/angular-icon.svg" }, { name: "React Native", icon: "/images/tech/react.svg" },
    { name: "Expo", icon: "/images/tech/expo.svg" }, { name: "MySQL", icon: "/images/tech/mysql-icon.svg" },
    { name: "MariaDB", icon: "/images/tech/mariadb-icon.svg" }, { name: "Electron", icon: "/images/tech/electron.svg" },
    { name: "Vite", icon: "/images/tech/vitejs.svg" }, { name: "Figma", icon: "/images/tech/figma.svg" },
  ];

  for (let i = 0; i < techStack.length; i++) {
    await upsert("Technology", { name: techStack[i].name }, {
      id: cuid(), name: techStack[i].name, icon: techStack[i].icon, order: i, isActive: true, createdAt: now, updatedAt: now,
    });
  }
  console.log(`${techStack.length} technologies seeded`);

  // SCROLL LOGOS
  const scrollLogos = [
    { src: "/images/tech/react.svg", alt: "React" }, { src: "/images/tech/expo.svg", alt: "Expo" },
    { src: "/images/tech/vitejs.svg", alt: "Vite.js" }, { src: "/images/tech/angular-icon.svg", alt: "Angular" },
    { src: "/images/tech/electron.svg", alt: "Electron" }, { src: "/images/tech/figma.svg", alt: "Figma" },
    { src: "/images/tech/visual-studio-code.svg", alt: "VS Code" }, { src: "/images/tech/typescript-icon.svg", alt: "TypeScript" },
    { src: "/images/tech/javascript.svg", alt: "JavaScript" }, { src: "/images/tech/mysql-icon.svg", alt: "MySQL" },
    { src: "/images/tech/npm-icon.svg", alt: "npm" }, { src: "/images/tech/phpstorm.svg", alt: "PHPStorm" },
    { src: "/images/tech/notion-icon.svg", alt: "Notion" }, { src: "/images/tech/slack-icon.svg", alt: "Slack" },
    { src: "/images/tech/discord-icon.svg", alt: "Discord" }, { src: "/images/tech/typeorm.svg", alt: "TypeORM" },
    { src: "/images/tech/nodejs-icon.svg", alt: "Node.js" }, { src: "/images/tech/express.svg", alt: "Express" },
  ];

  for (let i = 0; i < scrollLogos.length; i++) {
    await upsert("ScrollLogo", { id: `logo-${i + 1}` }, {
      id: `logo-${i + 1}`, src: scrollLogos[i].src, alt: scrollLogos[i].alt, order: i, isActive: true, createdAt: now, updatedAt: now,
    });
  }
  console.log(`${scrollLogos.length} scroll logos seeded`);

  // SOCIAL LINKS
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/yann-clain-185a91235/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/slayercode1", icon: "github" },
    { name: "X (Twitter)", url: "https://twitter.com/YannLeDev", icon: "twitter" },
  ];

  for (let i = 0; i < socialLinks.length; i++) {
    await upsert("SocialLink", { id: `social-${i + 1}` }, {
      id: `social-${i + 1}`, name: socialLinks[i].name, url: socialLinks[i].url, icon: socialLinks[i].icon,
      order: i, isActive: true, createdAt: now, updatedAt: now,
    });
  }
  console.log(`${socialLinks.length} social links seeded`);

  // HERO SECTIONS
  await upsert("HeroSection", { locale: "fr" }, {
    id: cuid(), locale: "fr", greeting: "Bonjour, je suis", name: "Yann Clain",
    title: "Développeur web & web mobile | Concepteur D'application",
    description: "Passionné par la création et l'innovation, je mets mes compétences au service de vos projets. Actuellement à la recherche d'une entreprise pour une alternance en tant que Expert en informatique et systèmes d'information.",
    cvUrl: "", heroImage: "/images/Saly-43.png", projectsCount: 5, experienceYears: 3, technologiesCount: 15,
    ctaProjects: "Voir mes projets", ctaCv: "Télécharger CV",
    statsProjects: "Projets", statsExperience: "Années d'expérience", statsTechnologies: "Technologies",
    createdAt: now, updatedAt: now,
  });

  await upsert("HeroSection", { locale: "en" }, {
    id: cuid(), locale: "en", greeting: "Hello, I'm", name: "Yann Clain",
    title: "Web & Mobile Web Developer | Application Designer",
    description: "Passionate about creation and innovation, I put my skills at the service of your projects. Currently looking for a company for an apprenticeship as an IT and Information Systems Expert.",
    cvUrl: "", heroImage: "/images/Saly-43.png", projectsCount: 5, experienceYears: 3, technologiesCount: 15,
    ctaProjects: "View my projects", ctaCv: "Download CV",
    statsProjects: "Projects", statsExperience: "Years of experience", statsTechnologies: "Technologies",
    createdAt: now, updatedAt: now,
  });
  console.log("Hero sections seeded (FR/EN)");

  // ABOUT SECTIONS
  const aboutFR = await upsert("AboutSection", { locale: "fr" }, {
    id: cuid(), locale: "fr", badge: "À propos de moi", title: "Qui suis-je ?",
    description: "Je suis un développeur passionné avec une expertise dans le développement web et mobile.",
    bio: "Fort de plusieurs années d'expérience dans le développement d'applications, je me spécialise dans la création de solutions numériques innovantes et performantes.",
    profileImage: "/images/Saly-43.png", certificationsTitle: "Certifications", stackTitle: "Mon stack technique",
    createdAt: now, updatedAt: now,
  });

  const aboutEN = await upsert("AboutSection", { locale: "en" }, {
    id: cuid(), locale: "en", badge: "About me", title: "Who am I?",
    description: "I'm a passionate developer with expertise in web and mobile development.",
    bio: "With several years of experience in application development, I specialize in creating innovative and high-performance digital solutions.",
    profileImage: "/images/Saly-43.png", certificationsTitle: "Certifications", stackTitle: "My tech stack",
    createdAt: now, updatedAt: now,
  });

  // CERTIFICATIONS
  const certsFR = [
    { key: "dev_web", title: "Développeur Web et Web Mobile (Bac+2)" },
    { key: "cda", title: "Concepteur Développeur d'Applications (Bac+3/4)" },
  ];
  const certsEN = [
    { key: "dev_web", title: "Web and Mobile Web Developer (Bac+2)" },
    { key: "cda", title: "Application Designer Developer (Bac+3/4)" },
  ];

  for (const c of certsFR) {
    await upsert("Certification", { key: c.key, locale: "fr" }, {
      id: cuid(), key: c.key, title: c.title, locale: "fr", aboutSectionId: aboutFR.id, createdAt: now, updatedAt: now,
    });
  }
  for (const c of certsEN) {
    await upsert("Certification", { key: c.key, locale: "en" }, {
      id: cuid(), key: c.key, title: c.title, locale: "en", aboutSectionId: aboutEN.id, createdAt: now, updatedAt: now,
    });
  }
  console.log("About sections with certifications seeded (FR/EN)");

  // SERVICES
  const servicesFR = [
    { key: "web", title: "Développement Web", description: "Création de sites web et applications web modernes, responsives et performants avec les dernières technologies.", badgeText: "Web" },
    { key: "mobile", title: "Développement Mobile", description: "Applications mobiles cross-platform avec React Native et Expo pour iOS et Android.", badgeText: "Mobile" },
    { key: "backend", title: "Backend & API", description: "Architecture et développement d'APIs robustes avec Node.js, NestJS, AdonisJS ou Symfony.", badgeText: "Backend" },
    { key: "design", title: "UI/UX Design", description: "Conception d'interfaces utilisateur intuitives et esthétiques avec Figma.", badgeText: "Design" },
  ];
  const servicesEN = [
    { key: "web", title: "Web Development", description: "Creating modern, responsive and high-performance websites and web applications with the latest technologies.", badgeText: "Web" },
    { key: "mobile", title: "Mobile Development", description: "Cross-platform mobile applications with React Native and Expo for iOS and Android.", badgeText: "Mobile" },
    { key: "backend", title: "Backend & API", description: "Architecture and development of robust APIs with Node.js, NestJS, AdonisJS or Symfony.", badgeText: "Backend" },
    { key: "design", title: "UI/UX Design", description: "Design of intuitive and aesthetic user interfaces with Figma.", badgeText: "Design" },
  ];

  for (let i = 0; i < servicesFR.length; i++) {
    await upsert("Service", { key: servicesFR[i].key, locale: "fr" }, {
      id: `service-${servicesFR[i].key}-fr`, key: servicesFR[i].key, locale: "fr", title: servicesFR[i].title,
      description: servicesFR[i].description, badgeText: servicesFR[i].badgeText, order: i, isActive: true, createdAt: now, updatedAt: now,
    });
    await upsert("Service", { key: servicesEN[i].key, locale: "en" }, {
      id: `service-${servicesEN[i].key}-en`, key: servicesEN[i].key, locale: "en", title: servicesEN[i].title,
      description: servicesEN[i].description, badgeText: servicesEN[i].badgeText, order: i, isActive: true, createdAt: now, updatedAt: now,
    });
  }
  console.log("Services seeded (FR/EN)");

  // CONTACT SECTIONS
  const contactTechLogos = [
    { src: "/images/tech/react.svg", alt: "React" }, { src: "/images/tech/typescript-icon.svg", alt: "TypeScript" },
    { src: "/images/tech/nodejs-icon.svg", alt: "Node.js" }, { src: "/images/tech/nestjs.svg", alt: "NestJS" },
    { src: "/images/tech/mysql-icon.svg", alt: "MySQL" }, { src: "/images/tech/figma.svg", alt: "Figma" },
  ];
  const benefitsFR = ["Développement d'applications web modernes et performantes", "Solutions mobiles cross-platform avec React Native", "APIs robustes et architectures scalables", "Accompagnement de la conception à la mise en production", "Communication transparente et suivi régulier"];
  const benefitsEN = ["Modern and performant web application development", "Cross-platform mobile solutions with React Native", "Robust APIs and scalable architectures", "Support from design to production", "Transparent communication and regular follow-up"];
  const statsFR = [{ value: "5+", label: "Projets réalisés" }, { value: "100%", label: "Satisfaction client" }, { value: "3+", label: "Années d'expérience" }, { value: "15+", label: "Technologies maîtrisées" }];
  const statsEN = [{ value: "5+", label: "Completed projects" }, { value: "100%", label: "Client satisfaction" }, { value: "3+", label: "Years of experience" }, { value: "15+", label: "Technologies mastered" }];

  // Clean child tables first to avoid duplicates on restart
  await query('DELETE FROM "ContactTechLogo"');
  await query('DELETE FROM "ContactBenefit"');
  await query('DELETE FROM "ContactStat"');

  const contactFR = await upsert("ContactSection", { locale: "fr" }, {
    id: cuid(), locale: "fr", badge: "Contact", title: "Me Contacter",
    description: "Pour m'aider à comprendre au mieux votre projet, veuillez me fournir le maximum de détails possible.",
    socialsTitle: "Retrouvez-moi sur", techLogosTitle: "Technologies que j'utilise au quotidien", isFormEnabled: true,
    createdAt: now, updatedAt: now,
  });

  for (let i = 0; i < benefitsFR.length; i++) {
    await query(`INSERT INTO "ContactBenefit" (id, text, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$5) ON CONFLICT DO NOTHING`,
      [cuid(), benefitsFR[i], i, contactFR.id, now]);
  }
  for (let i = 0; i < statsFR.length; i++) {
    await query(`INSERT INTO "ContactStat" (id, value, label, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$6) ON CONFLICT DO NOTHING`,
      [cuid(), statsFR[i].value, statsFR[i].label, i, contactFR.id, now]);
  }
  for (let i = 0; i < contactTechLogos.length; i++) {
    await query(`INSERT INTO "ContactTechLogo" (id, src, alt, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$6) ON CONFLICT DO NOTHING`,
      [cuid(), contactTechLogos[i].src, contactTechLogos[i].alt, i, contactFR.id, now]);
  }

  const contactEN = await upsert("ContactSection", { locale: "en" }, {
    id: cuid(), locale: "en", badge: "Contact", title: "Contact Me",
    description: "To help me better understand your project, please provide as many details as possible.",
    socialsTitle: "Find me on", techLogosTitle: "Technologies I use daily", isFormEnabled: true,
    createdAt: now, updatedAt: now,
  });

  for (let i = 0; i < benefitsEN.length; i++) {
    await query(`INSERT INTO "ContactBenefit" (id, text, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$5) ON CONFLICT DO NOTHING`,
      [cuid(), benefitsEN[i], i, contactEN.id, now]);
  }
  for (let i = 0; i < statsEN.length; i++) {
    await query(`INSERT INTO "ContactStat" (id, value, label, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$6) ON CONFLICT DO NOTHING`,
      [cuid(), statsEN[i].value, statsEN[i].label, i, contactEN.id, now]);
  }
  for (let i = 0; i < contactTechLogos.length; i++) {
    await query(`INSERT INTO "ContactTechLogo" (id, src, alt, "order", "contactSectionId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$6) ON CONFLICT DO NOTHING`,
      [cuid(), contactTechLogos[i].src, contactTechLogos[i].alt, i, contactEN.id, now]);
  }
  console.log("Contact sections seeded (FR/EN)");

  // SITE SETTINGS
  await upsert("SiteSettings", { id: "default-settings" }, {
    id: "default-settings", siteName: "Yann Clain Portfolio", siteUrl: "https://yann-dev.fr",
    logoUrl: "/images/logo.png", faviconUrl: "/favicon.png",
    metaTitle: "Yann Clain - Développeur Web & Mobile",
    metaDescription: "Portfolio de Yann Clain, développeur full stack spécialisé dans le développement web et mobile.",
    createdAt: now, updatedAt: now,
  });
  console.log("Site settings seeded");

  console.log("Seed completed successfully!");
}

main()
  .catch(e => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => pool.end());
