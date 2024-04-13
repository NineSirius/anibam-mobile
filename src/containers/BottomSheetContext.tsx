import React, { createContext, useContext, useRef, useState } from 'react'
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import colors from '../theme'
import { useTheme } from './ThemeContext'

interface BottomSheetContextType {
    openBottomSheet: (content: any) => void
    closeBottomSheet: () => void
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null)

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1)
    const [bottomSheetContent, setBottomSheetContent] = useState<any>('')

    const bottomSheetRef = useRef<BottomSheet>(null)
    const { theme } = useTheme()

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
            bottomSheetRef.current.snapToIndex(-1)
        }
    }

    return (
        <BottomSheetContext.Provider
            value={{ openBottomSheet, closeBottomSheet }}
        >
            {children}
            <BottomSheet
                backgroundStyle={{ backgroundColor: colors[theme].bg }}
                index={bottomSheetIndex}
                ref={bottomSheetRef}
                onChange={(index) => setBottomSheetIndex(index)}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={0}
                        appearsOnIndex={1}
                    />
                )}
                snapPoints={[1, 500]}
                onClose={closeBottomSheet}
            >
                {bottomSheetContent}
            </BottomSheet>
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
