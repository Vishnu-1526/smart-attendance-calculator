# 📚 Smart Attendance Tracker

A modern, intelligent web application to track, manage, and predict your academic attendance effortlessly. Built with React, TypeScript, and powered by the Google Gemini API for smart data extraction.

![Smart Attendance Tracker Screenshot](https://storage.googleapis.com/aistudio-o-codegen-corp-public-assets/readme-images/attendance-tracker.png)

## ✨ Core Features

- **📊 Interactive Dashboard**: Get an at-a-glance overview of your overall attendance, total subjects, and see which subjects are in the "safe" or "at-risk" zones.
- **🧠 AI-Powered Import**: Simply upload an image of your attendance sheet, and the Google Gemini API will automatically parse and import all your subject data in seconds. No more manual entry!
- **✍️ Manual Subject Management**: Easily add, edit, and delete subjects. Track attended classes and total classes for each course.
- **✅ Quick Attendance Updates**: Use the "Mark Present" and "Mark Absent" buttons directly on the subjects page for quick, daily updates.
- **🔮 Attendance Prediction**:
    - For subjects with good standing, the app calculates how many classes you can afford to miss while staying above the minimum requirement.
    - For subjects below the threshold, it tells you exactly how many consecutive classes you must attend to get back into the safe zone.
- **📈 Visual Analytics**: A clean, color-coded bar chart visualizes your attendance percentage across all subjects, making it easy to spot which ones need attention.
- **⚙️ Customizable Settings**: Set your personal minimum required attendance percentage to tailor the app's calculations to your institution's rules.
- **🔒 Data Persistence**: All your data is securely saved in your browser's local storage, so your information is waiting for you every time you visit.
- **🎨 Modern & Responsive UI**: A sleek, dark-themed interface built with Tailwind CSS that looks great on both desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/gemini-api) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

This project is a static web application and does not require a complex build process.

### Prerequisites

- A modern web browser (like Chrome, Firefox, or Edge).
- A Google Gemini API Key for the "Import from Image" feature to work.

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/smart-attendance-tracker.git
   cd smart-attendance-tracker
   ```
2. **Set up the API Key:**
   - To use the image import feature locally, you must provide your Google Gemini API key.
   - Open the `index.html` file in a text editor.
   - At the top of the `<head>` section, you will find a `<script>` block labeled "LOCAL DEVELOPMENT CONFIGURATION".
   - Replace the placeholder `"YOUR_GEMINI_API_KEY_HERE"` with your actual API key.
   - **Important**: Be careful not to commit the `index.html` file with your API key to a public git repository!

3. **Open the `index.html` file:**
   - You can now open the `index.html` file directly in your browser.
   - For the best experience (and to avoid potential issues), it's recommended to serve the directory using a simple local server. If you have Python installed:
     ```bash
     # For Python 3
     python -m http.server
     ```
   - Then navigate to `http://localhost:8000` in your browser.

## 📖 How to Use

1.  **Set Your Goal**: Navigate to the **Settings** tab and enter the minimum attendance percentage required by your college or university (e.g., 75%).
2.  **Add Your Subjects**:
    - Go to the **Subjects** tab.
    - Click **"Add Subject Manually"** to enter details one by one.
    - **OR**, click **"Import from Image"**, upload a clear picture of your attendance report, and let the AI do the work!
3.  **Track Your Progress**: The **Dashboard** gives you a complete overview of your current standing. Subjects are sorted from lowest to highest attendance to help you prioritize.
4.  **Update Daily**: On the **Subjects** tab, use the `Present` and `Absent` buttons to quickly mark your attendance for the day.
5.  **Analyze Trends**: Visit the **Analytics** tab to see a visual comparison of your attendance across all subjects.

## 🌐 Deployment

This is a static single-page application, making it incredibly easy to deploy. You can host it for free on services like:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

Simply connect your GitHub repository to one of these platforms, and they will automatically build and deploy the site, providing you with a shareable link.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.