import React from 'react'
import { Clock, CheckCircle2, Circle, User } from 'lucide-react'
import { Button } from '../ui/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Link } from 'react-router-dom'

export function RequestCard({
  topic,
  subject,
  description,
  status,
  student,
  date,
}) {
  const getStatusBadge = (s) => {
    switch (s) {
      case 'Open':
        return <Badge variant="secondary">Open</Badge>
      case 'In Progress':
        return <Badge variant="info">In Progress</Badge>
      case 'Completed':
        return <Badge variant="success">Completed</Badge>
      default:
        return <Badge variant="secondary">{s}</Badge>
    }
  }
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {subject}
          </span>
          {getStatusBadge(status)}
        </div>
        <CardTitle className="text-lg">{topic}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User className="h-3 w-3" />
          <span>{student}</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-gray-100">
        <Link to="/requests/:id" className="w-full">
          <Button className="w-full" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
