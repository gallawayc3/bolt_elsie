import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from '../ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { formSchema, formDefaultValues, useStepper, STEPS } from './scenario-form-schema'
import { ScenarioParticipantsForm } from './scenario-form-participants'
import { ScenarioObjectivesForm } from './scenario-form-objectives'
import { ScenarioDetailForm } from './scenario-form-detail'
import { useToast } from '@/hooks/use-toast'
import { AdvancedSettings } from './advanced-settings'
import { ScenarioResourcesForm } from './scenario-resources/scenario-form-resources'
import { openScenarioInstancePreviewLink } from '../../lib/utils'
import { getPublicConfig } from 'elsie-shared'

const STEP_FIELD_MAP = {
  [STEPS.scenario]: [
    'scenario_name',
    'scenario_description',
    'scenario_details',
    'scenario_turn_strategy',
    'discipline_id',
    'background_image_id',
  ],
  [STEPS.resources]: ['turn_limit', 'temperature'],
  [STEPS.objectives]: ['objectives'],
  [STEPS.participants]: ['participants'],
}

export const ScenarioForm = ({ formValues, isEdit = false }) => {
  const stepper = useStepper()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const apiEndpoint = React.useMemo(() => {
    return getPublicConfig('API_ENDPOINT', '')
  }, [])

  const formData = React.useMemo(() => {
    return (
      {
        ...formValues,
        temperature: formValues?.participants?.[0]?.temperature || 0,
      } || formDefaultValues
    )
  }, [formValues])

  const form = useForm({
    defaultValues: formData,
    resolver: zodResolver(formSchema), // plain object already
    mode: 'onChange', // so formState.isValid stays live
    criteriaMode: 'all',
  })

  React.useEffect(() => {
    if (formData?.scenario_id) {
      form.reset(formData)
    }
  }, [form, formData])

  const getPutFormValues = React.useCallback(() => {
    const values = form.getValues()
    return {
      scenario_data: {
        objectives: values?.objectives || [],
        participants:
          values?.participants?.map((participant) => {
            return {
              ...participant,
              temperature: values?.temperature,
            }
          }) || [],
        scenario: {
          turn_limit: values?.turn_limit,
          scenario_id: values?.scenario_id,
          scenario_name: values?.scenario_name,
          scenario_turn_strategy: values?.scenario_turn_strategy,
          scenario_description: values?.scenario_description,
          scenario_details: values?.scenario_details,
          background_image_id: values?.background_image_id,
          discipline_id: values?.discipline_id,
        },
      },
    }
  }, [form])

  const postScenario = React.useCallback(
    async (data) => {
      const method = isEdit ? 'PUT' : 'POST'
      isEdit ? console.log('send put') : console.log('sent push')
    },
    [isEdit],
  )

  const uploadImage = async (data) => {
    console.log('send image', data)
  }

  const imageIdToUrl = (imageId) => {
    // FIXME probably should use imageUrl from server, but that requires more local state
    return `${apiEndpoint}/image/${imageId}`
  }

  const mutation = useMutation({
    mutationFn: postScenario,
    onSuccess: (response) => {
      const scenarioId = isEdit && id ? id : response?.scenario_id
      toast({
        description: isEdit ? 'Scenario updated!' : 'Scenario created!',
      })
      setTimeout(() => {
        navigate(`/scenario-builder/scenario/edit/${scenarioId}`)
      }, 3000)
    },
    onError: (e) => {
      toast({
        variant: 'destructive',
        description: e.message,
      })
    },
  })

  const createScenarioInstanceMutation = useMutation({
    mutationKey: ['scenario-instances'],
    mutationFn: async ({ scenarioId }) => {
      return {
        "scenario_data": {
            "scenario": {
                "created_at": "2025-05-14T12:28:31.935497",
                "created_by": null,
                "deleted_at": null,
                "discipline": null,
                "turn_limit": 0,
                "updated_at": "2025-05-14T12:28:49.836967",
                "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                "discipline_id": "f37af2aa-e187-4498-9efd-f46ae9eae660",
                "scenario_name": "Netflix India Market Entry: Analyst Team Huddle",
                "scenario_details": "It's your third month as a Junior Market Analyst at Netflix India. The company is focused on expanding its subscriber base in India, but faces tough competition from Hotstar, Amazon Prime Video, and a range of local streaming services. You are part of a small analyst pod tasked with gathering market intelligence and generating actionable insights for the product and marketing teams. Today, you're meeting virtually with two colleagues: Priya, a Senior Data Analyst who mentors new hires, and Arjun, a Content Acquisition Associate with expertise in regional markets. Your team's goal is to prepare a short internal report identifying key consumer trends and recommending one or two strategic actions Netflix India could take to appeal to more Indian viewers, especially outside major cities. You'll discuss data, debate ideas, and collaborate to form a consensus. You are expected to contribute your perspective, ask questions, and help synthesize the group's findings.",
                "background_image_id": null,
                "scenario_project_id": null,
                "scenario_properties": null,
                "scenario_description": " It's your third month as a Junior Market Analyst at Netflix India. The company is focused on expanding its subscriber base in India, but faces tough competition from Hotstar, Amazon Prime Video, and a range of local streaming services. You are part of a small analyst pod tasked with gathering market intelligence and generating actionable insights for the product and marketing teams. Today, you're meeting virtually with two colleagues: Priya, a Senior Data Analyst who mentors new hires, and Arjun, a Content Acquisition Associate with expertise in regional markets. Your team's goal is to prepare a short internal report identifying key consumer trends and recommending one or two strategic actions Netflix India could take to appeal to more Indian viewers, especially outside major cities. You'll discuss data, debate ideas, and collaborate to form a consensus. You are expected to contribute your perspective, ask questions, and help synthesize the group's findings.",
                "scenario_turn_strategy": "conversation manager",
                "scenario_coach_instruction": "Encourage the learner to be proactive in asking questions and connecting dots between data and creative strategy. Remind the learner that early career analysts are valued for their curiosity and willingness to learn, not just their expertise. Prompt the learner to balance analytical thinking (Priya's style) with creative, market-focused ideas (Arjun's style).\n\nYou should never mention the transcript as missing, but just state something like \"It looks like you haven't started yet, maybe try...\" and direct the student on something to start out with. \n\nYour response should be no more than two sentences in length.\n",
                "background_image_position_x": null,
                "background_image_position_y": null
            },
            "objectives": [
                {
                    "scenario_objective_id": "2c9333f5-c226-490b-b8cf-f0a122211063",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "objective_name": "collaborative_discussion",
                    "objective_ai_description": "Learner should actively participate in group conversation, ask clarifying questions, and build on others' ideas respectfully.",
                    "created_at": "2025-05-14T12:28:31.941457",
                    "updated_at": "2025-05-14T12:28:49.847365",
                    "deleted_at": null,
                    "created_by": null,
                    "objective_properties": null,
                    "objective_student_facing": "Engage in collaborative discussion"
                },
                {
                    "scenario_objective_id": "3a7ce852-597a-4e61-8e3e-059532a08a0a",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "objective_name": "strategic_recommendation",
                    "objective_ai_description": "earner should propose at least one realistic, data-driven recommendation for Netflix India's strategy that addresses a real challenge raised in the scenario.",
                    "created_at": "2025-05-14T12:28:31.943089",
                    "updated_at": "2025-05-14T12:28:49.848756",
                    "deleted_at": null,
                    "created_by": null,
                    "objective_properties": null,
                    "objective_student_facing": "Suggest actionable recommendations"
                },
                {
                    "scenario_objective_id": "ac076dbd-e653-48c5-8b0f-374eb09a055f",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "objective_name": "market_trends_identification",
                    "objective_ai_description": "Learner should demonstrate understanding of Indian streaming market trends—such as language preferences, mobile usage, and price sensitivity—using evidence from the case.",
                    "created_at": "2025-05-14T12:28:31.939501",
                    "updated_at": "2025-05-14T12:28:49.845877",
                    "deleted_at": null,
                    "created_by": null,
                    "objective_properties": null,
                    "objective_student_facing": " Identify key market trends"
                }
            ],
            "participants": [
                {
                    "participant_id": "dccaa8fa-350b-4db3-9f11-0c14b9f544a9",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "participant_name": "Priya Menon",
                    "participant_description": "",
                    "is_real_person": false,
                    "temperature": 1,
                    "created_at": "2025-05-14T12:28:31.944666",
                    "updated_at": "2025-05-14T12:28:49.840421",
                    "deleted_at": null,
                    "created_by": null,
                    "participant_image_id": null,
                    "participant_image_position_x": null,
                    "participant_image_position_y": null,
                    "participant_properties": {
                        "phrases": "Let's look at what the numbers are telling us.\nI've noticed an uptick in users from Tier 2 cities.\nHow might this trend affect our recommendations?\nThat's a good point—can you elaborate?\nDon't worry, everyone's new at this at some point.",
                        "knowledge": "Familiar with Netflix India's user data, competitive landscape, and internal reporting standards. Knows about recent consumer surveys and trends in regional language content.",
                        "motivation": "Priya wants to help the team produce actionable insights that will be noticed by product managers. She enjoys seeing new analysts develop their skills.",
                        "personality": "Supportive, analytical, patient, enjoys mentoring new colleagues.",
                        "perspective": "Priya is focused on interpreting recent user data, highlighting trends in regional language consumption and mobile device usage. She values evidence-based discussion and wants to ensure the team's findings are robust.",
                        "role_and_title": "Senior Data Analyst, Netflix India",
                        "confused_phrase": "I'm not sure I follow—could you clarify what you mean?",
                        "communication_style": "Clear, data-driven, occasionally uses analogies to explain concepts, gently probes for deeper thinking.",
                        "special_instructions": "Priya should encourage the learner to contribute, clarify data points as needed, and gently challenge unsupported assertions.",
                        "participant_short_name": "Priya"
                    }
                },
                {
                    "participant_id": "e26abeb7-5038-4337-b642-89c41c01959b",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "participant_name": "You",
                    "participant_description": "",
                    "is_real_person": true,
                    "temperature": 1,
                    "created_at": "2025-05-14T12:28:31.948326",
                    "updated_at": "2025-05-14T12:28:49.843739",
                    "deleted_at": null,
                    "created_by": null,
                    "participant_image_id": null,
                    "participant_image_position_x": null,
                    "participant_image_position_y": null,
                    "participant_properties": {
                        "role_and_title": "Junior Market Analyst, Netflix India",
                        "participant_short_name": "You"
                    }
                },
                {
                    "participant_id": "99e16a6e-d492-4ee2-aea1-047f001222ce",
                    "scenario_id": "f61cc978-49e6-42ae-a67b-99db8f81e001",
                    "participant_name": "Arjun Deshpande",
                    "participant_description": "",
                    "is_real_person": false,
                    "temperature": 1,
                    "created_at": "2025-05-14T12:28:31.946716",
                    "updated_at": "2025-05-14T12:28:49.842062",
                    "deleted_at": null,
                    "created_by": null,
                    "participant_image_id": null,
                    "participant_image_position_x": null,
                    "participant_image_position_y": null,
                    "participant_properties": {
                        "phrases": "People in Pune aren't watching the same stuff as folks in Patna.\nWhat if we tried something no one else is doing?\nI just got off a call with a Marathi producer—lots of potential there.\nSometimes, you have to take risks to win big.\nLet's not get lost in spreadsheets.",
                        "knowledge": "Knows the regional content landscape, recent acquisition deals, and feedback from local production partners. Aware of what's trending on rival platforms.",
                        "motivation": "Arjun wants Netflix to stand out from competitors by investing in unique regional content. He's eager to see new ideas implemented quickly.",
                        "personality": "Enthusiastic, creative, pragmatic, sometimes impatient with too much number-crunching.",
                        "perspective": "Arjun is passionate about Indian regional content and understands what resonates in smaller cities. He is eager to advocate for more local partnerships and innovative content formats.",
                        "role_and_title": "Content Acquisition Associate, Netflix India",
                        "confused_phrase": "Wait, I'm not sure how that connects to our goal—can you explain?",
                        "communication_style": "Conversational, uses examples from pop culture, quick to brainstorm ideas, sometimes interrupts out of excitement.",
                        "special_instructions": "Arjun should push for creative, actionable ideas and challenge the group to move beyond just data analysis. He should reference recent content trends and local market anecdotes.",
                        "participant_short_name": "Arjun"
                    }
                }
            ]
        }
    }
    },
    onSuccess: (data) => {
      openScenarioInstancePreviewLink(data.scenario_instance.scenario_instance_id)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = React.useCallback(async () => {
    const currentStepId = stepper.current.id // e.g. 'resources'
    const stepFields = STEP_FIELD_MAP[currentStepId] // array of strings

    // validate only the fields visible right now
    const isStepValid = await form.trigger(stepFields, { shouldFocus: true })

    if (!isStepValid) {
      toast({
        variant: 'destructive',
        description: 'Please add a participant.',
      })
      return
    }
    const data = isEdit ? getPutFormValues() : form.getValues()
    mutation.mutate(data)
  }, [form, getPutFormValues, isEdit, mutation])

  const handleNext = React.useCallback(async () => {
    const currentStepId = stepper.current.id // e.g. 'resources'
    const stepFields = STEP_FIELD_MAP[currentStepId] // array of strings

    // validate only the fields visible right now
    const isStepValid = await form.trigger(stepFields, { shouldFocus: true })

    if (isStepValid || currentStepId === 'resources') stepper.next()
  }, [form, stepper])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AdvancedSettings form={form} />
          {stepper.when(STEPS.scenario, () => (
            <ScenarioDetailForm form={form} uploadImageFn={uploadImage} imageIdToUrlFn={imageIdToUrl} />
          ))}
          {stepper.when(STEPS.resources, () => (
            <ScenarioResourcesForm form={form} />
          ))}
          {stepper.when(STEPS.objectives, () => (
            <ScenarioObjectivesForm form={form} />
          ))}
          {stepper.when(STEPS.participants, () => (
            <ScenarioParticipantsForm form={form} uploadImageFn={uploadImage} imageIdToUrlFn={imageIdToUrl} />
          ))}
          <div className="flex flex-row justify-between">
            <div className="flex gap-x-3">
              <Button type="button" onClick={stepper.prev} disabled={stepper.isFirst}>
                Prev
              </Button>
              {!stepper.isLast ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <>
                  <Button type="button" onClick={onSubmit}>
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                </>
              )}
            </div>
            {stepper.isLast && (
              <button
                type="button"
                className="justify-self-end text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() =>
                  createScenarioInstanceMutation.mutate({
                    scenarioId: formData?.scenario_id,
                  })
                }
              >
                Preview
              </button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

ScenarioForm.propTypes = {
  formValues: PropTypes.object,
  isEdit: PropTypes.bool,
}

export default ScenarioForm