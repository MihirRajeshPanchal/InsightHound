# AI Market Edge Research Agent

## Overview

AI Market Edge Research Agent is an advanced AI system designed to assist startups in solving critical business challenges. It provides data-driven insights, actionable strategies, and practical recommendations to help startups gain competitive advantages, achieve product-market fit, optimize resources, adapt to market dynamics, and enhance customer understanding.

## Table of Contents

- [Features](#Project-Feautures)
- [Installation](#installation)
- [Technologies](#technologies)
- [Contributors](#contributors)

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

## Installation

### Prerequisites

- Python 3.8+
- MongoDB
- FastAPI
- Uvicorn

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/marketedge-ai.git
   cd marketedge-ai

   ```

2. Start the backend:

3. Start python-backend:
   Create an .env in sample backend folder according to ai.env.sample
   ```sh
   cd aihounds && pip install -r requirements.txt
   cd ..
   uvicorn aihounds.app:app --reload
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
