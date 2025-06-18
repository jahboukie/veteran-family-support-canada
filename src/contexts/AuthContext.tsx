import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

// Mock Supabase for development
let authStateCallback: any = null

const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: (callback: any) => {
      authStateCallback = callback
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    signInWithPassword: ({ email, password }: any) => {
      if (email === 'demo.family@vetsupport.com' && password === 'FamilySupport2024!') {
        const mockUser = {
          id: 'family-demo-123',
          email: 'demo.family@vetsupport.com',
          user_metadata: {
            full_name: 'Sarah Johnson',
            relationship: 'spouse',
            connected_veteran: 'veteran-demo-456'
          }
        }
        const mockSession = { user: mockUser, access_token: 'mock-token' }

        // Trigger auth state change
        setTimeout(() => {
          if (authStateCallback) {
            authStateCallback('SIGNED_IN', mockSession)
          }
        }, 100)

        return Promise.resolve({ data: { user: mockUser, session: mockSession }, error: null })
      }
      return Promise.resolve({ data: null, error: { message: 'Invalid credentials' } })
    },
    signUp: () => Promise.resolve({ data: null, error: null }),
    signOut: () => {
      setTimeout(() => {
        if (authStateCallback) {
          authStateCallback('SIGNED_OUT', null)
        }
      }, 100)
      return Promise.resolve({ error: null })
    },
    resetPasswordForEmail: () => Promise.resolve({ error: null })
  }
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, metadata?: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    mockSupabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = mockSupabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === 'SIGNED_IN' && session?.user) {
        await createFamilyProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const createFamilyProfile = async (user: User) => {
    try {
      // In production, this would create a family profile in Supabase
      console.log('Creating family profile for:', user.email)
      toast.success('Family profile created successfully')
    } catch (error) {
      console.error('Error creating family profile:', error)
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true)
      const { error } = await mockSupabase.auth.signUp()

      if (error) {
        throw error
      }

      toast.success('Account created! Please check your email to verify your account.')
    } catch (error: any) {
      toast.error(error.message || 'Error creating account')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)

      const { data, error } = await mockSupabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        setUser(data.user)
        setSession(data.session)
        toast.success('Welcome to Family Support!')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error signing in')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await mockSupabase.auth.signOut()
      
      if (error) {
        throw error
      }

      setUser(null)
      setSession(null)
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error(error.message || 'Error signing out')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await mockSupabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      })

      if (error) {
        throw error
      }

      toast.success('Password reset email sent!')
    } catch (error: any) {
      toast.error(error.message || 'Error sending reset email')
      throw error
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}