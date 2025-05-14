import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components'
import { useUploadResource } from '@/hooks/use-resources'
import { Loader2 } from 'lucide-react'

export const FileResource = ({ scenario_id, form }) => {
  const onUploadSuccess = React.useCallback(() => {
    form.setValue('resourceFile', '')
  }, [form])
  const { uploadResource, isLoading } = useUploadResource({ scenario_id, onSuccess: onUploadSuccess })
  return (
    <div className="w-full max-w-sm items-center gap-1.5 mt-6 flex flex-row">
      <FormField
        control={form.control}
        name="resourceFile"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Add Resources</FormLabel>
              <FormControl>
                <Input id="file" type="file" {...field} onChange={uploadResource} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      {isLoading && (
        <div className="mt-8 ml-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  )
}
