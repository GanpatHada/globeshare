export async function uploadToCloudinary(image, userId, folderName) {
  const formData = new FormData();

  const safeName = image.name.replace(/[^a-zA-Z0-9.-]/g, "");

  formData.append("file", image);
  formData.append("upload_preset", "globeshare-uploads");
  formData.append("folder", `globeshare/${folderName}/${userId}`);

  if (folderName === "users") {
    formData.append("public_id", "profile");
  } else {
    formData.append("public_id", `${Date.now()}-${safeName}`);
  }

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dyuhvphs6/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message);

  return data.secure_url;
}