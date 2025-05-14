export interface BasicInfo {
  scenario_name: string;
  scenario_description: string;
  scenario_detail: string;
  scenario_discipline: string;
}

export interface Objective {
  objective_name: string;
  objective_student_facing: string;
  objective_description: string;
}

export interface Participant {
  is_real_person: "Yes" | "No";
  participant_full_name: string;
  participant_short_name: string;
  participant_role_and_title: string;
  perspective: string;
  personality: string;
  communication_style: string;
  motivation: string;
  knowledge: string;
  phrases: string[];
  special_instructions: string;
  confused_phrase: string;
}

export interface SimulationScenario {
  basic_info: BasicInfo;
  objectives: Objective[];
  participants: Participant[];
  wrap_up_feedback_guidelines: string;
  coach_mentor_guidelines: string;
}

export interface SimulationState {
  loading: boolean;
  error: string | null;
  scenario: SimulationScenario | null;
  scenarioRequest: string;
  pdfContent: string | null;
  setScenarioRequest: (request: string) => void;
  setPdfContent: (content: string | null) => void;
  generateScenario: () => Promise<void>;
  resetScenario: () => void;
}