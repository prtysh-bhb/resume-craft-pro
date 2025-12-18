import { ResumeData } from '@/types/resume';
import { User, Mail, Briefcase, Lightbulb, Code, FolderOpen, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onReset: () => void;
}

const ResumeForm = ({ resumeData, setResumeData, onReset }: ResumeFormProps) => {
  // Update header fields
  const updateHeader = (field: keyof typeof resumeData.header, value: string) => {
    setResumeData(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }));
  };

  // Update profile overview
  const updateProfileOverview = (value: string) => {
    setResumeData(prev => ({ ...prev, profileOverview: value }));
  };

  // Key Highlights handlers
  const updateHighlight = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      keyHighlights: prev.keyHighlights.map((h, i) => (i === index ? value : h)),
    }));
  };

  const addHighlight = () => {
    setResumeData(prev => ({
      ...prev,
      keyHighlights: [...prev.keyHighlights, ''],
    }));
  };

  const removeHighlight = (index: number) => {
    if (resumeData.keyHighlights.length > 1) {
      setResumeData(prev => ({
        ...prev,
        keyHighlights: prev.keyHighlights.filter((_, i) => i !== index),
      }));
    }
  };

  // Professional Experience handlers
  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      professionalExperience: [
        ...prev.professionalExperience,
        {
          id: crypto.randomUUID(),
          jobTitle: '',
          company: '',
          duration: '',
          responsibilities: [''],
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    if (resumeData.professionalExperience.length > 1) {
      setResumeData(prev => ({
        ...prev,
        professionalExperience: prev.professionalExperience.filter(exp => exp.id !== id),
      }));
    }
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.map(exp =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((r, i) => (i === index ? value : r)),
            }
          : exp
      ),
    }));
  };

  const addResponsibility = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.map(exp =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
          : exp
      ),
    }));
  };

  const removeResponsibility = (expId: string, index: number) => {
    const exp = resumeData.professionalExperience.find(e => e.id === expId);
    if (exp && exp.responsibilities.length > 1) {
      setResumeData(prev => ({
        ...prev,
        professionalExperience: prev.professionalExperience.map(e =>
          e.id === expId
            ? { ...e, responsibilities: e.responsibilities.filter((_, i) => i !== index) }
            : e
        ),
      }));
    }
  };

  // Technical Skills handlers
  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      technicalSkills: [
        ...prev.technicalSkills,
        { id: crypto.randomUUID(), category: '', skills: '' },
      ],
    }));
  };

  const removeSkill = (id: string) => {
    if (resumeData.technicalSkills.length > 1) {
      setResumeData(prev => ({
        ...prev,
        technicalSkills: prev.technicalSkills.filter(skill => skill.id !== id),
      }));
    }
  };

  // Project Experience handlers
  const updateProject = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projectExperience: prev.projectExperience.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projectExperience: [
        ...prev.projectExperience,
        { id: crypto.randomUUID(), title: '', description: '' },
      ],
    }));
  };

  const removeProject = (id: string) => {
    if (resumeData.projectExperience.length > 1) {
      setResumeData(prev => ({
        ...prev,
        projectExperience: prev.projectExperience.filter(proj => proj.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="form-section">
        <h2 className="form-section-title">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="form-label">Full Name</label>
            <Input
              className="form-input"
              placeholder="John Doe"
              value={resumeData.header.name}
              onChange={e => updateHeader('name', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Professional Title</label>
            <Input
              className="form-input"
              placeholder="Senior Software Engineer"
              value={resumeData.header.title}
              onChange={e => updateHeader('title', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="form-input pl-10"
                type="email"
                placeholder="john@example.com"
                value={resumeData.header.email}
                onChange={e => updateHeader('email', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="form-section">
        <h2 className="form-section-title">
          <User className="w-5 h-5 text-primary" />
          Profile Overview
        </h2>
        <Textarea
          className="form-textarea"
          placeholder="A brief summary of your professional background, skills, and career objectives..."
          value={resumeData.profileOverview}
          onChange={e => updateProfileOverview(e.target.value)}
          rows={4}
        />
      </div>

      {/* Key Highlights */}
      <div className="form-section">
        <h2 className="form-section-title">
          <Lightbulb className="w-5 h-5 text-primary" />
          Key Highlights
        </h2>
        <div className="space-y-3">
          {resumeData.keyHighlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                className="form-input flex-1"
                placeholder="e.g., 10+ years of software development experience"
                value={highlight}
                onChange={e => updateHighlight(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="btn-remove"
                disabled={resumeData.keyHighlights.length <= 1}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addHighlight} className="btn-add">
            <Plus className="w-4 h-4" />
            Add Highlight
          </button>
        </div>
      </div>

      {/* Professional Experience */}
      <div className="form-section">
        <h2 className="form-section-title">
          <Briefcase className="w-5 h-5 text-primary" />
          Professional Experience
        </h2>
        <div className="space-y-6">
          {resumeData.professionalExperience.map((exp, expIndex) => (
            <div key={exp.id} className="p-4 bg-muted/50 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Experience #{expIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="btn-remove"
                  disabled={resumeData.professionalExperience.length <= 1}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Job Title</label>
                  <Input
                    className="form-input"
                    placeholder="Senior Developer"
                    value={exp.jobTitle}
                    onChange={e => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <Input
                    className="form-input"
                    placeholder="Tech Corp"
                    value={exp.company}
                    onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Duration</label>
                <Input
                  className="form-input"
                  placeholder="Jan 2020 - Present"
                  value={exp.duration}
                  onChange={e => updateExperience(exp.id, 'duration', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Responsibilities</label>
                <div className="space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2">
                      <Input
                        className="form-input flex-1"
                        placeholder="Describe a key responsibility or achievement..."
                        value={resp}
                        onChange={e =>
                          updateResponsibility(exp.id, respIndex, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeResponsibility(exp.id, respIndex)}
                        className="btn-remove"
                        disabled={exp.responsibilities.length <= 1}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addResponsibility(exp.id)}
                    className="btn-add"
                  >
                    <Plus className="w-4 h-4" />
                    Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="btn-add">
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="form-section">
        <h2 className="form-section-title">
          <Code className="w-5 h-5 text-primary" />
          Technical Skills
        </h2>
        <div className="space-y-4">
          {resumeData.technicalSkills.map((skill, index) => (
            <div key={skill.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Category #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="btn-remove"
                  disabled={resumeData.technicalSkills.length <= 1}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="form-label">Category Name</label>
                <Input
                  className="form-input"
                  placeholder="e.g., Programming Languages"
                  value={skill.category}
                  onChange={e => updateSkill(skill.id, 'category', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Skills</label>
                <Input
                  className="form-input"
                  placeholder="e.g., JavaScript, TypeScript, Python, Go"
                  value={skill.skills}
                  onChange={e => updateSkill(skill.id, 'skills', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="btn-add">
            <Plus className="w-4 h-4" />
            Add Skill Category
          </button>
        </div>
      </div>

      {/* Project Experience */}
      <div className="form-section">
        <h2 className="form-section-title">
          <FolderOpen className="w-5 h-5 text-primary" />
          Project Experience
        </h2>
        <div className="space-y-4">
          {resumeData.projectExperience.map((project, index) => (
            <div key={project.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="btn-remove"
                  disabled={resumeData.projectExperience.length <= 1}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="form-label">Project Title</label>
                <Input
                  className="form-input"
                  placeholder="e.g., E-commerce Platform Redesign"
                  value={project.title}
                  onChange={e => updateProject(project.id, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <Textarea
                  className="form-textarea"
                  placeholder="Describe the project, your role, and key achievements..."
                  value={project.description}
                  onChange={e => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addProject} className="btn-add">
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button
          variant="destructive"
          onClick={onReset}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Reset All Data
        </Button>
      </div>
    </div>
  );
};

export default ResumeForm;
