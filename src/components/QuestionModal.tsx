import { X } from 'lucide-react'

interface QuestionModalProps {
  isOpen: boolean
  onClose: () => void
  question: {
    question_title: string
    question_text: string
    solution_text: string
  }
}

export function QuestionModal({ isOpen, onClose, question }: QuestionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">{question.question_title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-auto p-6 space-y-6">
          <div>
            <h4 className="font-medium text-lg mb-3">Question</h4>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{question.question_text}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-3">Solution</h4>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{question.solution_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}