import { userService } from '@/services/user.service.js';

export default {
    state: {
        loggedinUser: null
    },
    getters: {
        loggedinUser({ loggedinUser }) {
            return loggedinUser
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user
        },
    },
    actions: {
        async loadUser({ commit }) { //maybe delete async
            const user = userService.getLoggedinUser();
            if (user) commit({ type: 'setLoggedinUser', user });
        },
        async signup({ commit }, { creds }) {
            const user = await userService.signup(creds);
            commit({ type: 'setLoggedinUser', user });
        },
        async signupAsGuest({ commit }) {
            const guestCreds = { name: "guest", email: "guest@example.com", password: "guest" }
            let user = await userService.login(guestCreds);
            if (!user) user = await userService.signup(guestCreds);
            commit({ type: 'setLoggedinUser', user });
        },
        async saveUser({ commit }, { user }) {
            const updatedUser = await userService.update(user);
            commit({ type: 'setLoggedinUser', user: updatedUser });
        },
        async addMove({ commit }, { amount, contact }) {
            const updatedUser = await userService.addMove(amount, contact);
            commit({ type: 'setLoggedinUser', user: updatedUser });
        },
        async login({ commit }, { creds }) {
            const user = await userService.login(creds);
            commit({ type: 'setLoggedinUser', user });
        },
        async logout({ commit }) {
            await userService.logout();
            commit({ type: 'setLoggedinUser', user: null });
        }
    }
}