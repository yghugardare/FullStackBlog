# Fullstack Blog website using Appwrite

## Conf - Need ?

It's good that the configuration (conf) is kept in a separate file. Make sure that sensitive information such as API keys and secrets are handled securely.

## Authentication logic -

Contents -

1. create account
2. get current user
3. login
4. logout

**Exporting an Instance of the Service Class:**

- Exporting an instance (`authservice`) rather than the class promotes a Singleton pattern, ensuring consistent state and a single point of initialization.
- Avoids unecessary re-initialisations

**Usefulness of the Service Class in This Example:**

- Encapsulates Appwrite logic, making code readable and maintainable.
- Enables code reusability, facilitating a smooth transition to another BaaS provider like Firebase.
- Simplifies testing by isolating Appwrite-related functionality.

**Migrating to Another BaaS:**

- Create a new service class for the new BaaS with the same interface.
- Update the instance creation to use the new service class.
- The rest of the application remains unchanged, promoting flexibility and maintainability.

## Config.js

Contents -

- create post
- update post
- delete post
- get 1 post
- get multiple posts
- upload file("image")
- delete file
- get file preview

## Some Common Questions related to `auth.js` and `config.js` -

**Q1) What are environment variables, and why do we store them in a configuration (conf) file?**

- **Environment variables:** These are variables that contain information about the environment in which a process runs. They are typically key-value pairs, and they can hold sensitive information like API keys, URLs, or database credentials.

- **Storing in a configuration file (conf):** It's a common practice to store environment variables in a configuration file for a few reasons:
  - **Centralized Configuration:** A configuration file allows you to store all your environment-specific settings in one place, making it easier to manage.
  - **Security:** By keeping sensitive information in a separate file, you reduce the risk of exposing such information accidentally when sharing or version-controlling your code.
  - **Ease of Maintenance:** If your environment variables change, you only need to update the configuration file, rather than searching through your entire codebase.

**Q2) Why do we use `conf.appwriteUrl` and `conf.appwriteDatabaseId` when creating the Appwrite client in the constructor?**

- **`conf.appwriteUrl`:** This is likely the URL of the Appwrite API endpoint. It's used to set the endpoint for the Appwrite client, specifying where the client should send requests.

- **`conf.appwriteDatabaseId`:** This is probably the identifier for the specific database within the Appwrite project. It's used when interacting with the database to specify which database the client should connect to.

  **Code snippet reference:**

  ```javascript
  constructor() {
     this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
     // ...
  }
  ```

  The constructor initializes the Appwrite client with the specified endpoint and project ID from the configuration file (`conf`). This approach centralizes configuration, making it easy to manage and update.

**Q3) What is a slug, and why do we need it?**

- **Slug:** A slug is a URL-friendly version of a string, typically used in the context of generating human-readable URLs. It usually consists of lowercase letters, numbers, and hyphens, representing the title of a resource.

- **Why we need it:** Slugs serve two main purposes:
  - **SEO and Readability:** They make URLs more readable for humans and search engines, improving the SEO of your website.
  - **Uniqueness:** Slugs are often used as unique identifiers for resources like posts. For example, a blog post titled "Introduction to JavaScript" might have the slug "introduction-to-javascript" in its URL.

**Q4) What is a Query, and why do we need it?**

- **Query:** In the context of databases, a query is a request for data from a database. It specifies the criteria that data must meet to be included in the result set.

- **Why we need it:** Queries help filter and retrieve specific data from a database. In the provided code snippet, the `getPosts` method is using a query to filter posts with a specific status (in this case, 'active'). This allows you to retrieve only the posts that meet certain conditions, providing a more focused and relevant set of data.

  **Code snippet reference:**

  ```javascript
  async getPosts(queries = [Query.equal('status','active')]){
     try {
        return this.databases.listDocuments(
           conf.appwriteDatabaseId,
           conf.appwriteCollectionId,
           queries
        )
     } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false;
     }
  }
  ```

## Use of Forward Ref and useId() in `Input.jsx`

**Q1) What is `useRef` hook in React?**

- 1. **Mutable Reference:** `useRef` provides a mutable object with a `current` property that can be assigned any value. This allows for persisting values across renders without triggering re-renders.

