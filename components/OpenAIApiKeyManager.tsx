import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setOpenAIApiKey, clearOpenAIApiKey } from '@/services/api';
import { useToast } from "@/components/ui/use-toast"

export const OpenAIApiKeyManager: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleSetApiKey = async () => {
    setIsLoading(true);
    try {
      await setOpenAIApiKey(apiKey);
      toast({
        title: "Success",
        description: "OpenAI API key set successfully",
      });
      setApiKey('');
    } catch (error) {
      console.error('Error setting OpenAI API key:', error);
      toast({
        title: "Error",
        description: "Failed to set OpenAI API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearApiKey = async () => {
    setIsLoading(true);
    try {
      await clearOpenAIApiKey();
      toast({
        title: "Success",
        description: "OpenAI API key cleared successfully",
      });
    } catch (error) {
      console.error('Error clearing OpenAI API key:', error);
      toast({
        title: "Error",
        description: "Failed to clear OpenAI API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">OpenAI API Key Management</h2>
      <div className="flex space-x-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
        />
        <Button onClick={handleSetApiKey} disabled={isLoading || !apiKey}>
          {isLoading ? 'Setting...' : 'Set API Key'}
        </Button>
      </div>
      <Button onClick={handleClearApiKey} disabled={isLoading} variant="destructive">
        {isLoading ? 'Clearing...' : 'Clear API Key'}
      </Button>
    </div>
  );
};

