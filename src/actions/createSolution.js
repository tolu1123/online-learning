export default async function createSolution({ request }) {
  try {
    const formData = await request.formData();

    console.log([...formData]);

    // Extract fields
    const solution = formData.get("solution");

    // Images (React Dropzone files)
    const images = formData.getAll("image"); // NOTE: multiple files

    // Additional validation (Server-Side, optional)
    if (!solution || solution.length < 2) {
      return { error: "Solution must be at least 30 characters." };
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
      message: "Solution submitted successfully!",
    };
  } catch (err) {
    console.error(err);

    // Respond to UI with inline error
    return {
      error: "An unexpected error occurred. Try again.",
    };
  }
}

export async function markSolutionCorrect({ request }) {
  try {
    const formData = await request.formData();

    // Extract fields
    const solutionId = formData.get("solutionId");
 
    if (solutionId.trim() === "") {
      return { error: "Use a valid solution Id" };
    }
    // This is where your real logic goes
    // For now we simulate upload delay
    await new Promise((res) => setTimeout(res, 500));

    // ====== If everything succeeds ======
    return {
      success: true,
      message: "Solution submitted successfully!",
    };
  } catch (err) {
    console.error(err);

    // Respond to UI with inline error
    return {
      error: "An unexpected error occurred. Try again.",
    };
  }
}
