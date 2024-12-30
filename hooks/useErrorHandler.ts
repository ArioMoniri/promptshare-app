import { useToast } from "@/components/ui/use-toast"

export const useErrorHandler = () => {
  const { toast } = useToast()

  const handleError = (error: any) => {
    console.error('An error occurred:', error);
    toast({
      title: "Error",
      description: error.response?.data?.error || "An unexpected error occurred",
      variant: "destructive",
    });
  };

  return handleError;
};

