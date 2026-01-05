"use client"

import { IconClock, IconUserCheck, IconUserX, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AttendanceStats } from '../types'

interface AttendanceStatsCardProps {
  stats: AttendanceStats
  title?: string
  showTrend?: boolean
}

export function AttendanceStatsCard({ 
  stats, 
  title = "Attendance Rate",
  showTrend = true 
}: AttendanceStatsCardProps) {
  const trend = showTrend && stats.attendanceRate >= 90 ? 'up' : stats.attendanceRate < 80 ? 'down' : 'neutral'
  const trendValue = stats.attendanceRate >= 90 ? '+5.2%' : stats.attendanceRate < 80 ? '-2.1%' : '+0.5%'
  
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {stats.attendanceRate.toFixed(1)}%
        </CardTitle>
        {showTrend && (
          <CardAction>
            <Badge variant={trend === 'up' ? 'outline' : trend === 'down' ? 'destructive' : 'outline'}>
              {trend === 'up' || trend === 'neutral' ? <IconTrendingUp /> : <IconUserX />}
              {trendValue}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {stats.presentDays} present days this month
          {trend === 'up' && <IconTrendingUp className="size-4" />}
        </div>
        <div className="text-muted-foreground">
          {stats.absentDays} absent • {stats.lateDays} late
        </div>
      </CardFooter>
    </Card>
  )
}

