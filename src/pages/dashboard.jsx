import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { LevelBadge } from '../components/features/LevelBadge'
import { DocumentCard } from '../components/features/DocumentCard'
import { Upload, HelpCircle, Bell, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Mock data
  const recentDocs = [
    {
      title: 'Introduction to React Hooks',
      subject: 'Computer Science',
      type: 'pdf',
      uploader: 'Sarah J.',
      date: '2 days ago',
      downloads: 124,
    },
    {
      title: 'Calculus II: Integration Rules',
      subject: 'Mathematics',
      type: 'pdf',
      uploader: 'Mike T.',
      date: '3 days ago',
      downloads: 89,
    },
    {
      title: 'Organic Chemistry Notes',
      subject: 'Chemistry',
      type: 'docx',
      uploader: 'Emily R.',
      date: '5 days ago',
      downloads: 256,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, Alex!
                </h1>
                <p className="text-gray-500">
                  Here's what's happening in your network.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/resources">
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" /> Upload
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="gap-2">
                    <HelpCircle className="h-4 w-4" /> Request Help
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats/Actions Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-blue-900">
                    12 Uploads
                  </span>
                  <span className="text-xs text-blue-600">
                    Top 10% Contributor
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-100">
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-purple-900">
                    8 Sessions
                  </span>
                  <span className="text-xs text-purple-600">
                    4.9/5.0 Rating
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-100">
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-amber-900">3 New</span>
                  <span className="text-xs text-amber-600">Notifications</span>
                </CardContent>
              </Card>
            </div>

            {/* Recent Documents */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Uploads
                </h2>
                <Link
                  to="/resources"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentDocs.map((doc, i) => (
                  <DocumentCard key={i} {...doc} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Level Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile Status</CardTitle>
              </CardHeader>
              <CardContent>
                <LevelBadge level="Learner" progress={75} />
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Next Level</span>
                    <span className="font-medium">Agba</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Points Needed</span>
                    <span className="font-medium">250 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    topic: 'Linear Algebra Help',
                    status: 'Open',
                  },
                  {
                    topic: 'React State Management',
                    status: 'In Progress',
                  },
                ].map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {req.topic}
                      </p>
                      <p className="text-xs text-gray-500">{req.status}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Link to="/requests">
                  <Button variant="outline" className="w-full mt-2">
                    View All Requests
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
