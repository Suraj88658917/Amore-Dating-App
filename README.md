💖 Amore Dating App
Amore Dating App is a modern, full-featured dating application built with React Native and Expo, featuring authentication, user profile creation, a swipe-based matching interface, and chat functionality. Data is managed using local async storage and the app is ready for backend integration with MongoDB.

✨ Features
📝 Authentication: Email/password registration, login, and verification flow
👤 Onboarding: User profile setup via guided screens (name, email, birthdate, location, gender, prompts, photos, etc.)
📱 Main App: Bottom tab navigation for browsing profiles, matches, chats, and profile view
💬 Chat Functionality: Real-time chat room interface
🎨 Profile Customization: Prompts, job info, hometown, photos, and more
🚀 Splash & Start Screens: Onboarding experience with branding assets
⚡ Prerequisites
Node.js >= 16
npm >= 8
Expo CLI: Install via npm install -g expo-cli
Android Studio or Xcode (for running on simulators)
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/amore-datingapp.git
cd amore-datingapp


Expo CLI: Install via npm install -g expo-cli

Android Studio or Xcode (for running on simulators)

Getting Started
1. Clone the Repository
bash
git clone https://github.com/<your-username>/amore-datingapp.git
cd amore-datingapp
2. Install Dependencies
bash
npm install
3. Start the App
To launch in Expo Go (for Android, iOS, or web):

bash
npm start
Or for platform-specific launch:

bash
npm run android
npm run ios
npm run web
Project Structure
Path	Purpose/Feature
/App.js	Main entry point, navigation stack, and screen imports 
/index.js	Registers root component with Expo 
/screens/	Splash, login, registration, onboarding, chat, etc. 
/Navigation1/BottomTab	Bottom tab navigator for core app flow 
/components/	UI components like profile viewer, etc. 
/AuthContext.js	Context logic for authentication, token storage 
app.json	Expo config, app display options 
package.json	Dependency and script definitions 
babel.config.js	Babel transpiler setup 
tsconfig.json	TypeScript configuration 
Configuration
App Name: Amore-DatingApp

Expo: Managed workflow with splash screen, icons, light UI style

Dependencies: React Native, Expo, AsyncStorage, React Navigation, Axios, Vector icons, Reanimated, Card Stack Swiper

Authentication Context
Token management and session persistence via Context and AsyncStorage:

Login sets userToken and stores it locally

Logout clears the token

Session check on app startup using useEffect

Contributing
Feel free to fork the repository and submit pull requests. Standard branching and PR review workflow is encouraged.

License
This project is licensed under the MIT License.

Assets/Credits
Icons, splash images and graphics located under /assets. All UI artwork and branding are © Amo
