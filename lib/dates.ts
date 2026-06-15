const EVENT_TIME_ZONE = "America/Chicago";

export function formatRegistrationTimestamp(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: EVENT_TIME_ZONE
  });
}
