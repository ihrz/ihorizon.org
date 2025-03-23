import kisakayImage from '/assets/img/team/kisakay.png';
import noemieImage from '/assets/img/team/noemie.png';
import irisImage from '/assets/img/team/iris.jpeg';
import maxineImage from '/assets/img/team/maxine.png';
import wyeneImage from '/assets/img/team/wyene.png';
import andruImage from '/assets/img/team/andru.jpg';
import leewayImage from '/assets/img/team/leeway.png';
import etherImage from '/assets/img/team/ether.png';
import gabooImage from '/assets/img/team/gaboo.png';
import luxImage from '/assets/img/team/lux.gif';

interface TeamMember {
  username: string;
  role: {
    en: string;
    fr: string;
  };
  avatar: string;
  desc: {
    fr: string;
    en: string;
  };
  link: string;
  type: string;
}

export const teamMembers: TeamMember[] = [
  {
    username: "Kisakay",
    role: {
      en: "iHorizon Developer",
      fr: "Développeuse iHorizon"
    },
    avatar: kisakayImage,
    desc: {
      fr: "Kisakay est l'une des principales développeuses d'iHorizon. Elle a développé la plupart du bot Discord iHorizon, ainsi que l'ancienne documentation.",
      en: "Kisakay is one of the main developers of iHorizon. She developed most of the iHorizon Discord bot, as well as the old documentation."
    },
    link: "https://github.com/kisakay",
    type: "github"
  },
  {
    username: "Noémie",
    role: {
      en: "Developer and Marketing Director",
      fr: "Développeuse et Directrice Marketing"
    },
    avatar: noemieImage,
    desc: {
      fr: "Noémie a également développée iHorizon et est la directrice marketing d'iHorizon.",
      en: "Noémie also developed iHorizon and is the marketing director of iHorizon."
    },
    link: "https://github.com/Name-shitty-github-profile",
    type: "github"
  },
  {
    username: "Iris",
    role: {
      en: "iHorizon Developer",
      fr: "Développeuse iHorizon"
    },
    avatar: irisImage,
    desc: {
      fr: "Iris est la seconde développeuse d'Ihorizon et la principale responsable du site web ainsi que de sa documentation.",
      en: "Iris was one of the developers of the iHorizon website and its documentation."
    },
    link: "https://github.com/irisihrz",
    type: "github"
  },
  {
    username: "Maxine",
    role: {
      en: "Old iHorizon developer",
      fr: "Ancienne développeuse iHorizon"
    },
    avatar: maxineImage,
    desc: {
      fr: "Maxine était une développeuse, elle a participé activement à la transition en TypeScript.",
      en: "Maxine was a developer; she actively participated in the transition to TypeScript."
    },
    link: "https://github.com/mxi1n",
    type: "github"
  },
  {
    username: "Wyene",
    role: {
      en: "iHorizon Contributor",
      fr: "Contributeur iHorizon"
    },
    avatar: wyeneImage,
    desc: {
      fr: "Wyene est un contributeur/développeur pour iHorizon. Il a souvent organisé et participé à la gestion des tâches du staff.",
      en: "Wyene is a contributor/developer for iHorizon. He has often organized and participated in staff task management."
    },
    link: "https://github.com/WyeneCloud",
    type: "github"
  },
  {
    username: "Andru",
    role: {
      en: "Contributor and Developer",
      fr: "Contributeur et Développeur"
    },
    avatar: andruImage,
    desc: {
      fr: "Andru est un contributeur et développeur pour iHorizon. Il a souvent organisé et participé à la gestion des tâches du staff.",
      en: "Andru is a contributor and developer for iHorizon. He has often organized and participated in staff task management."
    },
    link: "https://guns.lol/andrulegend",
    type: "guns"
  },
  {
    username: "Leeway",
    role: {
      en: "iHorizon Designer",
      fr: "Designer iHorizon"
    },
    avatar: leewayImage,
    desc: {
      fr: "Leeway est le principal designer du projet, grâce à lui et à ses œuvres d'art",
      en: "Leeway is the main designer of the project, thanks to him and his artwork"
    },
    link: "https://github.com/leeway",
    type: "github"
  },
  {
    username: "Ether",
    role: {
      en: "iHorizon Contributor",
      fr: "Contributeur iHorizon"
    },
    avatar: etherImage,
    desc: {
      fr: "Ether est un contributeur d'iHorizon. Il est passionné de Linux et de cyber-sécurité, et s'improvise en tant qu'assistant de support pour le bot iHorizon.",
      en: "Ether is a contributor to iHorizon. He's fascinated by Linux and cybersecurity, and he improvises himself as a support helper for the iHorizon bot."
    },
    link: "https://github.com/Ether2024-003",
    type: "github"
  },
  {
    username: "Gaboo",
    role: {
      en: "Community Manager",
      fr: "Community Manager"
    },
    avatar: gabooImage,
    desc: {
      fr: "Il gère les partenariats, organise et maintient les activités dans la communauté.",
      en: "He manages partnerships, organizes and maintains activities in the Community."
    },
    link: "https://github.com/Gpasenvie",
    type: "github"
  },
  {
    username: "Lux_",
    role: {
      en: "iHorizon Developer",
      fr: "Développeur iHorizon"
    },
    avatar: luxImage,
    desc: {
      fr: "Lux_ est un jeune développeur passionné qui aimerait poursuivre une carrière dans le pentesting et la cybersécurité. Il adore coder et a un très beau portfolio. Envoyez-lui un message sur Discord.",
      en: "Lux_ is a young passionate developer who would like to pursue a career in pentesting and cybersecurity. He loves coding and has a very beautiful portfolio. Send him a message on Discord."
    },
    link: "https://github.com/luxinenglish",
    type: "github"
  }
];
