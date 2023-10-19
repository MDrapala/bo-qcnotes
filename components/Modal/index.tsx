import { PropsWithChildren, useRef } from "react"
import Modal from "react-modal"
import Cross from "@/assets/icons/Cross"

type propsType = PropsWithChildren<{
  openModal: boolean
  className?: string
  setOpenModal: (a: boolean) => void
}>

const ModalRender = ({
  children,
  openModal,
  className,
  setOpenModal
}: propsType) => {
  const overlayRef = useRef<HTMLDivElement>()
  const onClose = () => {
    const queryparams = new URLSearchParams(window.location.search)
    queryparams.delete("userId")
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryparams.toString()}`
    )

    if (!overlayRef.current) {
      setOpenModal(false)
      return
    }

    const closeAnimation = overlayRef.current.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: 100,
        fill: "forwards",
        easing: "ease-in-out"
      }
    )

    closeAnimation.onfinish = () => {
      setOpenModal(false)
    }
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={onClose}
      overlayRef={(node) => (overlayRef.current = node)}
      overlayClassName="animate-in fade-in fixed inset-0 left-0 md:left-[66px] bg-[#0D0C0C] bg-opacity-50"
      className={`pt-10 ${className}`}
    >
      <div
        className="absolute top-4 right-5 cursor-pointer z-30"
        onClick={() => setOpenModal(false)}
      >
        <Cross variant="large" />
      </div>
      {children}
    </Modal>
  )
}

export default ModalRender
