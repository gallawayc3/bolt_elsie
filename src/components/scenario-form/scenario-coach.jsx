import React from 'react'
import { PromptDialog } from './scenario-form-preview-dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components'

export const ScenarioCoach = ({ form }) => {
  const formDetails = form.getValues()

  const getPreviewDetails = React.useCallback(() => {
    return {
      scenario: formDetails?.scenario_description,
      transcript: "this will be the transcript of the student's conversation",
      objectives: formDetails?.objectives?.map(({ objective_name }) => objective_name).join(','),
      instructions: formDetails?.scenario_coach_instruction,
    }
  }, [formDetails])

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Scenario Mentor / Coach</h2>
      <span className="mt-1 text-sm leading-6 text-gray-600">
        Enter instructions for mentor to use when guiding student
      </span>
      <div className="mb-4" />
      <div>
        <FormField
          control={form.control}
          name="scenario_coach_instruction"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Scenario Coach Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-96"
                    placeholder="<understanding_the_problem>
- Explain the scenario and objectives in simpler terms to help the student understand what they’re supposed to do.
</understanding_the_problem>"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className="mt-8">
          <PromptDialog promptName="Coach" promptId="coach" promptInputs={getPreviewDetails()} />
        </div>
      </div>
    </>
  )
}
