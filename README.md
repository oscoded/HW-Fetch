# Fetch Coding Exercise - SDET Documentation

This documentation provides an overview of the solution for the Fetch Coding Exercise - SDET, which involves finding a fake gold bar among nine identical-looking gold bars using a balance scale and a web application [Link](https://fetch-hiring.s3.amazonaws.com/SDET/Fetch_Coding_Exercise_SDET.pdf).


## :hammer_and_wrench: Prerequisites
1. Installed [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Installed [Node.js](https://nodejs.org/en/download)



## :gear: Setup

1. `git clone https://github.com/oscoded/HW-Fetch.git`
2. cd to `HW-Fetch` folder and run `npm install`
3. run in CMD: `npx cypress run` | run in GUI `npx cypress open` then select `fetch.cy.js` file


## Problem Statement

The problem involves identifying a fake gold bar among nine gold bars of the same size and appearance. The fake bar is lighter than the genuine ones. The goal is to find the fake gold bar by using the balance scale and a web application.

The web application, accessible at [http://sdetchallenge.fetch.com/](http://sdetchallenge.fetch.com/), simulates the weighing process. It allows users to:

1. Place gold bars on the scale plates (bowls).
2. Click the "Weigh" button to compare the weights of the bars on the left and right sides of the scale.
3. View the weighing result, which indicates whether the left side is lighter, the right side is lighter, or both sides have the same weight.
4. Reset the plates grid to empty values using the "Reset" button.
5. Click on a button with a number corresponding to the suspected fake gold bar at the bottom of the screen.
6. Check for an alert message that confirms whether the guess was correct or not.

## Solution Overview

### Step 1: Visit the Website

The test automation project starts by visiting the [http://sdetchallenge.fetch.com/](http://sdetchallenge.fetch.com/) website.

### Step 2: Define the Heaps

Three heaps of gold bars are defined, represented by arrays:
- `firstHeap`: Bars 0, 1, and 2
- `secondHeap`: Bars 3, 4, and 5
- `thirdHeap`: Bars 6, 7, and 8

### Step 3: Perform Weighing

A function `performWeighing` is defined to perform a single weighing. This function:

- Clears the left and right input fields.
- Types the values of gold bars from the specified heaps into the corresponding input fields.
- Clicks the "Weigh" button to perform the weighing.

### Step 4: Compare Last Heap Numbers

A function `compareLastHeapNumbers` is defined to compare the numbers in the third heap and place them in the left and right inputs. This function:

- Clears the left and right input fields.
- Types the first two values from the heap into the left and right inputs.
- Clicks the "Weigh" button to perform the weighing.
- Waits for 5 seconds to ensure the weighing result is available.
- Retrieves the result of the last weighing and determines the next action based on the result:
  - If the result contains "<," the fake gold bar is in the left group.
  - If the result contains ">,", the fake gold bar is in the right group.
  - Otherwise, the fake gold bar is in the third group.

### Step 5: Initial Weighing

The initial weighing is performed using `performWeighing` with the first and second heaps. The result is analyzed, and the appropriate action is taken based on the result.

### Step 6: Loop Until Fake Bar is Found

The algorithm continues to loop until the fake gold bar is found:

- The `compareLastHeapNumbers` function is called to perform the weighing based on the previously determined group.
- The result is analyzed to determine the next group to weigh.
- The loop continues until the fake bar is identified.

### Step 7: Click on Fake Gold Bar

Once the fake gold bar is found, the corresponding button at the bottom of the screen is clicked.

### Step 8: Check Result Message

The test automation project checks for the alert message that confirms whether the guess was correct or not.

## Code Structure

The code follows the structure outlined in the problem statement. It uses Cypress for test automation and JavaScript for scripting the interactions with the web application.

The code is organized as follows:
- Initialization: Visiting the website and defining heaps.
- Functions: `performWeighing` and `compareLastHeapNumbers` for performing weighings and comparisons.
- Main Logic: Performing the initial weighing, looping until the fake bar is found, clicking on the fake gold bar, and checking the result message.

## 💡Information

### 🧪Tests

📁 Test is located in cypress/e2e folder


## Conclusion

This documentation provides an overview of the solution for the Fetch Coding Exercise - SDET. The solution uses test automation with Cypress to find the fake gold bar on the provided website by performing weighings and comparisons. The algorithm is designed to minimize the number of weighings required to find the fake bar accurately.

## :link: Links
1. https://docs.cypress.io/guides/overview/why-cypress
2. https://docs.cypress.io/guides/references/best-practices.html


