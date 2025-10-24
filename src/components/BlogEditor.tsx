// src/components/BlogEditor.tsx
'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, Underline as UnderlineIcon, Heading2, List, ListOrdered, ImageIcon, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialContent = '', onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: true }),
      ImageExtension,
      Placeholder.configure({ placeholder: 'Write your blog content here...' }),
    ],
    immediatelyRender: false,
    content: initialContent,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none bg-white min-h-[300px] p-3 rounded-md',
      },
    },
  })

  // Fix SSR issue
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || !editor) return null

  // Toolbar handlers
  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addLink = () => {
    const url = window.prompt('Enter link URL:')
    if (!url) return
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 bg-white shadow-sm sticky top-0 z-10">
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200' : ''}><Bold size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200' : ''}><Italic size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-200' : ''}><UnderlineIcon size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}><Heading2 size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}><List size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}><ListOrdered size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={addLink}><Link2 size={16} /></Button>
        <Button type="button" variant="outline" size="sm" onClick={addImage}><ImageIcon size={16} /></Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

export default BlogEditor
