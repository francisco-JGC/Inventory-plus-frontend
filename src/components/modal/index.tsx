import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

const SIZE_DIALOG = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
}

interface ModalProps {
  nameButton?: string
  title?: string
  description?: string
  Component?: React.FC
  buttonStyle?: React.CSSProperties
  size?: keyof typeof SIZE_DIALOG
  className?: string
  Icon?: any
  marginIcon?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const Modal = ({
  nameButton,
  title,
  Component,
  buttonStyle,
  description,
  size = '3xl',
  className,
  Icon,
  marginIcon,
  children,
  style,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${className} ${Icon && 'flex items-center'}`}
        style={buttonStyle}
      >
        {Icon && (
          <Icon />
        )}
        {children || nameButton}
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: '#fff',
          ...style,
        }}
        className={`${SIZE_DIALOG[size]}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {Component && <Component />}
      </DialogContent>
    </Dialog>
  )
}
