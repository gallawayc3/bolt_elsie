import React from 'react'
import PropTypes from 'prop-types'
import { PromptDialog } from './scenario-form-preview-dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button, Textarea } from '@/components'
import { OBJECTIVES, formDefaultValues } from './scenario-form-schema'
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form'

export const ScenarioObjectivesForm = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: OBJECTIVES,
  })

  const { getValues } = useFormContext()
  const scenarioDescription = getValues('scenario_description')
  const participants = getValues('participants')

  const objectives = useWatch({
    control: form.control,
    name: OBJECTIVES,
  })

  const getPromptVariables = () => {
    return {
      objectives: objectives,
      scenario: scenarioDescription,
      transcript: "This will be the transcript of the student's conversation",
      student_name: 'Student Name',
      participant_num: participants?.length - 1,
    }
  }
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Scenario Objectives</h2>
      <span className="mt-1 text-sm leading-6 text-gray-600">Create scenario Objectives</span>
      <div className="mb-4" />
      <div>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="border-b-2 mb-8 pb-8 space-y-8">
              {fields.length > 1 && index > 0 && (
                <Button variant="ghost" className="sticky left-full" onClick={() => remove(index)}>
                  Delete
                </Button>
              )}
              <FormField
                control={form.control}
                name={`${[OBJECTIVES]}.${index}.objective_name`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Objective Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Short unique name of objective" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`${[OBJECTIVES]}.${index}.objective_student_facing`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Objective Student Facing</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Objective description seen by student" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`${[OBJECTIVES]}.${index}.objective_ai_description`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Objective Criteria</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Objective Criteria for evaluation by AI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
          )
        })}
        <div className="flex justify-end">
          <Button type="button" onClick={() => append(formDefaultValues?.[OBJECTIVES])}>
            Add
          </Button>
        </div>
        <PromptDialog promptName={'Objective'} promptId={'objectives'} promptInputs={getPromptVariables()} />
      </div>
    </>
  )
}

ScenarioObjectivesForm.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}
