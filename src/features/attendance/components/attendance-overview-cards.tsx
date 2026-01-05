"use client"

import { IconClock, IconUserCheck, IconUserX, IconCalendar } from "@tabler/icons-react"
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

interface AttendanceOverviewCardsProps {
  stats: AttendanceStats
}

export function AttendanceOverviewCards({ stats }: AttendanceOverviewCardsProps) {
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Present Days</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.presentDays}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
              <IconUserCheck className="size-3" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            On track this month <IconUserCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Out of {stats.totalDays} working days
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Absent Days</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.absentDays}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-red-50 dark:bg-red-950">
              <IconUserX className="size-3" />
              {stats.absentDays > 0 ? 'Alert' : 'Good'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.absentDays === 0 ? 'Perfect attendance' : 'Needs attention'}
            {stats.absentDays > 0 && <IconUserX className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {stats.absentDays === 0 ? 'Keep up the good work' : 'Review attendance policy'}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Late Arrivals</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.lateDays}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950">
              <IconClock className="size-3" />
              {stats.lateDays > 5 ? 'High' : 'Low'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.lateDays === 0 ? 'Always on time' : 'Monitor punctuality'}
            <IconClock className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {stats.lateDays === 0 ? 'Excellent punctuality' : 'Consider flexible hours'}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

