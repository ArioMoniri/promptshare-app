import { Loader2 } from 'lucide-react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

