import React from 'react'
import { FileText, Download, User, Calendar } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card'
import { Badge } from '../ui/badge'

export function DocumentCard({
  title,
  subject,
  type,
  uploader,
  date,
  downloads,
}) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <Badge
            variant="secondary"
            className="mb-2 uppercase text-[10px] tracking-wider"
          >
            {type}
          </Badge>
          <Badge variant="outline" className="mb-2 text-[10px]">
            {subject}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>{uploader}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          className="w-full gap-2 text-gray-600"
        >
          <Download className="h-4 w-4" />
          Download ({downloads})
        </Button>
      </CardFooter>
    </Card>
  )
}
