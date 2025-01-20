based from https://github.com/jbsaouzanet/multi-step-form?tab=readme-ov-file


# Multi Step Form - Level 2

This project involves building a ticket-ordering frontend app with a multi-step form. Please read the instructions carefully to ensure smooth progress. Good luck!

---

## Time Estimate

Between 1 to 1.5 hours, plus the time to set up the codebase.

---

## The Task

Your task is to build a ticket-ordering frontend app that:
1. Is build with Vanilla TypeScript or Angular + TypeScript ( Pickup the one you are the most confortable with )
2. Collects user input.
3. Uses correct input types for each field.
4. Validates the fields according to the validation rules provided below.
5. Preserves the state between steps.
6. Displays the collected information in the last step.
7. Passes the provided Cypress E2E tests.

Here’s the mockup with hints:

![Mockup with hints](https://user-images.githubusercontent.com/1162212/138476002-0be62ddc-3ff5-4450-a7e1-52c47500660f.png)

Feel free to tweak the UI, but ensure the following HTML structure is in place.

---

## Getting Started

1. **Clone the repository**: Start by cloning the project repository to your local machine:
   ```bash
   git clone https://github.com/jbsaouzanet/multi-step-form.git
   cd multi-step-form
   ```
2. Develop the solution in the cloned repository.
3. Once you are done, **host your project on your own GitHub repository**:
   - Create a new repository on your GitHub account.
   - Push your local codebase to your repository.

---

## Navigation Elements

Each screen of the application must contain navigation links, including links to every step of the form. Each step of the form should also include "Submit" and "Back" buttons.

Use `data-testid` attributes to identify these elements.

---

## The Form Steps

Each step of the form must have the following `data-testid` attributes:

### Step 1

```html
<form ...>
  <input data-testid="firstName" ... />
  <input data-testid="lastName" ... />
  <input data-testid="age" ... />
  <button data-testid="submit" />
</form>
```

### Step 2

```html
<form ...>
  <input data-testid="phone" ... />
  <input data-testid="email" ... />
  <button data-testid="submit" />
  <button data-testid="back" />
</form>
```

### Step 3

```html
<form ...>
  <input data-testid="seat" ... />
  <input data-testid="food" ... />
  <input data-testid="allergies" ... />
  <button data-testid="submit" />
  <button data-testid="back" />
</form>
```

### Result

On the results page, we expect to see the values collected by the form. Each element containing the value should have a `data-testid` field with the corresponding `field name`:

```html
<div data-testid="<field name>">value</div>
<button data-testid="back" />
```

> Here, we use `div` as an example element. In your application, it can be a `tr`, `span`, or any other element.

---

## Validation Rules

### Step 1

- `firstName` is a required field.
  - **Validation message:** `First name is a required field`
- `firstName` should not contain numbers.
  - **Validation message:** `First name should not contain numbers`
- `lastName` is a required field.
  - **Validation message:** `Last name is a required field`
- `lastName` should not contain numbers.
  - **Validation message:** `Last name should not contain numbers`
- `age` is a required field.
  - **Validation message:** `Age must be a number`
- `age` should be a positive number.
  - **Validation message:** `Age should be positive`

### Step 2

- `email` is a required field.
  - **Validation message:** `Email is a required field`
- `email` should have correct email format.
  - **Validation message:** `Email should have correct format`
- `phone` is a required field.
  - **Validation message:** `Phone number is a required field`

### Step 3

- `seat` is a required field.
  - **Validation message:** `Seat is a required field`
- `food` is a required field.
  - **Validation message:** `Food is a required field`
- `allergies` is a required field.
  - **Validation message:** `Allergies is a required field`

---

## Solution Expectations

- Do your best to make the provided [E2E tests](cypress/e2e/test.cy.js) pass.

---

## When You Are Done

1. Push the completed project to **your own GitHub repository**.
2. Create a new Pull Request from the branch where you've committed to track your history. ( Please don't push your code into the provided repository. )
3. Contact our Recruitment staff and provide them your GitHub repository link.

---

Authored by [Alva Labs](https://www.alvalabs.io/).
