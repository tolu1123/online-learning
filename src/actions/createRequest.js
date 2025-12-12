export default async function action({ request }) {
  try {
    const formData = await request.formData();

    console.log([...formData]);

    // Extract fields
    const topic = formData.get("topic");
    const subject = formData.get("subject");
    const description = formData.get("description");

    // Images (React Dropzone files)
    const images = formData.getAll("image"); // NOTE: multiple files

    // Additional validation (Server-Side, optional)
    if (!topic || topic.length < 2) {
      return { error: "Topic must be at least 2 characters." };
    }

    if (!subject || subject === "Select a subject...") {
      return { error: "Please select a subject." };
    }

    if (!description || description.length < 10) {
      return { error: "Description must be at least 10 characters." };
    }

    // Optional: Validate images
    if (images.length === 4) {
      return { error: "You can only upload a maximum of 4 images." };
    }

    for (const file of images) {
      if (file.size > 10 * 1024 * 1024) {
        return { error: "Each file must be under 10MB." };
      }
    }

    // Upload image(s) to storage (example: Supabase)
    // This is where your real logic goes
    // For now we simulate upload delay
    await new Promise((res) => setTimeout(res, 500));

    // ====== If everything succeeds ======
    return {
      success: true,
      message: "Request created successfully!",
    };
  } catch (err) {
    console.error(err);

    // Respond to UI with inline error
    return {
      error: "An unexpected error occurred. Try again.",
    };
  }
}
