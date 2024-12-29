import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const [content, setContent] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (value: string) => {
    setContent(value);
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {showPreview ? (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <ReactQuill theme="snow" value={content} onChange={handleChange} />
      )}
    </div>
  );
};

