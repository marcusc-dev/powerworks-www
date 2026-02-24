'use client';

import { useState, useRef, useCallback } from 'react';

interface UploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  progress: number;
  url?: string;
  error?: string;
  copied?: boolean;
}

export default function UploadPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [folder, setFolder] = useState('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // ── Auth ──────────────────────────────────────────────
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/upload/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setAuthError('Wrong password');
        setAuthLoading(false);
        return;
      }

      const data = await res.json();
      setFolder(data.folder);
      setAuthenticated(true);
      sessionStorage.setItem('upload_pw', password);
    } catch {
      setAuthError('Connection error. Try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Upload single file via XHR (for progress tracking) ──
  const uploadFile = useCallback((uf: UploadFile) => {
    return new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', uf.file);
      formData.append('password', sessionStorage.getItem('upload_pw') || '');

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setFiles((prev) =>
            prev.map((f) => (f.id === uf.id ? { ...f, progress } : f))
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uf.id
                  ? { ...f, status: 'complete', progress: 100, url: data.url }
                  : f
              )
            );
          } catch {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uf.id
                  ? { ...f, status: 'error', error: 'Invalid response' }
                  : f
              )
            );
          }
        } else {
          let errorMsg = 'Upload failed';
          try {
            const data = JSON.parse(xhr.responseText);
            errorMsg = data.error || errorMsg;
          } catch { /* use default */ }
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id ? { ...f, status: 'error', error: errorMsg } : f
            )
          );
        }
        resolve();
      };

      xhr.onerror = () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id
              ? { ...f, status: 'error', error: 'Network error' }
              : f
          )
        );
        resolve();
      };

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uf.id ? { ...f, status: 'uploading' } : f
        )
      );

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  }, []);

  // ── Handle new file selections ────────────────────────
  const handleFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const newUploadFiles: UploadFile[] = fileArray.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        status: 'pending' as const,
        progress: 0,
      }));

      setFiles((prev) => [...newUploadFiles, ...prev]);

      for (const uf of newUploadFiles) {
        await uploadFile(uf);
      }
    },
    [uploadFile]
  );

  // ── Drag and drop ────────────────────────────────────
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  // ── Copy URL to clipboard ────────────────────────────
  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, copied: true } : f))
    );
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, copied: false } : f))
      );
    }, 2000);
  };

  // ── Helpers ──────────────────────────────────────────
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const isImage = (file: File) => file.type.startsWith('image/');
  const isVideo = (file: File) => file.type.startsWith('video/');

  const completedFiles = files.filter((f) => f.status === 'complete');

  const copyAllUrls = () => {
    const urls = completedFiles.map((f) => f.url).join('\n');
    navigator.clipboard.writeText(urls);
  };

  // ═══════════════════════════════════════════════════════
  // PASSWORD SCREEN
  // ═══════════════════════════════════════════════════════
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center p-6">
        <div className="w-full max-w-xs">
          {/* Logo */}
          <div className="text-center mb-10">
            <img
              src="/logo_dark.png"
              alt="Powerworks Garage"
              className="h-14 mx-auto mb-6"
            />
            <p className="text-white/50 text-sm tracking-wide uppercase">
              Staff File Upload
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError('');
              }}
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.07] text-white placeholder-white/30 border border-white/10 focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/50 focus:outline-none text-center text-lg transition-colors"
              autoFocus
            />

            {authError && (
              <p className="text-[#dc2626] text-center text-sm animate-fade-in-up">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading || !password}
              className="w-full py-3.5 bg-[#dc2626] text-white rounded-xl font-semibold text-base hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {authLoading ? 'Checking...' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // UPLOAD INTERFACE
  // ═══════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header bar */}
      <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src="/logo_dark.png" alt="Powerworks" className="h-8" />
          <span className="text-white/20">|</span>
          <span className="text-sm font-medium text-white/80">Upload</span>
        </div>
        <span className="text-xs bg-[#1e3a8a]/60 text-blue-200 px-2.5 py-1 rounded-full font-mono tracking-wide">
          /{folder}/
        </span>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          className={`
            border-2 border-dashed rounded-2xl py-10 px-6 text-center cursor-pointer transition-all
            ${
              dragActive
                ? 'border-[#1e3a8a] bg-blue-50 scale-[1.01]'
                : 'border-gray-300 hover:border-[#1e3a8a] hover:bg-white active:scale-[0.99]'
            }
          `}
        >
          {/* Upload icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#1e3a8a]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-base">
            Tap to select files
          </p>
          <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
          <p className="text-gray-300 text-xs mt-3">
            Photos, videos, documents
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files?.length) {
                handleFiles(e.target.files);
                e.target.value = '';
              }
            }}
            className="hidden"
          />
        </div>

        {/* Copy All button */}
        {completedFiles.length > 1 && (
          <button
            onClick={copyAllUrls}
            className="w-full py-2.5 text-sm font-medium text-[#1e3a8a] bg-blue-50 rounded-xl hover:bg-blue-100 active:scale-[0.99] transition-all"
          >
            Copy all {completedFiles.length} URLs
          </button>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail / icon */}
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {f.status === 'complete' && isImage(f.file) && f.url ? (
                      <img
                        src={f.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : isVideo(f.file) ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    ) : isImage(f.file) ? (
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {f.file.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatSize(f.file.size)}
                    </p>

                    {/* Progress bar */}
                    {f.status === 'uploading' && (
                      <div className="mt-2.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1e3a8a] rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    )}

                    {/* CDN URL + Copy button */}
                    {f.status === 'complete' && f.url && (
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-xs text-[#1e3a8a] truncate flex-1 select-all">
                          {f.url}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyUrl(f.id, f.url!);
                          }}
                          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-all active:scale-95 ${
                            f.copied
                              ? 'bg-green-500 text-white'
                              : 'bg-[#1e3a8a] text-white hover:bg-blue-800'
                          }`}
                        >
                          {f.copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}

                    {/* Error message */}
                    {f.status === 'error' && (
                      <p className="mt-1.5 text-xs text-[#dc2626] font-medium">
                        {f.error}
                      </p>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="flex-shrink-0 pt-0.5">
                    {f.status === 'uploading' && (
                      <span className="text-xs font-mono text-[#1e3a8a] tabular-nums">
                        {f.progress}%
                      </span>
                    )}
                    {f.status === 'pending' && (
                      <span className="text-xs text-gray-300">Queued</span>
                    )}
                    {f.status === 'complete' && (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {f.status === 'error' && (
                      <svg
                        className="w-5 h-5 text-[#dc2626]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state hint */}
        {files.length === 0 && (
          <p className="text-center text-gray-300 text-sm pt-4">
            Files will be uploaded to{' '}
            <span className="font-mono text-gray-400">/{folder}/</span>
          </p>
        )}
      </div>
    </div>
  );
}
