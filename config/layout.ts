import layoutData from './layout.json';

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
  size: string;
};

export type SocialMediaLink = {
  platform: string;
  url: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  uploadedImage: string;
  liveUrl: string;
};

export type SectionConfig =
  | {
      id: "header";
      enabled: boolean;
      siteName?: string;
      nav?: { href: string; label: string }[];
      ctaLabel?: string;
      ctaHref?: string;
      textColor?: string;
      bgColor?: string;
      headTitle?: string;
    }
  | {
      id: "hero";
      enabled: boolean;
      variant?: "split" | "centered" | "image-left";
      role?: string;
      headline?: string;
      tagline?: string;
      textColor?: string;
      bgColor?: string;
      image?: string;
      imageShape?: string;
      imageSize?: string;
      resumeUrl?: string;
    }
  | {
      id: "about";
      enabled: boolean;
      variant?: "split" | "centered" | "skills-left";
      headline?: string;
      skills?: string[];
      skillsTitle?: string;
      text?: string;
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "projects";
      enabled: boolean;
      grid?: "2-col" | "3-col";
      headline?: string;
      projects?: ProjectItem[]; // added to allow dynamic projects
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "services";
      enabled: boolean;
      grid?: "3-col" | "4-col";
      headline?: string;
      subtitle?: string;
      services?: { title: string; description: string; icon: string }[];
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "testimonials";
      enabled: boolean;
      headline?: string;
      subtitle?: string;
      variant?: string;
      testimonials?: Testimonial[];
      textColor?: string;
      bgColor?: string;
    }
  | {
      id: "contact";
      enabled: boolean;
      headline?: string;
      subtitle?: string;
      variant?: string;
      location?: string;
      socialMedia?: SocialMediaLink[];
      textColor?: string;
      bgColor?: string;
      mailgunApiKey?: string;
      mailgunDomain?: string;
      mailgunApiUrl?: string;
      contactOwnerEmail?: string;
    }
  | {
      id: "footer";
      enabled: boolean;
      text?: string;
      note?: string;
      variant?: string;
      textColor?: string;
      bgColor?: string;
      socials?: SocialMediaLink[];
    };

export const layout: SectionConfig[] = layoutData.sections as SectionConfig[];
export const theme = layoutData.theme;

export const presets: Record<string, SectionConfig[]> = {
  minimal: [
    { id: "hero", enabled: true, variant: "centered", headline: "Welcome" },
    { id: "about", enabled: true, headline: "About Me" },
    { id: "projects", enabled: true, grid: "2-col", headline: "Projects", projects: [] },
    { id: "contact", enabled: true, headline: "Contact" },
  ],
  creative: [
    { id: "hero", enabled: true, variant: "split", headline: "Creative Start", tagline: "Think Different", role: "Designer" },
    { id: "about", enabled: true, headline: "About Me" },
    { id: "services", enabled: true, grid: "4-col", headline: "My Services" },
    { id: "projects", enabled: true, grid: "3-col", headline: "Projects", projects: [] },
    { id: "testimonials", enabled: true, headline: "Testimonials" },
    { id: "contact", enabled: true, headline: "Contact" },
    { id: "footer", enabled: true, text: "© 2025 Creative Portfolio" },
  ],
};
