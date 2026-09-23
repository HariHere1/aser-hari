# CampusNet 🎓
<img width="691" height="522" alt="image" src="https://github.com/user-attachments/assets/59a283dc-0e16-4444-ab6e-3a23cfa075d6" />


> A verified campus resource network connecting students with **resources, skills, needs, and rides**.

CampusNet is a student-focused platform designed to help students **find something, offer something, or connect with another student** within their campus community.

Instead of working like a traditional marketplace:

**List → Search → Buy**

CampusNet is built around:

**Need → Discover → Match → Connect → Share → Complete → Review**

## 🌐 Production

Visit the live application: [aser-eosin.vercel.app](https://aser-eosin.vercel.app/)

![CampusNet production website preview](https://aser-eosin.vercel.app/)

---

## 🚀 What is CampusNet?

CampusNet connects students who have something with students who need something.

A student might have:

- An Arduino board
- A textbook
- A calculator
- A camera
- A project component
- A technical skill
- A free seat in a vehicle

Another student might need exactly that.

CampusNet provides a single platform to discover and connect with them.

---

## ✨ Features

### 📦 Resources

Students can list and discover campus resources such as:

- Electronics components
- Project equipment
- Textbooks
- Calculators
- Tools
- Lab equipment
- Cameras
- Sports equipment
- Hostel items
- Other useful resources

Supported sharing methods:

- Sell
- Rent
- Borrow
- Free
- Exchange

Resource listings can include:

- Title
- Description
- Category
- Condition
- Price
- Location
- Terms
- Images
- Availability

---

### 📋 I Need

Students can post requests for things they need.

A request can contain:

- Title
- Description
- Category
- Deadline
- Duration
- Budget range
- Location
- Image

Other students can respond if they can provide the requested resource.

---

### 🚗 Rides

Students can create and discover shared rides.

Ride listings include:

- Starting location
- Destination
- Date
- Time
- Total seats
- Available seats
- Vehicle type
- Estimated cost
- Notes

Supported vehicle types:

- Car
- Bike
- Auto
- Bus
- Other

---

### 🛠️ Skills

Students can offer their skills to other students.

Examples:

- Python
- Flutter
- Arduino
- PCB Design
- CAD
- Electronics
- Photography
- Video Editing
- Programming
- And more

Skill listings support:

- Skill title
- Description
- Category
- Experience level
- Availability
- Rate
- Rate unit

---

## 💬 Context-Aware Chat

CampusNet includes realtime student-to-student messaging.

Conversations can be connected to:

- 📦 Resources
- 📋 Needs
- 🚗 Rides
- 🛠️ Skills
- 💬 Direct conversations

The chat interface answers two important questions:

### WHO am I talking to?

The chat shows:

- Student name
- Avatar
- Department
- Year
- Verification status

### WHAT are we talking about?

The conversation includes the relevant:

- Resource
- Need
- Ride
- Skill
- Price
- Budget
- Other listing context

Messages are stored in Supabase and updated using Supabase Realtime.

---

## 🟢 WhatsApp Contact

Students can optionally add their phone number and enable WhatsApp contact.

When WhatsApp contact is enabled, other students can get two contact options:

```text
💬 CampusNet Chat

🟢 WhatsApp
```
