import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';

Vue.use(Vuex)

export enum TaskTypes {
  None,
  OneAnswer,
  MultipleAnswer,
  Matching,
  OpenAnswer
}

export enum TestTypes {
  None,
  Edu,
  Regulate
}

export enum UserTypes {
  None,
  Student,
  Teacher,
  Admin
}

export interface Answer {
  description: string;
  flag: boolean;
}

export interface Task {
  name: string;
  description: string;
  type: TaskTypes;
  answerList: Answer[];
}

export interface TaskSolution {
  task: Task;
  userAnswer: Answer[];
}

export interface TestSolution {
  testName: string;
  taskListSolution: TaskSolution[];
  createdAt: Date;
  solutionMark: number;
}

export interface Test {
  type: TestTypes;
  name: string;
  description: string;
  createdAt: Date;
  editedAt: Date;
  timeLimit: any;
  taskList: Task[];
}

export interface User {
  name: string;
  userType: UserTypes;
}

export interface TestDescription {
  testName: string;
  createdAt: Date;
  editedAt: Date;
  averagePts: number;
  solutionCount: number;
  averageSolveTime: any;
  solvedBy: User[];
}

export class User {
  public static async getOwnTests(): Promise<Test[]> {
    return (await axios.get("https://localhost:44349/UserTest/getTests?userID=1")).data;
  }
  public static async addOrUpdateTest(test: Test): Promise<boolean> {
    let statusCode = 404;
    statusCode = (await axios.post("https://localhost:44349/UserTest/aouTest?userID=1", test, {
      validateStatus: () => true
    })).status;
    return statusCode === 404;
  }
  public static async removeTest(test: Test): Promise<boolean> {
    let statusCode = 404;
    statusCode = (await axios.post("https://localhost:44349/UserTest/delTest?userID=1", test, {
      validateStatus: () => true
    })).status;
    return statusCode === 404;
  }
  public static async postSolution(ts: TestSolution): Promise<TestSolution> {
    return (await axios.post("https://localhost:44349/UserTest/newSolution?userID=1", ts)).data;
  }
  public static async getTestDescription(testID: number): Promise<TestDescription> {
    return (await axios.get("https://localhost:44349/UserTest/getTestDescription?userID=1&testID="+testID)).data;
  }
}

export default new Vuex.Store({
  state: {
    newTaskDefinition: '',
    newTestDefinition: '',
    newTestDescription: '',
    newTaskList: [],
    currentOver: -1,
    currentTestEditIndex: -1,
    currentTaskIndex: -1,
    ownTestsList: [],
    TestSolution: {},
    testDetails: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
