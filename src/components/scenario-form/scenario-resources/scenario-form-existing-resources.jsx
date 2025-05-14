import React from 'react'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { RESOURCE_TYPE, useDeleteResources, useGetAllResources } from '@/hooks/use-resources'
import { Link, Paperclip, Trash2 } from 'lucide-react'
import { FileResource } from './scenario-form-resources-file'
import { LinkResource } from './scenario-form-resources-link'
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'elsie-shared/components/ui/dialog'

export const ScenarioResources = ({ form }) => {
  const data = form.getValues()
  const { data: resources = [] } = useGetAllResources(data?.scenario_id)
  const onSuccess = () => {
    setSelectedResource(null)
  }
  const { onDelete } = useDeleteResources(onSuccess)
  const [selectedResource, setSelectedResource] = React.useState(null)
  return (
    <>
      <div>
        <Tabs defaultValue="file" className="w-[80%]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">
              <div className="w-full flex gap-3 justify-center">
                <Paperclip className="h-5 w-5" />
                <span className="text-sm">File</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="link">
              <div className="w-full flex gap-3 justify-center">
                <Link className="h-5 w-5" />
                <span className="text-sm">Links</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <FileResource scenario_id={data?.scenario_id} form={form} />
          </TabsContent>
          <TabsContent value="link">
            <LinkResource form={form} />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <div className="border-b-2 mb-8 pb-8 space-y-8" />
        {resources?.map((resource) => {
          return (
            <div key={resource?.id} className="flex justify-between w-sm">
              <div className="flex gap-5">
                {resource?.resource_type === RESOURCE_TYPE.LINKS ? (
                  <Link className="text-sm h-5" />
                ) : (
                  <Paperclip className="text-sm h-5" />
                )}
                {resource?.resource_type === RESOURCE_TYPE.LINKS && (
                  <a href={resource?.link_resource?.url} target="_blank" className="text-sm text-gray-600">
                    {resource?.resource_name}
                  </a>
                )}
                {resource?.resource_type === RESOURCE_TYPE.FILE && (
                  <span className="text-sm text-gray-600">{resource?.resource_name}</span>
                )}
              </div>
              <Button variant="link" onClick={() => setSelectedResource(resource)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          )
        })}

        <Dialog open={!!selectedResource} modal>
          <DialogContent hideCloseButton>
            <DialogHeader>
              <DialogTitle>Delete Resource?</DialogTitle>
              <DialogDescription>Note: this action cannot be reversed. Continue?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedResource(null)}>
                Close
              </Button>
              <Button
                onClick={async () => {
                  onDelete(selectedResource.resource_id)
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
