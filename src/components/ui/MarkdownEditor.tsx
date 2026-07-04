"use client";

import { useRef, useState } from "react";
import { Bold, Italic, Link as LinkIcon, Heading2, Heading3, List, Image as ImageIcon, Loader2 } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Rétablir le focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) throw new Error("Cloudinary non configuré.");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur upload");
      
      const data = await response.json();
      insertText(`\n![Image](${data.secure_url})\n`);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error);
      alert("L'upload de l'image a échoué.");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };



  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-slate-700 bg-slate-900/50">
        <button type="button" onClick={() => insertText("**", "**")} title="Gras" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => insertText("*", "*")} title="Italique" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Italic size={16} />
        </button>
        <div><div className="w-px h-4 bg-slate-700 mx-1" /></div>
        <button type="button" onClick={() => insertText("\n## ", "")} title="Titre 2" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Heading2 size={16} />
        </button>
        <button type="button" onClick={() => insertText("\n### ", "")} title="Titre 3" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Heading3 size={16} />
        </button>
        <div><div className="w-px h-4 bg-slate-700 mx-1" /></div>
        <button type="button" onClick={() => insertText("\n- ", "")} title="Liste à puces" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <List size={16} />
        </button>
        <button type="button" onClick={() => insertText("[", "](url)")} title="Lien" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <LinkIcon size={16} />
        </button>
        <button type="button" onClick={handleImageClick} title={isUploading ? "Upload en cours..." : "Insérer une image"} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          {isUploading ? <Loader2 size={16} className="animate-spin text-emerald-500" /> : <ImageIcon size={16} />}
        </button>
      </div>
      
      {/* Hidden file input for images */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
      
      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[300px] p-4 bg-transparent text-white text-sm leading-relaxed resize-y focus:outline-none placeholder:text-slate-500 font-mono"
      />
      
      <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-700 flex justify-between items-center">
        <span className="text-xs text-slate-500">Supporte le Markdown (Markdown classique)</span>
        <span className="text-xs text-slate-500">{value.length} caractères</span>
      </div>
    </div>
  );
}
