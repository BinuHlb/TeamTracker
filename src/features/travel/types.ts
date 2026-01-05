// Travel module types
export interface TravelRequest {
  id: string
  userId: string
  destination: string
  purpose: string
  startDate: Date
  endDate: Date
  estimatedCost: number
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled'
  approverId?: string
  itinerary?: TravelItineraryItem[]
  createdAt: Date
  updatedAt: Date
}

export interface TravelItineraryItem {
  id: string
  type: 'flight' | 'hotel' | 'transport' | 'meeting' | 'other'
  date: Date
  time?: string
  location: string
  description: string
  cost?: number
}

