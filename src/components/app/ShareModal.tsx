"use client"

import { Copy, MessageCircle, Send, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ShareModalProps } from "@/types/HeroDeveloper"

export default function ShareModal({ isOpen, onClose, url }: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleShare = (platform: string) => {
    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
        break
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`
        break
      case "email":
        shareUrl = `mailto:?body=${encodeURIComponent(url)}`
        break
      default:
        break
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md share-modal-container">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Share with</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-4 py-4">
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("chat")}
  >
    <div className="rounded-full bg-slate-100 p-3 hover:bg-slate-200 transition-colors">
      <MessageCircle className="h-5 w-5 text-slate-700" />
    </div>
    <span className="text-xs">Chat</span>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("telegram")}
  >
    <div className="rounded-full bg-slate-100 p-3 hover:bg-slate-200 transition-colors">
      <Send className="h-5 w-5 text-slate-700" />
    </div>
    <span className="text-xs">Telegram</span>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("twitter")}
  >
    <div className="rounded-full bg-slate-100 p-3 hover:bg-slate-200 transition-colors">
      <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
    <span className="text-xs">Twitter</span>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("whatsapp")}
  >
    <div className="rounded-full bg-slate-100 p-3 hover:bg-slate-200 transition-colors">
      <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 2C6.477 2 2 6.477 2 12.001c0 2.062.627 3.974 1.7 5.56l-1.663 4.93 5.087-1.633C8.678 21.584 10.281 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18a7.94 7.94 0 0 1-4.05-1.109l-2.835.909.92-2.725A7.941 7.941 0 0 1 4 12.001C4 7.582 7.582 4 12.001 4 16.418 4 20 7.582 20 12s-3.582 8-7.999 8z" />
      </svg>
    </div>
    <span className="text-xs">Whatsapp</span>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("email")}
  >
    <div className="rounded-full bg-orange-50 p-3 hover:bg-orange-100 transition-colors">
      <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
      </svg>
    </div>
    <span className="text-xs">E-mail</span>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="flex flex-col items-center gap-1 h-auto p-2 transition-colors hover:bg-transparent hover:text-inherit"
    onClick={() => handleShare("more")}
  >
    <div className="rounded-full bg-slate-100 p-3 hover:bg-slate-200 transition-colors">
      <Share2 className="h-5 w-5 text-slate-700" />
    </div>
    <span className="text-xs">More</span>
  </Button>
</div>
        <div className="space-y-3">
          <div className="text-center text-sm text-muted-foreground">Or Share With Link</div>
          <div className="flex gap-2">
            <Input readOnly value={url} className="text-sm text-muted-foreground" />
            <Button variant="outline" size="icon" className="shrink-0" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {isCopied && <div className="text-center text-sm text-green-500">Copied to clipboard!</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}