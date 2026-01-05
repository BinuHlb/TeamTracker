// Leave module types
export interface LeaveRequest {
  id: string
  userId: string
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity' | 'other'
  startDate: Date
  endDate: Date
  days: number
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  reason?: string
  approverId?: string
  createdAt: Date
  updatedAt: Date
}

export interface LeaveBalance {
  userId: string
  totalDays: number
  usedDays: number
  remainingDays: number
  leaveType: string
}

