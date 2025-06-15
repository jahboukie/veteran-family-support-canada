import React, { useState } from 'react'
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useVeteranConnection } from '../contexts/VeteranConnectionContext'
import { useFamily } from '../contexts/FamilyContext'

export default function Communication() {
  const { sendSupportMessage, messageHistory, requestCheckIn } = useVeteranConnection()
  const { familyProfile } = useFamily()
  const [newMessage, setNewMessage] = useState('')
  const [messageType, setMessageType] = useState<'support' | 'checkin' | 'urgent'>('support')
  const [sending, setSending] = useState(false)

  const messageTemplates = [
    {
      type: 'support',
      title: 'Thinking of You',
      message: 'Hey, just wanted you to know I\'m thinking of you today. You\'re doing great, and I\'m here if you need anything. ❤️'
    },
    {
      type: 'support',
      title: 'Encouragement',
      message: 'I\'m so proud of the progress you\'ve been making. Remember that healing isn\'t linear, and you\'re stronger than you know.'
    },
    {
      type: 'checkin',
      title: 'Daily Check-in',
      message: 'How are you feeling today? I\'d love to hear how your day is going when you have a moment.'
    },
    {
      type: 'support',
      title: 'Love & Support',
      message: 'Sending you all my love today. You mean the world to me, and I believe in your strength and resilience.'
    }
  ]

  const communicationTips = [
    {
      category: 'Active Listening',
      tips: [
        'Give your full attention when they\'re speaking',
        'Avoid interrupting or offering immediate solutions',
        'Reflect back what you hear to show understanding',
        'Ask open-ended questions to encourage sharing'
      ]
    },
    {
      category: 'Supportive Language',
      tips: [
        'Use "I" statements to express your feelings',
        'Avoid minimizing their experiences',
        'Acknowledge their strength and progress',
        'Express gratitude for their openness'
      ]
    },
    {
      category: 'Timing & Approach',
      tips: [
        'Choose calm moments for important conversations',
        'Respect their need for space when requested',
        'Follow their lead on discussion topics',
        'Be patient with their communication style'
      ]
    }
  ]

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setSending(true)
    try {
      const success = await sendSupportMessage(newMessage, messageType)
      if (success) {
        setNewMessage('')
        // Show success feedback
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleTemplateSelect = (template: any) => {
    setNewMessage(template.message)
    setMessageType(template.type)
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'urgent': return ExclamationTriangleIcon
      case 'checkin': return ClockIcon
      default: return HeartIcon
    }
  }

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-red-600'
      case 'checkin': return 'text-blue-600'
      default: return 'text-green-600'
    }
  }

  if (!familyProfile?.connectedVeteranId) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Veteran Connected</h2>
          <p className="text-gray-600 mb-6">
            Connect to your veteran's account to start communicating and providing support.
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <ChatBubbleLeftRightIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Communication Hub</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay connected with your veteran through secure, supportive communication channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Message Composer */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send Support Message</h2>
          
          {/* Message Type Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
            <div className="flex space-x-3">
              {[
                { value: 'support', label: 'Support', icon: HeartIcon },
                { value: 'checkin', label: 'Check-in', icon: ClockIcon },
                { value: 'urgent', label: 'Urgent', icon: ExclamationTriangleIcon }
              ].map((type) => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => setMessageType(type.value as any)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      messageType === type.value
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-1" />
                    {type.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your supportive message here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Messages are encrypted and delivered securely
            </p>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-4 w-4 mr-2" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>

        {/* Message Templates */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Message Templates</h2>
          <div className="space-y-3">
            {messageTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => handleTemplateSelect(template)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{template.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.message}</p>
                  </div>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    template.type === 'support' ? 'bg-green-100 text-green-700' :
                    template.type === 'checkin' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {template.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communication History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Messages</h2>
        {messageHistory && messageHistory.length > 0 ? (
          <div className="space-y-4">
            {messageHistory.slice(0, 5).map((message: any, index: number) => {
              const MessageIcon = getMessageIcon(message.type)
              return (
                <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MessageIcon className={`h-4 w-4 ${getMessageColor(message.type)}`} />
                      <span className="text-sm font-medium text-gray-900">
                        {message.type === 'support' ? 'Support Message' : 
                         message.type === 'checkin' ? 'Check-in' : 'Urgent Message'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{message.content}</p>
                  {message.delivered && (
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Delivered
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No messages sent yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Communication Tips */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Communication Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communicationTips.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Communication */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-1" />
          <div className="ml-3">
            <h3 className="font-semibold text-red-900 mb-2">Emergency Communication</h3>
            <p className="text-red-800 mb-4">
              If you're concerned about your veteran's immediate safety, don't rely solely on app messaging.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open('tel:911')}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                Call 911
              </button>
              <button
                onClick={() => window.open('tel:1-800-268-7708')}
                className="flex items-center justify-center px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                VAC Crisis Line
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}