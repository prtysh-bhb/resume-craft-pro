import { FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LoadDataModalProps {
  isOpen: boolean;
  onLoadExisting: () => void;
  onStartFresh: () => void;
}

const LoadDataModal = ({ isOpen, onLoadExisting, onStartFresh }: LoadDataModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6 text-primary" />
            Welcome Back!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            We found previously saved resume data. Would you like to continue where you left off?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={onLoadExisting}
            className="flex-1 gap-2"
          >
            <FileText className="w-4 h-4" />
            Load Existing Data
          </Button>
          <Button
            variant="outline"
            onClick={onStartFresh}
            className="flex-1 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start Fresh
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadDataModal;
