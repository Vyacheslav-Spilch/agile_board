import { types, flow } from 'mobx-state-tree'
import apiCall from '../api'


export const User = types.model('User', {
    id: types.identifier,
    createdAt: types.string,
    name: types.string,
    avatar: types.string
})

const ActiveUser = User.named('ActiveUser')

export const UsersStore = types.model('UsersStore', {
        users: types.maybe(types.array(User)),
        me: types.maybe(ActiveUser),
    })
    .views(self => {
        return {
            get list () {
                if(self.users?.length) {
                    return self.users.map(({id, name}) => ({ id, name}))
                }
            }
        }
    })
    .actions(self => {
        return {
            load: flow(function* () {
                self.users = yield apiCall.get('users')
                self.me = yield apiCall.get('me')
            }),
            afterCreate () {
                self.load()
            }
        }
})