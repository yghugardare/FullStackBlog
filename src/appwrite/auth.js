import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAaccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAaccount) {
        // call another method
        return this.login({email,password});
      } else {
        return userAaccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  // function to check if someone already loged in or ot
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite :: getCurrentUser :: error :: ", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite :: logout :: error :: ", error);
    }
  }
}
const authService = new AuthService();
export default authService;
