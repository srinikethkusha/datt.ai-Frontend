# UI Screens

Screen specifications from `DattAI_Job_Posting_Requirements.docx`.

All screens must be **responsive** and **mobile-friendly**.

---

## Public Screens

### 1. Careers Page — `/careers`

List all active job openings.

**Job card fields:**
- Job Title
- Location
- Employment Type (Full-time / Part-time / Contract)
- Experience Required
- Skills Required (tags/summary)
- Job Description (truncated)
- Salary Range (optional)
- Posted Date
- Apply Button

**States:** loading, empty, error

---

### 2. Job Detail — `/careers/:id`

Full job information + **Apply Now** CTA.

Disable Apply if job is inactive or past deadline.

---

### 3. Application Form — `/careers/:id/apply`

**Required:** Full Name, Email, Phone, Current Location, Years of Experience, Skills, Resume (PDF/DOC/DOCX)

**Optional:** LinkedIn, Portfolio/GitHub, Cover Letter

**Also:** reCAPTCHA, file type/size validation, submit loading state

---

### 4. Apply Success

Message: *"Thank you for applying at Datt.ai. Your application has been received successfully. Our HR and technical team will review your profile and contact you regarding next steps."*

Show applied job title.

---

## Admin Screens (Supabase Auth)

### 5. Admin Login — `/admin/login`

Email + password via Supabase. No public signup.

---

### 6. Dashboard — `/admin/dashboard`

Widgets: active jobs, new applications, counts by pipeline stage.

---

### 7. Job Management — `/admin/jobs`

CRUD for jobs. Fields: Title, Department, Location, Employment Type, Experience, Skills, Description, Salary (optional), Status (Active/Inactive), Application Deadline.

List with search and status filter.

---

### 8. Applications List — `/admin/applications`

Search by name/email/skills. Filter by job, status, date. Table with status badges.

---

### 9. Application Detail — `/admin/applications/:id`

Candidate info, resume download, status stepper/dropdown, action buttons.

**Pipeline stages:**
Application Received → HR Screening → Technical Evaluation → Interview Scheduled → Final Review → Offer Letter Sent → Rejected / Closed

---

### 10. Email Modals

- **Interview email:** editable template, send to candidate
- **Offer letter:** template + PDF upload, send to candidate

---

## SEO (Phase 6)

- Meta title/description on job detail pages
- JSON-LD `JobPosting` schema
