import { types } from 'mobx-state-tree'
import { BoardStore } from './board'
import { UsersStore } from './users'


export const RootStore = types.model('Root', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {})
})

