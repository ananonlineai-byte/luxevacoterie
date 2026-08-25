import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, Sparkles, RefreshCw, X } from 'lucide-react';
import { IMAGES } from '../../data';

interface ImageUploaderProps {
  label: string;
  currentValue: string;
  onChange: (newUrlOrData: string) => void;
  uploadImage?: (file: File, folder?: string) => Promise<string>;
  aspectRatio?: 'square' | 'wide' | 'portrait';
  presetCategory?: 'services' | 'hero' | 'sterilization' | 'products';
  storageFolder?: string;
}

const PRESETS = {
  hero: [
    { label: 'Spa Petals & Cream Silk', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85' },
    { label: 'Floral Botanicals & Hands', url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1920&q=85' },
    { label: 'Luxury Marble Sanctuary', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85' },
    { label: 'Seoul Aesthetic Linen', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=2000&q=85' },
  ],
  services: [
    { label: 'Korean Gel Manicure', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Petal Blossom Pedicure', url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Hand Hydrotherapy Immersion', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Volcanic River Stone Foot Spa', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Soft Pink Glazed Nails', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Herbal Foot Compress', url: 'https://images.unsplash.com/photo-1512290900672-1f41444003af?auto=format&fit=crop&w=1200&q=85' },
  ],
  sterilization: [
    { label: 'Sterilized Instruments Pouch', url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=85' },
    { label: 'Medical Autoclave Chamber', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Stainless Steel Diamond Bits', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85' },
  ],
  products: [
    { label: 'The Organique Essence Bottles', url: 'https://images.unsplash.com/photo-1608248597359-5982845642d9?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Rose Damascena Emulsion', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' },
    { label: 'Mugwort & Sea Salt Foot Scrub', url: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Rice Ferment Brightening Ampoule', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80' },
  ],
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  currentValue,
  onChange,
  uploadImage,
  aspectRatio = 'wide',
  presetCategory = 'services',
  storageFolder,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(currentValue || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const compressImageToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();

      reader.onerror = () => reject(new Error('Error reading image file'));
      reader.onload = () => {
        img.onload = () => {
          const maxSize = aspectRatio === 'square' ? 900 : 1400;
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Image compression is not supported in this browser.'));
            return;
          }

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let quality = 0.78;
          let dataUrl = canvas.toDataURL('image/webp', quality);
          while (dataUrl.length > 220000 && quality > 0.45) {
            quality -= 0.08;
            dataUrl = canvas.toDataURL('image/webp', quality);
          }
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Could not decode image file.'));
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadError(null);

    if (uploadImage) {
      try {
        const downloadUrl = await uploadImage(file, storageFolder || presetCategory);
        onChange(downloadUrl);
      } catch (err: any) {
        try {
          const compressedDataUrl = await compressImageToDataUrl(file);
          onChange(compressedDataUrl);
          setUploadError(
            `${err?.message || 'Cloud upload unavailable'} Stored a compressed local copy instead. For best results, configure Cloudinary or use Image Link.`
          );
        } catch (fallbackErr: any) {
          setUploadError(fallbackErr?.message || err?.message || 'Image upload failed.');
        }
      } finally {
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
      return;
    }

    compressImageToDataUrl(file)
      .then((dataUrl) => {
        onChange(dataUrl);
        setUploadError('Stored a compressed local copy. Configure Cloudinary to store only image URLs in Firestore.');
      })
      .catch((err: any) => {
        setUploadError(err?.message || 'Error reading image file');
      })
      .finally(() => {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      });
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-[16/9]';

  return (
    <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#C5A059]/30 text-xs">
      <div className="flex items-center justify-between mb-2">
        <label className="font-cinzel font-bold text-[#63222D] uppercase tracking-wider">
          {label}
        </label>
        <div className="flex bg-[#EFE7DC] p-0.5 rounded-lg border border-[#C5A059]/30">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'upload' ? 'bg-[#63222D] text-[#EBDCB9]' : 'text-[#63222D]/70 hover:text-[#63222D]'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'url' ? 'bg-[#63222D] text-[#EBDCB9]' : 'text-[#63222D]/70 hover:text-[#63222D]'
            }`}
          >
            Image Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'presets' ? 'bg-[#63222D] text-[#EBDCB9]' : 'text-[#63222D]/70 hover:text-[#63222D]'
            }`}
          >
            Presets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4">
          <div className={`relative w-full ${aspectClass} rounded-lg overflow-hidden border border-[#C5A059]/50 bg-black/5 shadow-inner`}>
            {currentValue ? (
              <img
                src={currentValue}
                alt={label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#63222D]/40">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-[10px]">No image</span>
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                <RefreshCw className="w-5 h-5 animate-spin text-[#EBDCB9]" />
              </div>
            )}
          </div>
        </div>

        {/* Control Area */}
        <div className="sm:col-span-8 space-y-2">
          {activeTab === 'upload' && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 bg-[#FBF8F3] hover:bg-[#F4ECE1] border-2 border-dashed border-[#C5A059] rounded-lg text-[#63222D] font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-[#C5A059]" />
                <span>Choose Image from Device (Phone/PC)</span>
              </button>
              <p className="text-[10px] text-[#1E1718]/60 mt-1 italic">
                Supports JPG, PNG, WEBP up to 5 MB. Uses Cloudinary URL when configured; otherwise stores a compressed fallback.
              </p>
              {uploadError && (
                <p className="text-[10px] text-rose-700 mt-1 font-medium">
                  {uploadError}
                </p>
              )}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="flex gap-1.5">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 bg-[#63222D] text-[#EBDCB9] rounded-lg font-bold hover:bg-[#7A2A37] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-1">
              {(PRESETS[presetCategory] || PRESETS.services).map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className={`text-left p-1.5 rounded border text-[10px] truncate transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentValue === preset.url
                      ? 'bg-[#63222D] text-[#EBDCB9] border-[#63222D]'
                      : 'bg-white text-[#63222D] border-[#C5A059]/30 hover:bg-[#F4ECE1]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 flex-shrink-0 text-[#C5A059]" />
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
