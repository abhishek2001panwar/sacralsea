import React from 'react'

function Testiminial() {
  return (
  <div className="bg-[#0b0b0a] text-[#f5f5f3] py-24 px-6 md:px-12 lg:px-24 font-sans selection:bg-neutral-800">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center gap-4 mb-16">
      <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">Client Voices</span>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 lg:divide-x lg:divide-neutral-800/60">
      <div className="flex flex-col justify-between pr-0 lg:pr-12">
        <div>
          <span className="text-4xl font-serif text-neutral-600 block mb-6">“</span>
          <p className="font-serif text-xl md:text-2xl text-neutral-200 leading-relaxed italic font-light">
            SacralSea didn't just rebrand us - they repositioned us. We went from being a feature on a slide deck to the brand people reference in our category.
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-900 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
            <span className="text-xs tracking-wider text-neutral-400 font-medium">MK</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-200">Maya Krishnan</h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500 font-mono tracking-tight">
              <span>CMO</span>
              <span className="text-neutral-700">•</span>
              <span>Axion Labs</span>
              <span className="text-neutral-700">•</span>
              <span>Series B</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-0 lg:pl-12">
        <div>
          <span className="text-4xl font-serif text-neutral-600 block mb-6">“</span>
          <p className="font-serif text-xl md:text-2xl text-neutral-200 leading-relaxed italic font-light">
            Most agencies build for speed, not craft. SacralSea thinks like makers. Every decision had intent behind it - and the results showed in the pipeline numbers.
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-900 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
            <span className="text-xs tracking-wider text-neutral-400 font-medium">DL</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-200">Daniel Lowe</h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500 font-mono tracking-tight">
              <span>Head of Growth</span>
              <span className="text-neutral-700">•</span>
              <span>Northpeak</span>
              <span className="text-neutral-700">•</span>
              <span>Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Testiminial