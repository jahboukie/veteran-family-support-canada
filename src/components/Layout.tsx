import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useFamily } from '../contexts/FamilyContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { familyProfile } = useFamily()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Veteran Status', href: '/veteran-status', icon: HeartIcon },
    { name: 'Crisis Support', href: '/crisis-support', icon: ExclamationTriangleIcon },
    { name: 'Communication', href: '/communication', icon: ChatBubbleLeftRightIcon },
    { name: 'Resources', href: '/resources', icon: ShieldCheckIcon },
    { name: 'Education', href: '/education', icon: BookOpenIcon },
    { name: 'Support Network', href: '/support-network', icon: UserGroupIcon },
  ]

  const isCurrentPath = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="w-8 h-8 bg-family-red rounded-lg flex items-center justify-center">
              <HeartIcon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">VetSupport</h1>
              <p className="text-xs text-gray-500">Family Support</p>
            </div>
          </div>
          
          {/* User Profile */}
          {familyProfile && (
            <div className="mt-6 px-4 py-3 bg-gray-50 mx-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-family-red rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {familyProfile.firstName.charAt(0)}{familyProfile.lastName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {familyProfile.firstName} {familyProfile.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {familyProfile.relationship} • {familyProfile.province}
                  </p>
                </div>
              </div>
              {familyProfile.connectedVeteranId && (
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="ml-2 text-xs text-green-700">Connected to Veteran</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const current = isCurrentPath(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      current
                        ? 'bg-red-100 border-r-4 border-family-red text-red-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        current ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-5 w-5`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            {/* Bottom Navigation */}
            <div className="px-2 space-y-1">
              <Link
                to="/profile"
                className={`${
                  isCurrentPath('/profile')
                    ? 'bg-red-100 border-r-4 border-family-red text-red-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <Cog6ToothIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5" />
                Profile Settings
              </Link>
              
              <button
                onClick={signOut}
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation for mobile */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-family-red rounded-lg flex items-center justify-center">
                <HeartIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-2 text-lg font-semibold text-gray-900">VetSupport Family</h1>
            </div>
            {familyProfile?.connectedVeteranId && (
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-xs text-green-700">Connected</span>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}