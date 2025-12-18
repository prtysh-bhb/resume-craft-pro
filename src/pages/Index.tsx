import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import LoadDataModal from '@/components/LoadDataModal';
import ResetConfirmModal from '@/components/ResetConfirmModal';

const Index = () => {
  const {
    resumeData,
    setResumeData,
    hasStoredData,
    loadStoredData,
    startFresh,
    resetAll,
    isInitialized,
  } = useResumeStorage();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetAll();
    setShowResetConfirm(false);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-sm text-muted-foreground">Create a professional resume in minutes</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2">
              <ResumeForm
                resumeData={resumeData}
                setResumeData={setResumeData}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <LoadDataModal
        isOpen={hasStoredData}
        onLoadExisting={loadStoredData}
        onStartFresh={startFresh}
      />

      <ResetConfirmModal
        isOpen={showResetConfirm}
        onConfirm={confirmReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};

export default Index;
