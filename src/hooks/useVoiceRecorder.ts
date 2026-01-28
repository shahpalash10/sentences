import { useCallback, useRef, useState } from "react";

export interface RecordingResult {
  blob: Blob;
  startedAt: string;
  endedAt: string;
  durationMs: number;
}

type PermissionState = "idle" | "granted" | "denied";

export const useVoiceRecorder = () => {
  const [permission, setPermission] = useState<PermissionState>("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const requestPermission = useCallback(async () => {
    if (permission === "granted" && mediaStreamRef.current) {
      return mediaStreamRef.current;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setPermission("granted");
      return stream;
    } catch (error) {
      console.error("Microphone permission denied", error);
      setPermission("denied");
      throw error;
    }
  }, [permission]);

  const start = useCallback(async () => {
    const stream = await requestPermission();
    if (!stream) throw new Error("Microphone unavailable");

    chunksRef.current = [];
    startTimeRef.current = performance.now();

    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.start();
  }, [requestPermission]);

  const stop = useCallback((): Promise<RecordingResult | null> => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      recorder.onstop = () => {
        const startedAt = startTimeRef.current ?? performance.now();
        const endedAtMs = performance.now();
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        resolve({
          blob,
          startedAt: new Date(performance.timeOrigin + startedAt).toISOString(),
          endedAt: new Date(performance.timeOrigin + endedAtMs).toISOString(),
          durationMs: endedAtMs - startedAt,
        });
      };

      recorder.onerror = (event) => {
        reject(event.error || new Error("MediaRecorder error"));
      };

      recorder.stop();
    });
  }, []);

  const dispose = useCallback(() => {
    mediaRecorderRef.current?.stop();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaRecorderRef.current = null;
    mediaStreamRef.current = null;
  }, []);

  return {
    permission,
    startRecording: start,
    stopRecording: stop,
    dispose,
  };
};
