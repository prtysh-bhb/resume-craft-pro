// Resume Data TypeScript Interfaces

export interface ResumeHeader {
  name: string;
  title: string;
  email: string;
}

export interface ProfessionalExperience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface TechnicalSkill {
  id: string;
  category: string;
  skills: string;
}

export interface ProjectExperience {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  header: ResumeHeader;
  profileOverview: string;
  keyHighlights: string[];
  professionalExperience: ProfessionalExperience[];
  technicalSkills: TechnicalSkill[];
  projectExperience: ProjectExperience[];
}

// Default empty resume data
export const createEmptyResumeData = (): ResumeData => ({
  header: {
    name: '',
    title: '',
    email: '',
  },
  profileOverview: '',
  keyHighlights: [''],
  professionalExperience: [
    {
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      duration: '',
      responsibilities: [''],
    },
  ],
  technicalSkills: [
    {
      id: crypto.randomUUID(),
      category: '',
      skills: '',
    },
  ],
  projectExperience: [
    {
      id: crypto.randomUUID(),
      title: '',
      description: '',
    },
  ],
});

// Local storage key
export const RESUME_STORAGE_KEY = 'resume-builder-data';
