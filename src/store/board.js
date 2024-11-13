import { types, flow, getParent } from 'mobx-state-tree'
import  apiCall from '../api/index'

const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.maybe(types.string)
})

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task)
})
    .actions(self => {
        return {
            load: flow(function* () {
                const { id: boardID } = getParent(self, 2)
                const { id: status } = self 
                const { tasks } = yield apiCall.get(`boards/${boardID}/tasks/${status}`)

                self.tasks = tasks
            }),
            afterCreate () {
                self.load()
            }
        }
    })

const Board = types.model('Board', {
    id: types.identifier,
    sections: types.array(BoardSection),
    title: types.string,
})

export const BoardStore = types.model('BoardStore', {
    boards: types.maybe(types.array(Board)),
    active: types.safeReference(Board)
})
    .actions(self => {
        return  {
            load: flow(function* () {
                self.boards = yield apiCall.get('boards')
                self.active = 'MAIN'
            }),
            afterCreate () {
                self.load()
            }
        }
})