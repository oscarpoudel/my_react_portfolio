import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollState } from '../context/ScrollNavigationContext';

const useScrollNavigation = (nextPagePath, prevPagePath = null, enabled = true) => {
  const navigate = useNavigate();
  const { setScrollState } = useScrollState();

  const lastNavigationTime = useRef(0);
  const scrollTimeout = useRef(null);
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const wheelDeltaAccum = useRef(0);
  const wheelResetTimeout = useRef(null);
  const isNavigatingRef = useRef(false);

  const debounceDelay = 2000;
  const boundaryPx = 24;

  const boundaryThreshold = 60;
  const navigationThreshold = 95;

  const wheelDeltaRequired = 300;
  const wheelResetMs = 180;

  const isElementScrollable = (x, y) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return false;

    let current = element;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const scrollHeight = current.scrollHeight;
      const clientHeight = current.clientHeight;

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

  const resetWheelAccumSoon = () => {
    if (wheelResetTimeout.current) clearTimeout(wheelResetTimeout.current);
    wheelResetTimeout.current = setTimeout(() => {
      wheelDeltaAccum.current = 0;
      setScrollState((s) => ({ ...s, progress: 0, isNearBoundary: false }));
    }, wheelResetMs);
  };

  const doNavigate = (direction) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < debounceDelay) return;

    lastNavigationTime.current = now;
    isNavigatingRef.current = true;

    setScrollState({
      direction,
      progress: 100,
      isNearBoundary: true,
      isNavigating: true
    });

    setTimeout(() => {
      if (direction === 'down' && nextPagePath) {
        navigate(nextPagePath);
        window.scrollTo(0, 0);
      } else if (direction === 'up' && prevPagePath) {
        navigate(prevPagePath);
        window.scrollTo(0, 0);
      }

      setTimeout(() => {
        isNavigatingRef.current = false;
        wheelDeltaAccum.current = 0;
        setScrollState({
          direction: null,
          progress: 0,
          isNearBoundary: false,
          isNavigating: false
        });
      }, 80);
    }, 280);
  };

  const handleWheel = (e) => {
    if (!enabled) return;

    if (isNavigatingRef.current) {
      e.preventDefault();
      return;
    }

    const isOverScrollable = isElementScrollable(mouseX.current, mouseY.current);
    if (isOverScrollable) {
      return;
    }

    const direction = e.deltaY > 0 ? 'down' : 'up';
    const delta = Math.abs(e.deltaY);

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const hasPageScroll = scrollableHeight > 50;

    const y = window.scrollY;
    const atTop = y <= boundaryPx;
    const atBottom = hasPageScroll
      ? (y >= scrollableHeight - boundaryPx)
      : true;

    const tryingPastTop = direction === 'up' && atTop;
    const tryingPastBottom = direction === 'down' && atBottom;

    const hasTarget =
      (direction === 'down' && !!nextPagePath) ||
      (direction === 'up' && !!prevPagePath);

    const shouldIntercept =
      hasTarget && (hasPageScroll ? (tryingPastTop || tryingPastBottom) : true);

    if (!shouldIntercept) {
      wheelDeltaAccum.current = 0;
      return;
    }

    e.preventDefault();

    wheelDeltaAccum.current += delta;
    resetWheelAccumSoon();

    const progress = Math.max(
      0,
      Math.min(100, Math.round((wheelDeltaAccum.current / wheelDeltaRequired) * 100))
    );

    setScrollState({
      direction,
      progress,
      isNearBoundary: progress >= boundaryThreshold,
      isNavigating: progress >= navigationThreshold
    });

    if (wheelDeltaAccum.current >= wheelDeltaRequired) {
      wheelDeltaAccum.current = 0;
      doNavigate(direction);
    }
  };

  const handleScroll = () => {
    if (!enabled) return;
    if (isNavigatingRef.current) return;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrollableHeight <= 50) {
      setScrollState({
        direction: null,
        progress: 0,
        isNearBoundary: false,
        isNavigating: false
      });
      return;
    }

    if (lastScrollPosition.current === null) {
      scrollDirection.current = null;
    } else {
      scrollDirection.current = scrolled > lastScrollPosition.current ? 'down' : 'up';
    }
    lastScrollPosition.current = scrolled;

    const scrollPercentage = (scrolled / scrollableHeight) * 100;

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

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const now = Date.now();
      if (now - lastNavigationTime.current < debounceDelay) return;

      const currentScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (currentScrollableHeight <= 50) return;

      const finalPercentage = (window.scrollY / currentScrollableHeight) * 100;

      if (scrollDirection.current === 'down' && finalPercentage >= navigationThreshold && nextPagePath) {
        doNavigate('down');
        lastScrollPosition.current = 0;
      } else if (scrollDirection.current === 'up' && finalPercentage <= (100 - navigationThreshold) && prevPagePath) {
        doNavigate('up');
        lastScrollPosition.current = 0;
      }
    }, 250);
  };

  useEffect(() => {
    if (!enabled) return;

    setScrollState({
      direction: null,
      progress: 0,
      isNearBoundary: false,
      isNavigating: false
    });

    lastScrollPosition.current = 0;
    lastNavigationTime.current = 0;
    scrollDirection.current = null;
    wheelDeltaAccum.current = 0;
    isNavigatingRef.current = false;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (wheelResetTimeout.current) clearTimeout(wheelResetTimeout.current);
    };
  }, [navigate, nextPagePath, prevPagePath, enabled, setScrollState]);

  return null;
};

export default useScrollNavigation;
