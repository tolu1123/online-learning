import React from 'react'
import { Trophy } from 'lucide-react'
import { cn } from '../../lib/utils'

export function LevelBadge({ level, progress, className }) {
  const getLevelColor = (l) => {
    switch (l) {
      case 'Fresher':
        return 'bg-gray-100 text-gray-600'
      case 'Learner':
        return 'bg-blue-50 text-blue-600'
      case 'Agba':
        return 'bg-purple-50 text-purple-600'
      case 'Pro':
        return 'bg-amber-50 text-amber-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold w-fit',
          getLevelColor(level),
        )}
      >
        <Trophy className="h-4 w-4" />
        <span>{level}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gray-900 transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right">
        {progress}% to next level
      </p>
    </div>
  )
}
