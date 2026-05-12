'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 cursor-pointer">
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
