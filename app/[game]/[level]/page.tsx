'use client'
import { Editor } from '@monaco-editor/react'
import React from 'react'

const page = () => {
  return (
    <div>
      <Editor height="90vh"  defaultLanguage="javascript" className="bg-neutral-500" theme="vs-dark"/>
    </div>
  )
}

export default page