import { ResumeData } from '@/types/resume';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePdfDownload } from '@/hooks/usePdfDownload';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const { downloadPdf, isGenerating } = usePdfDownload();

  const handleDownload = () => {
    const fileName = resumeData.header.name
      ? `Resume_${resumeData.header.name.replace(/\s+/g, '_')}.pdf`
      : 'Resume.pdf';
    downloadPdf('resume-preview', fileName);
  };

  const hasContent = (str: string) => str.trim().length > 0;
  const hasArrayContent = (arr: string[]) => arr.some(item => item.trim().length > 0);

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end sticky top-4 z-10">
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          size="lg"
          className="gap-2 shadow-lg bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Resume Preview */}
      <div
        id="resume-preview"
        className="resume-paper"
      >
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">
            {resumeData.header.name || 'Your Name'}
          </h1>
          {hasContent(resumeData.header.title) && (
            <p className="resume-title">{resumeData.header.title}</p>
          )}
          {hasContent(resumeData.header.email) && (
            <p className="resume-contact">{resumeData.header.email}</p>
          )}
        </header>

        {/* Profile Overview */}
        {hasContent(resumeData.profileOverview) && (
          <section className="resume-section avoid-break">
            <h2 className="resume-section-title">Profile Overview</h2>
            <p className="resume-text">{resumeData.profileOverview}</p>
          </section>
        )}

        {/* Key Highlights */}
        {hasArrayContent(resumeData.keyHighlights) && (
          <section className="resume-section avoid-break">
            <h2 className="resume-section-title">Key Highlights</h2>
            <ul className="resume-list">
              {resumeData.keyHighlights
                .filter(h => h.trim().length > 0)
                .map((highlight, index) => (
                  <li key={index} className="resume-bullet">
                    {highlight}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* Professional Experience */}
        {resumeData.professionalExperience.some(
          exp => hasContent(exp.jobTitle) || hasContent(exp.company)
        ) && (
          <section className="resume-section">
            <h2 className="resume-section-title">Professional Experience</h2>
            <div className="resume-experience-list">
              {resumeData.professionalExperience
                .filter(exp => hasContent(exp.jobTitle) || hasContent(exp.company))
                .map(exp => (
                  <div key={exp.id} className="resume-experience-item avoid-break">
                    <div className="resume-experience-header">
                      <div className="resume-experience-role">
                        <span className="resume-job-title">
                          {exp.jobTitle || 'Job Title'}
                        </span>
                        {hasContent(exp.company) && (
                          <span className="resume-company"> | {exp.company}</span>
                        )}
                      </div>
                      {hasContent(exp.duration) && (
                        <span className="resume-duration">{exp.duration}</span>
                      )}
                    </div>
                    {hasArrayContent(exp.responsibilities) && (
                      <ul className="resume-list">
                        {exp.responsibilities
                          .filter(r => r.trim().length > 0)
                          .map((resp, index) => (
                            <li key={index} className="resume-bullet">
                              {resp}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Technical Skills */}
        {resumeData.technicalSkills.some(
          skill => hasContent(skill.category) || hasContent(skill.skills)
        ) && (
          <section className="resume-section avoid-break">
            <h2 className="resume-section-title">Technical Skills</h2>
            <div className="resume-skills-grid">
              {resumeData.technicalSkills
                .filter(skill => hasContent(skill.category) || hasContent(skill.skills))
                .map(skill => (
                  <div key={skill.id} className="resume-skill-item">
                    <span className="resume-skill-category">{skill.category || 'Category'}:</span>
                    <span className="resume-skill-list">{skill.skills}</span>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Project Experience */}
        {resumeData.projectExperience.some(
          proj => hasContent(proj.title) || hasContent(proj.description)
        ) && (
          <section className="resume-section">
            <h2 className="resume-section-title">Project Experience</h2>
            <div className="resume-projects-list">
              {resumeData.projectExperience
                .filter(proj => hasContent(proj.title) || hasContent(proj.description))
                .map(proj => (
                  <div key={proj.id} className="resume-project-item avoid-break">
                    <h3 className="resume-project-title">
                      {proj.title || 'Project Title'}
                    </h3>
                    {hasContent(proj.description) && (
                      <p className="resume-text">{proj.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
