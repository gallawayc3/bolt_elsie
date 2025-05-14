import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useSimulationStore } from '../store';
import * as pdfjs from 'pdfjs-dist';

const PdfUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { pdfContent, setPdfContent } = useSimulationStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      console.error('Please upload a PDF file');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      setPdfContent(`data:application/pdf;base64,${base64String}`);
    } catch (error) {
      console.error('Error reading PDF:', error);
      setPdfContent(null);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleRemovePdf = () => {
    setPdfContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Context PDF (Optional)
      </label>
      
      <div
        className={`mt-1 border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your PDF here, or click to select
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Only PDF files are accepted
          </p>
        </div>
      </div>

      {pdfContent && (
        <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-700 flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            PDF uploaded successfully
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemovePdf();
            }}
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Remove PDF"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;