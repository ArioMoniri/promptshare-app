import React from 'react';
import { Card, CardContent } from "@/components/ui/card"

type Activity = {
  id: number;
  type: string;
  details: string;
  created_at: string;
};

type ActivityFeedProps = {
  activities: Activity[];
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p className="text-sm">{activity.details}</p>
              <span className="text-xs text-gray-500">
                {new Date(activity.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

