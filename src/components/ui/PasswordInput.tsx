"use client"

// Hook
import { useState } from "react"
// React
import React from "react";

// =====================================================


export function PasswordInput({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-11/12 relative">
      <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={value} onChange={onChange} className="w-full h-12 dark:bg-black border-2 border-[#303030] rounded-xl px-2 " required />
      <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)} >
        {showPassword ? (
          <img src="/icons/hide-password-icon.svg" alt="Visible" className="h-5 w-5" />
        ) : (
          <img src="/icons/show-password-icon.svg" alt="Visible" className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}

