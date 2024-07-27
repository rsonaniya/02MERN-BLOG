import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";

const categories = [
  { id: 1, title: "Nature 🌳", value: "nature" },
  { id: 2, title: "Technology 💻", value: "technology" },
  { id: 3, title: "Travel ✈️", value: "travel" },
  { id: 4, title: "Food 🍔", value: "food" },
  { id: 5, title: "Lifestyle 🧘‍♂️", value: "lifestyle" },
  { id: 6, title: "Education 🎓", value: "education" },
  { id: 7, title: "Fitness 🏋️‍♀️", value: "fitness" },
  { id: 8, title: "Finance 💰", value: "finance" },
  { id: 9, title: "Health ❤️", value: "health" },
  { id: 10, title: "Entertainment 🎬", value: "entertainment" },
  { id: 11, title: "Science 🔬", value: "science" },
  { id: 12, title: "Business 📈", value: "business" },
  { id: 13, title: "Art 🎨", value: "art" },
  { id: 14, title: "Sports ⚽", value: "sports" },
  { id: 15, title: "Fashion 👗", value: "fashion" },
];

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishingError, setPublishingError] = useState(null);

  const navigate = useNavigate();

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }
    setImageUploadError(null);
    setImageUploadProgress(null);
    setFile(file);
  };
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        //eslint-disable-next-line
        (error) => {
          setImageUploadError("Image Upload failed, PLease try again");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setPublishingError(null);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishingError(data.message);
        return;
      }

      if (res.ok) {
        setPublishingError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishingError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select id="category" onChange={handleChange}>
            <option value="uncategorized">Select a Category 📋</option>
            {categories.map((category) => (
              <option key={category.id} value={category.value}>
                {category.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="images/*"
            onChange={handleImageFileChange}
          />
          <Button
            disabled={imageUploadProgress}
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          placeholder="Write Something"
          className="h-60 mb-12"
          required
          id=""
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishingError && (
          <Alert color="failure" className="mt-5">
            {publishingError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
