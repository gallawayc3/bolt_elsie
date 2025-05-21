import { Brain } from 'lucide-react'
import React, { useState } from 'react'
import { VideoItem } from './components/VideoItem'

// Define the video data interface
interface VideoData {
  video_id: number
  video_name: string
  questions_covered: number[]
  script: string
  image_description: string
  video_uuid: string
  image_filename: string
  audio_filename: string
}

// Mock data
const videoData: VideoData[] = [
  {
    "video_id": 1,
    "video_name": "When a Pay Cut Makes You Garden: Income vs. Substitution Effects",
    "questions_covered": [300053, 300794],
    "script": "Imagine your wage drops. Two forces immediately start tugging at your time.  The substitution effect asks, \"Has the price of leisure fallen?\"  If each hour at home now costs you fewer dollars in lost wages, leisure looks cheaper, so you substitute toward more backyard gardening or Netflix.  The income effect asks, \"Do you feel poorer?\"  A lower wage shrinks your purchasing power, and because leisure is a normal good, feeling poorer pushes you to buy less of it and work more hours.  Which force wins?  That depends on your preferences.  Tax changes work the same way: a lower income tax raises the after-tax wage, pivoting the budget line upward.  The substitution effect then nudges hours worked up, while the income effect—now in the opposite direction—may nudge them down.  Policymakers trying to boost labor supply are essentially betting that, for most workers, the substitution pull outweighs the income push.",
    "image_description": "Panel (a): Time-allocation budget constraint.  Horizontal axis: Hours of leisure per day (0 to 24).  Vertical axis: Daily consumption ($).  Show an initial budget line with slope –original wage and a pivoted flatter line representing a wage decrease.  Mark the substitution movement along the new line toward more leisure and the income movement back toward less leisure, using arrows and labels.\nPanel (b): Same axes but start with an initial after-tax wage and a steeper pivot after a tax cut.  Use arrows to illustrate opposing substitution and income effects.\nBoth panels include clear titles, axis labels, and a legend explaining each arrow.  Leave generous margins so all text is well within the frame.",
    "video_uuid": "8dbf30fd-bdaa-4870-afff-9d4134a7f6b5",
    "image_filename": "8dbf30fd-bdaa-4870-afff-9d4134a7f6b5_gpt_image_model_20250520.jpeg",
    "audio_filename": "krugman_8dbf30fd-bdaa-4870-afff-9d4134a7f6b5_output.mp3"
  },
  {
    "video_id": 2,
    "video_name": "How Firms Pick Team Size: Marginal Product, Wages, and Risk Pay",
    "questions_covered": [7474188, 298056, 298088],
    "script": "A firm hires the next worker only if that worker's extra output—measured in dollars—is at least as large as the wage.  Economists call that extra value the \"value of the marginal product\".  Picture a downward-sloping curve: each additional cook or farmhand adds a bit less to total revenue than the previous one.  A rise in the wage is like lifting a horizontal line upward; the intersection with the curve slides left, so the profit-maximizing head-count falls.  Now compare two regions.  If a tomato picker in Country A can harvest more boxes per hour than an identical worker in Country B, the value of the marginal product in A is higher, so firms there are willing to pay more.  But higher pay can also come from the supply side.  Riskier, dirtier, or more remote jobs require a \"compensating differential\"—workers demand extra dollars to take the unpleasant assignment.  Same productivity, different working conditions, different wage.",
    "image_description": "Panel (a): VMPL curve for a service business.  Horizontal axis: Number of workers.  Vertical axis: Dollar value of marginal product.  Draw two horizontal wage lines: W1 (low) and W2 (high).  Highlight their intersections with VMPL and mark optimal employment levels L1 and L2.  Annotate with arrows showing movement when wage changes.\nPanel (b): Two VMPL curves for identical workers in Region A (higher productivity) and Region B (lower).  Show single wage line; note that higher curve intersects at higher wage.\nPanel (c): Labor supply curves for Safe Job (lower curve) and Risky Job (higher, left-shifted).  Single labor demand curve intersects each supply curve at a different equilibrium wage, illustrating a compensating differential.  All axes labeled, curves clearly distinguished with colors or line styles, legend included, ample margin.",
    "video_uuid": "32e081c2-9928-4607-816b-197d3700f4b8",
    "image_filename": "32e081c2-9928-4607-816b-197d3700f4b8_gpt_image_model_20250520.jpeg",
    "audio_filename": "krugman_32e081c2-9928-4607-816b-197d3700f4b8_output.mp3"
  },
  {
    "video_id": 3,
    "video_name": "Understanding the Gender Wage Gap and Monopsony Power",
    "questions_covered": [2792360, 2792357],
    "script": "Median pay for men and women often differs, but that raw gap is only a starting point.  Part of it reflects measurable factors—education, years of experience, and the types of jobs people choose.  Career interruptions and unequal access to high-paying occupations matter too.  After adjusting for those, a smaller but persistent gap remains, consistent with discrimination or other unmeasured forces.  Market structure can amplify the problem.  When a single school district or hospital dominates local hiring, it behaves like a \"monopsony\"—the only major buyer of labor.  Facing an upward-sloping supply curve, the district maximizes profit where its marginal labor cost meets labor demand, then pays a wage below the competitive level.  If the workforce in that occupation is mostly women, the lower monopsony wage widens the observed gender gap even without deliberate bias.  Policies that increase competition—or workers' ability to move—can shrink both monopsony power and the wage gap.",
    "image_description": "Panel (a): Bar chart titled \"Median Annual Earnings by Gender\".  Two bars: Men (e.g., $100) and Women ($84) to illustrate a 16 % gap.  Include a bold bracket showing the percentage difference.  Axes: Occupation or Country labeled generically, Vertical axis: Earnings ($).  All numbers are placeholders, no exact homework figures.\nPanel (b): Monopsony model.  Horizontal axis: Number of teachers.  Vertical axis: Wage ($).  Upward-sloping labor supply (S) and steeper upward-sloping marginal labor cost (MLC) above it.  Downward-sloping labor demand (D=VMPL).  Mark competitive equilibrium at S=D with wage Wc and employment Lc.  Mark monopsony equilibrium at MLC=D with lower wage Wm and employment Lm.  Shade the wage gap Wc–Wm.  Clearly label all curves and points, provide legend, generous margins.",
    "video_uuid": "cd74c287-b702-4613-ab0d-0f767d243694",
    "image_filename": "cd74c287-b702-4613-ab0d-0f767d243694_gpt_image_model_20250520.jpeg",
    "audio_filename": "krugman_cd74c287-b702-4613-ab0d-0f767d243694_output.mp3"
  }
]

function App() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <div className="min-h-screen bg-[#f8f9fe]">
      {/* Header */}
      <div className="bg-[#3f3d9c] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Brain size={32} />
            <h1 className="text-2xl font-semibold">Video Assignment Review</h1>
          </div>
          <p className="text-[#e2e1ff]">
            Watch personalized videos on topics you struggled on to improve learning powered by AI Paul Krugman Voice
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-4">Your Review Session</h2>
        <p className="text-gray-600 mb-8">
          Review the questions you had trouble with and watch helpful explanation videos.
        </p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-6">Explanation Videos</h3>

          {/* Video Items */}
          <div className="space-y-4">
            {videoData.map((video) => (
              <VideoItem 
                key={video.video_id}
                id={video.video_id}
                title={video.video_name}
                questions={video.questions_covered.length}
                expanded={video.video_id === expandedId}
                onExpand={() => setExpandedId(video.video_id === expandedId ? null : video.video_id)}
                questionIds={video.questions_covered}
                videoUuid={video.video_uuid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App