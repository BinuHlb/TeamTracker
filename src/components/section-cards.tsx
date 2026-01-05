"use client"

import { 
  AttendanceStatsCard, 
  AttendanceOverviewCards 
} from '@/features/attendance'
import { useAttendanceStats } from '@/features/attendance'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'

export function SectionCards() {
  const { stats, isLoading } = useAttendanceStats()

  if (isLoading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32 mt-2" />
              <Skeleton className="h-6 w-16 mt-2" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <AttendanceStatsCard stats={stats} />
      <AttendanceOverviewCards stats={stats} />
    </div>
  )
}
