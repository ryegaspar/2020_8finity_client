export default function ({redirect, store}) {
	// console.log(store.state.auth.loggedIn)
	if (!store.state.auth.loggedIn)
		return redirect({name: 'pekpek-login'})
}
