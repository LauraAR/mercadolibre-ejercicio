import { useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = __SERVER__ ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;
