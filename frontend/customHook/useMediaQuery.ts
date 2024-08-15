import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // Check on mount
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