2. **Accessing and Modifying DOM Elements:** `useRef` is often used to obtain a reference to a DOM element. This reference can be accessed and modified without causing a re-render, making it useful for managing and interacting with specific elements in the DOM.

**Q2) What is `forwardRef` in React?**

- `forwardRef` is a function in React that allows components to forward a ref to a child component. This is useful when you want a parent component to interact with a specific DOM element or React component instance in the child, without exposing its implementation details.

**Q3) Why do we need `forwardRef` in React?**

- `forwardRef` is needed when you want a parent component to be able to directly access or interact with a child component's DOM element or React component instance. It enables passing the `ref` from the parent to the child without breaking encapsulation.

**Q4) Basic syntax for creating `forwardRef` in a child component:**

```jsx
const MyComponent = React.forwardRef((props, ref) => {
  // Component logic here
  return <div ref={ref}>Component Content</div>;
});
```

**Q5) Basic syntax for accessing the `ref` in the parent component:**

```jsx
const parentComponent = () => {
  const childRef = React.createRef();

  // ...

  return <MyComponent ref={childRef} />;
};
```

**Q6) What is `useId()` hook in React?**

`useId()` is a custom hook that generates a unique identifier. It is commonly used when creating HTML elements with associated labels to ensure that each label has a unique `for` attribute value.

**Q7) Why is `useId()` used in this code? In simple terms:**

The `useId()` hook is used to generate a unique identifier for the `label` and `input` elements in the `Input` component. This ensures that the `for` attribute of the `label` matches the `id` attribute of the `input`, creating a proper association. It helps in accessibility and ensures a unique HTML structure, avoiding potential conflicts in larger applications.

## `AuthLayout.jsx` need ?

The `Protected` component, acting as a protected container, is designed to control access to certain routes based on the authentication status of the user. Let's break down its functionality and discuss its importance in the context of an `AuthLayout.jsx`:

1. **Access Control:**

   - The `Protected` component checks the authentication status using the `authStatus` variable obtained from the Redux store.

2. **Conditional Navigation:**

   - If `authentication` is `true` (indicating that the route is protected), and the user is not authenticated (`authStatus !== true`), the user is redirected to the login page (`'/login'`).

   - If `authentication` is `false` (indicating that the route is public), and the user is authenticated (`authStatus !== false`), the user is redirected to the home page (`'/'`).

3. **Loading State:**

   - The `loader` state is used to handle the loading state while the authentication status is being checked. This ensures that the component doesn't render the `children` until the authentication check is complete.

4. **Importance in `AuthLayout.jsx`:**

   - In an `AuthLayout`, which likely serves as a layout for authenticated pages, the `Protected` component plays a crucial role in controlling access. It ensures that only authenticated users can access the protected routes while redirecting unauthenticated users to the login page. This helps maintain security and ensures that sensitive content is only accessible to users with the appropriate authentication status.

5. **Enhanced User Experience:**

   - By using a protected container, the application can provide a seamless and secure user experience. Users are directed to the appropriate pages based on their authentication status, preventing unauthorized access to protected routes.

6. \*\*Simplified way (alternative) of Conditional Navigation-

```javascript
if (authentication) {
  // If authentication is expected (true) but not authenticated, go to login
  if (authStatus !== authentication) {
    navigate("/login");
  }
} else {
  // If authentication is not expected (false) but user is authenticated, go home
  if (authStatus) {
    navigate("/");
  }
}
```

In simpler terms:

- If `authentication` is expected (true) but the user is not authenticated, go to the login page.
- If `authentication` is not expected (false) but the user is authenticated, go to the home page.
- No redirection is needed if the authentication status matches the expected status.

## Controlled vs Uncontrolled Components -

Certainly! In React, the terms "controlled components" and "uncontrolled components" refer to how the component manages and responds to its state, especially the value of its input fields.

**Example: Controlled Input**

- **Controlled:**
  - Values are managed through React state.
  - Changes are handled by updating state.
  - Predictable and easier to test and manage.

```jsx
import React, { useState } from "react";

function ControlledInput() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return <input type="text" value={inputValue} onChange={handleChange} />;
}
```

