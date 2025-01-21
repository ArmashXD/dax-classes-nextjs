export const fetchProfile = async (id: string) => {
  const response = await fetch(`/api/profile/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const data = await response.json();
  return data;
};
