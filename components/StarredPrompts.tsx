import React, { useState, useEffect } from 'react';
import { PromptCard } from './prompt-card';
import { getStarredPrompts } from '@/services/api';
import { Button } from '@/components/ui/button';

export const StarredPrompts: React.FC<{ userId: string }> = ({ userId }) => {
  const [prompts, setPrompts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPrompts = async () => {
    setLoading(true);
    try {
      const response = await getStarredPrompts(userId, page);
      setPrompts(prev => [...prev, ...response.data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching starred prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrompts();
  }, [userId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Starred Prompts</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {prompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
      {prompts.length > 0 && (
        <Button onClick={loadPrompts} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  );
};

