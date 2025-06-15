import React, { useState } from 'react'
import { useFamily } from '../contexts/FamilyContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  UserIcon,
  MapPinIcon,
  BellIcon,
  ShieldCheckIcon,
  LinkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function Profile() {
  const { familyProfile, updateProfile, connectToVeteran, disconnectFromVeteran } = useFamily()
  const { user, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [connectionCode, setConnectionCode] = useState('')
  const [veteranId, setVeteranId] = useState('')
  const [showConnection, setShowConnection] = useState(false)

  const [formData, setFormData] = useState(familyProfile || {
    firstName: '',
    lastName: '',
    relationship: 'spouse',
    province: 'Ontario',
    preferredLanguage: 'en',
    emergencyContact: true,
    notificationSettings: {
      crisisAlerts: true,
      checkInReminders: true,
      resourceUpdates: true,
      familyMessages: true
    }
  })

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleConnectVeteran = async () => {
    if (!veteranId || !connectionCode) {
      toast.error('Please enter both Veteran ID and connection code')
      return
    }

    try {
      const success = await connectToVeteran(veteranId, connectionCode)
      if (success) {
        toast.success('Successfully connected to veteran!')
        setShowConnection(false)
        setVeteranId('')
        setConnectionCode('')
      } else {
        toast.error('Invalid connection code or veteran ID')
      }
    } catch (error) {
      toast.error('Failed to connect to veteran')
    }
  }

  const handleDisconnect = async () => {
    if (window.confirm('Are you sure you want to disconnect from your veteran? This will remove your access to their status updates.')) {
      try {
        await disconnectFromVeteran()
        toast.success('Disconnected from veteran')
      } catch (error) {
        toast.error('Failed to disconnect from veteran')
      }
    }
  }

  const canadianProvinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
    'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
    'Saskatchewan', 'Yukon'
  ]

  if (!familyProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600">Unable to load your family profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Family Profile</h1>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{familyProfile.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{familyProfile.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">Email cannot be changed here</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Veteran</label>
            {isEditing ? (
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({...formData, relationship: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="spouse">Spouse/Partner</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-gray-900 capitalize">{familyProfile.relationship}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province/Territory</label>
            {isEditing ? (
              <select
                value={formData.province}
                onChange={(e) => setFormData({...formData, province: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {canadianProvinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900">{familyProfile.province}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
            {isEditing ? (
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value as 'en' | 'fr'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            ) : (
              <p className="text-gray-900">{familyProfile.preferredLanguage === 'en' ? 'English' : 'Français'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Veteran Connection */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Veteran Connection</h2>
          {familyProfile.connectedVeteranId ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-500">Not Connected</span>
            </div>
          )}
        </div>

        {familyProfile.connectedVeteranId ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Connected Veteran ID</label>
                <p className="text-gray-900 font-mono">{familyProfile.connectedVeteranId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                <p className="text-gray-900 capitalize">{familyProfile.accessLevel.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <p className="text-gray-900">{familyProfile.emergencyContact ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Connected Since</label>
                <p className="text-gray-900">{new Date(familyProfile.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConnection(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Change Connection
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Veteran Connected</h3>
            <p className="text-gray-600 mb-4">
              Connect to your veteran's account to receive status updates and provide support.
            </p>
            <button
              onClick={() => setShowConnection(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Connect to Veteran
            </button>
          </div>
        )}

        {/* Connection Modal */}
        {showConnection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect to Veteran</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Veteran ID
                  </label>
                  <input
                    type="text"
                    value={veteranId}
                    onChange={(e) => setVeteranId(e.target.value)}
                    placeholder="Enter veteran's ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Connection Code
                  </label>
                  <input
                    type="text"
                    value={connectionCode}
                    onChange={(e) => setConnectionCode(e.target.value)}
                    placeholder="Enter connection code from veteran"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Demo:</strong> Use Veteran ID "veteran-demo-456" and code "DEMO123"
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowConnection(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnectVeteran}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
        <div className="space-y-4">
          {Object.entries(familyProfile.notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-xs text-gray-500">
                  {key === 'crisisAlerts' && 'Immediate notifications for crisis situations'}
                  {key === 'checkInReminders' && 'Reminders to check on your veteran'}
                  {key === 'resourceUpdates' && 'New resources and educational content'}
                  {key === 'familyMessages' && 'Messages from your veteran and support team'}
                </p>
              </div>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={formData.notificationSettings[key as keyof typeof formData.notificationSettings]}
                  onChange={(e) => setFormData({
                    ...formData,
                    notificationSettings: {
                      ...formData.notificationSettings,
                      [key]: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              ) : (
                <span className={`text-sm ${value ? 'text-green-600' : 'text-gray-400'}`}>
                  {value ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/auth?mode=reset'}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
            </div>
          </button>

          <button
            onClick={signOut}
            className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              <div>
                <p className="font-medium text-red-900">Sign Out</p>
                <p className="text-sm text-red-600">Sign out of your family account</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}