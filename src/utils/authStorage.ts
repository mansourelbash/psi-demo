export const storeAuthData = (data: {
  access_token: string;
  refresh_token: string;
  id: string;
  name: string;
  email: string;
}) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.id,
      name: data.name,
      email: data.email,
    })
  );
};

export const storeRegData = (data :{
  id?: string;
  name?: string;
  email?: string;
})=> {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.id,
      name: data.name,
      email: data.email,
    })
  );
};