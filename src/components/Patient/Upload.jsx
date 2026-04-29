import React, { useState } from 'react';
import { X, ArrowLeft, Upload as UploadIcon, Camera, ChevronRight, ShieldCheck, FileText } from 'lucide-react';

const Upload = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0B1F4D]/40 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[580px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200">
                
                {/* Header Area */}
                <div className="px-6 pt-6 pb-3 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="text-gray-400 hover:text-[#0D1C2E] transition-colors">
                            <ArrowLeft size={18} />
                        </button>
                        <h2 className="text-[16px] font-bold text-[#0D1C2E]">Upload Prescription</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    {/* Title & Description */}
                    <div className="mt-4 mb-4">
                        <h3 className="text-[20px] font-bold text-[#1A4568] mb-1 tracking-tight">Digitize your RX</h3>
                        <p className="text-[13px] text-[#5A6F82] font-medium leading-relaxed">
                            Upload your physical prescription to quickly sync medications.
                        </p>
                    </div>

                    {/* Upload Box */}
                    <label className="relative border-2 border-dashed border-[#DCE6EA] bg-[#F9FBFC] rounded-[24px] p-5 flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-[#F2F7F9] hover:border-[#1A7785]/30 transition-all group">
                        <input type="file" className="hidden" accept=".pdf, .jpg, .jpeg, .png" onChange={handleFileChange} />
                        <div className="w-12 h-12 rounded-full bg-[#1A7785] text-white flex items-center justify-center shadow-lg shadow-[#1A7785]/20 mb-3 group-hover:scale-110 transition-transform">
                            <UploadIcon size={20} />
                        </div>
                        <h4 className="text-[14px] font-bold text-[#0D1C2E] mb-0.5">Drop your RX here</h4>
                        <p className="text-[11px] text-gray-400 font-medium mb-3 text-center">Supports PDF, JPG, or PNG (Max 5MB)</p>
                        <div className="bg-[#E9EFF2] px-5 py-1.5 rounded-full text-[12px] font-bold text-[#4B5E6D]">
                            Select File
                        </div>
                    </label>

                    {/* Camera Option */}
                    <button className="w-full bg-[#EBF1F4] hover:bg-[#E2E9ED] rounded-[20px] p-3 flex items-center justify-between mb-4 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1A7785] shadow-sm">
                                <Camera size={20} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-[13px] font-bold text-[#0D1C2E]">Take Photo / Use Camera</h4>
                                <p className="text-[11px] text-gray-400 font-medium">Best for handwritten notes</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Preview Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[12px] font-bold text-[#0D1C2E]">Preview</h4>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded truncate max-w-[150px]">
                                {selectedFile ? selectedFile.name : 'No file'}
                            </span>
                        </div>
                        <div className="h-[70px] bg-[#F2F6F8] rounded-[16px] border border-[#E9EFF2] overflow-hidden flex items-center justify-center relative group">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="flex flex-col items-center gap-1 text-gray-300">
                                    <FileText size={24} />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Safe Preview</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#F2F6F8] to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-[#1A7785]">
                            <ShieldCheck size={14} />
                            <span className="text-[9px] font-black uppercase tracking-wider">HIPAA SECURE</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={onClose}
                                className="text-[13px] font-bold text-[#4B5E6D] hover:text-[#0D1C2E] transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={!selectedFile}
                                className={`px-6 py-2.5 rounded-full font-bold text-[13px] transition-all active:scale-95 shadow-lg shadow-[#1A7785]/20 ${selectedFile ? 'bg-gradient-to-r from-[#1A4568] to-[#1A7785] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                Analyze RX
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
