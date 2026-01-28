import { supabase, isSupabaseConfigured } from "./supabaseClient";
import type { SessionLog } from "@/data/emotionSentences";

export interface UploadPayload {
  sessionId: string;
  participantId?: string;
  log: SessionLog;
  audioBlob?: Blob;
}

export interface UploadResponse {
  audioUrl?: string;
  dbRowId?: number;
}

/**
 * Uploads a single sentence log and audio clip to Supabase (Postgres + Storage).
 * Storage bucket name must exist (e.g., "voice-logs").
 */
export const uploadSentenceLog = async (
  payload: UploadPayload,
  bucket = "voice-logs",
): Promise<UploadResponse> => {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error("Supabase is not configured. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { log, audioBlob, sessionId, participantId } = payload;
  let audioUrl: string | undefined;

  const participantSlug = participantId
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (audioBlob) {
    const folder = participantSlug || sessionId;
    const fileName = `${folder}/${log.emotionId}-${log.sentenceId}-${Date.now()}.webm`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, audioBlob, {
      contentType: "audio/webm",
      upsert: true,
    });

    if (uploadError) {
      throw new Error(`Audio upload failed: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    audioUrl = publicUrlData?.publicUrl;
  }

  const { data, error } = await supabase
    .from("sentence_logs")
    .insert({
      session_id: sessionId,
      participant_id: participantId ?? log.participantName ?? null,
      emotion_id: log.emotionId,
      emotion_label: log.emotionLabel,
      sentence_id: log.sentenceId,
      sentence_text: log.sentence,
      started_at: log.startedAt,
      ended_at: log.endedAt,
      duration_ms: log.durationMs,
      audio_url: audioUrl ?? log.audioUrl ?? null,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }

  return { audioUrl, dbRowId: data?.id };
};
