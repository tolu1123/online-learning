import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { User, FileText, CheckCircle2, Trophy, Clock } from 'lucide-react'
import { cn } from '../lib/utils'
 
export function Notifications() {
  const notifications = {
    today: [
      {
        id: '1',
        type: 'request',
        title: 'Help Request Accepted',
        description: 'Sarah accepted your help request for Linear Algebra.',
        time: '2 hours ago',
        isRead: false,
      },
      {
        id: '2',
        type: 'session',
        title: 'Session Completed',
        description:
          'Your session with Emily was marked as satisfied. +50 points!',
        time: '5 hours ago',
        isRead: false,
      },
      {
        id: '3',
        type: 'document',
        title: 'New Document Uploaded',
        description:
          "Mike uploaded new notes in Computer Science: 'React Patterns'.",
        time: '8 hours ago',
        isRead: true,
      },
    ],
    yesterday: [
      {
        id: '4',
        type: 'badge',
        title: 'Badge Earned',
        description:
          "You earned the 'First Steps' badge for completing your first session.",
        time: '1 day ago',
        isRead: true,
      },
      {
        id: '5',
        type: 'request',
        title: 'New Request in Your Subject',
        description:
          "Alex posted a new request in Computer Science: 'Redux Help'.",
        time: '1 day ago',
        isRead: true,
      },
    ],
  }
  const getIcon = (type) => {
    switch (type) {
      case 'request':
        return <User className="h-5 w-5 text-blue-600" />
      case 'document':
        return <FileText className="h-5 w-5 text-gray-600" />
      case 'session':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'badge':
        return <Trophy className="h-5 w-5 text-yellow-600" />
    }
  }
  const getBgColor = (type) => {
    switch (type) {
      case 'request':
        return 'bg-blue-50'
      case 'document':
        return 'bg-gray-100'
      case 'session':
        return 'bg-green-50'
      case 'badge':
        return 'bg-yellow-50'
    }
  }
  const NotificationItem = ({
    notification,
  }) => (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-lg transition-colors hover:bg-gray-50',
        !notification.isRead && 'bg-blue-50/30',
      )}
    >
      <div
        className={cn(
          'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
          getBgColor(notification.type),
        )}
      >
        {getIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p
            className={cn(
              'text-sm font-medium text-gray-900',
              !notification.isRead && 'font-semibold',
            )}
          >
            {notification.title}
          </p>
          <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {notification.time}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {notification.description}
        </p>
      </div>
      {!notification.isRead && (
        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
      )}
    </div>
  )
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <Button variant="ghost" size="sm" className="text-gray-600">
            Mark all as read
          </Button>
        </div>

        <Card>
          <CardContent className="p-0 divide-y divide-gray-100">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Today
              </h2>
            </div>
            {notifications.today.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}

            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Yesterday
              </h2>
            </div>
            {notifications.yesterday.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
