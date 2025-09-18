document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    feedback: document.getElementById("feedback").value,
    rating: document.getElementById("rating").value,
  };

  try {
    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    document.getElementById("responseMsg").innerText = result.message;
    document.getElementById("feedbackForm").reset();
  } catch (error) {
    document.getElementById("responseMsg").innerText = "❌ Something went wrong!";
  }
});
