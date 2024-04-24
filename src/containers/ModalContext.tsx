import { useContext } from 'react'

type ModalContextType = {
    openModal: (node: React.ReactNode) => void
    closeModal: () => void
}

const ModalContext = useContext<ModalContextType | null>(null)
