import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  renderImageUpload,
} from '@/components'
import { useGetAllDisciplines } from '@/hooks/use-disciplines'

export const ScenarioDetailForm = ({ form, uploadImageFn, imageIdToUrlFn }) => {
  const { data: disciplines = [] } = useGetAllDisciplines()
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Scenario Information</h2>
          <span className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </span>
        </div>
      </div>
      <div className="mb-4" />
      <FormField
        control={form.control}
        name="scenario_name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Scenario Name</FormLabel>
              <FormControl>
                <Input placeholder="Name Of Scenario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name="scenario_description"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Scenario Description for Student</FormLabel>
              <FormControl>
                <Textarea placeholder="Scenario Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name="scenario_details"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Scenario Detail for AI Prompts</FormLabel>
              <FormControl>
                <Textarea placeholder="Scenario Details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name="discipline_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Scenario Discipline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Discipline for the scenario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {disciplines?.map(({ id, name }) => {
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
        name="background_image_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Background image</FormLabel>
              <FormControl>
                {
                  /* can you tell I'm not a React dev 😅. I know this should be its own Component */
                  renderImageUpload(field, imageIdToUrlFn, uploadImageFn)
                }
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}

ScenarioDetailForm.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}
