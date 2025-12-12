export async function signUp({ request }) {
  try {
    const formData = await request.formData();

    // Extract fields
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
 
    console.log(name, email, password)
    // Upload image(s) to storage (example: Supabase)
    // This is where your real logic goes
    // For now we simulate upload delay
    await new Promise((res) => setTimeout(res, 500));

    // ====== If everything succeeds ======
    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (err) {
    console.error(err);

    // Respond to UI with inline error
    return {
      error: "An unexpected error occurred. Try again.",
    };
  }
}



export async function login({ request }) {
  try {
    const formData = await request.formData();

    // Extract fields
    const email = formData.get("email");
    const password = formData.get("password");
 
    console.log(email, password)
    // Upload image(s) to storage (example: Supabase)
    // This is where your real logic goes
    // For now we simulate upload delay
    await new Promise((res) => setTimeout(res, 500));

    // ====== If everything succeeds ======
    return {
      success: true,
      message: "Login successful!",
    };
  } catch (err) {
    console.error(err);
    // Respond to UI with inline error
    return {
      error: "An unexpected error occurred. Try again.",
    };
  }
}
