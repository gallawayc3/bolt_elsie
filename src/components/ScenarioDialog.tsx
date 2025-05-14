import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import InputForm from './InputForm';
import LoadingScreen from './LoadingScreen';
import ScenarioOutput from './ScenarioOutput';
import { useSimulationStore } from '../store';

const ScenarioDialog = () => {
  const { loading, scenario, error } = useSimulationStore();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Use AI to create scenario
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-800">
              Create your ELSiE Scenario using AI
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </Dialog.Close>
          </div>
          
          {loading && <LoadingScreen />}
          {!loading && !error && !scenario && <InputForm />}
          {!loading && !error && scenario && (
            <div className="flex flex-col gap-4">
              <ScenarioOutput />
              <button 
                onClick={() => {
                  // TODO: Implement populating the form with AI generated data
                  console.log("Populate form with:", scenario);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Use in Form
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ScenarioDialog;