- **Uncontrolled:**
  - Values are managed by the DOM.
  - Changes are accessed directly from the DOM.
  - Can be useful for integrating with non-React code or working with large forms.

**Example: Uncontrolled Input**

```jsx
import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef();

  const handleButtonClick = () => {
    // Accessing the input value directly from the DOM
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleButtonClick}>Get Value</button>
    </div>
  );
}
```

## RTE.jsx details -

**Q1) What is the role of the Controller component?**

- **Answer:** The `Controller` component from `react-hook-form` is responsible for integrating external controlled components, like the TinyMCE Editor in this case, into a React Hook Form. It connects the form state and validation to the external component, allowing it to work seamlessly within the form.

**Q2) What is the control prop in Controller?**

- **Answer:** The `control` prop in the `Controller` component represents the React Hook Form's control object. It is passed down to provide access to the form state, methods, and validation rules. It acts as a bridge between the form and the external controlled component.

**Q3) Explain what is render, and what is it doing in the code?**

- **Answer:** The `render` prop in the `Controller` component is a function that defines how the external controlled component (`Editor` in this case) should be rendered within the form. It receives an object with a `field` property, which includes the `onChange` function. The `render` prop allows customization of how the external component is integrated into the form, ensuring proper interaction with the form state.

**Q4) Why does render have field: onChange, and why is it being passed to onEditorChange?**

- **Answer:** The `field: onChange` in the `render` prop is part of the structure provided by the `Controller` component. It includes the `onChange` function, which is crucial for updating the form state when the content of the TinyMCE Editor changes. The `onEditorChange` prop of the `Editor` component expects a function that handles changes in the editor content. By passing `onChange` from the `field` object, it ensures that changes in the TinyMCE Editor are properly reflected in the form state managed by React Hook Form.

**Q5) Explain the entire purpose of RTE.jsx component**

- **Answer:** The `RTE.jsx` component serves as a wrapper for integrating the TinyMCE Editor into a form built with React Hook Form. It abstracts the complexity of connecting the external controlled component (`Editor`) with the form state and validation. The component takes props like `name`, `control`, `label`, and `defaultValue`, and renders a labeled TinyMCE Editor within a `Controller` component. This enables easy usage of the TinyMCE Editor in forms while leveraging the features of React Hook Form for state management and validation.

## All about `PostForm.jsx` -

**Q1) What is the useCallback hook in React?**

- **Answer:** `useCallback` is a React hook used to memoize a function, ensuring that the function instance remains the same between renders unless its dependencies change. It is often used to optimize performance by preventing unnecessary re-creation of functions.

**Q2) Why did we use useCallback for the `slugTransform` function?**

- **Answer:** The `slugTransform` function is used as a dependency in the `useEffect` hook, and `useEffect` relies on stable references to its dependencies. By using `useCallback`, we ensure that the `slugTransform` function maintains the same reference unless its dependencies change, preventing unnecessary re-execution of the `useEffect` hook.

**Q3) What would have happened if we did not use useCallback?**

- **Answer:** Without `useCallback`, the `slugTransform` function would be re-created on every render, leading to a new reference. This could potentially cause the `useEffect` hook to run more frequently than necessary, impacting performance.

**Q5) **What is `shouldValidate:true` in the `setValues()`? \*\*

- if there is a validation rule stating that the slug field must be filled out, setting shouldValidate: true ensures that this validation rule is checked and potentially displays an error message if the slug field is empty after the update.
  => shouldValidate: true is used to trigger immediate validation for the field being updated, ensuring that validation rules associated with that field are applied and any relevant UI updates are triggered accordingly.

**Q4a) In the `useEffect` hook, we assigned a variable named `subscription` to the `watch` method, and then we returned a callback with `.unsubscribe()` method. What exactly did we do? **

**Q4b) Why did we use `subscription`?**

**Q4c) How does it help, and what exactly is `.unsubscribe()`? Why did we use a callback to provide reference?**

