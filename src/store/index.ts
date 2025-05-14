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
      
      if (!scenarioRequest.trim()) {
        throw new Error('Please provide a scenario request');
      }

      const messages = [
        {
          role: "system",
          content: `You are a expert game designer and writer. You have been hired by a educational game studio to create immersive experiences for users where they will be chatting with AI powered NPCs. You have to create a high detailed experience that includes all the fields provided in the json schema. You will take the input from the user and craft a scenario. Be detailed and colorful. Make the NPC characters as human like and believable as possible. Provide them with example sayings, personalities, everything required from the json schema. You can only have two NPCs and the human user in the scenario. Make sure you are crafting the scenario to provide an interpersonal communication experience. You must have one real person in the scenario you create for it to be valid.`
        }
      ];

      // Add PDF content if available
      if (pdfContent) {
        messages.push({
          role: "user",
          content: pdfContent
        });
      }

      // Add user's text request
      messages.push({
        role: "user",
        content: scenarioRequest
      });

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages,
          response_format: { type: "json_object" },
          temperature: 0.5,
          max_tokens: 4000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API request failed with status: ${response.status}${
            errorData.error?.message ? ` - ${errorData.error.message}` : ''
          }`
        );
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