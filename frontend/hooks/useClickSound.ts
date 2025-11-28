import { useCallback, useEffect, useRef } from "react";

export default function useClickSound(soundDir: string) {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio(soundDir);
  }, [soundDir]);

  const playClick = useCallback(() => {
    const sound = clickSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }, []);

  return { playClick };
}
