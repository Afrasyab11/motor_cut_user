export const generateBase64Image = async(imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // Enable CORS for the image
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const base64Image = canvas.toDataURL("image/jpeg"); // Change format if needed (jpeg/png)
      resolve(base64Image);
    };
    image.onerror = (error) => reject(error);
    image.src = imageUrl;
  });
};
