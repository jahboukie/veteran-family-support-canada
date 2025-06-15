import React, { useState, useEffect } from 'react'
import { 
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useVeteranConnection } from '../contexts/VeteranConnectionContext'
import { useFamily } from '../contexts/FamilyContext'

export default function VeteranStatus() {
  const { veteranStatus, sendSupportMessage, requestCheckIn } = useVeteranConnection()
  const { familyProfile } = useFamily()
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const getStatusColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'crisis': return 'bg-red-100 text-red-800 animate-pulse'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return CheckCircleIcon
      case 'medium': return ClockIcon
      case 'high': return ExclamationTriangleIcon
      case 'crisis': return ExclamationTriangleIcon
      default: return HeartIcon
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    setSending(true)
    try {
      const success = await sendSupportMessage(message)
      if (success) {
        setMessage('')
        // Show success feedback
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleRequestCheckIn = async () => {
    try {
      const success = await requestCheckIn()
      if (success) {
        // Show success feedback
      }
    } catch (error) {
      console.error('Failed to request check-in:', error)
    }
  }

  if (!familyProfile?.connectedVeteranId) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Veteran Connected</h2>
          <p className="text-gray-600 mb-6">
            Connect to your veteran's account to monitor their wellbeing status and provide support.
          </p>
          <button
            onClick={() => window.location.href = '/profile'}
            className="bg-family-red text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Connect to Veteran
          </button>
        </div>
      </div>
    )
  }

  if (!veteranStatus) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const StatusIcon = getStatusIcon(veteranStatus.riskLevel)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Veteran Status</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Current Status Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Current Wellbeing Status</h2>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(veteranStatus.riskLevel)}`}>
            <StatusIcon className="h-4 w-4 mr-2" />
            {veteranStatus.riskLevel.charAt(0).toUpperCase() + veteranStatus.riskLevel.slice(1)} Risk
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <HeartIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Overall Status</p>
            <p className="text-lg font-semibold text-blue-600 capitalize">{veteranStatus.riskLevel}</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ClockIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Last Activity</p>
            <p className="text-lg font-semibold text-green-600">
              {veteranStatus.lastActivity ? new Date(veteranStatus.lastActivity).toLocaleDateString() : 'Unknown'}
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <CheckCircleIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
            <p className="text-lg font-semibold text-purple-600">
              {veteranStatus.emergencyContactStatus ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Alert */}
      {veteranStatus.riskLevel === 'crisis' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-1" />
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Crisis Alert</h3>
              <p className="text-red-800 mb-4">
                Your veteran may need immediate support. Consider reaching out or contacting crisis resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.open('tel:1-800-268-7708')}
                  className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call VAC Crisis Line
                </button>
                <button
                  onClick={handleRequestCheckIn}
                  className="flex items-center justify-center px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                  Request Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Support Message</h2>
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a supportive message to your veteran..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Messages are securely encrypted and delivered to your veteran's app
            </p>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || sending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleRequestCheckIn}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Request Check-in</p>
              <p className="text-sm text-gray-600">Ask your veteran to update their status</p>
            </div>
          </button>

          <button
            onClick={() => window.location.href = '/crisis-support'}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Crisis Resources</p>
              <p className="text-sm text-gray-600">Access immediate support options</p>
            </div>
          </button>
        </div>
      </div>

      {/* Data Sharing Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Sharing Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Access Level</span>
            <span className="text-sm text-gray-600 capitalize">{familyProfile.accessLevel.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Emergency Contact Status</span>
            <span className={`text-sm ${veteranStatus.emergencyContactStatus ? 'text-green-600' : 'text-red-600'}`}>
              {veteranStatus.emergencyContactStatus ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Allowed Data Types</span>
            <span className="text-sm text-gray-600">{veteranStatus.allowedDataSharing.length} categories</span>
          </div>
        </div>
      </div>
    </div>
  )
}