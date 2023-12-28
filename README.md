# Fullstack Blog website using Appwrite

##  Conf - Need ?
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
