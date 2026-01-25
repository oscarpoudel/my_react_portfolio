import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollState } from '../context/ScrollNavigationContext';

/**
 * Smart scroll navigation hook with visual feedback
 * Detects scrollable containers and provides visual cues for page transitions
 * @param {string} nextPagePath - Route path for next page
 * @param {string} prevPagePath - Route path for previous page (optional)
 * @param {boolean} enabled - Enable/disable navigation (default: true)
 */
const useScrollNavigation = (nextPagePath, prevPagePath = null, enabled = true) => {
  const navigate = useNavigate();
  const { setScrollState } = useScrollState();
  const lastNavigationTime = useRef(0);
  const scrollTimeout = useRef(null);
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const wheelEventCount = useRef(0);
  const wheelEventResetTimeout = useRef(null);

  const debounceDelay = 1000;
  const scrollWaitTime = 3000;
  const boundaryThreshold = 60; // Show indicator at 60%
  const navigationThreshold = 90; // Trigger bounce/navigate at 90%
  const wheelEventsRequired = 5; // Require 5 wheel events to navigate

  /**
   * Check if element at cursor position is scrollable
   */
  const isElementScrollable = (x, y) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return false;

    let current = element;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const scrollHeight = current.scrollHeight;
      const clientHeight = current.clientHeight;
      const overflowY = style.overflowY;

      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        scrollHeight > clientHeight &&
        scrollHeight > 0
      ) {
        return true;
      }

      current = current.parentElement;
    }

    return false;
  };

  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  const handleWheel = (e) => {
    const now = Date.now();
    const wheelDirection = e.deltaY > 0 ? 'down' : 'up';

    // Check if cursor is over scrollable element
    const isOverScrollable = isElementScrollable(mouseX.current, mouseY.current);

    if (isOverScrollable) {
      return; // Let scrollable content work normally
    }

    // Increment wheel event counter
    wheelEventCount.current += 1;

    // Clear the reset timeout and set a new one
    if (wheelEventResetTimeout.current) {
      clearTimeout(wheelEventResetTimeout.current);
    }
    wheelEventResetTimeout.current = setTimeout(() => {
      wheelEventCount.current = 0;
    }, 1500); // Reset counter after 1.5 seconds of no wheel events

    // Over non-scrollable area - require multiple wheel events
    if (wheelEventCount.current >= wheelEventsRequired && now - lastNavigationTime.current >= debounceDelay) {
      lastNavigationTime.current = now;
      wheelEventCount.current = 0;
      
      setScrollState({
        direction: wheelDirection,
        progress: 100,
        isNearBoundary: true,
        isNavigating: true
      });

      setTimeout(() => {
        if (wheelDirection === 'down' && nextPagePath) {
          navigate(nextPagePath);
          window.scrollTo(0, 0);
        } else if (wheelDirection === 'up' && prevPagePath) {
          navigate(prevPagePath);
          window.scrollTo(0, 0);
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    const now = Date.now();
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    // Only process if page has scrollable content
    if (scrollableHeight <= 50) {
      return;
    }

    // Determine direction
    if (lastScrollPosition.current === null) {
      scrollDirection.current = null;
    } else {
      scrollDirection.current = scrolled > lastScrollPosition.current ? 'down' : 'up';
    }

    lastScrollPosition.current = scrolled;
    const scrollPercentage = (scrolled / scrollableHeight) * 100;

    // Update visual feedback based on scroll position
    if (scrollDirection.current === 'down' && nextPagePath) {
      const progress = Math.min(scrollPercentage, 100);
      const isNear = scrollPercentage >= boundaryThreshold;
      const shouldNavigate = scrollPercentage >= navigationThreshold;
      
      setScrollState({
        direction: 'down',
        progress,
        isNearBoundary: isNear,
        isNavigating: shouldNavigate
      });
    } else if (scrollDirection.current === 'up' && prevPagePath) {
      const progress = Math.max(100 - scrollPercentage, 0);
      const isNear = scrollPercentage <= (100 - boundaryThreshold);
      const shouldNavigate = scrollPercentage <= (100 - navigationThreshold);
      
      setScrollState({
        direction: 'up',
        progress,
        isNearBoundary: isNear,
        isNavigating: shouldNavigate
      });
    } else {
      setScrollState({
        direction: null,
        progress: 0,
        isNearBoundary: false,
        isNavigating: false
      });
    }

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Wait for scroll to stop
    scrollTimeout.current = setTimeout(() => {
      if (now - lastNavigationTime.current >= debounceDelay) {
        const currentScrolled = window.scrollY;
        const currentScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const finalPercentage = (currentScrolled / currentScrollableHeight) * 100;

        if (scrollDirection.current === 'down' && finalPercentage >= navigationThreshold && nextPagePath) {
          lastNavigationTime.current = now;
          setScrollState({
            direction: 'down',
            progress: 100,
            isNearBoundary: true,
            isNavigating: true
          });
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Increased delay to let bounce animation complete (0.6s + buffer)
          setTimeout(() => {
            navigate(nextPagePath);
            // Reset state after navigation
            setTimeout(() => {
              setScrollState({
                direction: null,
                progress: 0,
                isNearBoundary: false,
                isNavigating: false
              });
            }, 100);
          }, 800);
          lastScrollPosition.current = 0;
        } else if (
          scrollDirection.current === 'up' &&
          finalPercentage <= (100 - navigationThreshold) &&
          prevPagePath
        ) {
          lastNavigationTime.current = now;
          setScrollState({
            direction: 'up',
            progress: 100,
            isNearBoundary: true,
            isNavigating: true
          });
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Increased delay to let bounce animation complete (0.6s + buffer)
          setTimeout(() => {
            navigate(prevPagePath);
            // Reset state after navigation
            setTimeout(() => {
              setScrollState({
                direction: null,
                progress: 0,
                isNearBoundary: false,
                isNavigating: false
              });
            }, 100);
          }, 800);
          lastScrollPosition.current = 0;
        }
      }
    }, scrollWaitTime);
  };

  useEffect(() => {
    if (!enabled) return;

    // Reset scroll state when component mounts (new page)
    setScrollState({
      direction: null,
      progress: 0,
      isNearBoundary: false,
      isNavigating: false
    });
    lastScrollPosition.current = 0;
    lastNavigationTime.current = 0;
    scrollDirection.current = null; // Reset direction from previous page

    // Show welcome bounce animation on page load for a few seconds
    const welcomeBounceTimeout = setTimeout(() => {
      // Set direction based on available navigation paths
      const bounceDirection = nextPagePath ? 'down' : 'up';
      
      setScrollState({
        direction: bounceDirection,
        progress: 100,
        isNearBoundary: true,
        isNavigating: true
      });

      // Keep showing bounce for 3 seconds then hide
      const hideTimeout = setTimeout(() => {
        setScrollState({
          direction: null,
          progress: 0,
          isNearBoundary: false,
          isNavigating: false
        });
      }, 3000);
      
      return () => clearTimeout(hideTimeout);
    }, 200); // Delay slightly to let page render

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (wheelEventResetTimeout.current) {
        clearTimeout(wheelEventResetTimeout.current);
      }
      clearTimeout(welcomeBounceTimeout);
    };
  }, [navigate, nextPagePath, prevPagePath, enabled, setScrollState]);
};

export default useScrollNavigation;
