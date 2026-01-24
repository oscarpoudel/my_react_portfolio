import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

// Create context for scroll navigation state
export const ScrollNavigationContext = createContext(null);

// Provider component to wrap the app
export const ScrollNavigationProvider = ({ children }) => {
  const [scrollState, setScrollState] = useState({
    direction: null, // 'up' or 'down'
    progress: 0, // 0-100
    isNearBoundary: false,
    isNavigating: false
  });

  return (
    <ScrollNavigationContext.Provider value={{ scrollState, setScrollState }}>
      {children}
    </ScrollNavigationContext.Provider>
  );
};

// Hook to use the context
export const useScrollState = () => {
  const context = useContext(ScrollNavigationContext);
  if (!context) {
    throw new Error('useScrollState must be used within ScrollNavigationProvider');
  }
  return context;
};
