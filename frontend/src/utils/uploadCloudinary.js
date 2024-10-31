const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

// Function to handle image upload to Cloudinary
const uploadImageToCloudinary = async (file) => {
  // Create a new FormData object to hold the upload data
  const uploadData = new FormData();

  // Append the file to be uploaded to the FormData object
  uploadData.append("file", file);

  // Append the Cloudinary upload preset to the FormData (required for authentication)
  uploadData.append("upload_preset", upload_preset);

  // Append the Cloudinary cloud name to the FormData for routing the upload to the correct account
  uploadData.append("cloud_name", cloud_name);

   // Send a POST request to the Cloudinary API for image upload
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "post", // Set request method to POST for file upload
      body: uploadData, // Attach the FormData object as the request body
    }
  );

  // Convert the response to JSON format to retrieve the data
  const data = await res.json();

  // Return the data (this may include URL and other metadata about the uploaded image)
  return data;
};

export default uploadImageToCloudinary;