- **Answer:** In this code, `subscription` is an object returned by the `watch` method. The `watch` method is used to observe changes in form values. `subscription.unsubscribe()` is a method to stop observing changes.

  - **Why we used it:**

    - We used `subscription` to store a reference to the subscription object, allowing us to unsubscribe later when the component unmounts.

  - **How it helps:**

    - When a component unmounts, it's essential to clean up subscriptions to avoid potential memory leaks. By unsubscribing in the cleanup function returned by `useEffect`, we ensure that the subscription is terminated when the component is no longer in use.

  - **What is `.unsubscribe()`:**

    - The `.unsubscribe()` method is specific to the subscription object returned by certain observables or event listeners. It is used to stop listening or observing.

  - **Why we used a callback to provide reference:** - The callback returned by `useEffect` is a cleanup function that runs when the component is unmounted. By returning a function that calls `subscription.unsubscribe()`, we ensure that the unsubscription happens at the appropriate time during the component's lifecycle. This is a common pattern for cleanup operations in React.
    **Summary for `PostForm.jsx` ?**
    **PostForm.jsx:**

The `PostForm` component is a form used for creating or updating blog posts. It utilizes React Hook Form for form management.

- **Inputs:**

  - The form includes inputs for the post title, slug (automatically generated from the title), content (Rich Text Editor), featured image (file upload), and status (active or inactive).

- **Default Values:**

  - Default values are set based on whether the component receives a `post` prop. If a `post` is provided, it populates the form with post details for editing; otherwise, the form is initialized for creating a new post.

- **Form Handling:**

  - The form is handled by React Hook Form, providing features like input validation, default values, and form submission.

- **File Upload:**

  - If updating a post, it checks for changes in the featured image. If a new image is provided, it uploads and replaces the old one.

- **Navigation:**

  - After form submission, it navigates to the updated or newly created post.

- **Slug Transformation:**

  - The `slugTransform` function transforms the title into a URL-friendly slug. It's used with `useCallback` for performance optimization.

- **Watch and Update:**

  - It watches changes in the title input and updates the slug in real-time.

- **Cleanup:**

  - Utilizes a subscription to watch for changes and unsubscribes when the component is unmounted, preventing memory leaks.

- **Redux and Navigation:**
  - Uses Redux for user data and React Router's `useNavigate` for page navigation.

In summary, `PostForm` is a dynamic form component that adapts to both post creation and editing scenarios, integrating various form elements with React Hook Form and managing file uploads. It ensures an efficient user experience when creating or updating blog posts.

## ISSUES AND THEIR SOLUTIONS

### Issue 1 - Post creation

- Error Code - PostForm.jsx

```jsx
const dbPost = await appwriteService.createPost({
  ...data,
  userId: userData.$id, //line 57
});
```

- Error message -
  Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '$id')
  at submit (PostForm.jsx:57:28)
  at async react-hook-form.js?v=03795f62:1604:7

- Fixed code - Optional chaining , as response takes time

```jsx
const dbPost = await appwriteService.createPost({
  ...data,
  userId: userData?.$id, //line 57
});
```

## Issue 2 - MAJOR ISSUE

- - Error Code - PostForm.jsx, line 135 -143

```jsx
  {post  &&(
          <div className="w-full mb-4">
            <img

              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
```

- Error msg screen shot -
  ![Error](/src/assets/image.png)

- Error explanation - The error suggests that the getFilePreview method requires a valid fileId parameter, but the code was directly passing post.featuredImage without ensuring its validity.

- Fixed Code -

```jsx
  {post && post.featuredImage &&(
          <div className="w-full mb-4">
            <img

              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
```
- Fixed code explanation - 
The check for post.featuredImage was added to address the possibility that the featuredImage property of the post object could be undefined. If featuredImage is undefined, attempting to pass it as a parameter to appwriteService.getFilePreview would result in the error "Missing required parameter: 'fileId'."

Importance - 

1. Error Prevention:

The getFilePreview method requires a valid fileId as a parameter to fetch the file preview.
If featuredImage is undefined, it means there is no featured image associated with the post.
Without the check, the code would attempt to pass undefined as the fileId, leading to the AppwriteException error.

2. Handling Edge Cases:

In real-world scenarios, it's common for some posts not to have a featured image.
By checking for post.featuredImage, you handle the edge case where a post doesn't have a featured image gracefully.

3. Preventing Unnecessary API Calls:

If featuredImage is undefined, there's no need to call appwriteService.getFilePreview.
Adding the check helps optimize the code by avoiding unnecessary API calls when there is no featured image to display.