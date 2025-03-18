/**
 * Extracts and decodes the payload from a JSON Web Token (JWT).
 *
 * @param token - The JWT string.
 * @returns The decoded payload of the token, or an empty object if parsing fails.
 */
export const getTokenPayload = (token: string): Record<string, unknown> => {
  try {
    const payload = token.split(".")[1];
    const parsedPayload = JSON.parse(atob(payload));

    return parsedPayload;
  } catch (error) {
    console.error("Unable to parse token payload", error);
    return {};
  }
};
