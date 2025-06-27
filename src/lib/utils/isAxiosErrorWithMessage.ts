type PossiblyAxiosError = {
  response?: {
    data?: {
      message?: unknown;
    };
  };
};

export function isAxiosErrorWithMessage(
  err: unknown
): err is { response: { data: { message: string } } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as PossiblyAxiosError).response?.data?.message === "string"
  );
}
