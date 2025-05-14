import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components'
import { Settings } from 'lucide-react'
import React from 'react'
import { TURN_STRATEGIES } from '@/constants'

export const AdvancedSettings = ({ form }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Dialog open={isOpen} modal>
      <Button variant="outline" size="icon" className="absolute right-20" onClick={() => setIsOpen(!isOpen)}>
        <Settings />
      </Button>
      <DialogContent hideCloseButton={true} className="w-1/2 h-auto max-w-none p-6">
        <DialogHeader>
          <DialogTitle>Advanced Settings</DialogTitle>
          <DialogDescription>
            Update Scenario settings such as Participant temperature, Turn Strategy e.t.c
          </DialogDescription>
        </DialogHeader>
        <div className="w-full gap-6 flex flex-col">
          <FormField
            control={form.control}
            name="scenario_turn_strategy"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Scenario Turn Strategy</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select conversation turn strategy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TURN_STRATEGIES.map(({ id, name }) => {
                        return (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Participant Temperature</FormLabel>
                  <FormControl>
                    <Input placeholder="Participant Temperature" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>

        <p className="text-sm text-gray-500">Note: Settings is saved at the end of the form.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
