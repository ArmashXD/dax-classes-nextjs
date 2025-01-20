export const submitLogin = async (data) => {
  await fetch("/api/login", {
    data,
  });
};
