import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export interface FamilyProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  relationship: 'spouse' | 'parent' | 'child' | 'sibling' | 'friend' | 'other'
  connectedVeteranId?: string
  accessLevel: 'basic' | 'detailed' | 'crisis_only'
  emergencyContact: boolean
  province: string
  preferredLanguage: 'en' | 'fr'
  notificationSettings: {
    crisisAlerts: boolean
    checkInReminders: boolean
    resourceUpdates: boolean
    familyMessages: boolean
  }
  joinedAt: string
}

interface FamilyContextType {
  familyProfile: FamilyProfile | null
  updateProfile: (updates: Partial<FamilyProfile>) => Promise<void>
  connectToVeteran: (veteranId: string, accessCode: string) => Promise<boolean>
  disconnectFromVeteran: () => Promise<void>
  loading: boolean
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined)

export function useFamily() {
  const context = useContext(FamilyContext)
  if (context === undefined) {
    throw new Error('useFamily must be used within a FamilyProvider')
  }
  return context
}

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadFamilyProfile()
    } else {
      setFamilyProfile(null)
      setLoading(false)
    }
  }, [user])

  const loadFamilyProfile = async () => {
    try {
      setLoading(true)
      
      // Mock family profile for demo
      if (user?.email === 'demo.family@vetsupport.com') {
        const mockProfile: FamilyProfile = {
          id: user.id,
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: user.email,
          relationship: 'spouse',
          connectedVeteranId: 'veteran-demo-456',
          accessLevel: 'detailed',
          emergencyContact: true,
          province: 'Ontario',
          preferredLanguage: 'en',
          notificationSettings: {
            crisisAlerts: true,
            checkInReminders: true,
            resourceUpdates: true,
            familyMessages: true
          },
          joinedAt: '2024-01-15T00:00:00Z'
        }
        
        setFamilyProfile(mockProfile)
      } else {
        // In production, this would fetch from Supabase
        setFamilyProfile(null)
      }
    } catch (error) {
      console.error('Failed to load family profile:', error)
      setFamilyProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<FamilyProfile>) => {
    if (!familyProfile) return

    try {
      const updatedProfile = { ...familyProfile, ...updates }
      
      // In production, this would update Supabase
      setFamilyProfile(updatedProfile)
      
      console.log('Profile updated:', updates)
    } catch (error) {
      console.error('Failed to update family profile:', error)
      throw error
    }
  }

  const connectToVeteran = async (veteranId: string, accessCode: string): Promise<boolean> => {
    try {
      // Mock validation - in production this would validate with the veteran's app
      if (accessCode === 'DEMO123' || accessCode === 'FAMILY456') {
        await updateProfile({
          connectedVeteranId: veteranId,
          accessLevel: 'detailed'
        })
        return true
      }
      
      return false
    } catch (error) {
      console.error('Failed to connect to veteran:', error)
      return false
    }
  }

  const disconnectFromVeteran = async () => {
    try {
      await updateProfile({
        connectedVeteranId: undefined,
        accessLevel: 'basic'
      })
    } catch (error) {
      console.error('Failed to disconnect from veteran:', error)
      throw error
    }
  }

  const value = {
    familyProfile,
    updateProfile,
    connectToVeteran,
    disconnectFromVeteran,
    loading
  }

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  )
}