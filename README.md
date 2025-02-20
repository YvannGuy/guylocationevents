# 🧡 **Guy Location Events** 🧡  
  
![Event Setup GIF](./public/images/captu1.gif)  

**_"Your event, our passion."_**  

---

## 🌐 **Overview**  

**Guy Location Events** is a platform dedicated to renting high-quality event equipment, including sound systems, video equipment, and photobooths. With delivery and technician assistance options, the platform provides tailored solutions for events such as weddings, conferences, and birthdays within Paris and Île-de-France.  

---

## 🎯 **Key Features**  
- 🎶 **Audio Equipment:** Speaker packs, mixing consoles, microphones  
- 📽️ **Video Equipment:** Projectors, screens, tripods  
- 📸 **Photobooths:** Capture memorable moments  
- 🚚 **Delivery & Pickup:** Available within Paris and Île-de-France  
- 🧑‍🔧 **On-Site Technician:** Optional setup assistance  
- 🔍 **Advanced Search Bar:** Filter by number of people, event type, and technical solutions  
- 💬 **Custom Chatbox:** Pre-recorded questions and real-time support  
- 🟢 **WhatsApp Button:** Instant assistance via WhatsApp  
- 📝 **Reservation & Emergency Forms:** Connected to Resend API for instant notifications  
- 💳 **Stripe API Integration:** Secure online payments  
- ❓ **FAQ Section:** Quick answers to common questions  

---

## 💡 **Technologies Used**  
- **Frontend:** Next.js 15 (SSR) with TypeScript  
- **Styling:** Tailwind CSS with custom CSS  
- **Email Service:** Resend API  
- **Payment Gateway:** Stripe API  
- **Chatbox:** Custom API for real-time support  
- **Messaging:** WhatsApp button integration  
- **Deployment:** Vercel  

---

## 🗂️ **Project Structure**  
```plaintext
├── public
│   ├── images
│   │   ├── banner.png
│   │   └── event-setup.gif
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   ├── utils
│   └── hooks
├── .env
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 **Getting Started**  

### ✅ **Prerequisites**  
- Node.js (v18.x or higher)  
- npm or yarn package manager  

### 💾 **Installation**  
```bash
# Clone the repository
git clone https://github.com/your-username/guylocationevents.git

# Navigate to the project directory
cd guylocationevents

# Install dependencies
npm install
# or
yarn install
```

---

## 🧩 **Usage**  

### 🌱 **Development Mode**  
```bash
# Start the development server
npm run dev
# or
yarn dev
```

### 🚀 **Production Mode**  
```bash
# Build the app for production
npm run build

# Start the production server
npm start
```

---

## 🛠️ **Environment Variables**  
Create a `.env` file in the root directory and configure the following variables:  
```env
# Resend API
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@example.com

# Stripe API
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

# WhatsApp
WHATSAPP_NUMBER=your_whatsapp_number

# Custom Chatbox API
CHATBOX_API_URL=https://api.example.com/chatbox

# Advanced Search
SEARCH_API_URL=https://api.example.com/search
```

---

## 💳 **Payment Integration (Stripe)**  
- Secure online payments are processed using Stripe.  
- The payment flow includes secure tokenization and real-time validation.  

---

## 💬 **Chatbox and WhatsApp Integration**  
- Custom chatbox with pre-recorded questions for quick support.  
- Direct WhatsApp button allows instant assistance from the team.  

---

## 📝 **Reservation & Emergency Forms**  
- Reservation and emergency request forms are connected to the Resend API.  
- Real-time notifications are sent to the support team upon form submission.  

---

## ✅ **SEO & Performance**  
- Server-side rendering (SSR) with Next.js 15 ensures fast page loads.  
- Optimized with responsive design using Tailwind CSS and custom styles.  

---

## 🧪 **Testing**  
```bash
# Run unit tests
npm run test
# or
yarn test
```

---

## 📦 **Deployment**  
The project is deployed on **Vercel**: [Guy Location Events](https://guy-location-events.vercel.app)  

---

## 🌍 **Live Website**  
Visit the official website: [https://guylocationevents.com](https://guylocationevents.com)  

---

## 📝 **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## 💼 **Contributing Guidelines**  

### 🏗️ **Branch Rules**  
- **Main branch (`main`)**: The main branch should always be production-ready.  
- **Feature branches:** For new features, create a branch named `feature/your-feature-name`.  
- **Bugfix branches:** For bug fixes, create a branch named `bugfix/your-bug-description`.  
- **Hotfix branches:** For urgent fixes, use the branch name `hotfix/your-hotfix-description`.  
- **Documentation branches:** For changes related to documentation, use `docs/update-readme` or similar.  

### 💡 **How to Create a Branch**  
```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Push the branch to remote
git push origin feature/your-feature-name
```

### ✔️ **Commit Message Rules**  
- Use clear and descriptive commit messages.  
- Follow the conventional commit format:  
  - **feat:** For new features  
  - **fix:** For bug fixes  
  - **docs:** For documentation updates  
  - **style:** For code style changes (formatting, missing semicolons, etc.)  
  - **refactor:** For code restructuring without changing functionality  
  - **test:** For adding or updating tests  
  - **chore:** For maintenance tasks  

Example:  
```bash
git commit -m "feat: add advanced search bar with filters"
```

### 🔀 **Pull Requests**  
- Ensure your branch is up to date with `main` before creating a pull request.  
- Clearly describe the changes made in your pull request.  
- Assign reviewers if possible.  

---

## 💡 **Suggestions & Issues**  
- To suggest a new feature or report a bug, open an issue on GitHub.  
- Use appropriate labels such as **bug**, **enhancement**, or **question** for better categorization.  

---

## 📞 **Contact**  
For inquiries, visit our [official website](https://guylocationevents.com).  

📧 Email: contact@guylocationevents.com  
📍 Location: Paris, Île-de-France  