export interface ITaskModel {
  id: string;
  taskName: string;
  description:string
  createdDate: string;
  priority: number;
  status: number;
  deadLine: string

}
export interface ITaskArrayModel {
  isLoadingTasks: boolean;
  taskList: ITaskModel[];
  single_task: ITaskModel;
}