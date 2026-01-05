"use client"

import { useState, useEffect } from 'react'
import { IconClock, IconLogin, IconLogout, IconCheck, IconX } from "@tabler/icons-react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { AttendanceRecord } from '../types'
import { format } from 'date-fns'

interface AttendanceLoggerProps {
  userId?: string
  onCheckIn?: (record: AttendanceRecord) => void
  onCheckOut?: (record: AttendanceRecord) => void
}

export function AttendanceLogger({ 
  userId = 'current-user',
  onCheckIn,
  onCheckOut 
}: AttendanceLoggerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load today's attendance record
  useEffect(() => {
    // TODO: Replace with actual API call
    const loadTodayRecord = async () => {
      setIsLoading(true)
      try {
        // Mock: Check if user has checked in today
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Mock data - replace with actual API
        const mockRecord: AttendanceRecord | null = null // or actual record if exists
        setTodayRecord(mockRecord)
      } catch (error) {
        console.error('Failed to load attendance record:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTodayRecord()
  }, [])

  const handleCheckIn = async () => {
    setIsLoading(true)
    try {
      const now = new Date()
      const record: AttendanceRecord = {
        id: `att-${Date.now()}`,
        userId,
        date: now,
        checkIn: now,
        status: now.getHours() > 9 ? 'late' : 'present',
        notes: '',
      }

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTodayRecord(record)
      onCheckIn?.(record)
    } catch (error) {
      console.error('Failed to check in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckOut = async () => {
    if (!todayRecord) return

    setIsLoading(true)
    try {
      const now = new Date()
      const updatedRecord: AttendanceRecord = {
        ...todayRecord,
        checkOut: now,
      }

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTodayRecord(updatedRecord)
      onCheckOut?.(updatedRecord)
    } catch (error) {
      console.error('Failed to check out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isCheckedIn = todayRecord?.checkIn !== undefined
  const isCheckedOut = todayRecord?.checkOut !== undefined
  const canCheckIn = !isCheckedIn
  const canCheckOut = isCheckedIn && !isCheckedOut

  const getStatusBadge = () => {
    if (!todayRecord) {
      return (
        <Badge variant="outline" className="bg-gray-50 dark:bg-gray-950">
          <IconX className="size-3" />
          Not checked in
        </Badge>
      )
    }

    if (isCheckedOut) {
      return (
        <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
          <IconCheck className="size-3" />
          Completed
        </Badge>
      )
    }

    if (todayRecord.status === 'late') {
      return (
        <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950">
          <IconClock className="size-3" />
          Late arrival
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
        <IconCheck className="size-3" />
        Checked in
      </Badge>
    )
  }

  const getWorkDuration = () => {
    if (!todayRecord?.checkIn) return null
    if (!todayRecord?.checkOut) {
      const duration = currentTime.getTime() - todayRecord.checkIn.getTime()
      const hours = Math.floor(duration / (1000 * 60 * 60))
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes}m`
    }
    const duration = todayRecord.checkOut.getTime() - todayRecord.checkIn.getTime()
    const hours = Math.floor(duration / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <Card className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance Log</CardTitle>
            <CardDescription>
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Current Time</p>
            <p className="text-2xl font-semibold tabular-nums">
              {format(currentTime, 'HH:mm:ss')}
            </p>
          </div>
          <IconClock className="size-8 text-muted-foreground" />
        </div>

        {todayRecord && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              {todayRecord.checkIn && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Check In</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {format(todayRecord.checkIn, 'HH:mm')}
                  </p>
                </div>
              )}
              {todayRecord.checkOut ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Check Out</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {format(todayRecord.checkOut, 'HH:mm')}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {getWorkDuration()}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button
          onClick={handleCheckIn}
          disabled={!canCheckIn || isLoading}
          className="flex-1"
          size="lg"
        >
          <IconLogin className="size-4" />
          Check In
        </Button>
        <Button
          onClick={handleCheckOut}
          disabled={!canCheckOut || isLoading}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          <IconLogout className="size-4" />
          Check Out
        </Button>
      </CardFooter>
    </Card>
  )
}

