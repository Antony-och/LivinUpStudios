const inquiryForm = document.querySelector("#contact-inquiry-form");

if (inquiryForm) {
  const status = document.querySelector("#contact-form-status");
  const fields = {
    name: inquiryForm.querySelector('[name="name"]'),
    email: inquiryForm.querySelector('[name="email"]'),
    area: inquiryForm.querySelector('[name="area"]'),
    brief: inquiryForm.querySelector('[name="brief"]'),
  };

  inquiryForm.hidden = false;

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inquiryForm.reportValidity()) return;

    const projectArea = fields.area.value.trim() || "Not sure yet";
    const subject = `Project inquiry — ${projectArea}`;
    const body = [
      `Name: ${fields.name.value.trim()}`,
      `Reply email: ${fields.email.value.trim()}`,
      `Area of interest: ${projectArea}`,
      "",
      "Project idea:",
      fields.brief.value.trim(),
    ].join("\n");

    const draftUrl = `mailto:hello@livinup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = draftUrl;

    if (status) {
      status.textContent = "Your email draft is ready. Review it in your mail app and press Send; if it did not open, email hello@livinup.com.";
    }
  });
}
