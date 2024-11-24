# InsightHounds

## Overview

AI Market Edge Research Agent is an advanced AI system designed to assist startups in solving critical business challenges. It provides data-driven insights, actionable strategies, and practical recommendations to help startups gain competitive advantages, achieve product-market fit, optimize resources, adapt to market dynamics, and enhance customer understanding.

## Table of Contents

- [Features](#Project-Feautures)
- [Installation](#installation)
- [Technologies](#technologies)
- [Contributors](#contributors)
- 


<h2>Project Screenshots:</h2>

<table>
  <tr>
    <td colspan="2" align="center"><img src="https://github.com/user-attachments/assets/52708d66-1c4b-4a60-85db-0a891e2ba095" alt="" width="50%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2f0c3233-b0e2-45bf-a3ee-06e2f10615b3" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/e94f5a74-4a2c-4bb8-866e-0ac4d530627c" alt="" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/cf1c6be9-615f-4f8a-b10d-dbc84a15ba68" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/a6a426e2-c5d3-44c1-b75e-74b03d3f6463" alt="" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b8e3c11e-693b-4781-ad68-e4bb263f8cb5" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/ef01b5b7-bb68-4c43-b006-cb8f19c3dddc" alt="" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6df4ed34-2193-4047-82f0-310f2dc57032" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/45d1d98f-6204-4bca-81ea-24ca3f7164b2" alt="" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e978d1ec-8062-479a-afab-c66d0f26b976" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/8e5d3400-2ec9-40b9-83e9-78922bff391f" alt="" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0d375014-a1ca-4d76-bc3e-54417da2ee1d" alt="" width="100%"></td>
    <td><img src="https://github.com/user-attachments/assets/a10e08d0-a575-40cb-b84e-912a1719cf0d" alt="" width="100%"></td>
  </tr>

</table>



## Project-Features

This project encompasses several innovative features designed to evaluate customer markets, analyze competitors, generate promotional content, and facilitate outreach for startups. Below is a detailed breakdown of each feature:

## 1. Customer Market Evaluation

### **World Map with Heatmap (Customer Density)**

Utilizing Pytrends, this feature enables startups to visually evaluate their target markets across the globe.

- **Process:**

  - Define the **vision**, **mission**, **description**, and **domain** of the startup.
  - Extract **keywords** related to the product using Pytrends.
  - Analyze **search volume** and identify **customer density** across regions.
  - Generate insights about the regions where customers are actively searching for keywords related to your product.

- **Benefits:**

  - Gain a clear understanding of where your potential customers are located.
  - Optimize resource allocation and marketing strategies.

---

## 2. Competitor Analysis (Crunchbase Integration)

This feature provides a comprehensive comparison of your company with competitors by analyzing essential metrics.

- **Capabilities:**

  - **Identify Competitors:** Extract company details and competitors using Crunchbase or similar platforms.
  - Evaluate:
    - **Customer Density:** Compare geographical distribution of customers.
    - **Unique Selling Points (USPs) and Features:** Identify what makes competitors successful.
    - **Pricing Structures:** Understand the pricing strategies of competitors.
    - **Customer Reviews:** Collect and analyze reviews to understand market sentiment.
    - **Funding Information:** Evaluate funding milestones and investors.
    - **Employee Size and Revenue:** Gauge the scale and growth trajectory of competitors.

- **Outcome:**

  - Conduct **sentiment analysis** of competitor reviews to:
    - Identify potential shortcomings.
    - Highlight unaddressed customer needs.
    - Discover advantages your startup may have.
  - Facilitate **idea generation** by uncovering gaps in the market and creating strategies to address them.

---

## 3. AI-Driven Cold Outreach Suggestions

### **Email and LinkedIn Automation**

Leverage AI to automate outreach and pitch your idea to investors, potential customers, and stakeholders.

- **Features:**

  - **Email Automation:** Generate personalized email templates to communicate your ideas effectively.
  - **LinkedIn Scraping:** Extract valuable information from LinkedIn profiles to:
    - Find relevant contacts (e.g., VCs, potential customers).
    - Understand their interests and tailor your pitch accordingly.

- **Purpose:**

  - **Beachhead Market:** Identify a niche audience to validate your product and gain initial traction.
  - Collect feedback to refine your product.
  - Build relationships with stakeholders and investors to ensure long-term success.

## 4. Langgraph AI Assitant

Integrates with tavily and our mongodb database to give you realtime market insights.

## 5. Market Analysis

Gives you market size and market segments for your domain like benefits,potential revenue,growth rate , market share.

## 6. Automated FeedBack Collection

We have a mobile application in which users can rate startup ideas.
These user will receive a small amount of money for every 50 startups rated.
We later use these data in our dashboard so that the founders can know what to priortize and what to discard.

---

## 🛠️ Installation Steps:</h2>

## 1. Clone the repo

```
git clone https://github.com/vaxad/DjDawgs_100X_Buildathon
```

## 2. Install dependencies

### Frontend

```
cd frontend 
npm i
```
### Backend (Nodejs)

```
cd backend
npm i
```

### Backend (FastAPI)

```
cd aihounds
pip install -r requirements.txt
```

### React Native Applications

```
cd app
npm i
```

## 3. Run the project

### Frontend

```
cd frontend
npm run dev
```
### Backend (Nodejs)

```
cd backend
npm run dev
```

### Backend (FastAPI)

```
uvicorn aihounds.app:app --reload
```

### React Native Applications

```
cd app
npx expo start
```
## Technologies

### Technologies Used for this project:

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,nextjs,anaconda,nodejs,fastapi,python,mongodb,express,prisma,tailwind,ts,vercel,figma,postman&perline=5" />
  </a>
</p>

## Contributors:

Our Team DJDawgs consists of the following individuals:

<hr>
<p align="start">
<a  href="https://github.com/vaxad/DJDAWGS_100X_BUILDATHON/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vaxad/DJDAWGS_100X_BUILDATHON"/>
</a>
</p>
</br>

<div align="center">

### Show some ❤️ by starring this awesome Repository!

</div>
