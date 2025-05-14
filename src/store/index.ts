import { create } from 'zustand';
import { SimulationState, SimulationScenario } from '../types';

export const useSimulationStore = create<SimulationState>((set, get) => ({
  loading: false,
  error: null,
  scenario: null,
  scenarioRequest: '',
  pdfContent: null,
  
  setScenarioRequest: (request) => set({ scenarioRequest: request }),
  setPdfContent: (content) => set({ pdfContent: content }),
  
  generateScenario: async () => {
    set({ loading: true, error: null });
    
    try {
      const { scenarioRequest, pdfContent } = get();
      
      const messages = [
        {
          role: "developer",
          content: [
            {
              type: "text",
              text: `You are a expert game designer and writer. You have been hired by a educational game studio to create immersive experiences for users where they will be chatting with AI powered NPCs. You have to create a high detailed experience that includes all the fields provided in the json schema. You will take the input from the user and craft a scenario. Be detailed and colorful. Make the NPC characters as human like and believable as possible. Provide them with example sayings, personalities, everything required from the json schema. You can only have two NPCs and the human user in the scenario. Make sure you are crafting the scenario to provide an interpersonal communication experience. You must have one real person in the scenario you create for it to be valid.`
            }
          ]
        }
      ];

      // Add PDF content if available
      if (pdfContent) {
        messages.push({
          role: "user",
          content: [
            {
              type: "file",
              file: {
                filename: "context.pdf",
                file_data: pdfContent
              }
            }
          ]
        });
      }

      // Add user's text request
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: scenarioRequest
          }
        ]
      });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages,
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "scenario_schema",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  basic_info: {
                    type: "object",
                    properties: {
                      scenario_name: {
                        type: "string",
                        description: "A clear, concise, and unique title for your scenario."
                      },
                      scenario_description: {
                        type: "string",
                        description: "A brief, informative overview summarizing what learners will experience."
                      },
                      scenario_detail: {
                        type: "string",
                        description: "Comprehensive context about the scenario, including the situation, background information, key events, and setting."
                      },
                      scenario_discipline: {
                        type: "string",
                        description: "Specify the academic or professional discipline the scenario relates to (e.g., economics, psychology, healthcare)."
                      }
                    },
                    required: [
                      "scenario_name",
                      "scenario_description",
                      "scenario_detail",
                      "scenario_discipline"
                    ],
                    additionalProperties: false
                  },
                  objectives: {
                    type: "array",
                    description: "A list of clearly defined objectives for the scenario.",
                    items: {
                      type: "object",
                      properties: {
                        objective_name: {
                          type: "string",
                          description: "A concise and unique identifier for internal use."
                        },
                        objective_student_facing: {
                          type: "string",
                          description: "A clear and straightforward description that students will see, explaining what they should achieve or demonstrate. No more than five words."
                        },
                        objective_description: {
                          type: "string",
                          description: "Detailed explanation for how the AI should evaluate student performance."
                        }
                      },
                      required: [
                        "objective_name",
                        "objective_student_facing",
                        "objective_description"
                      ],
                      additionalProperties: false
                    }
                  },
                  participants: {
                    type: "array",
                    description: "Define the characters or participants the student will interact with in the scenario.",
                    items: {
                      type: "object",
                      properties: {
                        is_real_person: {
                          type: "string",
                          enum: [
                            "Yes",
                            "No"
                          ],
                          description: "Indicate whether this participant is an AI-powered non-player character (NPC) or the role that the learner will be playing in the scenario."
                        },
                        participant_full_name: {
                          type: "string",
                          description: "Complete name of the participant."
                        },
                        participant_short_name: {
                          type: "string",
                          description: "Shortened name or nickname used frequently in interactions."
                        },
                        participant_role_and_title: {
                          type: "string",
                          description: "Professional role or title relevant to the scenario."
                        },
                        perspective: {
                          type: "string",
                          description: "Describe how the participant views the scenario or problem."
                        },
                        personality: {
                          type: "string",
                          description: "Key personality traits that shape the character's interactions."
                        },
                        communication_style: {
                          type: "string",
                          description: "Specify how this character typically communicates."
                        },
                        motivation: {
                          type: "string",
                          description: "Explain what drives this character's actions and decisions within the scenario."
                        },
                        knowledge: {
                          type: "string",
                          description: "List specific facts or contextual knowledge the character holds relevant to the scenario."
                        },
                        phrases: {
                          type: "array",
                          description: "Example phrases or typical statements the participant might say.",
                          items: {
                            type: "string"
                          }
                        },
                        special_instructions: {
                          type: "string",
                          description: "Any specific instructions for how the AI should handle the participant's interactions."
                        },
                        confused_phrase: {
                          type: "string",
                          description: "A phrase the participant should use if the learner's responses become irrelevant or inappropriate."
                        }
                      },
                      required: [
                        "is_real_person",
                        "participant_full_name",
                        "participant_short_name",
                        "participant_role_and_title",
                        "perspective",
                        "personality",
                        "communication_style",
                        "motivation",
                        "knowledge",
                        "phrases",
                        "special_instructions",
                        "confused_phrase"
                      ],
                      additionalProperties: false
                    }
                  },
                  wrap_up_feedback_guidelines: {
                    type: "string",
                    description: "Scenario specific guidelines for the final wrap up feedback to students."
                  },
                  coach_mentor_guidelines: {
                    type: "string",
                    description: "Scenario specific guidelines that may help the coach perform better for your specific use case."
                  }
                },
                required: [
                  "basic_info",
                  "objectives",
                  "participants",
                  "wrap_up_feedback_guidelines",
                  "coach_mentor_guidelines"
                ],
                additionalProperties: false
              }
            }
          },
          temperature: 0.5,
          max_tokens: 16384,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const simulationData = JSON.parse(data.choices[0].message.content) as SimulationScenario;
      
      set({ 
        scenario: simulationData, 
        loading: false 
      });
    } catch (error) {
      console.error('Error generating scenario:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        loading: false 
      });
    }
  },
  
  resetScenario: () => set({ 
    scenario: null, 
    error: null,
    scenarioRequest: '',
    pdfContent: null
  })
}));