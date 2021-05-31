import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all companies. */

  static async getCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs. */

  static async getJobs() {
    let res = await this.request(`jobs/`);
    return res.jobs;
  }

  /** Login existing user. 
   * - loginData: {username, password}
   * - returns: token
  */

  static async loginUser(loginData) {
    let {token} = await this.request('auth/token', loginData, 'post');
    JoblyApi.token = token;
    return token;
  }

  /** Signup new user. 
   * - signupData: 
   *      {firstName, lastName, email, username, password}
   * - returns token
  */

  static async signupUser(signupData) {
    let {token} = await this.request('auth/register', signupData, 'post');
    JoblyApi.token = token;
    return token
  }

  /** Get user information by username in a token
   * - returns: {username, firstName, lastName, email, isAdmin, jobs}
   * - where jobs is { id, title, companyHandle, companyName, state }
  */

  static async getUserInfo(token) {
    JoblyApi.token = token;
    const {username} = jwt_decode(token);
    let {user} = await this.request(`users/${username}`);
    return user;
  } 

  /** Update user information
   * - userInfo: {firstName, lastName, email, password}
   * - authenticates user with (username, password)
   *    - if it is the right user, update the firstName +/ lastName +/ email
   *    - else, throw unauthorized error
  */

  static async updateUser(username, userInfo) {
    try {
      const userCredentials = {username, password: userInfo.password}
      await this.request('auth/token', userCredentials, 'post');
      let {user} = await this.request(`users/${username}`, userInfo, 'patch');
      return user;
    } catch (e) {
      throw e;
    }
  }

  /** Apply user to a job.
   * - returns {applied: jobId}
  */

  static async applyUserToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
  } 
}

export default JoblyApi;