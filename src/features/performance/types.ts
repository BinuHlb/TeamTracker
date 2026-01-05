// Performance module types
export interface PerformanceReview {
  id: string
  userId: string
  reviewerId: string
  period: {
    start: Date
    end: Date
  }
  goals: PerformanceGoal[]
  ratings: {
    overall: number
    communication: number
    teamwork: number
    problemSolving: number
    leadership?: number
  }
  feedback: string
  status: 'draft' | 'submitted' | 'acknowledged'
  createdAt: Date
  updatedAt: Date
}

export interface PerformanceGoal {
  id: string
  title: string
  description: string
  targetDate: Date
  status: 'not-started' | 'in-progress' | 'completed' | 'cancelled'
  progress: number
}

