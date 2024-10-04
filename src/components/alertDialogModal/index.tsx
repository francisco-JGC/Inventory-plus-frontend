import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '../ui/checkbox'

interface AlertDialogModalProps {
  nameButton?: string
  title?: string
  description?: string
  onConfirm: () => void
  nameButtonConfirm?: string
  nameButtonCancel?: string
  buttonStyle?: React.CSSProperties
  useCheckbox?: boolean
  id?: string
  nameCheckbox?: string
  checked?: boolean
  label?: string
  useButton?: boolean
}

export const AlertDialogModal = ({
  nameButton,
  title,
  description,
  onConfirm,
  nameButtonConfirm,
  nameButtonCancel,
  buttonStyle,
  useCheckbox,
  id,
  nameCheckbox,
  checked,
  label,
  useButton = true,
}: AlertDialogModalProps) => {
  return (
    <AlertDialog>
      {nameButton && (
        <AlertDialogTrigger
          className={`${useButton && 'c-button'}`}
          style={buttonStyle}
        >
          {nameButton}
        </AlertDialogTrigger>
      )}
      {useCheckbox && (
        <AlertDialogTrigger className="flex items-center gap-2">
          <Checkbox checked={checked} id={id} name={nameCheckbox} />
          <label htmlFor={id}>{label}</label>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent
        style={{
          backgroundColor: '#fff',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{
              border: 'none',
            }}
          >
            {nameButtonCancel || 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              background: '#09f',
              color: '#fff',
            }}
          >
            {nameButtonConfirm || 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
