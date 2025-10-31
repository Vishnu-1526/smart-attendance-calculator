# 📚 Smart Attendance Tracker

A modern, intelligent web application to track, manage, and predict your academic attendance effortlessly. Built with React, TypeScript, and powered by the Google Gemini API for smart data extraction.


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


## 📖 How to Use

1.  **Set Your Goal**: Navigate to the **Settings** tab and enter the minimum attendance percentage required by your college or university (e.g., 75%).
2.  **Add Your Subjects**:
    - Go to the **Subjects** tab.
    - Click **"Add Subject Manually"** to enter details one by one.
    - **OR**, click **"Import from Image"**, upload a clear picture of your attendance report, and let the AI do the work!
3.  **Track Your Progress**: The **Dashboard** gives you a complete overview of your current standing. Subjects are sorted from lowest to highest attendance to help you prioritize.
4.  **Update Daily**: On the **Subjects** tab, use the `Present` and `Absent` buttons to quickly mark your attendance for the day.
5.  **Analyze Trends**: Visit the **Analytics** tab to see a visual comparison of your attendance across all subjects.

