import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { apiClient } from '@/lib/api-client'
import { Form, Button, Label } from '../../components/ui'
import { toast } from 'sonner'

export const PromptDialog = ({ promptName, promptId, promptInputs }) => {
  const {
    data: promptData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['prompt', promptId, promptInputs],
    queryFn: async () => {
      const res = await apiClient.prompt.promptPreview(promptId, {
        body: JSON.stringify(promptInputs),
      })
      return res.json()
    },
    onError: (err) => toast.error(err.message),
    enabled: false, // manual fetching
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => refetch()}>
          View {promptName} Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Prompt for {promptName}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md bg-gray-100">
          <pre className="whitespace-pre-wrap text-sm">
            {isLoading ? 'Loading...' : isError ? 'An error occurred' : promptData?.filledTemplate || 'No Data'}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}