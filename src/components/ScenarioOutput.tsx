import React, { useRef } from 'react';
import { useSimulationStore } from '../store';
import { ArrowLeft, Copy, Check, X } from 'lucide-react';

const ScenarioOutput: React.FC = () => {
  const { scenario, resetScenario } = useSimulationStore();
  const [copySuccess, setCopySuccess] = React.useState(false);
  const timeoutRef = useRef<number | null>(null);

  if (!scenario) return null;

  const { basic_info, objectives, participants, wrap_up_feedback_guidelines, coach_mentor_guidelines } = scenario;

  const handleCopyClick = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Create formatted text content for clipboard
    const formattedContent = `
SCENARIO INFORMATION
--------------------
Name        : ${basic_info.scenario_name}
Description : ${basic_info.scenario_description}
Detail      : ${basic_info.scenario_detail}
Discipline  : ${basic_info.scenario_discipline}

OBJECTIVES
----------
${objectives.map((obj, i) => `${i + 1}. Name           : ${obj.objective_name}
   Student-Facing : ${obj.objective_student_facing}
   Description    : ${obj.objective_description}
`).join('\n')}

PARTICIPANTS
------------
${participants.map((p, i) => `${i + 1}. ${p.participant_full_name} (${p.participant_role_and_title})
   Is Real Person?   : ${p.is_real_person}
   Short Name        : ${p.participant_short_name}
   Perspective       : ${p.perspective}
   Personality       : ${p.personality}
   Communication     : ${p.communication_style}
   Motivation        : ${p.motivation}
   Knowledge         : ${p.knowledge}
   Phrases:
${p.phrases.map(phrase => `       - ${phrase}`).join('\n')}
   Special Instr.    : ${p.special_instructions}
   Confused Phrase   : ${p.confused_phrase}
`).join('\n')}

WRAP-UP FEEDBACK GUIDELINES
---------------------------
${wrap_up_feedback_guidelines}

COACH/MENTOR GUIDELINES
-----------------------
${coach_mentor_guidelines}
    `;

    // Copy to clipboard
    navigator.clipboard.writeText(formattedContent)
      .then(() => {
        setCopySuccess(true);
        timeoutRef.current = window.setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setCopySuccess(false);
      });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={resetScenario}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </button>
        
        <button
          onClick={handleCopyClick}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            copySuccess 
              ? 'bg-green-100 text-green-700 focus:ring-green-500 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-700 focus:ring-gray-500 hover:bg-gray-200'
          }`}
        >
          {copySuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-700 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">{basic_info.scenario_name}</h2>
          <p className="text-blue-100 mt-1">{basic_info.scenario_discipline}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Scenario Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 mb-4"><span className="font-medium">Description:</span> {basic_info.scenario_description}</p>
              <p className="text-gray-600"><span className="font-medium">Details:</span> {basic_info.scenario_detail}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Objectives</h3>
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-800">{objective.objective_name}</h4>
                  <p className="text-gray-600 mt-1"><span className="font-medium">Student Facing:</span> {objective.objective_student_facing}</p>
                  <p className="text-gray-600 mt-1"><span className="font-medium">Description:</span> {objective.objective_description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Participants</h3>
            <div className="space-y-6">
              {participants.map((participant, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{participant.participant_full_name}</h4>
                      <p className="text-gray-600">{participant.participant_role_and_title}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      participant.is_real_person === 'Yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {participant.is_real_person === 'Yes' ? 'Real Person' : 'NPC'}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Short Name</p>
                      <p className="text-gray-700">{participant.participant_short_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Perspective</p>
                      <p className="text-gray-700">{participant.perspective}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Personality</p>
                      <p className="text-gray-700">{participant.personality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Communication Style</p>
                      <p className="text-gray-700">{participant.communication_style}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Motivation</p>
                      <p className="text-gray-700">{participant.motivation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Knowledge</p>
                      <p className="text-gray-700">{participant.knowledge}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Example Phrases</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {participant.phrases.map((phrase, i) => (
                          <li key={i}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Special Instructions</p>
                      <p className="text-gray-700">{participant.special_instructions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Confused Phrase</p>
                      <p className="text-gray-700">{participant.confused_phrase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Wrap-up Feedback Guidelines</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">{wrap_up_feedback_guidelines}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Coach/Mentor Guidelines</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">{coach_mentor_guidelines}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioOutput;