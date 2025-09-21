async function fetchTweets() {
  try {
    const res = await fetch("http://localhost:5000/api/tweets");
    const tweets = await res.json();

    const tbody = document.getElementById("tweets-body");
    tbody.innerHTML = "";

    tweets.forEach((t, index) => {
      const row = document.createElement("tr");

      // Format date nicely
      const formattedDate = new Date(t.created_at).toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const mediaBadge = t.has_media
        ? `<span class="badge true">true</span>`
        : `<span class="badge false">false</span>`;

      // Email column
      const emailColumn = t.email ? t.email : "-";

      // Contact column with toggleable dropdown
      const contactColumn = t.email
        ? `
<div class="contact-container" style="position: relative;">
  <button class="contact-btn" id="contact-btn-${index}">Contact</button>
  <div class="dropdown" id="dropdown-${index}" style="display:none; position: absolute; top: 100%; left: 0; background: #f9f9f9; border: 1px solid #ccc; padding: 10px; border-radius: 5px; z-index: 100;">
    <button onclick="sendEmail('${t.email}', 'Complaint Already Registered', \`
  <div style='font-family: Arial, sans-serif;'>
    <p>Dear User,</p>
    <p>Another user has already registered a complaint regarding the same site. Our team is currently working on it, and we will keep you updated on its progress.</p>
    <p>Thank you for using Pot-Sol Management Services.</p>
    <p>Best regards,<br>Pot-Sol Team</p>
  </div>
\`)">Already Registered</button>


    <button onclick="sendEmail('${t.email}', 'Complaint In Progress', \`
      <div style='font-family: Arial, sans-serif;'>
        <p>Dear User,</p>
        <p>Your complaint is currently being addressed by our team. We will notify you with updates on the progress.</p>
        <p>Thank you for your patience and for using Pot-Sol Management Services.</p>
        <p>Best regards,<br>Pot-Sol Team</p>
      </div>
    \`)">In Progress</button>

    <button onclick="sendEmail('${t.email}', 'Complaint Resolved', \`
      <div style='font-family: Arial, sans-serif;'>
        <p>Dear User,</p>
        <p>We are happy to inform you that your complaint has been resolved. Please confirm if the issue has been addressed satisfactorily.</p>
        <p>Thank you for using Pot-Sol Management Services.</p>
        <p>Best regards,<br>Pot-Sol Team</p>
      </div>
    \`)">Resolved</button>
  </div>
</div>
`
        : "-";

      row.innerHTML = `
        <td>${t.tweet_id}</td>
        <td>${t.author_id}</td>
        <td>${t.text}</td>
        <td>${formattedDate}</td>
        <td>${mediaBadge}</td>
        <td>${
          t.media_urls
            ? `<a href="${t.media_urls}" target="_blank">View</a>`
            : "-"
        }</td>
        <td>${emailColumn}</td>
        <td>${contactColumn}</td>
      `;

      tbody.appendChild(row);

      // Add toggle functionality
      const contactBtn = document.getElementById(`contact-btn-${index}`);
      const dropdown = document.getElementById(`dropdown-${index}`);
      if (contactBtn && dropdown) {
        contactBtn.addEventListener("click", () => {
          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
        });
      }
    });
  } catch (err) {
    console.error("Error fetching tweets:", err);
  }
}

fetchTweets();

async function sendEmail(email, subject, message) {
  try {
    const res = await fetch("http://localhost:5002/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subject, message }),
    });
    const result = await res.json();
    if (result.success) {
      alert("✅ Email sent successfully to " + email);
    } else {
      alert("❌ Failed to send email: " + result.error);
    }
  } catch (err) {
    console.error("Error sending email:", err);
    alert("❌ Error sending email");
  }
}
