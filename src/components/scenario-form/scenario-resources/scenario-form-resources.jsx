import React from 'react'
import { InfoIcon } from 'lucide-react'
import { ScenarioResources } from './scenario-form-existing-resources'
export const ScenarioResourcesForm = ({ form }) => {
  const data = form.getValues()
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Scenario Resources</h2>
          <span className="mt-1 text-sm leading-6 text-gray-600">Attach Resources to scenario for student use.</span>
          <div className="flex gap-3 pt-2">
            <InfoIcon className="h-5" />{' '}
            <span className="text-xs text-gray-600 mt-1">Note: only files and links are currently supported</span>
          </div>
        </div>
      </div>
      <div className="mb-4" />
      {data?.scenario_id ? (
        <ScenarioResources form={form} />
      ) : (
        <div className="border p-4 flex gap-4 border-gray-200">
          <InfoIcon className="h-5" />
          <span className="text-gray-500">
            Please first save scenario before coming back to upload resources to it.
          </span>
        </div>
      )}
    </>
  )
}
