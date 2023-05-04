import { useState } from "react";

export default function CourseForm() {
  // Initialize the state variables for the form inputs
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");
  const [outcome, setOutcome] = useState([]);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the inputs
    if (
      !id ||
      !type ||
      !title ||
      !description ||
      !coverImage ||
      !author ||
      outcome.length === 0
    ) {
      alert("Please fill in all the fields");
      return;
    }
    // Create a course object with the inputs
    const course = {
      id,
      type,
      title,
      description,
      coverImage,
      author,
      outcome,
    };
    // Send the course object to the backend or store it in a database
    console.log(course);
    // Reset the inputs
    setId("");
    setType("");
    setTitle("");
    setDescription("");
    setCoverImage("");
    setAuthor("");
    setOutcome([]);
  };

  // Handle the outcome input change
  const handleOutcomeChange = (e) => {
    // Get the index of the input
    const index = parseInt(e.target.name.split("-")[1]);
    // Get the value of the input
    const value = e.target.value;
    // Update the outcome array with the new value
    setOutcome((prev) => {
      // Copy the previous array
      const newArr = [...prev];
      // Replace the element at the index with the new value
      newArr[index] = value;
      // Return the new array
      return newArr;
    });
  };

  // Add a new outcome input
  const addOutcome = () => {
    setOutcome((prev) => [...prev, ""]);
  };

  // Remove an outcome input
  const removeOutcome = (index) => {
    setOutcome((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Course Form</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="id" className="text-gray-700 font-medium">
              Course ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter a unique ID for the course"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-gray-700 font-medium">
              Course Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a type for the course
              </option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-700 font-medium">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for the course"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-gray-700 font-medium">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for the course"
              rows={4}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coverImage" className="text-gray-700 font-medium">
              Course Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter a URL for the cover image of the course"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="author" className="text-gray-700 font-medium">
              Course Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name as the author of the course"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <p className="text-gray-700 font-medium mb-2">Course Outcome</p>
            {outcome.map((o, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name={`outcome-${i}`}
                  value={o}
                  onChange={handleOutcomeChange}
                  placeholder={`Enter an outcome for the course`}
                  className={`border border-gray-${
                    i === outcome.length - 1 ? "300" : "200"
                  } rounded-md px-4 py-2 w-full focus:outline-none focus:ring-${
                    i === outcome.length - 1 ? "2" : "0"
                  } focus:ring-blue-${i === outcome.length - 1 ? "500" : "0"}`}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(i)}
                    className=""
                  >
                    ❌
                  </button>
                )}
                {i === outcome.length - 1 && (
                  <button type="button" onClick={addOutcome} className="">
                    ➕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="">
            Submit Course Details 🚀
          </button>
        </div>
      </form>
    </div>
  );
}
