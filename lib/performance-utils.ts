/**
 * Mobile Performance Optimization Utility
 * Provides device detection and performance optimization helpers
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return (
    window.innerWidth < 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

export const isLowEndDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check for indicators of low-end devices
  const memory = (navigator as { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  return (
    (memory && memory <= 2) || // 2GB or less RAM
    (cores && cores <= 2) || // 2 cores or less
    /Android.*4\.|Android.*5\./i.test(navigator.userAgent) // Old Android
  );
};

export const getOptimizedAnimationConfig = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();

  return {
    // Reduce animation duration on mobile/low-end devices
    duration: isMobile || isLowEnd ? 0.2 : 0.5,

    // Reduce delays
    delay: isMobile || isLowEnd ? 0.02 : 0.06,

    // Simplify easing
    ease: isMobile || isLowEnd ? "easeOut" : "easeInOut",

    // Disable complex animations
    enableComplexAnimations: !isMobile && !isLowEnd,

    // Reduce viewport threshold for triggering animations
    viewportAmount: isMobile || isLowEnd ? 0.1 : 0.4,
  };
};

export const usePerformanceOptimizedProps = () => {
  const config = getOptimizedAnimationConfig();

  return {
    viewport: { once: true, amount: config.viewportAmount },
    transition: {
      duration: config.duration,
      ease: config.ease,
    },
    enableHover: config.enableComplexAnimations,
  };
};

/**
 * Hook for responsive animation props
 */
export const useResponsiveAnimation = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();
  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (shouldReduceMotion || isMobile || isLowEnd) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 },
      whileHover: {},
      whileTap: {},
    };
  }

  return null; // Use default animations
};
