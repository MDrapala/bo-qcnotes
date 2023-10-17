import QRCode from "qrcode"
import { useEffect, useState } from "react"

type QRCodeProps = {
  url: string
}

const QRCodeGenerator = ({ url }: QRCodeProps) => {
  const [src, setSrc] = useState<any>()

  const generate = () => {
    QRCode.toDataURL(`/${url}`, { errorCorrectionLevel: "H" }, (_, url) => {
      setSrc(url)
    })
  }

  useEffect(() => {
    generate()
  }, [])

  return <img src={src} />
}

export default QRCodeGenerator
