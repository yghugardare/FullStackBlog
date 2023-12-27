# Fullstack Blog website using Appwrite

##  Conf - Need ?
It's good that the configuration (conf) is kept in a separate file. Make sure that sensitive information such as API keys and secrets are handled securely.

## Authentication logic - 

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