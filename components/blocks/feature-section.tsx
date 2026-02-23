import { cn } from "@/lib/utils";
import {
  IconBulb,
  IconChartBar,
  IconShieldCheck,
  IconUsers,
  IconUserSearch,
  IconRocket,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Développement du Capital Humain",
      description:
        "Accompagnement personnalisé pour faire grandir vos talents et renforcer les compétences clés de vos équipes.",
      icon: <IconBulb />,
    },
    {
      title: "Digital RH & Analytics",
      description:
        "Solutions technologiques avancées et tableaux de bord pour piloter vos RH avec des données fiables et actionnables.",
      icon: <IconChartBar />,
    },
    {
      title: "Gouvernance & Conformité",
      description:
        "Mise en conformité réglementaire, gestion des risques RH et accompagnement dans vos obligations légales.",
      icon: <IconShieldCheck />,
    },
    {
      title: "HR-as-a-Service",
      description: "Externalisation complète ou partielle de votre fonction RH pour gagner en agilité et en efficacité opérationnelle.",
      icon: <IconUsers />,
    },
    {
      title: "Recrutement & Acquisition de Talents",
      description:
        "Sourcing, évaluation et intégration des meilleurs profils en phase avec votre culture et vos enjeux business.",
      icon: <IconUserSearch />,
    },
    {
      title: "Starter Pack RH – Les Fondations Solides",
      description:
        "Package clé en main pour structurer votre fonction RH dès le départ et poser les bases d'une croissance durable.",
      icon: <IconRocket />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

export const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#789f78] dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#789f78] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#789f78] dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export const FeatureAPropos = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 2) && "lg:border-l dark:border-neutral-800",
        index < 2 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#789f78] dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#789f78] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#789f78] dark:text-neutral-100 text-2xl">
          {title}
        </span>
      </div>
      <p className="text-base text-muted-foreground dark:text-neutral-300  relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
