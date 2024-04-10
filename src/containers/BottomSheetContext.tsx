import React, { createContext, useContext, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

interface BottomSheetContextType {
    openBottomSheet: (content: any) => void
    closeBottomSheet: () => void
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null)

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(0)
    const [bottomSheetContent, setBottomSheetContent] = useState<any>('')
    const bottomSheetRef = useRef<BottomSheet>(null)

    const openBottomSheet = (content: any) => {
        if (bottomSheetRef.current) {
            setBottomSheetContent(content)
            bottomSheetRef.current.snapToIndex(1)
            bottomSheetRef.current.expand()
        }
    }

    const closeBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close()
        }
    }

    return (
        <BottomSheetContext.Provider
            value={{ openBottomSheet, closeBottomSheet }}
        >
            <BottomSheet
                index={bottomSheetIndex}
                ref={bottomSheetRef}
                onChange={(index) => setBottomSheetIndex(index)}
                snapPoints={[200, 500]}
                onClose={closeBottomSheet}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    {bottomSheetContent}
                </BottomSheetView>
            </BottomSheet>
            {children}
        </BottomSheetContext.Provider>
    )
}

export const useBottomSheet = () => {
    const context = useContext(BottomSheetContext)
    if (!context) {
        throw new Error(
            'useBottomSheet must be used within a BottomSheetProvider',
        )
    }
    return context
}
