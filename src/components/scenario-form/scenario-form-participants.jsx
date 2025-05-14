import React from 'react'
import PropTypes from 'prop-types'
import { PromptDialog } from './scenario-form-preview-dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Textarea,
  renderImageUpload,
  Switch,
} from '@/components'
import { PARTICIPANTS, formDefaultValues } from './scenario-form-schema'
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form'

export const ScenarioParticipantsForm = ({ form, uploadImageFn, imageIdToUrlFn }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: PARTICIPANTS,
  })

  const { getValues } = useFormContext()
  const scenarioDetails = getValues('scenario_details')

  const participants = useWatch({
    control: form.control,
    name: PARTICIPANTS,
  })

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Scenario Participants</h2>
      <span className="mt-1 text-sm leading-6 text-gray-600">
        Enter the information of participants for this scenario
      </span>
      <div className="mb-4" />
      <div>
        {fields.map((field, index) => {
          const isRealPerson = participants?.[index]?.is_real_person
          const getPromptVariables = () => {
            return {
              ...participants?.[index],
              ...participants?.[index]?.participant_properties,
              scenario_summary: scenarioDetails,
              num_participants: participants?.length - 1,
              otherParticipants: participants?.filter((_, i) => i != index),
            }
          }
          return (
            <div key={field.id} className="border-b-2 mb-8 pb-8 space-y-8">
              {fields.length > 1 && index > 0 && (
                <Button variant="ghost sticky left-full" onClick={() => remove(index)}>
                  Delete
                </Button>
              )}
              <FormField
                control={form.control}
                name={`${[PARTICIPANTS]}.${index}.is_real_person`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Is Participant a real person?</FormLabel>
                      <FormControl>
                        <Switch
                          placeholder="Objective Description"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="block"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                key={field.id}
                control={form.control}
                name={`${[PARTICIPANTS]}.${index}.participant_name`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Participant Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name Of Participant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`${[PARTICIPANTS]}.${index}.participant_properties.participant_short_name`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Participant Short Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Short Name Of Participant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`${[PARTICIPANTS]}.${index}.participant_properties.role_and_title`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Participant Role and Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Role and title of Participant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.perspective`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Perspective</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How does the NPC view the scenerio or problem at hand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.personality`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Personality</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What kinds of personality traits does the npc have?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.communication_style`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Communication Style</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What kinds of communication style does the npc use?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.motivation`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Motivation</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What motivates this npc?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.knowledge`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Knowldege</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What are some relevant facts that the npc knows about the situation?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.phrases`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phrases</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What are some phrases the NPC would say?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.special_instructions`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What are some special instructions you want for the npc?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_properties.confused_phrase`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Confused Phrase</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What do you want the npc to say when the student goes off the rails?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <FormField
                  control={form.control}
                  name={`${[PARTICIPANTS]}.${index}.participant_image_id`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Participant image</FormLabel>
                        <FormControl>{renderImageUpload(field, imageIdToUrlFn, uploadImageFn)}</FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              {!isRealPerson && (
                <PromptDialog
                  promptName={participants?.[index]?.participant_name}
                  promptId={'participant'}
                  promptInputs={getPromptVariables()}
                />
              )}
            </div>
          )
        })}
        <div className="flex justify-end">
          <Button type="button" onClick={() => append(formDefaultValues?.[PARTICIPANTS])}>
            Add
          </Button>
        </div>
      </div>
    </>
  )
}

ScenarioParticipantsForm.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}
