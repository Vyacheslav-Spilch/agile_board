import { types, flow, getParent, cast } from 'mobx-state-tree'
import  apiCall from '../api/index'
import { User } from './users'

const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.maybe(types.string),
    assignee: types.safeReference(User)
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
                // self.tasks = cast(tasks);
            }),
            afterCreate () {
                self.load()
            }
        }
    })

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
}).actions(self => {
    return {
        moveTask (taskId, source, destination) {
            const fromSection = self.sections.find(section => section.id === source.droppableId)
            const toSection = self.sections.find(section => section.id === destination.droppableId)

            const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId)
            const [ task ] = fromSection.tasks.splice(taskToMoveIndex, 1)

            toSection.tasks.splice(destination.index, 0, task.toJSON())
        }
    }
})

export const BoardStore = types.model('BoardStore', {
    boards: types.optional(types.array(Board), []),
    active: types.safeReference(Board)
}).views(self => {
    return {
        get list () {
            return self.boards.map(({id, title}) => ({ id, title }))
        }
    }
    
}).actions(self => {
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