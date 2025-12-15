import React from 'react'

export default function AdminMessageBox({status,message}) {
  return (
    <div className={`max-w-xl mx-auto my-4 p-4 rounded-lg border ${status == "1" ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
      <div className="flex items-start gap-3">
        {status == "1" ? 
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
          </svg>
          :
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v4a1 1 0 002 0v-2zM9 13a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd"/>
          </svg>
        }
        <div>
          <div className="font-semibold">{status == "1" ? "Success" : "Failed"}</div>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  )
}
