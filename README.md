Conference Management App (Salesforce)
📌 Overview

This project is a custom Salesforce Conference Management Application built as part of a Junior Salesforce Developer Assessment. The application demonstrates advanced Salesforce concepts including custom data modeling, bulk-safe Apex trigger logic, and advanced Lightning Web Component (LWC) communication patterns.

The app allows conference administrators to manage Speakers, Sessions, and Speaker Assignments, while ensuring that speakers cannot be double-booked for overlapping sessions.

🧩 Features

Custom Salesforce data model for conference management

Conflict detection using bulk-safe Apex triggers

Advanced LWC parent–child communication

Real-time speaker availability checking

User-friendly Lightning App Page

Optional calendar-based availability visualization

🗂 Data Model
1️⃣ Speaker__c

Stores information about conference speakers.

Fields:

Name (Standard)

Email__c (Email)

Bio__c (Long Text Area)

Speciality__c (Picklist)

Apex

LWC

Integrations

Architecture

2️⃣ Session__c

Represents conference sessions.

Fields:

Title__c (Text)

Session_Date__c (Date)

Start_Time__c (Time)

End_Time__c (Time)

Level__c (Picklist)

Beginner

Intermediate

Advanced

3️⃣ Speaker_Assignment__c

Junction object that links Speakers to Sessions.

Relationships:

Master-Detail → Session__c

Lookup → Speaker__c
