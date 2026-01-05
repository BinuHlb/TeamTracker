"use client"

import { useState, useEffect } from 'react'
import { IconLogin, IconLogout, IconClock } from "@tabler/icons-react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import type { AttendanceRecord } from '../types'
import { format } from 'date-fns'
import { cn } from '@/utils/utils'

interface AttendanceFABProps {
  userId?: string
  onCheckIn?: (record: AttendanceRecord) => void
  onCheckOut?: (record: AttendanceRecord) => void
}

export function AttendanceFAB({ 
  userId = 'current-user',
  onCheckIn,
  onCheckOut 
}: AttendanceFABProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load today's attendance record
  useEffect(() => {
    const loadTodayRecord = async () => {
      setIsLoading(true)
      try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const mockRecord: AttendanceRecord | null = null
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

      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTodayRecord(record)
      onCheckIn?.(record)
      setIsOpen(false)
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

      await new Promise(resolve => setTimeout(resolve, 500))
      
      setTodayRecord(updatedRecord)
      onCheckOut?.(updatedRecord)
      setIsOpen(false)
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

  const getButtonLabel = () => {
    if (isCheckedOut) return 'Completed'
    if (isCheckedIn) return 'Punch Out'
    return 'Punch In'
  }

  const getButtonIcon = () => {
    if (isCheckedOut) return <IconClock className="size-5" />
    if (isCheckedIn) return <IconLogout className="size-5" />
    return <IconLogin className="size-5" />
  }

  const getButtonVariant = () => {
    if (isCheckedOut) return 'secondary' as const
    if (isCheckedIn) return 'destructive' as const
    return 'default' as const
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className={cn(
            "fixed bottom-6 right-6 z-[100] h-14 w-14 rounded-full shadow-lg",
            "hover:scale-110 active:scale-95 transition-transform duration-200",
            "md:bottom-8 md:right-8",
            isCheckedIn && !isCheckedOut && "animate-pulse"
          )}
          size="icon"
          variant={getButtonVariant()}
          aria-label={getButtonLabel()}
        >
          {getButtonIcon()}
          <span className="sr-only">{getButtonLabel()}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>Attendance Log</DrawerTitle>
                <DrawerDescription>
                  {format(currentTime, 'EEEE, MMMM d, yyyy')}
                </DrawerDescription>
              </div>
              {todayRecord && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    isCheckedOut && "bg-green-50 dark:bg-green-950",
                    isCheckedIn && !isCheckedOut && todayRecord.status === 'late' && "bg-yellow-50 dark:bg-yellow-950",
                    isCheckedIn && !isCheckedOut && todayRecord.status !== 'late' && "bg-blue-50 dark:bg-blue-950"
                  )}
                >
                  {isCheckedOut ? 'Completed' : isCheckedIn ? (todayRecord.status === 'late' ? 'Late' : 'Active') : 'Not Started'}
                </Badge>
              )}
            </div>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
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
          </div>

          <DrawerFooter className="gap-3">
            <Button
              onClick={handleCheckIn}
              disabled={!canCheckIn || isLoading}
              className="w-full"
              size="lg"
            >
              <IconLogin className="size-4" />
              Punch In
            </Button>
            <Button
              onClick={handleCheckOut}
              disabled={!canCheckOut || isLoading}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <IconLogout className="size-4" />
              Punch Out
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

