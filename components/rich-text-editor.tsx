"use client"

import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Skeleton className="h-[200px] w-full" />,
})

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  return (
    <div className="prose prose-sm w-full max-w-none">
      <ReactQuill
        theme="snow"
        value={initialValue}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'code-block'],
            ['clean'],
          ],
        }}
      />
    </div>
  )
}

