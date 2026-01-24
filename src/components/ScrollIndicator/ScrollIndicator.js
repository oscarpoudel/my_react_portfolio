import React, { useEffect, useState } from 'react';
import { useScrollState } from '../../context/ScrollNavigationContext';
import './ScrollIndicator.scss';

/**
 * Visual feedback component showing scroll navigation progress
 * Displays a rubber band effect arrow when user is scrolling toward page change
 */
const ScrollIndicator = () => {
  const { scrollState } = useScrollState();
  const { direction, progress, isNearBoundary, isNavigating } = scrollState;
  const [shouldHide, setShouldHide] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  // Trigger bounce animation every time isNavigating changes to true
  useEffect(() => {
    if (isNavigating) {
      setShouldHide(false);
      setBounceKey(prev => prev + 1);
    }
  }, [isNavigating]);

  // Auto-hide after 2 seconds if near boundary but not navigating
  useEffect(() => {
    if (isNearBoundary && !isNavigating) {
      const timer = setTimeout(() => {
        setShouldHide(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isNearBoundary, isNavigating]);

  if (!isNearBoundary || shouldHide) return null;

  const isScrollingDown = direction === 'down';
  const scale = 1 + (progress / 100) * 0.5; // Scale from 1 to 1.5

  return (
    <div key={bounceKey} className={`scroll-arrow ${isScrollingDown ? 'scroll-down' : 'scroll-up'} ${isNavigating ? 'navigating' : ''}`}>
      <div className="arrow-circle">
        <div 
          className="arrow-icon" 
          style={{ transform: `scale(${scale})` }}
        >
          {isScrollingDown ? '↓' : '↑'}
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
