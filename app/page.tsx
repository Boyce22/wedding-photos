"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Camera, Download, Heart, Linkedin, Instagram, Phone, Upload, Info } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import { UserFormDialog } from "@/components/user-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function App() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photosArray, setPhotosArray] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isPC, setIsPC] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const multiFileInputRef = useRef<HTMLInputElement>(null)
  const LIMITE_FOTOS = 15

  useEffect(() => {
    setIsPC(!/Mobi|Android/i.test(navigator.userAgent))
  }, [])

  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleCameraCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const result = await handleFileRead(file)
      setPhotoPreview(result)
      setPhotosArray([result])
    }
  }

  const handleMultiCameraCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    try {
      if (files?.length) {
        if (files?.length > LIMITE_FOTOS) {
          throw new Error(`Limite de fotos excedido! Você pode enviar no máximo ${LIMITE_FOTOS} fotos por vez.`)
        }
        if (!isPC && files.length > 2) {
          throw new Error("Para uma melhor experiência no celular, envie até 2 fotos por vez 📱")
        }
        const fileReadPromises = Array.from(files).map((file) => handleFileRead(file))
        const results = await Promise.all(fileReadPromises)
        setPhotosArray(results)
        setPhotoPreview(results[0])
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#f43f5e",
          color: "#fff",
        },
      })
    }
  }

  const handleDownload = () => {
    if (photoPreview) {
      const link = document.createElement("a")
      link.href = photoPreview
      link.download = `casamento-gean-miriam-${Date.now()}.jpg`
      link.click()
    }
  }

  const handleUpload = async () => {
    if (!photosArray.length) return

    setIsUploading(true)
    setUploadStatus(`Enviando ${photosArray.length} foto${photosArray.length > 1 ? "s" : ""}...`)

    try {
      const userData = localStorage.getItem("userData")
      if (!userData) {
        throw new Error("Dados do usuário não encontrados")
      }

      const response = await axios.post("/api/upload", {
        photos: photosArray,
        isMultiple: photosArray.length > 1,
        userData,
      })

      setUploadStatus(response.data.message)

      toast.success(
        `Obrigado por compartilhar ${photosArray.length > 1 ? "seus momentos" : "seu momento"} conosco! ❤️`,
        {
          duration: 4000,
          position: "bottom-center",
          style: {
            background: "#f43f5e",
            color: "#fff",
          },
        },
      )

      setTimeout(() => {
        setIsUploading(false)
        setPhotoPreview(null)
        setUploadStatus("")
        setPhotosArray([])
      }, 2000)
    } catch (error) {
      console.error("Erro ao enviar foto(s):", error)
      setUploadStatus("Erro ao enviar a(s) foto(s). Tente novamente.")
      toast.error("Erro ao enviar a(s) foto(s). Tente novamente.", {
        duration: 4000,
        position: "bottom-center",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 relative overflow-hidden">
      <UserFormDialog />
      <Toaster />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-rose-100/40 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-100/40 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-t from-rose-100/40 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>
      <main className="container relative mx-auto px-4 py-16 flex flex-col items-center min-h-screen">
        <Header />
        <PhotoUploadSection
          photoPreview={photoPreview}
          photosArray={photosArray}
          isUploading={isUploading}
          uploadStatus={uploadStatus}
          handleCameraCapture={handleCameraCapture}
          handleMultiCameraCapture={handleMultiCameraCapture}
          handleDownload={handleDownload}
          handleUpload={handleUpload}
          setPhotoPreview={setPhotoPreview}
          fileInputRef={fileInputRef}
          multiFileInputRef={multiFileInputRef}
          isPC={isPC}
          setIsPC={setIsPC}
        />
        <Footer />
      </main>
    </div>
  )
}

function Header() {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </div>
      <h1 className="font-cormorant text-4xl sm:text-5xl md:text-7xl text-rose-900 mb-6 font-light tracking-wide">
        Gean & Mirian
      </h1>
      <p className="text-rose-700/80 text-base sm:text-lg md:text-xl font-light tracking-wide">
        Compartilhe seus momentos especiais
      </p>
    </div>
  )
}

function PhotoUploadSection({
  photoPreview,
  photosArray,
  isUploading,
  uploadStatus,
  handleCameraCapture,
  handleMultiCameraCapture,
  handleDownload,
  handleUpload,
  setPhotoPreview,
  fileInputRef,
  multiFileInputRef,
  isPC,
  setIsPC,
}: {
  photoPreview: string | null
  photosArray: string[]
  isUploading: boolean
  uploadStatus: string
  handleCameraCapture: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMultiCameraCapture: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDownload: () => void
  handleUpload: () => void
  setPhotoPreview: (value: string | null) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  multiFileInputRef: React.RefObject<HTMLInputElement>
  isPC: boolean
  setIsPC: (value: boolean) => void
}) {
  return (
    <div className="w-full max-w-md p-4 sm:p-8 backdrop-blur-xl bg-white/60 shadow-xl border-rose-100/50 rounded-2xl transition-all duration-500">
      <div className="space-y-8">
        {photoPreview ? (
          <PhotoPreviewSection
            photoPreview={photoPreview}
            photosArray={photosArray}
            handleDownload={handleDownload}
            handleUpload={handleUpload}
            isUploading={isUploading}
            uploadStatus={uploadStatus}
            setPhotoPreview={setPhotoPreview}
          />
        ) : (
          <CameraCaptureSection
            handleCameraCapture={handleCameraCapture}
            handleMultiCameraCapture={handleMultiCameraCapture}
            fileInputRef={fileInputRef}
            multiFileInputRef={multiFileInputRef}
            isPC={isPC}
            setIsPC={setIsPC}
          />
        )}
      </div>
    </div>
  )
}

function PhotoPreviewSection({
  photoPreview,
  photosArray,
  handleDownload,
  handleUpload,
  isUploading,
  uploadStatus,
  setPhotoPreview,
}: {
  photoPreview: string
  photosArray: string[]
  handleDownload: () => void
  handleUpload: () => void
  isUploading: boolean
  uploadStatus: string
  setPhotoPreview: (value: string | null) => void
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-inner">
        <div className="absolute inset-0 border-2 border-rose-200/50 rounded-xl" />
        <img src={photoPreview || "/placeholder.svg"} alt="Foto capturada" className="w-full h-full object-cover" />
      </div>
      {photosArray.length > 1 && (
        <p className="text-center text-rose-600 font-medium">{photosArray.length} fotos selecionadas</p>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full flex-wrap">
        <Button
          className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Salvar Foto
        </Button>
        <Button
          className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
          onClick={() => setPhotoPreview(null)}
        >
          <Camera className="mr-2 h-4 w-4" />
          Nova Foto
        </Button>
        <Button
          className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
          onClick={handleUpload}
          disabled={isUploading}
        >
          <Upload aria-disabled={isUploading} className="mr-2 h-4 w-4" />
          {isUploading ? "Enviando..." : `Enviar Foto${photosArray.length > 1 ? "s" : ""}`}
        </Button>
      </div>
      {uploadStatus && (
        <p className={`text-center ${uploadStatus.includes("sucesso") ? "text-green-600" : "text-rose-600"}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  )
}

function CameraCaptureSection({
  handleCameraCapture,
  handleMultiCameraCapture,
  fileInputRef,
  multiFileInputRef,
  isPC,
  setIsPC,
}: {
  handleCameraCapture: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMultiCameraCapture: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  multiFileInputRef: React.RefObject<HTMLInputElement>
  isPC: boolean
  setIsPC: (value: boolean) => void
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl bg-gradient-to-br from-white/80 to-rose-50/80 p-8 flex flex-col items-center justify-center text-center gap-6 shadow-inner border border-rose-100/50">
        <div className="rounded-full bg-rose-50 p-6">
          <Camera className="w-12 h-12 text-rose-400" />
        </div>
        <p className="text-rose-700/80 font-light tracking-wide">Clique abaixo para capturar seu momento especial</p>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          <FileInputButton
            label="Tirar Foto"
            onChange={handleCameraCapture}
            icon={<Camera className="mr-2 h-4 w-4" />}
            inputRef={fileInputRef}
            accept="image/*"
            capture="environment"
            className="w-full sm:w-1/2"
          />
          <FileInputButton
            label={isPC ? "Adicionar Fotos" : "Adicionar Foto"}
            onChange={handleMultiCameraCapture}
            icon={<Camera className="mr-2 h-4 w-4" />}
            inputRef={multiFileInputRef}
            multiple={isPC}
            accept="image/*"
            className="w-full sm:w-1/2"
          />
        </div>
        <div className="flex items-center space-x-2 mt-4 w-full justify-center">
          <Checkbox id="pc" checked={isPC} onCheckedChange={(checked) => setIsPC(checked as boolean)} />
          <Label htmlFor="pc" className="text-sm text-rose-600/80">
            Estou usando um computador
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-rose-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Marque esta opção se estiver usando um computador para enviar múltiplas fotos de uma vez.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

function FileInputButton({
  label,
  onChange,
  icon,
  inputRef,
  multiple = false,
  accept,
  capture,
  className = "",
  disabled = false,
}: {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon: React.ReactNode
  inputRef: React.RefObject<HTMLInputElement>
  multiple?: boolean
  accept?: string
  capture?: string
  className?: string
  disabled?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        capture={capture}
        multiple={multiple}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
        disabled={disabled}
      />
      <Button
        className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl w-full"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        {icon}
        {label}
      </Button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-auto pt-16 text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <Heart className="w-4 h-4 text-rose-400" />
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </div>
      <p className="font-cormorant text-xl text-rose-700/80 font-light tracking-wide mb-8">Nosso Casamento • 2025</p>
      <div className="text-center space-y-4">
        <p className="text-rose-600 font-medium">Desenvolvido por Bernardo Alves</p>
        <div className="flex justify-center gap-6">
          <SocialLink href="https://linkedin.com/in/bernardo-alves-dev" icon={<Linkedin className="w-5 h-5" />} />
          <SocialLink href="https://instagram.com/bernardo.alves16" icon={<Instagram className="w-5 h-5" />} />
          <SocialLink href="https://wa.me/5524988232668" icon={<Phone className="w-5 h-5" />} />
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-rose-500 hover:text-rose-600 transition-colors"
    >
      {icon}
    </a>
  )
}

