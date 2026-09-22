import React from 'react';

interface HeroVideoSectionProps {
  activeTab: string;
}

export const HeroVideoSection = ({ activeTab }: HeroVideoSectionProps) => {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] max-w-6xl mx-auto px-6">
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Overlays are wrapped in a container that handles the fade-in-overlay animation */}
        <div className="animate-fade-in-overlay w-full h-full flex items-center justify-center">

          {/* Analyse Overlay */}
          {activeTab === 'analyse' && (
            <div className="animate-slide-up-overlay absolute bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Set Up Your AI Workspace</h3>
                <span className="text-xs text-gray-400">Step 1/4</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-purple-500 h-full w-1/4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Connect Data Sources
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  Configure LLM Parameters
                </div>
              </div>
            </div>
          )}

          {/* Train Overlay */}
          {activeTab === 'train' && (
            <div className="animate-slide-up-overlay absolute bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">AI Model Training</h3>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
                <div className="bg-orange-500 h-full w-[67%]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-lg font-bold text-gray-900">94.2%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Loss</p>
                  <p className="text-lg font-bold text-gray-900">0.12</p>
                </div>
              </div>
            </div>
          )}

          {/* Testing Overlay */}
          {activeTab === 'testing' && (
            <div className="animate-slide-up-overlay absolute bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Test Suite Results</h3>
              </div>
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-green-600 mb-1">127/127</p>
                <p className="text-sm text-gray-500">All tests passed successfully</p>
              </div>
            </div>
          )}

          {/* Deploy Overlay */}
          {activeTab === 'deploy' && (
            <div className="animate-slide-up-overlay absolute bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Deploy to Production</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Environment Variables Set',
                  'Security Audit Passed',
                  'Canary Build Verified',
                  'DB Migration Ready'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <button className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Deploy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
