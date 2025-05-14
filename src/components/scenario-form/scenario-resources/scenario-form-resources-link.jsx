import React from 'react'
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components'
import { useLinkResource } from '@/hooks/use-resources'
import { Loader2 } from 'lucide-react'

export const LinkResource = ({ form }) => {
  const data = form.getValues()
  const onSavedLink = React.useCallback(() => {
    form.setValue('linkName', '')
    form.setValue('linkPath', '')
  }, [form])
  const { saveLinkResource, isLoading } = useLinkResource({
    scenario_id: data?.scenario_id,
    form,
    onSuccess: onSavedLink,
  })
  return (
    <div className="mt-6 gap-6 flex flex-col">
      <FormField
        control={form.control}
        name="linkName"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Link Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name="linkPath"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Link Path</FormLabel>
              <FormControl>
                <Input placeholder="Url path to external link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <div>
        <Button onClick={saveLinkResource} disabled={isLoading}>
          {!isLoading ? (
            <span>Save Link</span>
          ) : (
            <>
              <Loader2 className="animate-spin" />
              <span className="ml-2">Please wait</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
