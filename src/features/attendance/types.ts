// Attendance module types
export interface AttendanceRecord {
  id: string
  userId: string
  date: Date
  checkIn?: Date
  checkOut?: Date
  status: 'present' | 'absent' | 'late' | 'half-day'
  notes?: string
}

export interface AttendanceStats {
  totalDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  attendanceRate: number
}

