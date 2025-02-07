import React from 'react';

const SectionHeader = ({ title, backgroundColor = '#F8E7ED', flourishColor = '#6B1E3C' }) => {
  return (
    <div className="w-full py-4" style={{ backgroundColor: backgroundColor }}>
      <div className="flex items-center justify-center">
        <div className="flex-1 h-6 md:h-8">
          <svg className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="flourish" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
                <path d="M0,15 Q15,0 30,15 Q45,30 60,15" fill="none" stroke={flourishColor} strokeWidth="2.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="30" fill="url(#flourish)"/>
          </svg>
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold text-center"
          style={{
            color: flourishColor,
            fontFamily: 'Cormorant',
            whiteSpace: 'nowrap',
            textShadow: '0px 2px 3px rgba(0,0,0,0.2)',
          }}
        >
          {title}
        </h2>

        <div className="flex-1 h-6 md:h-8">
          <svg className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <rect width="100%" height="30" fill="url(#flourish)"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
