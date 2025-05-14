// scenario-form-schema.js
import { z } from 'zod'
import { defineStepper } from '@stepperize/react'
import { TURN_STRATEGIES } from '@/constants'

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const PARTICIPANTS = 'participants'
export const OBJECTIVES = 'objectives'

/* ------------------------------------------------------------------ */
/*  Zod schema (one authoritative source of truth)                     */
/* ------------------------------------------------------------------ */

const participantCommon = {
  participant_name: z.string().min(2, { message: 'Enter participant Name' }),
};

/* 1—AI/bot participant  (is_real_person = false or missing) */
const botParticipantSchema = z.object({
  ...participantCommon,

  /* explicit literal so the union can discriminate */
  is_real_person: z.literal(false).optional().default(false),

  /* every field is required and must have ≥ 2 chars */
  participant_properties: z.object({
    role_and_title:        z.string().min(2, { message: 'Enter participant role and title' }),
    perspective:           z.string().min(2, { message: 'Enter participant perspective' }),
    personality:           z.string().min(2, { message: 'Enter participant personality' }),
    communication_style:   z.string().min(2, { message: 'Enter participant communication style' }),
    motivation:            z.string().min(2, { message: 'Enter participant motivation' }),
    knowledge:             z.string().min(2, { message: 'Enter participant knowledge' }),
    phrases:               z.string().min(2, { message: 'Enter participant phrases' }),
    special_instructions:  z.string().min(2, { message: 'Enter participant special instructions' }),
    confused_phrase:       z.string().min(2, { message: 'Enter participant confused phrase' }),
  }),
});

/* 2—Real-person participant (is_real_person=true)                */
/*     participant_properties is completely optional here            */
const humanParticipantSchema = z.object({
  ...participantCommon,
  is_real_person: z.literal(true),
  participant_properties: z
    .object({
      role_and_title:        z.string().min(2).optional(),
      perspective:           z.string().min(2).optional(),
      personality:           z.string().min(2).optional(),
      communication_style:   z.string().min(2).optional(),
      motivation:            z.string().min(2).optional(),
      knowledge:             z.string().min(2).optional(),
      phrases:               z.string().min(2).optional(),
      special_instructions:  z.string().min(2).optional(),
      confused_phrase:       z.string().min(2).optional(),
    })
    .partial()
    .optional(),
});

/* 3—One union that picks the right branch based on is_real_person */
const participantSchema = z.discriminatedUnion('is_real_person', [
  humanParticipantSchema,
  botParticipantSchema,
]);

const schemaShape = {
  scenario_name: z.string().min(2, { message: 'Enter a valid name for Scenario' }),
  scenario_turn_strategy: z.string({ message: 'Select Turn Strategy' }),
  scenario_description: z.string().min(2, { message: 'Enter a valid description for Scenario' }),
  scenario_details: z.string().min(2, { message: 'Enter a scenario Detail' }),
  discipline: z.string({ message: 'Enter a discipline' }),
  discipline_id: z.string({ message: 'Enter a discipline id' }),
  scenario_coach_instruction: z.string({ message: 'Enter Scenario coach instructions' }),
  [OBJECTIVES]: z
    .array(
      z.object({
        objective_name: z.string().min(2, { message: 'Enter name of scenario Objective' }),
        objective_student_facing: z.string().min(2, { message: 'Enter a student facing objective description' }),
        objective_ai_description: z.string().min(2, { message: 'Enter a ai objective description' }),
      }),
    )
    .min(1, { message: 'Add at least one objective' }),

    [PARTICIPANTS]: z
    .array(participantSchema)
    .min(1, { message: 'Add at least one participant' }),

  background_image_id: z.string().nullable().optional(),
}

export const formSchema = z.object(schemaShape)

/* ------------------------------------------------------------------ */
/*  Default values used by react-hook-form                             */
/* ------------------------------------------------------------------ */

export const formDefaultValues = {
  scenario_name: '',
  scenario_turn_strategy: TURN_STRATEGIES[0].id,
  scenario_project_id: '',
  scenario_description: '',
  scenario_details: '',
  turn_limit: 0,
  discipline: '',
  discipline_id: '',
  temperature: 0,
  scenario_coach_instruction: '',

  [PARTICIPANTS]: [
    {
      participant_name: '',
      is_real_person: false,
      participant_description: '',
      temperature: '0',
      participant_properties: {},
    },
  ],
  [OBJECTIVES]: [
    {
      objective_name: '',
      objective_ai_description: '',
    },
  ],

  background_image_id: null,
}

/* ------------------------------------------------------------------ */
/*  Wizard-step identifiers                                            */
/* ------------------------------------------------------------------ */

export const STEPS = {
  scenario: 'scenario',
  coach: 'coach',
  resources: 'resources',
  objectives: 'objectives',
  participants: 'participants',
}

/* Tell Stepperize what the steps are, in the order you want */
export const { useStepper } = defineStepper(
  { id: STEPS.scenario },
  { id: STEPS.coach },
  { id: STEPS.resources },
  { id: STEPS.objectives },
  { id: STEPS.participants },
)
