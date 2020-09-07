import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Answer {
  Description: string;
  Flag: boolean;
}

export interface Task {
  Name: string;
  Description: string;
  AnswerList: Answer[];
}

export interface TaskSolution {
  Task: Task;
  UserAnswer: Answer;
}

export interface TestSolution {
  TaskListSolution: TaskSolution[];
  CreatedAt: Date;
  SolutionMark: number;
}

export interface Test {
  Name: string;
  Description: string;
  CreatedAt: Date;
  EditedAt: Date;
  TaskList: Task[];
}

export interface UserInfo {
  Name: string;
  EMail: string;
}

export interface UserAuthInfo {
  Token: string;
  LongToken: string;
  Expire: Date;
}

class WebAPI {
  private Hostname = '';
  
}

export class User {
  public getOwnTests(): Test[] {
    let result: Test[] = [];

    return result;
  }
  public getOwnSolutions(): TestSolution[] {
    let result: TestSolution[] = [];

    return result;
  }
  public getOwnInfo(): UserInfo {
    let result: UserInfo = {EMail: '', Name: ''};

    return result;
  }
  public tryAuth(): UserAuthInfo {
    let result: UserAuthInfo = {Expire: new Date(Date.now()), LongToken: '', Token: ''};

    return result;
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
    TestSolution: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
