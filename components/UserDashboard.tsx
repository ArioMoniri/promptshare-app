"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptCard } from "@/components/prompt-card"
import { ActivityFeed } from "@/components/ActivityFeed"
import { TrendingPrompts } from "@/components/trending-prompts"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { getUserDashboard } from "@/services/api"

type DashboardData = {
  user_prompts: any[];
  starred_prompts: any[];
  recent_activity: any[];
}

export function UserDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getUserDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user || !dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="your-prompts">
        <TabsList>
          <TabsTrigger value="your-prompts">Your Prompts</TabsTrigger>
          <TabsTrigger value="starred-prompts">Starred Prompts</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="your-prompts">
          <Card>
            <CardHeader>
              <CardTitle>Your Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.user_prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
              <Button asChild className="mt-4">
                <a href="/prompts/create">Create New Prompt</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="starred-prompts">
          <Card>
            <CardHeader>
              <CardTitle>Starred Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.starred_prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <ActivityFeed activities={dashboardData.recent_activity} />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Trending Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendingPrompts />
        </CardContent>
      </Card>
    </div>
  );
}

