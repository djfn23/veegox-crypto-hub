
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { QrCode, Camera, X, Flashlight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MobileQRScannerProps {
  isOpen: boolean
  onClose: () => void
  onScan: (data: string) => void
  title?: string
  className?: string
}

export const MobileQRScanner = React.forwardRef<HTMLDivElement, MobileQRScannerProps>(
  ({ isOpen, onClose, onScan, title = "Scanner QR Code", className, ...props }, ref) => {
    const [isScanning, setIsScanning] = React.useState(false)
    const [flashOn, setFlashOn] = React.useState(false)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const { toast } = useToast()

    React.useEffect(() => {
      if (isOpen) {
        startCamera()
      } else {
        stopCamera()
      }
    }, [isOpen])

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsScanning(true)
        }
      } catch (error) {
        toast({
          title: "Erreur caméra",
          description: "Impossible d'accéder à la caméra",
          variant: "destructive",
        })
      }
    }

    const stopCamera = () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      setIsScanning(false)
    }

    const simulateQRScan = () => {
      // Simulate QR code detection for demo
      const mockQRData = JSON.stringify({
        amount: 100.5,
        currency: 'MATIC',
        recipient: '0x742d35Cc6aB7F0B4Dcb8b0ED8C3D7A7B4E2F8A3C',
        description: 'Paiement restaurant',
        timestamp: Date.now()
      })
      onScan(mockQRData)
      toast({
        title: "QR Code détecté",
        description: "Données de paiement récupérées",
      })
    }

    const toggleFlash = async () => {
      try {
        const stream = videoRef.current?.srcObject as MediaStream
        const track = stream?.getVideoTracks()[0]
        
        if (track && 'torch' in track.getCapabilities()) {
          await track.applyConstraints({
            advanced: [{ torch: !flashOn } as any]
          })
          setFlashOn(!flashOn)
        }
      } catch (error) {
        console.log('Flash not supported')
      }
    }

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black flex flex-col",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleFlash}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              <Flashlight className={cn("h-5 w-5", flashOn && "text-yellow-400")} />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Camera View */}
        <div className="flex-1 relative overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Scanning Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* QR Frame */}
              <div className="relative w-64 h-64 border-2 border-white/50 rounded-lg">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />
                
                {/* Scanning Line */}
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-purple-500 animate-pulse" />
              </div>
              
              <p className="text-white text-center mt-4 text-sm">
                Positionnez le QR code dans le cadre
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 bg-black/50 backdrop-blur-sm">
          <div className="flex justify-center gap-4">
            <Button
              onClick={simulateQRScan}
              className="bg-purple-600 hover:bg-purple-700 flex-1 h-12"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Simuler Scan (Demo)
            </Button>
          </div>
          <p className="text-gray-400 text-xs text-center mt-3">
            Scannez un QR code de paiement pour continuer
          </p>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    )
  }
)
MobileQRScanner.displayName = "MobileQRScanner"
